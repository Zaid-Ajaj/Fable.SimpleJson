namespace Fable.SimpleJson

open System
open FSharp.Reflection

type RecordField = {
    FieldName: string 
    FieldType: TypeInfo
}

and UnionCase = { 
    CaseName: string 
    CaseTypes: TypeInfo [ ] 
    Info: UnionCaseInfo
}

/// A type that encodes type information which is easily serializable 
and TypeInfo = 
    | Unit 
    | String  
    | Int32 
    | Bool   
    | Float  
    | Long 
    | Byte
    | DateTime 
    | BigInt 
    | Guid 
    | Object of (unit -> Type)
    | Option of (unit -> TypeInfo) 
    | List of (unit -> TypeInfo)  
    | Set of (unit -> TypeInfo)  
    | Array of (unit -> TypeInfo) 
    | Seq of (unit -> TypeInfo)  
    | Tuple of (unit -> TypeInfo [ ]) 
    | Map of (unit -> TypeInfo * TypeInfo) 
    | Func of (unit -> TypeInfo [ ]) 
    | Record of (unit -> RecordField [ ] * Type)  
    | Union of (unit -> UnionCase [ ] * Type)