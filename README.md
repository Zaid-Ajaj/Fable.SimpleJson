# Fable.SimpleJson [![Nuget](https://img.shields.io/nuget/v/Fable.SimpleJson.svg?colorB=green)](https://www.nuget.org/packages/Fable.SimpleJson)   [![Build Status](https://travis-ci.org/Zaid-Ajaj/Fable.SimpleJson.svg?branch=master)](https://travis-ci.org/Zaid-Ajaj/Fable.SimpleJson)

A simple library for parsing json strings into structured json data. It is written using parser combinators from [Fable.Parsimmon](https://github.com/Zaid-Ajaj/Fable.Parsimmon)


Template Used to build the library: [fable-library-template](https://github.com/Zaid-Ajaj/fable-library-template)

### Installation
Install from nuget using paket
```sh
paket add nuget Fable.SimpleJson --project path/to/YourProject.fsproj 
```
Make sure the references are added to your paket files
```sh
# paket.dependencies (solution-wide dependencies)
nuget Fable.SimpleJson

# paket.refernces (project-specific dependencies)
Fable.SimpleJson
```

### Using the library

The whole API is the following:
```fs
SimpleJson.tryParse : string -> Option<Json>
SimpleJson.parse : string -> Json
SimpleJson.toString : Json -> string
SimpleJson.fromObjectLiteral : 'a -> Option<Json>
```

The AST looks like this:
```fs
type Json = 
    | JNumber of float
    | JString of string
    | JBool of bool
    | JNull
    | JArray of Json list
    | JObject of Map<string, Json>
```

### Deserialization example
Suppose you have the record of `Person`:
```fs
type Person = { Name: string; Age: int }
```
And you want to deserialize this string:
```
"{ \"name\":\"john\", \"age\":20 }"
```
Then you can write:
```fs
open Fable.SimpleJson

"{ \"name\":\"john\", \"age\":20 }"
|> SimpleJson.tryParse
|> function
    | Some (JObject dict) ->
        let value key = Map.tryFind key dict
        [value "name"; value "age"]
        |> List.choose id
        |> function
            | [JString name; JNumber age]  -> 
                Some { Name = name; Age = int age }
            | otherwise -> None
    | None -> None
```
### Serialization example
Now, to serialize a typed entity into a json string, you build the json structure by hand and call `SimpleJson.toString` like the following:

```fs
let person = { Name = "John"; Age = 34 }

let serialized = 
    [ "name", JString person.Name
      "age", JNumber (float person.Age) ]
    |> Map.ofList
    |> JObject
    |> SimpleJson.toString
```

### Building and running tests
Requirements

 - Dotnet 2.0
 - Mono
 - Node


Running the watching the tests live 
```sh
bash build.sh RunLiveTests 
```
Building the tests and running QUnut cli runner
```sh
bash build.sh RunTests
```
or just `Ctrl + Shift + B` to run the cli tests as a VS Code task