namespace Fable.SimpleJson

open Fable.Core
open Fable.Parsimmon
open Parser
open AST


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

    [<Emit("(x => x === undefined ? null : x)(JSON.stringify($0))")>]
    let private stringify (x: 'a) : string = jsNative

    /// Tries to convert an object literal to the Json by calling JSON.stringify on the object first
    let fromObjectLiteral (x: 'a) = 
        try tryParse (stringify x)
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

    /// Transforms keys of object selectively by path segments
    let mapKeysByPath f json =
        let rec mapKey xs = function
            | JObject dictionary ->
                dictionary
                |> Map.toList
                |> List.map (fun (key, value) ->
                    let keyPath = xs @ [key]
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