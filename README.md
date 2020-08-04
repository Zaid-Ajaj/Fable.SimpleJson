# Fable.SimpleJson [![Build Status](https://travis-ci.org/Zaid-Ajaj/Fable.SimpleJson.svg?branch=master)](https://travis-ci.org/Zaid-Ajaj/Fable.SimpleJson) [![Build status](https://ci.appveyor.com/api/projects/status/i17usjpn7bbiwm9n?svg=true)](https://ci.appveyor.com/project/Zaid-Ajaj/fable-simplejson) [![Nuget](https://img.shields.io/nuget/v/Fable.SimpleJson.svg?maxAge=0&colorB=brightgreen)](https://www.nuget.org/packages/Fable.SimpleJson)

A simple library for easily parsing, transforming and converting JSON in Fable projects. It is written using parser combinators from [Fable.Parsimmon](https://github.com/Zaid-Ajaj/Fable.Parsimmon)

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

## Raison d'être

Fable.SimpleJson allows for generic JSON data manipulation and treats JSON as a [data structure](https://github.com/Zaid-Ajaj/Fable.SimpleJson/blob/master/src/Json.fs) like `List` or `Map`. Manipulating JSON as data means that you can use low-level API's to transform and convert JSON from one structure into another or extracting values from the JSON without defining intermediate types (similar to the [JToken](https://www.newtonsoft.com/json/help/html/CreateJsonManually.htm) API from Newtonsoft.Json)

The automatic serialization and deserialization to typed entities happen to be utility functions, one use case, but are not the main purpose of the library (as in with [Thoth.Json](https://github.com/MangelMaxime/Thoth)).

Because of the flexibility it provides, it forms a solid foundation for JSON handling in [Fable.Remoting](https://github.com/Zaid-Ajaj/Fable.Remoting), [Elmish.Bridge](https://github.com/Nhowka/Elmish.Bridge) and [Fable.SignalR](https://github.com/Shmew/Fable.SignalR).

### Using the library

JSON Parsing and Transformation API
```fs
open Fable.SimpleJson

// ...

SimpleJson.tryParse : string -> Option<Json>
SimpleJson.parse : string -> Json
SimpleJson.toString : Json -> string
SimpleJson.fromObjectLiteral : 'a -> Option<Json>
SimpleJson.mapKeys : (f: string -> string) -> Json -> Json
SimpleJson.mapKeysByPath : (f: string list -> string option) -> Json -> Json
```
JSON Convertion API
```fs
open Fable.SimpleJson

// ...

Json.parseAs<'t> (inputJson: string) : 't
Json.tryParseAs<'t> (inputJson: string) : Result<'t, string>
Json.parseFromJsonAs<'t> (parsedJson: Json) : 't
Json.tryParseFromJsonAs<'t> (parsedJson: Json) : Result<'t, string>
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

## Auto Deserialization
Suppose you have the record of `Person`, you can then use `Json.parseAs<'t>` for automatic deserialization:
```fs
type Person = { Name: string; Age: int }

"{ \"Name\": \"John\", \"Age\": 42  }"
|> Json.parseAs<Person>
// result => { Name = "John"; Age = 42 }
```

## Manual Deserialization
Suppose you have the record of `Person`:
```fs
type Person = { Name: string; Age: int }
```
And you want to deserialize this string:
```json
"{ \"name\":\"john\", \"age\":20 }"
```
Then you can would use the safe `SimpleJson.tryParse` to pattern-match and extract the values from the parsed JSON:
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
            | _ -> None
    | _ -> None
```
You could also use the non-safe version `SimpleJson.parse` if you know for sure that the JSON input string is parsable. `SimpleJson.parse` will throw an exception if it can't deserialize the JSON string.

## Auto Serialization

```fs
let person = { Name = "John"; Age = 34 }
Json.stringify person
```

## Manual Serialization
Now, to serialize a typed entity into a JSON string, you build the JSON structure by hand and call `SimpleJson.toString` like the following:

```fs
let person = { Name = "John"; Age = 34 }

let serialized =
    [ "name", JString person.Name
      "age", JNumber (float person.Age) ]
    |> Map.ofList
    |> JObject
    |> SimpleJson.toString
```



## Pre-processing JSON values
Suppose you want to deserialize the string:

```json
{  "first_name": "John",
   "last_name": "Doe"    }
```
And you have the type
```fs
type Person = { FirstName: string; LastName: string }
```
Then obviously it wouldn't "just work" because the keys of the object don't match. SimpleJson can help with this by first rewriting the keys to match with the field names of the record before converting:
```fs
"{\"first_name\":\"John\",\"last_name\":\"Doe\"}"
|> SimpleJson.parse
|> SimpleJson.mapKeys (function
    | "first_name" -> "FirstName"
    | "last_name" -> "LastName"
    | key -> key)
|> Json.convertFromJsonAs<Person>
 // { FirstName = "John"; LastName = "Doe" }
```

# Selective re-writing of JSON keys based on key path:
The function `SimpleJson.mapKeys` will convert every possible key in every object within the JSON structure. Sometimes you want to select *exactly* which keys to convert based on their path in the JSON using `SimpleJson.mapKeysByPath`:

```fs
testCase "mapKeysByPath works" <| fun test ->
    "[{\"person\":{\"first\":\"john\", \"last\":\"doe\"}}, {\"first\":\"not-mapped\"}]"
    |> SimpleJson.parse
    |> SimpleJson.mapKeysByPath (function
        | ["person"] -> Some "Person"
        | ["person";"first"] -> Some "first_name"
        | ["person";"last"] -> Some "last_name"
        | other -> None)
    |> SimpleJson.toString
    |> test.areEqual "[{\"Person\":{\"first_name\":\"john\",\"last_name\":\"doe\"}},{\"first\":\"not-mapped\"}]"
```
## Building and running tests
Requirements

 - Dotnet 2.2+
 - Node.js 10.0+


Running and watching the tests live in the browser:
```sh
npm install
npm start
```
When the development server starts, navigate to `http://localhost:8080` to see the test results.

Building the tests and running them using Mocha on Node.js
```sh
npm install
npm test
```
This will compile the project using `fable-splitter` and run mocha against the generated files in `dist`.
