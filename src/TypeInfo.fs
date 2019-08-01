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
    | UInt16
    | UInt32
    | UInt64
    | Int32
    | Bool
    | Float32
    | Float
    | Decimal
    | Short
    | Long
    | Byte
    | DateTime
    | DateTimeOffset
    | BigInt
    | TimeSpan
    | Guid
    | Any of Lazy<Type>
    | Async of Lazy<TypeInfo>
    | Promise of Lazy<TypeInfo>
    | Option of Lazy<TypeInfo>
    | List of Lazy<TypeInfo>
    | Set of Lazy<TypeInfo>
    | Array of Lazy<TypeInfo>
    | Seq of Lazy<TypeInfo>
    | Tuple of Lazy<TypeInfo [ ]>
    | Map of Lazy<TypeInfo * TypeInfo>
    | Dictionary of Lazy<TypeInfo * TypeInfo>
    | ResizeArray of Lazy<TypeInfo>
    | HashSet of Lazy<TypeInfo>
    | Func of Lazy<TypeInfo [ ]>
    | Record of Lazy<RecordField [ ] * Type>
    | Union of Lazy<UnionCase [ ] * Type>
