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
You basically just call `SimpleJson.tryParse` and pattern match on the resulting Json. 

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
Here are examples from the test project:
```fs
open Fable.SimpleJson


testCase "Json parser works" <| fun test ->
    " { \"customerId\": 1, \"customerName\": \"John\", \"jobs\":[1,true,null]}"
    |> SimpleJson.tryParse
    |> function
        | Some (JObject map) ->
            match Map.toList map with
            | [ "customerId", JNumber 1.0 
                "customerName", JString "John"
                "jobs", JArray [JNumber 1.0; JBool true; JNull]] -> test.pass()
                    
            | otherResult -> test.unexpected otherResult
                
        | otherResult -> test.unexpected otherResult 
    
testCase "Json parser works with empty nested objects" <| fun test ->
    "{\"child\":{}}"
    |> SimpleJson.tryParse
    |> function 
        | Some (JObject (map)) -> 
            match Map.toList map with
            | ["child", JObject nested] when Map.isEmpty nested -> test.pass()
            | otherResult -> test.unexpected otherResult
        | otherResult -> test.unexpected otherResult


testCase "Json parser works with non-empty nested objects" <| fun test ->
    "{\"nested\":{\"name\":1}}"
    |> SimpleJson.tryParse
    |> function 
        | Some (JObject (map)) -> 
            match Map.toList map with
            | ["nested", JObject nested] -> 
                match Map.toList nested with
                | ["name", JNumber 1.0] -> test.pass()
                | otherResult -> test.unexpected otherResult

            | otherResult -> test.unexpected otherResult 
        | otherResult -> test.unexpected otherResult

testCase "Json parser works with arrays and non-empty nested objects" <| fun test ->
    "{\"list\":[],\"nested\":{\"name\":1}}"
    |> SimpleJson.tryParse
    |> function 
        | Some (JObject (map)) -> 
            match Map.toList map with
            | [ "list", JArray []
                "nested", JObject nested] -> 

                match Map.toList nested with
                | ["name", JNumber 1.0] -> test.pass()
                | otherResult -> test.unexpected otherResult

            | otherResult -> test.unexpected otherResult 
        | otherResult -> test.unexpected otherResult

testCase "Json parser works with more nested values" <| fun test ->
    "{\"other\":\"value\",\"child\":{ }}"
    |> SimpleJson.tryParse
    |> function
        | Some (JObject map) ->
            Map.containsKey "child" map |> test.areEqual true
            Map.containsKey "other" map |> test.areEqual true

            match Map.find "child" map with
            | JObject nested -> Map.isEmpty nested |> test.areEqual true
            | otherResult -> test.unexpected otherResult 

            match Map.find "other" map with
            | JString "value" -> test.pass()
            | otherResult -> test.unexpected otherResult 
            
        | otherResult -> test.unexpected otherResult 
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