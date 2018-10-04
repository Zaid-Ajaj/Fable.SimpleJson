namespace Fable.SimpleJson

open System
open FSharp.Reflection
open Fable.Core
open System.Reflection

[<AutoOpen>]
module Converter =
    let (|PrimitiveType|_|) (primType: Type) =
        match primType.FullName with
        | "System.String" -> Some TypeInfo.String
        | "System.Int32" -> Some TypeInfo.Int32
        | "System.DateTime" -> Some TypeInfo.DateTime
        | "System.DateTimeOffset" -> Some TypeInfo.DateTimeOffset
        | "System.Boolean" -> Some  TypeInfo.Bool
        | "System.Double" -> Some TypeInfo.Float
        | "System.Decimal" -> Some TypeInfo.Decimal
        | "System.Int64" -> Some TypeInfo.Long
        | "System.Int16" -> Some TypeInfo.Short 
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
        if (t.FullName.EndsWith "[]")
        then t.GetElementType() |> Some
        else None

    let (|OptionType|_|) (t:Type) =
        if (t.FullName.StartsWith "Microsoft.FSharp.Core.FSharpOption`1")
        then t.GetGenericArguments().[0] |> Some
        else None

    let (|TupleType|_|) (t: Type) =
        if t.FullName.StartsWith "System.Tuple`"
        then FSharpType.GetTupleElements(t) |> Some
        else None

    let (|SeqType|_|) (t: Type) =
        if t.FullName.StartsWith "System.Collections.Generic.IEnumerable`1"
        then  t.GetGenericArguments().[0] |> Some
        else None

    let (|AsyncType|_|) (t:Type) =
        if t.FullName.StartsWith "Microsoft.FSharp.Control.FSharpAsync`1"
        then  t.GetGenericArguments().[0] |> Some
        else None

    let (|PromiseType|_|) (t:Type) =
        if t.FullName.StartsWith "Fable.Import.JS.Promise`1"
        then t.GetGenericArguments().[0] |> Some
        else None

    let rec createTypeInfo (resolvedType: Type) : Fable.SimpleJson.TypeInfo =
        match resolvedType with
        | PrimitiveType typeInfo -> typeInfo
        | FuncType (types) -> TypeInfo.Func (fun () -> Array.map createTypeInfo types)
        | TupleType types -> TypeInfo.Tuple (fun () -> Array.map createTypeInfo types)
        | RecordType fields -> TypeInfo.Record <| fun () ->
            let fields =
                [| for (fieldName, fieldType) in fields ->
                    { FieldName = fieldName;
                      FieldType = createTypeInfo fieldType } |]
            fields, resolvedType

        | UnionType cases -> TypeInfo.Union <| fun () ->
            [| for (caseName, caseInfo, caseTypes) in cases ->
                { CaseName = caseName;
                  Info = caseInfo;
                  CaseTypes = Array.map createTypeInfo caseTypes } |], resolvedType

        | ListType elemType -> TypeInfo.List (fun () -> createTypeInfo elemType)
        | ArrayType elemType -> TypeInfo.Array (fun () -> createTypeInfo elemType)
        | OptionType elemType -> TypeInfo.Option (fun () -> createTypeInfo elemType)
        | SetType elemType -> TypeInfo.Set (fun () -> createTypeInfo elemType)
        | MapType (keyType, valueType) -> TypeInfo.Map (fun () -> createTypeInfo keyType, createTypeInfo valueType)
        | SeqType elemType -> TypeInfo.Seq (fun () -> createTypeInfo elemType)
        | AsyncType elemType -> TypeInfo.Async (fun () -> createTypeInfo elemType)
        | PromiseType elemType -> TypeInfo.Promise (fun () -> createTypeInfo elemType)
        | _ -> TypeInfo.Any (fun () -> resolvedType)


    type Fable.SimpleJson.TypeInfo with
        static member createFrom<'t> ([<Inject>] ?resolver: ITypeResolver<'t>) : Fable.SimpleJson.TypeInfo =
            let resolvedType = resolver.Value.ResolveType()
            createTypeInfo resolvedType
