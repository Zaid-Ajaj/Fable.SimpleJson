namespace Fable.SimpleJson

open System
open Fable.Core
open Fable.Core.JsInterop
open FSharp.Reflection

module Convert = 

    [<Emit("$0[$1] = $2")>]
    let internal setProp o k v = jsNative
    let log x = Fable.Import.JS.console.log(x)

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

    let makeTuple (a: Type, b: Type) : Type = 
        let lit = obj()
        lit?fullname <- "System.Tuple`2"
        lit?generics <- (fun () -> [| a; b |])
        lit?cases <- (fun () -> [| |])
        lit?fields <- (fun () -> [|  |])
        unbox lit 

    let rec fromJsonAs (input: Json) (typeInfo: Type) : obj = 
        match input, typeInfo with  
        | JNumber value, TypeName "System.Double" -> unbox value  
        // reading number as int -> floor it
        | JNumber value, TypeName "System.Int32" -> unbox (Fable.Import.JS.Math.floor(value))
        | JBool value, TypeName "System.Boolean" -> unbox value 
        // reading int from string -> parse it
        | JString value, TypeName "System.Int32" -> unbox (int value)
        | JString value, TypeName "System.String" -> unbox value 
        // null values for strings are just the null string 
        | JNull, TypeName "System.String" -> unbox null
        // int64 as string -> parse it
        | JString value, TypeName "System.Int64" -> unbox (int64 value) 
        | JString value, TypeName "System.Byte" -> unbox (byte value)
        | JNumber value, TypeName "System.Byte" -> unbox (byte value)
        // BigInt as string -> parse it
        | JString value, TypeName "System.Numerics.BigInteger" -> unbox (bigint.Parse value)
        | JNumber value, TypeName "System.Numerics.BigInteger" -> unbox (bigint (Fable.Import.JS.Math.floor(value))) 
        // parse formatted date time
        | JString value, TypeName "System.DateTime" -> unbox (DateTime.Parse(value))
        // deserialize union from objects
        // { "One": 20 } or {"One": [20]} -> One of int 
        | JObject values, UnionType (cases) -> 
            match Map.toList values with 
            | [ caseName, JArray values ] -> 
                cases
                |> Array.tryFind (fun (case, _,_) -> case = caseName)  
                |> function 
                    | None ->
                        let caseNames = Array.map (fun (name, _, _) -> sprintf " '%s' " name) cases 
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName typeInfo.Name expectedCases 
                    | Some (foundCaseName, caseInfo, types) -> 
                        if Array.length types <> List.length values 
                        then failwithf "Expected case '%s' to have %d argument types but the JSON data only contained %d values" foundCaseName (Array.length types) (List.length values) 
                        let parsedValues = 
                            Array.ofList values
                            |> Array.zip types 
                            |> Array.map (fun (valueType, value) -> fromJsonAs value valueType)  
                        FSharpValue.MakeUnion(caseInfo, parsedValues)
                        |> unbox
            | [ caseName, NonArray json ] -> 
                cases 
                |> Array.tryFind (fun (case,_,_) -> case = caseName) 
                |> function 
                    | Some (caseName, caseInfo, [| caseType |]) -> 
                        FSharpValue.MakeUnion(caseInfo, [| unbox fromJsonAs json caseType |])
                        |> unbox
                    | _ ->
                        let caseNames = Array.map (fun (name, _, _) -> sprintf " '%s' " name) cases 
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName typeInfo.Name expectedCases 
            | otherwise -> 
                // TODO!!! Better error messages here
                let unexpectedJson = Fable.Import.JS.JSON.stringify otherwise 
                let expectedType = Fable.Import.JS.JSON.stringify cases 
                failwithf "Expected JSON:\n%s\nto match the type\n%s" unexpectedJson expectedType
        | JNull, OptionType _ -> unbox None  
        | jsonValue, OptionType optionalType when jsonValue <> JNull ->
            let parsedOptional = unbox fromJsonAs jsonValue optionalType
            unbox Some parsedOptional
        | JString value, TypeName "System.Guid" -> unbox (System.Guid.Parse(value))
        // int64 as a number, convert it to int then to in64
        | JNumber value , TypeName "System.Int64" -> unbox int64 (int value) 
        // int64 as the internal representation from Long.js
        // then reconstruct it from the high/low (two integers) components 
        | JObject dict, TypeName "System.Int64" -> 
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
        // "One" -> One
        | JString caseName, UnionType (caseTypes) -> 
            caseTypes
            |> Array.tryFind (fun (case, _, _) -> case = caseName)  
            |> function 
                | Some (_, caseInfo, _) -> unbox (FSharpValue.MakeUnion(caseInfo, [||]))
                | None -> 
                    let caseNames = Array.map (fun (name, _, _) -> sprintf " '%s' " name) caseTypes 
                    let expectedCases = String.concat ", " caseNames
                    failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName typeInfo.Name expectedCases 
        // convert unions from arrays
        // ["One", 20] -> One of int
        | JArray caseValue, UnionType (cases) ->
            match caseValue with 
            // Union case without values
            | [ JString caseName ] ->  
                cases
                |> Array.tryFind (fun (case, _, _) -> case = caseName)  
                |> function 
                    | Some (caseName, caseInfo, caseTypes) -> 
                        // single case without values
                        unbox (FSharpValue.MakeUnion(caseInfo, [||]))
                    | None -> 
                        let caseNames = Array.map (fun (name, _, _) -> sprintf " '%s' " name) cases 
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case %s was not valid for type '%s', expected one of the cases [%s]" caseName typeInfo.Name expectedCases
            | JString caseName :: values -> 
                cases
                |> Array.tryFind (fun (case, _, _) -> case = caseName)  
                |> function 
                    | None ->
                        let caseNames = Array.map (fun (name,_,_) -> name) cases
                        let expectedCases = String.concat ", " caseNames
                        failwithf "Case %s was not valid, expected one of [%s]" caseName expectedCases 
                    | Some (foundCaseName, caseInfo, types) -> 
                        if Array.length types <> List.length values 
                        then failwithf "The number of union case parameters for '%s' is different: found %d value(s) with %d type(s)\nValues:\n %s" foundCaseName (List.length values) (Array.length types) (Fable.Import.JS.JSON.stringify values)
                        let parsedValues = 
                            Array.ofList values
                            |> Array.zip types 
                            |> Array.map (fun (valueType, value) -> fromJsonAs value valueType)  
                        FSharpValue.MakeUnion(caseInfo, parsedValues) 
                        |> unbox
            | otherwise -> 
                let unexpectedJson = Fable.Import.JS.JSON.stringify otherwise 
                let expectedType = Fable.Import.JS.JSON.stringify cases 
                failwithf "Expected JSON:\n%s\nto match the type\n%s" unexpectedJson expectedType
        // Arrays
        | JArray values, ArrayType elementType -> 
            values 
            |> List.map (fun value -> log value; unbox (fromJsonAs value elementType))
            |> Array.ofList 
            |> unbox 
        // Lists  
        | JArray values, ListType elementType -> 
            values 
            |> List.map (fun value -> unbox (fromJsonAs value elementType))
            |> unbox
        | JArray values, SetType elementType ->
            values 
            |> List.map (fun value -> unbox (fromJsonAs value elementType))
            |> Set.ofList
            |> unbox

        | JArray values, SeqType elementType ->
            let converted = List.map (fun value -> unbox (fromJsonAs value elementType)) values
            unbox converted
        // Tuples, become just arrays
        | JArray array, TupleType tupleTypes -> 
            array
            |> Array.ofList
            |> Array.zip tupleTypes 
            |> Array.map (fun (jsonType, jsonData) -> fromJsonAs jsonData jsonType)
            |> unbox
        // Records
        | JObject dict, RecordType fields -> 
            // Match the JSON object literal keys with their types
            let recordValues =   
                let values = Map.toList dict
                fields
                |> Array.map (fun (fieldName, fieldType) -> 
                    values 
                    |> List.tryFind (fun (key, value) -> fieldName = key)
                    |> function 
                        | Some (key, value) -> unbox (fromJsonAs value fieldType) 
                        | None -> 
                            match fieldType with  
                            // field type is an option of something, just return None
                            | OptionType _ -> unbox None 
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
                                  |> Array.map (fun (name, innerFieldType) -> 
                                      match innerFieldType with  
                                      | OptionType _ -> sprintf "optional('%s')" name
                                      | _ -> sprintf "required('%s')" name)  
                                  |> String.concat ", "
                                  |> sprintf "[ %s ]"
                              failwithf "Could not find the required key '%s' in the JSON object literal with keys %s to match with record type '%s' that has fields %s" fieldName dictKeys typeInfo.Name recordFields)
            
            unbox (FSharpValue.MakeRecord(typeInfo, recordValues))
        
        | JArray tuples, MapType (keyType, valueType) -> 
            [ for keyValuePair in tuples do 
                let tuple = fromJsonAs keyValuePair (makeTuple(keyType, valueType))
                yield tuple ]
            |> unbox<(string * obj) list> 
            |> Map.ofList 
            |> unbox 
                
        | JObject map, MapType (keyType, valueType) -> 
            // check whether the map is serialized to it's internal representation
            // and convert that to back to a normal map from the data
            match Map.tryFind "comparer" map, Map.tryFind "tree" map with 
            | Some (JObject comparer), Some (JArray tree) when Map.isEmpty comparer ->  
                match generateMap (JArray tree) with 
                | Some internalMap -> 
                    flattenMap internalMap
                    |> List.map (fun (key, value) -> 
                        let nextKey = unbox (fromJsonAs (JString key) keyType)
                        let nextValue = unbox (fromJsonAs value valueType)
                        unbox<string> nextKey, nextValue)
                    |> Map.ofList 
                    |> unbox   
                | None -> 
                    let inputJson = SimpleJson.toString (JArray tree)
                    failwithf "Could not generate map from JSON\n %s" inputJson              
            | _ -> 
                // if comparer and tree are not present, 
                // assume we are parsing Fable 1 object literal 
                // and converting that to map
                map 
                |> Map.toList
                |> List.map (fun (key, value) -> 
                    let nextKey = unbox (fromJsonAs (JString key) keyType)
                    let nextValue = unbox (fromJsonAs value valueType)
                    unbox<string> nextKey, nextValue)
                |> Map.ofList 
                |> unbox 
        | _ ->
            unbox (obj()) 

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
                let typeInfo = resolver.Value.ResolveType()
                Convert.fromJson<'t> inputJson typeInfo 

        /// Parses the input string as JSON using native parsing and tries to convert it as the given type argument
        static member parseNativeAs<'t> (input: string, [<Inject>] ?resolver: ITypeResolver<'t>) : 't = 
            let inputJson = SimpleJson.parseNative input 
            let typeInfo = resolver.Value.ResolveType()
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
            let typeInfo = resolver.Value.ResolveType()
            Convert.fromJson<'t> input typeInfo 

        /// Tries to convert parsed JSON object as the given type parameter argument, this method is used when you want to apply transformations to the JSON object before parsing
        static member trConvertFromJsonAs<'t> (input: Json, [<Inject>] ?resolver: ITypeResolver<'t>) : Result<'t, string> = 
            try Ok (Json.convertFromJsonAs<'t>(input, resolver.Value))
            with | ex -> Error ex.Message 