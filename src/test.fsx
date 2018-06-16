open System

type Maybe<'t> = 
    | Just of 't 
    | Nothing 

type Types() = 
    static member get<'t>() = 
       typeof<'t>.FullName 


let typeInfo = Types.get<Maybe<Option<Maybe<int>>>>()

let rec getGenericArgs (typeDef: System.Type) : string list = 
    [ yield typeDef.Name
      for genericTypeArg in typeDef.GetGenericArguments() do 
        yield! getGenericArgs genericTypeArg ]


Types.get<unit>()