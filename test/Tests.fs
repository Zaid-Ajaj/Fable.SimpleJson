module Tests

open QUnit
open Fable.Parsimmon
open Fable.SimpleJson
open Fable.SimpleJson.Parser
open Fable.Core.JsInterop

registerModule "Simple Json Tests"

let parseUsing p input = 
    Parsimmon.parse input p

testCase "JNUmber parser works" <| fun test ->
    ["1.0"; "2.5"; "22.010"; "1.05"; "not-valid"; ".1"; "100"]
    |> List.choose (parseUsing jnumber)
    |> test.areEqual [ JNumber 1.0 
                       JNumber 2.5
                       JNumber 22.010 
                       JNumber 1.05
                       JNumber 0.1
                       JNumber 100.0 ]

testCase "JBool parser works" <| fun test ->
    ["true"; "false"; "other"]
    |> List.choose (parseUsing jbool)
    |> test.areEqual [JBool true; JBool false]

testCase "JNull parser works" <| fun test ->
    ["null"; "other"]
    |> List.choose (parseUsing jnull)
    |> test.areEqual [JNull]

testCase "JString parser works" <| fun test ->
    ["\"\""; "\"hello\""; "\" hello world \"";"non-escaped"]
    |> List.choose (parseUsing jstring)
    |> test.areEqual [JString ""; JString "hello"; JString " hello world "]

testCase "Combined parsers JValue works on null values" <| fun test ->
    ["null"; "   null"; "null "]
    |> List.choose (parseUsing jvalue)
    |> test.areEqual [JNull; JNull; JNull]

testCase "Combined parsers JValue works on boolean values" <| fun test ->
    ["true"; "   true"; "true "; " true "]
    |> List.choose (parseUsing jvalue)
    |> test.areEqual [JBool true; JBool true; JBool true; JBool true]
  
    ["false"; "   false"; "false "; " false "]
    |> List.choose (parseUsing jvalue)
    |> test.areEqual [JBool false; JBool false; JBool false; JBool false]

testCase "Combined parsers JValue works on number values" <| fun test ->
    ["15";" 1.0 "; " 2.5"; "22.010 "; "  1.05  "; "not-valid"; ".1"; " 130 "]
    |> List.choose (parseUsing jvalue)
    |> test.areEqual [ JNumber 15.0
                       JNumber 1.0 
                       JNumber 2.5
                       JNumber 22.010 
                       JNumber 1.05
                       JNumber 0.1
                       JNumber 130.0 ]

testCase "JArray parser works" <| fun test ->
    "[1.0, null, true, false, \"text\"]"
    |> SimpleJson.tryParse
    |> function
        | Some (JArray [JNumber 1.0; JNull; JBool true; JBool false; JString "text"]) -> test.pass()
        | otherResult -> test.unexpected otherResult

testCase "JArray parser works on empty lists" <| fun test ->
    ["[ ]"; "[]"; " []"; " []"]
    |> List.choose (SimpleJson.tryParse)
    |> test.areEqual [JArray []; JArray []; JArray []; JArray []]

testCase "JArray parser works on nested arrays of json" <| fun test ->
    ["[[]]"]
    |> List.choose (SimpleJson.tryParse)
    |> test.areEqual [JArray [JArray []]] 

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

testCase "Json parser parses number values" <| fun test ->
    ["12"; "12.0"]
    |> List.choose SimpleJson.tryParse
    |> test.areEqual [JNumber 12.0; JNumber 12.0]  

testCase "Json parser parses boolean values" <| fun test ->
    ["true"; "false"; "something else"]
    |> List.choose SimpleJson.tryParse
    |> test.areEqual [JBool true; JBool false]

testCase "Json parser parses objects with new lines" <| fun test ->
    let expected = JObject (Map.ofList ["empty", JObject Map.empty])
    let input = "\n{\"empty\":\n{\n}}\n"
    match SimpleJson.tryParse input with
    | Some json when json = expected -> test.pass()
    | otherwise -> test.unexpected otherwise
  
testCase "Json parser works with escaped strings" <| fun test ->    
    ["\"there is some json inside\""; "\"\""]
    |> List.choose SimpleJson.tryParse 
    |> test.areEqual [JString "there is some json inside"; JString ""]

testCase "Json parser can parse escaped empty objects" <| fun test ->
    match SimpleJson.tryParse """ {} """ with
    | Some _ -> test.pass()
    | None -> test.fail()

testCase "Json parser can parse escaped non-empty objects" <| fun test ->
    match SimpleJson.tryParse """ {"prop":"value"} """ with
    | Some json -> 
        match json with 
        | JObject map -> 
            match Map.toList map with
            | ["prop", JString "value"] -> test.pass()
            | other -> test.unexpected other
        | other -> test.unexpected other
    | None -> test.fail()


testCase "Json parser can parse list of objects" <| fun test ->
    "[{}]"
    |> SimpleJson.tryParse
    |> function
        | Some (JArray [JObject x]) when x = Map.empty -> test.pass()
        | _ -> test.fail()

// A more realistic test sample
let jsonTestSample = """
{
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": "800-123-4567",
      "mobile": "877-123-1234"
    },
    "email": [
      "jd@example.com",
      "jd@example.org"
    ],
    "dateOfBirth": "1980-01-02T00:00:00.000Z",
    "registered": true,
    "emergencyContacts": [
      {
        "name": "Jane Doe",
        "phone": "888-555-1212",
        "relationship": "spouse"
      },
      {
        "name": "Justin Doe",
        "phone": "877-123-1212",
        "relationship": "parent"
      }
    ]
  }
}
"""

testCase "Parsing JSON test sample works" <| fun test ->
    match SimpleJson.tryParse jsonTestSample with
    | Some _ -> test.pass()
    | None -> test.fail()

testCase "JSON test sample is parsed correctly" <| fun test ->
    let phones =
      [ "home", JString "800-123-4567"
        "mobile", JString "877-123-1234" ]
      |> Map.ofList
      |> JObject

    let emergencyContacts = 
        [ [ "name", JString "Jane Doe"
            "phone", JString "888-555-1212"
            "relationship", JString "spouse" ] 
          |> Map.ofList
          |> JObject

          [ "name", JString "Justin Doe"
            "phone", JString "877-123-1212"
            "relationship", JString "parent" ] 
          |> Map.ofList
          |> JObject ] |> JArray

    let person = 
      [ "id", JNumber 12345.0
        "name", JString "John Doe"
        "registered", JBool true
        "dateOfBirth", JString "1980-01-02T00:00:00.000Z"
        "email", JArray [ JString "jd@example.com"; JString "jd@example.org" ]
        "phones", phones
        "emergencyContacts", emergencyContacts ] 
      |> Map.ofList
      |> JObject

    let testSample = 
      [ "product", JString "Live JSON generator"
        "version", JNumber 3.1 
        "releaseDate", JString "2014-06-25T00:00:00.000Z" 
        "demo", JBool true
        "person", person]
      |> Map.ofList
      |> JObject

    match SimpleJson.tryParse jsonTestSample with
    | Some sampleResult -> test.areEqual testSample sampleResult
    | otherResult -> test.unexpected otherResult

testCase "Json serialization/deserialization works back and forth" <| fun test ->
    match SimpleJson.tryParse jsonTestSample with
    | Some sampleResult -> 
        let serialized = SimpleJson.toString sampleResult
        match SimpleJson.tryParse serialized with
        | Some serializedSampleResult -> 
            test.areEqual sampleResult serializedSampleResult
            test.areEqual serialized (SimpleJson.toString serializedSampleResult)
        | None -> test.failwith "Could not deserialize json resulted from SimpleJson.toString"
    | otherResult -> test.unexpected otherResult


testCase "Deserializing Person works" <| fun test ->
    "{ \"name\":\"john\", \"age\":20 }"
    |> SimpleJson.tryParse
    |> function
        | Some (JObject dict) ->
            let value key = Map.tryFind key dict
            [value "name"; value "age"]
            |> List.choose id
            |> function
                | [JString "john"; JNumber 20.0] -> test.pass()
                | other -> test.unexpected other        
        | other -> test.unexpected other


type IStudent = 
    abstract name: string with get,set
    abstract age: int with get,set 
    abstract subjects: string [] with get,set

testCase "fromObjectLiteral works" <| fun test ->
    let student = createEmpty<IStudent>
    student.name <- "John"
    student.age <- 20
    student.subjects <- [| "math" |]

    match SimpleJson.fromObjectLiteral student with
    | Some (JObject dict) ->
        let value key = Map.tryFind key dict
        [value "name"; value "age"; value "subjects"]
        |> List.choose id
        |> function 
            | [JString "John"; JNumber 20.0; JArray [JString "math"]] -> test.pass()
            | otherResult -> test.unexpected otherResult

    | Some otherResult -> test.unexpected otherResult
    | None -> test.failwith "No match"


testCase "mapKeys works" <| fun test ->
    "[{\"person\":{\"first\":\"john\", \"last\":\"doe\"}}]"
    |> SimpleJson.parse
    |> SimpleJson.mapKeys (function 
        | "person" -> "Person"
        | "first" -> "FirstName"
        | "last" -> "LastName"
        | key -> key)
    |> SimpleJson.toString
    |> test.areEqual "[{\"Person\":{\"FirstName\":\"john\",\"LastName\":\"doe\"}}]"

 
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