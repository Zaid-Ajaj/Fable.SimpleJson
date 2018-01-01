namespace Fable.SimpleJson

[<AutoOpen>]
module AST = 

    /// A type representing Javascript object notation
    type Json = 
        | JNumber of float
        | JString of string
        | JBool of bool
        | JNull
        | JArray of Json list
        | JObject of Map<string, Json>