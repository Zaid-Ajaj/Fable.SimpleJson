namespace Fable.SimpleJson

open System
open Fable.Core
open JsInterop
open FSharp.Reflection
open System.Numerics
open System.Collections
open System.Collections.Generic

module Node =

    [<Emit("Array.prototype.slice.call(Buffer.from($0, 'base64'))")>]
    /// Converts Base64 string into a byte array in Node environment
    let bytesFromBase64 (value: string) : byte array = jsNative

module Convert =
    [<Emit("new Function(\"try {return this===window;}catch(e){ return false;}\")")>]
    let internal isBrowser : unit -> bool = jsNative

    let insideBrowser = isBrowser()

    [<Emit("typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope")>]
    let internal insideWorker :  bool = jsNative

    [<Emit("$0[$1] = $2")>]
    let internal setProp o k v = jsNative

    type InternalMap =
        | MapEmpty
        | MapOne of string * Json
        | MapNode of string * Json * InternalMap * InternalMap

    let rec flattenMap = function
        | MapEmpty -> [ ]
        | MapOne (key, value) -> [ key, value ]
        | MapNode (key, value, left, right) ->
            [ yield! flattenMap left
              yield! flattenMap right
              yield  (key, value) ]

    let (|KeyValue|_|) key (map: Map<string, Json>) =
        map
        |> Map.tryFind key
        |> Option.map (fun value -> key, value, Map.remove key map)

    let (|NonArray|_|) = function
        | JArray _ -> None
        | json -> Some json

    let (|MapEmpty|_|) json =
        match json with
        | JString "MapEmpty" -> Some json
        | _ -> None

    let (|MapKey|_|) = function
        | JNumber number -> Some (string number)
        | JString key -> Some key
        | _ -> None

    let (|MapOne|_|) = function
        | JArray [ JString "MapOne"; MapKey key; value ] -> Some (key, value)
        | _ -> None

    let (|MapNode|_|) = function
        | JArray [ JString "MapNode"; MapKey key; value; left; right; JNumber _  ] ->
            Some (key, value, left, right)
        | _ -> None

    let rec generateMap json =
        match json with
        | MapEmpty _ -> Some InternalMap.MapEmpty
        | MapOne (key, value) -> Some (InternalMap.MapOne (key, value))
        | MapNode (key, value, left, right) ->
            match generateMap left, generateMap right with
            | Some leftMap, Some rightMap ->
                Some (InternalMap.MapNode(key, value, leftMap, rightMap))
            | _ -> None
        | _ -> None

    let arrayLike = function
        | TypeInfo.Array _ -> true
        | TypeInfo.List _ -> true
        | TypeInfo.Seq _ -> true
        | TypeInfo.Tuple _ -> true
        | _ -> false

    let isQuoted (input: string) =
        input.StartsWith "\"" && input.EndsWith "\""

    let removeQuotes (input: string) =
        input.Substring(1, input.Length - 2)

    let rec fromJsonAs (input: Json) (typeInfo: Fable.SimpleJson.TypeInfo) : obj =
        match input, typeInfo with
        | JNumber value, TypeInfo.Float -> unbox value
        | JNumber value, TypeInfo.Float32 -> unbox (float32 value)
        | JString value, TypeInfo.Float32 -> unbox (float32 value)
        // reading number as int -> floor it
        | JNumber value, TypeInfo.Int32 -> unbox (JS.Math.floor(value))
        | JBool value, TypeInfo.Bool -> unbox value
        // reading int from string -> parse it
        | JString value, TypeInfo.Int32 -> unbox (int value)
        | JString value, TypeInfo.String -> unbox value
        // decimals
        | JString value, TypeInfo.Decimal -> unbox (decimal value)
        | JNumber value, TypeInfo.Decimal -> unbox (decimal value)
        | JString value, TypeInfo.Short -> unbox (int16 value)
        | JNumber value, TypeInfo.Short -> unbox (int16 value)
        // Unsigned integers
        | JNumber value, TypeInfo.UInt16 -> unbox (uint16 value)
        | JString value, TypeInfo.UInt16 -> unbox (uint16 value)
        | JNumber value, TypeInfo.UInt32 -> unbox (uint32 value)
        | JString value, TypeInfo.UInt32 -> unbox (uint32 value)
        | JNumber value, TypeInfo.UInt64 -> unbox (uint64 value)
        | JString value, TypeInfo.UInt64 -> unbox (uint64 value)
        // byte[] coming from the server is serialized as base64 string
        // convert it back to the actual byte array
        | JString value, TypeInfo.Array getElemType ->
            let elemType = getElemType()
            match elemType with
            | TypeInfo.Byte ->
                if insideWorker || insideBrowser
                then unbox (Convert.FromBase64String value)
                else unbox (Node.bytesFromBase64 value)
            | otherType -> failwithf "Cannot convert arbitrary string '%s' to %A" value otherType

        // null values for strings are just the null string
        | JNull, TypeInfo.String -> unbox null
        | JNull, TypeInfo.Unit -> unbox ()
        // int64 as string -> parse it
        | JString value, TypeInfo.Long -> unbox (int64 value)
        | JString value, TypeInfo.Byte -> unbox (byte value)
        | JNumber value, TypeInfo.Byte -> unbox (byte value)
        // BigInt as string -> parse it
        | JString value, TypeInfo.BigInt -> unbox (BigInteger.Parse value)
        | JNumber value, TypeInfo.BigInt -> unbox (bigint (JS.Math.floor(value)))
        // parse formatted date time
        | JString value, TypeInfo.DateTime -> unbox (DateTime.Parse(value))
        // parse formatted date time offset
        | JString value, TypeInfo.DateTimeOffset -> unbox (DateTimeOffset.Parse(value))
        // deserialize union from objects
        // { "One": 20 } or {"One": [20]} -> One of int
        | JObject values, TypeInfo.Union (getTypes) ->
            let (cases, unionType) = getTypes()
            match Map.toList values with
            | [ caseName, JArray values ] ->
                cases
                |> Array.tryFind (fun case -> case.CaseName = caseName)
                |> function
                    | None ->
                        let caseNames = Array.map (fun case -> sprintf " '%s' " case.CaseName) cases
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName unionType.Name expectedCases
                    | Some foundCase when Array.length foundCase.CaseTypes = 1 && arrayLike foundCase.CaseTypes.[0] ->
                        let deserialized = fromJsonAs (JArray values) foundCase.CaseTypes.[0]
                        FSharpValue.MakeUnion(foundCase.Info, [| deserialized |])
                        |> unbox
                    | Some foundCase ->
                        if Array.length foundCase.CaseTypes = 1
                            && not (arrayLike foundCase.CaseTypes.[0])
                            && Array.length foundCase.CaseTypes <> List.length values
                        then failwithf "Expected case '%s' to have %d argument types but the JSON data only contained %d values" foundCase.CaseName (Array.length foundCase.CaseTypes) (List.length values)
                        let parsedValues =
                            Array.ofList values
                            |> Array.zip foundCase.CaseTypes
                            |> Array.map (fun (valueType, value) -> fromJsonAs value valueType)
                        FSharpValue.MakeUnion(foundCase.Info, parsedValues)
                        |> unbox
            | [ caseName, NonArray json ] ->
                cases
                |> Array.tryFind (fun case -> case.CaseName = caseName)
                |> function
                    | Some ({ CaseName = caseName; Info = caseInfo; CaseTypes = [| caseType |] }) ->
                        FSharpValue.MakeUnion(caseInfo, [| unbox fromJsonAs json caseType |])
                        |> unbox
                    | _ ->
                        let caseNames = Array.map (fun case -> sprintf " '%s' " case.CaseName) cases
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName unionType.Name expectedCases
            | otherwise ->
                // TODO!!! Better error messages here
                let unexpectedJson = JS.JSON.stringify otherwise
                let expectedType = JS.JSON.stringify cases
                failwithf "Expected JSON:\n%s\nto match the type\n%s" unexpectedJson expectedType
        | JNull, TypeInfo.Option _ -> unbox None
        | jsonValue, TypeInfo.Option optionalTypeDelayed when jsonValue <> JNull ->
            let optionalType = optionalTypeDelayed()
            let parsedOptional = unbox (fromJsonAs jsonValue optionalType)
            unbox Some parsedOptional
        | JString value, TypeInfo.Guid _ -> unbox (System.Guid.Parse(value))
        // int64 as a number, convert it to int then to in64
        | JNumber value , TypeInfo.Long _ -> unbox int64 (int value)
        // int64 as the internal representation from Long.js
        // then reconstruct it from the high/low (two integers) components
        | JObject dict, TypeInfo.Long _ ->
            let get key = Map.tryFind key dict
            [ get "low"; get "high"; get "unsigned" ]
            |> List.choose id
            |> function
                | [ JNumber low; JNumber high; JBool _ ] ->
                    let lowBytes = BitConverter.GetBytes(int low)
                    let highBytes = BitConverter.GetBytes(int high)
                    let combinedBytes = Array.concat [ lowBytes; highBytes ]
                    BitConverter.ToInt64(combinedBytes, 0)
                    |> unbox
                | _ -> failwithf "Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"
        // convert a single case string to union
        // "One" -> One, here is a special case where the case in quoted inside the string
        | JString caseName, TypeInfo.Union getTypes when isQuoted caseName ->
            let (caseTypes, unionType) = getTypes()
            caseTypes
            |> Array.tryFind (fun case -> case.CaseName = removeQuotes caseName)
            |> function
                | Some ({ Info = caseInfo }) -> unbox (FSharpValue.MakeUnion(caseInfo, [||]))
                | None ->
                    let caseNames = Array.map (fun case -> sprintf " '%s' " case.CaseName) caseTypes
                    let expectedCases = String.concat ", " caseNames
                    failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName unionType.Name expectedCases
        // convert a single case string to union
        // "One" -> One
        | JString caseName, TypeInfo.Union getTypes ->
            let (caseTypes, unionType) = getTypes()
            caseTypes
            |> Array.tryFind (fun case -> case.CaseName = caseName)
            |> function
                | Some ({ Info = caseInfo }) -> unbox (FSharpValue.MakeUnion(caseInfo, [||]))
                | None ->
                    let caseNames = Array.map (fun case -> sprintf " '%s' " case.CaseName) caseTypes
                    let expectedCases = String.concat ", " caseNames
                    failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName unionType.Name expectedCases
        | JString serializedRecord, TypeInfo.Record getFields ->
            fromJsonAs (SimpleJson.parse serializedRecord) typeInfo
        // convert unions from arrays
        // ["One", 20] -> One of int
        | JArray caseValue, TypeInfo.Union getTypes ->
            let (cases, unionType) = getTypes()
            match caseValue with
            // Union case without values
            | [ JString caseName ] ->
                cases
                |> Array.tryFind (fun case -> case.CaseName = caseName)
                |> function
                    | Some ({ CaseName = caseName; Info = caseInfo; CaseTypes = caseInfoTypes }) ->
                        // single case without values
                        unbox (FSharpValue.MakeUnion(caseInfo, [||]))
                    | None ->
                        let caseNames = Array.map (fun case -> sprintf " '%s' " case.CaseName) cases
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case '%s' was not valid for type '%s', expected one of the cases [%s]" caseName unionType.Name expectedCases
            | JString caseName :: values ->
                cases
                |> Array.tryFind (fun case -> case.CaseName = caseName)
                |> function
                    | None ->
                        let caseNames = Array.map (fun ({ CaseName = name }) -> name) cases
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case %s was not valid, expected one of [%s]" caseName expectedCases
                    | Some ({ CaseName = foundCaseName; Info = caseInfo; CaseTypes = types }) ->
                        if Array.length types <> List.length values
                        then failwithf "The number of union case parameters for '%s' is different" foundCaseName
                        let parsedValues =
                            Array.ofList values
                            |> Array.zip types
                            |> Array.map (fun (valueType, value) -> fromJsonAs value valueType)
                        FSharpValue.MakeUnion(caseInfo, parsedValues)
                        |> unbox
            | otherwise ->
                let unexpectedJson = JS.JSON.stringify otherwise
                let expectedType = JS.JSON.stringify cases
                failwithf "Expected JSON:\n%s\nto match the type\n%s" unexpectedJson expectedType
        // Arrays
        | JArray values, TypeInfo.Array elementTypeDelayed ->
            let elementType = elementTypeDelayed()
            values
            |> List.map (fun value -> unbox (fromJsonAs value elementType))
            |> Array.ofList
            |> unbox
        // Lists
        | JArray values, TypeInfo.List elementTypeDelayed ->
            let elementType = elementTypeDelayed()
            values
            |> List.map (fun value -> unbox (fromJsonAs value elementType))
            |> unbox
        | JArray values, TypeInfo.Set elementTypeDelayed ->
            let elementType = elementTypeDelayed()
            values
            |> List.map (fun value -> unbox (fromJsonAs value elementType))
            |> Set.ofList
            |> unbox

        | JArray values, TypeInfo.Seq elementTypeDelayed ->
            let elementType = elementTypeDelayed()
            let converted = List.map (fun value -> unbox (fromJsonAs value elementType)) values
            unbox converted
        // Tuples, become just arrays
        | JArray array, TypeInfo.Tuple tupleTypesDelayed ->
            let tupleTypes = tupleTypesDelayed()
            array
            |> Array.ofList
            |> Array.zip tupleTypes
            |> Array.map (fun (jsonType, jsonData) -> fromJsonAs jsonData jsonType)
            |> unbox
        // Records
        | JObject dict, TypeInfo.Record getTypes ->
            let fields, recordType = getTypes()
            // Match the JSON object literal keys with their types
            let recordValues =
                let values = Map.toList dict
                fields
                |> Array.map (fun ({ FieldName = fieldName; FieldType = fieldType }) ->
                    values
                    |> List.tryFind (fun (key, value) -> fieldName = key)
                    |> function
                        | Some (key, value) -> unbox (fromJsonAs value fieldType)
                        | None ->
                            match fieldType with
                            // field type is an option of something, just return None
                            | TypeInfo.Option _ -> unbox None
                            | _ ->
                              // field type is required and it doens't exist in the JSON
                              // then generate a nice error message
                              let dictKeys =
                                  Map.toList dict
                                  |> List.map (fst >> sprintf "'%s'")
                                  |> String.concat ", "
                                  |> sprintf "[ %s ]"
                              let recordFields =
                                  fields
                                  |> Array.map (fun ({ FieldName = name; FieldType = innerFieldType }) ->
                                      match innerFieldType with
                                      | TypeInfo.Option _ -> sprintf "optional('%s')" name
                                      | _ -> sprintf "required('%s')" name)
                                  |> String.concat ", "
                                  |> sprintf "[ %s ]"
                              failwithf "Could not find the required key '%s' in the JSON object literal with keys %s to match with record type '%s' that has fields %s" fieldName dictKeys recordType.Name recordFields)
            unbox (FSharpValue.MakeRecord(recordType, recordValues))

        | JArray tuples, TypeInfo.Map getTypes ->
            let (keyType, valueType) = getTypes()
            let pairs =
                [ for keyValuePair in tuples do
                    let tuple = fromJsonAs keyValuePair (TypeInfo.Tuple (fun () -> [| keyType; valueType |]))
                    yield tuple ]
            match keyType with
            | TypeInfo.Int32
            | TypeInfo.String
            | TypeInfo.Bool ->
                pairs
                |> unbox<(string * obj) list>
                |> Map.ofList
                |> unbox
            | _ ->
                pairs
                |> unbox<(IStructuralComparable * obj) list>
                |> Map.ofList
                |> unbox

        | JArray tuples, TypeInfo.Dictionary getTypes ->
            let (keyType, valueType) = getTypes()
            let pairs =
                [ for keyValuePair in tuples do
                    let tuple = fromJsonAs keyValuePair (TypeInfo.Tuple (fun () -> [| keyType; valueType |]))
                    yield tuple ]
            let output = System.Collections.Generic.Dictionary<IStructuralComparable, _>()
            for (key, value) in (unbox<(IStructuralComparable * obj) list> pairs) do output.Add(unbox key, value)
            output 
            |> unbox
                
        | JObject dict, TypeInfo.Dictionary getTypes ->
            let (keyType, valueType) = getTypes()
            dict 
            |> Map.toList
            |> List.map (fun (key, value) -> fromJsonAs (JString key) keyType, fromJsonAs value valueType ) 
            |> fun pairs -> 
                let output = System.Collections.Generic.Dictionary<IStructuralComparable, _>()
                for (key, value) in pairs do output.Add(unbox key, value)
                output
                |> unbox

        | JArray items, TypeInfo.HashSet getType -> 
            let elemType = getType()
            let hashset = HashSet<IStructuralComparable>()
            for item in items do
                let deserialized = fromJsonAs item elemType
                hashset.Add(unbox deserialized) |> ignore
            
            unbox hashset 

        | JObject map, TypeInfo.Map getTypes ->
            let (keyType, valueType) = getTypes()
            // check whether the map is serialized to it's internal representation
            // and convert that to back to a normal map from the data
            match Map.tryFind "comparer" map, Map.tryFind "tree" map with
            | Some (JObject comparer), Some (JArray tree) when Map.isEmpty comparer ->
                match generateMap (JArray tree) with
                | Some internalMap ->
                    let pairs =
                        flattenMap internalMap
                        |> List.map (fun (key, value) ->
                            let nextKey =
                                if not (isQuoted key)
                                then unbox (fromJsonAs (JString key) keyType)
                                else unbox (fromJsonAs (SimpleJson.parseNative key) keyType)
                            let nextValue = unbox (fromJsonAs value valueType)
                            unbox<obj> nextKey, nextValue)
                    match keyType with
                    | TypeInfo.Int32
                    | TypeInfo.String
                    | TypeInfo.Bool ->
                        pairs
                        |> unbox<(string * obj) list>
                        |> Map.ofList
                        |> unbox
                    | _ ->
                        pairs
                        |> unbox<(IStructuralComparable * obj) list>
                        |> Map.ofList
                        |> unbox

                | None ->
                    let inputJson = SimpleJson.toString (JArray tree)
                    failwithf "Could not generate map from JSON\n %s" inputJson
            | _ ->
                // if comparer and tree are not present,
                // assume we are parsing Fable 1 object literal
                // and converting that to map
                let pairs =
                    map
                    |> Map.toList
                    |> List.map (fun (key, value) ->
                        let nextKey =
                            if not (isQuoted key)
                            then
                                if Converter.isPrimitive keyType || Converter.enumUnion keyType
                                then
                                    // for primitive type, just read them as string and parse
                                    unbox (fromJsonAs (JString key) keyType)
                                else
                                    // server-side JSON can still be complex (for complex types)
                                    // but doesn't have to be quoted, parse again here
                                    unbox (fromJsonAs (SimpleJson.parseNative key) keyType)
                            else
                                unbox (fromJsonAs (SimpleJson.parseNative key) keyType)
                        let nextValue = unbox (fromJsonAs value valueType)
                        unbox<string> nextKey, nextValue)

                match keyType with
                | TypeInfo.Int32
                | TypeInfo.String
                | TypeInfo.Bool ->
                    pairs
                    |> unbox<(string * obj) list>
                    |> Map.ofList
                    |> unbox
                | _ ->
                    pairs
                    |> unbox<(IStructuralComparable * obj) list>
                    |> Map.ofList
                    |> unbox
        | _ ->
            failwithf "Cannot convert %s to %s" (SimpleJson.toString input) (JS.JSON.stringify typeInfo)

    let fromJson<'t> json typeInfo =
        unbox<'t> (fromJsonAs json typeInfo)

[<AutoOpenAttribute>]
module ConverterExtensions =
    type Json with
        static member stringify<'t> (x: 't) =
            SimpleJson.stringify x

        /// Parses the input string as JSON and tries to convert it as the given type argument
        static member parseAs<'t> (input: string, [<Inject>] ?resolver: ITypeResolver<'t>) : 't =
            match SimpleJson.tryParse input with
            | None -> failwith "Couldn't parse the input JSON string because it seems to be invalid"
            | Some inputJson ->
                let typeInfo = TypeInfo.createFrom<'t>(resolver.Value)
                Convert.fromJson<'t> inputJson typeInfo

        /// Parses the input string as JSON using native parsing and tries to convert it as the given type argument
        static member parseNativeAs<'t> (input: string, [<Inject>] ?resolver: ITypeResolver<'t>) : 't =
            let inputJson = SimpleJson.parseNative input
            let typeInfo = TypeInfo.createFrom<'t>(resolver.Value)
            Convert.fromJson<'t> inputJson typeInfo

        /// Tries to parse the input string as JSON and tries to convert it as the given type argument, returing a (hopefully) useful error message when it fails
        static member tryParseAs<'t> (input: string, [<Inject>] ?resolver: ITypeResolver<'t>) : Result<'t, string> =
            try Ok (Json.parseAs<'t>(input, resolver.Value))
            with | ex -> Error ex.Message

        /// Tries to parse the input string as JSON using native parsing and tries to convert it as the given type argument
        static member tryParseNativeAs<'t> (input: string, [<Inject>] ?resolver: ITypeResolver<'t>) : Result<'t, string> =
            try Ok (Json.parseNativeAs<'t>(input, resolver.Value))
            with | ex -> Error ex.Message

        /// Tries to convert parsed JSON object as the given type parameter argument, this method is used when you want to apply transformations to the JSON object before parsing
        static member convertFromJsonAs<'t> (input: Json, [<Inject>] ?resolver: ITypeResolver<'t>) : 't =
            let typeInfo = TypeInfo.createFrom<'t>(resolver.Value)
            Convert.fromJson<'t> input typeInfo

        /// Tries to convert parsed JSON object as the given type parameter argument, this method is used when you want to apply transformations to the JSON object before parsing
        static member trConvertFromJsonAs<'t> (input: Json, [<Inject>] ?resolver: ITypeResolver<'t>) : Result<'t, string> =
            try Ok (Json.convertFromJsonAs<'t>(input, resolver.Value))
            with | ex -> Error ex.Message
