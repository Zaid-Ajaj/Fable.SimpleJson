namespace Fable.SimpleJson

open Fable.Core
open Fable.Parsimmon
open Parser
open Fable.Import

module SimpleJson = 
    /// Tries to parse a string into a Json structured JSON data.
    let tryParse (input: string) : Option<Json> = 
        Parsimmon.parse input jsonParser

    /// Parses the input string into a structured JSON data. Fails with an exception if parsing fails. 
    let parse (input: string) : Json = 
        match tryParse input with
        | Some result -> result
        | None -> failwithf "Could not parse the JSON input: %s" input

    /// Stringifies a Json object back to string representation
    let rec toString = function
        | JNull -> "null"
        | JBool true -> "true"
        | JBool false -> "false"
        | JNumber number -> string number
        | JString text -> sprintf "\"%s\"" text
        | JArray elements -> 
            elements
            |> List.map toString
            |> String.concat ","
            |> sprintf "[%s]"
        | JObject map -> 
            map 
            |> Map.toList
            |> List.map (fun (key,value) -> sprintf "\"%s\":%s" key (toString value))
            |> String.concat ","
            |> sprintf "{%s}"

    let stringify (value: 'a) : string =
        JS.JSON.stringify(value, (fun _ v ->
            match v with
            | :? string -> v
            | :? System.Collections.IEnumerable ->
                if JS.Array.isArray(v)
                then v
                else JS.Array.from(v :?> JS.Iterable<obj>) |> box
            | _ -> v
        ), 0)

    [<Emit("$1[$0]")>]
    let internal get<'a> (key: string) (x: obj) : 'a = jsNative

    let rec internal parseNative' (x: obj) = 
        match x with  
        | TypeCheck.NativeString str -> JString str 
        | TypeCheck.NativeNumber number -> JNumber number 
        | TypeCheck.NativeBool value -> JBool value  
        | TypeCheck.Null _ -> JNull
        | TypeCheck.NativeArray arr -> JArray (List.ofArray (Array.map parseNative' arr))
        | TypeCheck.NativeObject object -> 
            [ for key in JS.Object.keys object -> key, parseNative' (get<obj> key object)  ]
            |> Map.ofList
            |> JObject
        | _ -> JNull
            
    /// Parses and converts the input string to Json using Javascript's native parsing capabilities
    let parseNative (input: string) = 
        let parsed = JS.JSON.parse input 
        parseNative' parsed 

    let tryParseNative (input: string) = 
        try Some (parseNative input)
        with | ex -> None

    /// Tries to convert an object literal to the Json by calling JSON.stringify on the object first
    let fromObjectLiteral (x: 'a) = 
        try Some (parseNative' x)
        with | _ -> None

    /// Transforms all keys of the objects within the Json structure
    let rec mapKeys f = function
        | JObject dictionary ->
            dictionary
            |> Map.toList
            |> List.map (fun (key, value) -> f key, mapKeys f value)
            |> Map.ofList
            |> JObject
        | JArray values ->
            values
            |> List.map (mapKeys f)
            |> JArray
        | otherJsonValue -> otherJsonValue
    
    /// Transforms object values recursively using function `f` that takes the key and value of the object and returns a new value 
    let rec mapbyKey f = function 
        | JObject dictionary ->
            dictionary
            |> Map.toList
            |> List.map (fun (key, value) -> key, f key value) 
            |> Map.ofList 
            |> JObject 
        | JArray values -> 
            values
            |> List.map (mapbyKey f) 
            |> JArray 
        | otherJsonValue -> otherJsonValue
            
    /// Transforms keys of object selectively by path segments
    let mapKeysByPath f json =
        let rec mapKey xs = function
            | JObject dictionary ->
                dictionary
                |> Map.toList
                |> List.map (fun (key, value) ->
                    let keyPath = List.concat [xs; [key]]
                    match f keyPath with
                    | Some nextKey -> nextKey, mapKey keyPath value
                    | None -> key, mapKey keyPath value)
                |> Map.ofList
                |> JObject
            | JArray values ->
                values
                |> List.map (mapKey xs)
                |> JArray
            | otherJsonValue -> otherJsonValue
        mapKey [] json

    let rec readPath (keys: string list) (input: Json) =
        match keys, input with 
        | [ ], _ -> None 
        | [ key ], JObject dict -> Map.tryFind key dict 
        | firstKey :: rest, JObject dict -> 
            match Map.tryFind firstKey dict with 
            | Some (JObject nextDict) -> readPath rest (JObject nextDict) 
            | _ -> None 
        | _ -> None