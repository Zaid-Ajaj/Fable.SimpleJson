namespace Fable.SimpleJson

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