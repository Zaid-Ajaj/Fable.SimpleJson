namespace Fable.SimpleJson

open System
open FSharp.Reflection
open Fable.Core
open System.Reflection
open System.Collections.Generic

[<AutoOpen>]
module Converter =
    let (|PrimitiveType|_|) (primType: Type) =
        match primType.FullName with
        | "System.String" -> Some TypeInfo.String
        | "System.Int16" -> Some TypeInfo.Short
        | "System.Int32" -> Some TypeInfo.Int32
        | "System.Int64" -> Some TypeInfo.Long
        | "System.UInt16" -> Some TypeInfo.UInt16
        | "System.UInt32" -> Some TypeInfo.UInt32
        | "System.UInt64" -> Some TypeInfo.UInt64
        | "System.DateTime" -> Some TypeInfo.DateTime
        | "System.TimeSpan" -> Some TypeInfo.TimeSpan
        | "System.DateTimeOffset" -> Some TypeInfo.DateTimeOffset
        | "System.Boolean" -> Some  TypeInfo.Bool
        | "System.Single" -> Some TypeInfo.Float32
        | "System.Double" -> Some TypeInfo.Float
        | "System.Decimal" -> Some TypeInfo.Decimal
        | "System.Numerics.BigInteger" -> Some TypeInfo.BigInt
        | "Microsoft.FSharp.Core.Unit" -> Some TypeInfo.Unit
        | "System.Guid" -> Some TypeInfo.Guid
        | "System.Byte" -> Some TypeInfo.Byte
        | _ -> None

    let (|RecordType|_|) (t: Type) =
        if FSharpType.IsRecord t
        then
            FSharpType.GetRecordFields t
            |> Array.map (fun prop -> prop.Name, prop.PropertyType)
            |> Some
        else None

    let (|SetType|_|) (t: Type) =
        if t.FullName.StartsWith "Microsoft.FSharp.Collections.FSharpSet`1"
        then t.GetGenericArguments().[0] |> Some
        else None

    let (|UnionType|_|) (t: Type) =
        if FSharpType.IsUnion t
        then
            FSharpType.GetUnionCases t
            |> Array.map (fun info ->
                let caseName = info.Name
                let caseTypes = info.GetFields() |> Array.map (fun prop -> prop.PropertyType)
                caseName, info, caseTypes)
            |> Some
        else None

    let (|MapType|_|) (t: Type) =
        if (t.FullName.StartsWith "Microsoft.FSharp.Collections.FSharpMap`2")
        then
            let genArgs = t.GetGenericArguments()
            Some (genArgs.[0], genArgs.[1])
        else None

    let (|ListType|_|) (t: Type) =
        if (t.FullName.StartsWith "Microsoft.FSharp.Collections.FSharpList`1")
        then t.GetGenericArguments().[0] |> Some
        else None

    let rec flattenFuncTypes (typeDef: Type) =
        [| if FSharpType.IsFunction typeDef
           then let (domain, range) = FSharpType.GetFunctionElements typeDef
                yield! flattenFuncTypes domain
                yield! flattenFuncTypes range
           else yield typeDef |]

    let (|FuncType|_|) (t: Type) =
        if FSharpType.IsFunction t
        then flattenFuncTypes t |> Some
        else None

    let (|ArrayType|_|) (t:Type) =
        if t.IsArray
        then t.GetElementType() |> Some
        else None

    let (|OptionType|_|) (t:Type) =
        if (t.FullName.StartsWith "Microsoft.FSharp.Core.FSharpOption`1")
        then t.GetGenericArguments().[0] |> Some
        else None

    let (|TupleType|_|) (t: Type) =
        if FSharpType.IsTuple t
        then FSharpType.GetTupleElements(t) |> Some
        else None

    let (|SeqType|_|) (t: Type) =
        if t.FullName.StartsWith "System.Collections.Generic.IEnumerable`1"
        then  t.GetGenericArguments().[0] |> Some
        else None

    let (|DictionaryType|_|) (t: Type) =
        if t.FullName.StartsWith "System.Collections.Generic.Dictionary"
        then
          let genArgs = t.GetGenericArguments()
          Some (genArgs.[0], genArgs.[1])
        else
          None

    let (|ResizeArrayType|_|) (t: Type) =
        if t.FullName.StartsWith "System.Collections.Generic.List"
        then t.GetGenericArguments().[0] |> Some
        else None

    let (|HashSetType|_|) (t: Type) =
        if t.FullName.StartsWith "System.Collections.Generic.HashSet"
        then t.GetGenericArguments().[0] |> Some
        else None

    let (|AsyncType|_|) (t:Type) =
        if t.FullName.StartsWith "Microsoft.FSharp.Control.FSharpAsync`1"
        then  t.GetGenericArguments().[0] |> Some
        else None

    let (|PromiseType|_|) (t:Type) =
        if t.FullName.StartsWith "Fable.Core.JS.Promise`1"
        then t.GetGenericArguments().[0] |> Some
        else None

    let rec _createTypeInfo (resolvedType: Type) : Fable.SimpleJson.TypeInfo =
        match resolvedType with
        | PrimitiveType typeInfo -> typeInfo
        | FuncType (types) -> TypeInfo.Func (lazy (Array.map createTypeInfo types))
        | RecordType fields ->
          TypeInfo.Record <| lazy (
            let fields =
                [| for (fieldName, fieldType) in fields ->
                    { FieldName = fieldName;
                      FieldType = createTypeInfo fieldType } |]
            fields, resolvedType)

        | UnionType cases ->
          TypeInfo.Union <| lazy (
            [| for (caseName, caseInfo, caseTypes) in cases ->
                { CaseName = caseName;
                  Info = caseInfo;
                  CaseTypes = Array.map createTypeInfo caseTypes } |], resolvedType)

        | ListType elemType -> TypeInfo.List (lazy (createTypeInfo elemType))
        | ResizeArrayType elemType -> TypeInfo.ResizeArray (lazy (createTypeInfo elemType))
        | HashSetType elemType -> TypeInfo.HashSet (lazy (createTypeInfo elemType))
        | ArrayType elemType -> TypeInfo.Array (lazy (createTypeInfo elemType))
        // Checking for tuples has to happen after checking for arrays
        | TupleType types -> TypeInfo.Tuple (lazy (Array.map createTypeInfo types))
        | OptionType elemType -> TypeInfo.Option (lazy (createTypeInfo elemType))
        | SetType elemType -> TypeInfo.Set (lazy (createTypeInfo elemType))
        | MapType (keyType, valueType) -> TypeInfo.Map (lazy (createTypeInfo keyType, createTypeInfo valueType))
        | DictionaryType (keyType, valueType) -> TypeInfo.Dictionary (lazy (createTypeInfo keyType, createTypeInfo valueType))
        | SeqType elemType -> TypeInfo.Seq (lazy (createTypeInfo elemType))
        | AsyncType elemType -> TypeInfo.Async (lazy (createTypeInfo elemType))
        | PromiseType elemType -> TypeInfo.Promise (lazy (createTypeInfo elemType))
        | _ -> TypeInfo.Any (lazy (resolvedType))

    and typeInfoCache = Dictionary<string,Fable.SimpleJson.TypeInfo>()

    and createTypeInfo (resolvedType: Type) : Fable.SimpleJson.TypeInfo =
        match typeInfoCache.TryGetValue resolvedType.FullName with
        | true, ti -> ti
        | false, _ ->
            let ti = _createTypeInfo resolvedType
            typeInfoCache.[resolvedType.FullName] <- ti
            ti

    type Fable.SimpleJson.TypeInfo with
        static member createFrom<'t> ([<Inject>] ?resolver: ITypeResolver<'t>) : Fable.SimpleJson.TypeInfo =
            let resolvedType = resolver.Value.ResolveType()
            createTypeInfo resolvedType

    /// returns whether a type is primitive
    let isPrimitive = function
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
        | Guid
        | Option _ -> true
        | otherwise -> false

    /// returns whether the discrimiated union type is like a enum
    let enumUnion = function
        | TypeInfo.Union getCases ->
            getCases.Value
            |> fst
            |> Array.forall (fun case -> Array.isEmpty case.CaseTypes)
        | otherwise -> false
