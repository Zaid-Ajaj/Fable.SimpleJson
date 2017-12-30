namespace Fable.SimpleJson

open Fable.Parsimmon
open Parser
open AST

module SimpleJson = 
    /// Tries to parse a string into a Json structure
    let tryParse (input: string) : Option<Json> = 
        Parsimmon.parse input jsonParser