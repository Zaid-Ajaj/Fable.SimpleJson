namespace Fable.SimpleJson

open System
open FSharp.Reflection

/// A type that encodes type information which is easily serializable 
type TypeInfo = 
    | Unit 
    | String  
    | Int32 
    | Bool   
    | Float  
    | Long 
    | DateTime 
    | BigInt 
    | Guid 
    | Object of Type
    | Option of TypeInfo 
    | List of TypeInfo 
    | Set of TypeInfo 
    | Array of TypeInfo
    | Tuple of TypeInfo [ ] 
    | Map of key:TypeInfo * value:TypeInfo 
    | Func of TypeInfo [ ] 
    | Record of (string  * TypeInfo) [ ] * Type  
    | Union of (string * UnionCaseInfo *  TypeInfo [ ]) [ ] * Type