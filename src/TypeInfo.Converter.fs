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
        | "System.Boolean" -> Some  TypeInfo.Bool
        | "System.Double" -> Some TypeInfo.Float
        | "System.Int64" -> Some TypeInfo.Long 
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
    
    let rec createTypeInfo (resolvedType: Type) : Fable.SimpleJson.TypeInfo = 
        match resolvedType with  
        | PrimitiveType typeInfo -> typeInfo   
        | FuncType (types) -> TypeInfo.Func (Array.map createTypeInfo types)
        | TupleType types -> TypeInfo.Tuple (Array.map createTypeInfo types)
        | RecordType fields -> 
            [| for (fieldName, fieldType) in fields -> fieldName, createTypeInfo fieldType |]
            |> fun generatedFields -> TypeInfo.Record (generatedFields, resolvedType)
        | UnionType cases -> 
            [| for (caseName, caseInfo, caseTypes) in cases -> caseName, caseInfo, Array.map createTypeInfo caseTypes |]
            |> fun generatedCases -> TypeInfo.Union (generatedCases, resolvedType)
        | ListType elemType -> TypeInfo.List (createTypeInfo elemType) 
        | ArrayType elemType -> TypeInfo.Array (createTypeInfo elemType)
        | OptionType elemType -> TypeInfo.Option (createTypeInfo elemType)
        | SetType elemType -> TypeInfo.Set (createTypeInfo elemType)
        | MapType (keyType, valueType) -> TypeInfo.Map (createTypeInfo keyType, createTypeInfo valueType)
        | _ -> TypeInfo.Object resolvedType


    type Fable.SimpleJson.TypeInfo with  
        static member createFrom<'t> ([<Inject>] ?resolver: ITypeResolver<'t>) : Fable.SimpleJson.TypeInfo = 
            let resolvedType = resolver.Value.ResolveType()
            createTypeInfo resolvedType 