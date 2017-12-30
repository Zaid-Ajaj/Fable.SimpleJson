module Tests

open QUnit
open Fable.Parsimmon
open Fable.SimpleJson
open Fable.SimpleJson.AST
open Fable.SimpleJson.Parser


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
    |> parseUsing jarray
    |> function
        | Some (JArray [JNumber 1.0; JNull; JBool true; JBool false; JString "text"]) -> test.pass()
        | otherResult -> test.unexpected otherResult

testCase "JArray parser works on empty lists" <| fun test ->
    ["[ ]"; "[]"; " []"; " []"]
    |> List.choose (parseUsing jarray)
    |> test.areEqual [JArray []; JArray []; JArray []; JArray []]

testCase "JArray parser works on nested arrays of json" <| fun test ->
    ["[[]]"]
    |> List.choose (parseUsing jarray)
    |> test.areEqual [JArray [JArray []]] 

 
testCase "JObject parser works" <| fun test ->
    " { \"customerId\": 1, \"customerName\": \"John\", \"jobs\":[1,true,null]}"
    |> parseUsing jobject
    |> function
        | Some (JObject map) ->
            match Map.toList map with
            | [ "customerId", JNumber 1.0 
                "customerName", JString "John"
                "jobs", JArray [JNumber 1.0; JBool true; JNull]]-> test.pass()
                    
            | otherResult -> test.unexpected otherResult
                
        | otherResult -> test.unexpected otherResult 
    
testCase "JObject parser works with empty nested objects" <| fun test ->
    "{\"child\":{}}"
    |> parseUsing jobject
    |> function 
        | Some (JObject (map)) -> 
            match Map.toList map with
            | ["child", JObject nested] when Map.isEmpty nested -> test.pass()
            | otherResult -> test.unexpected otherResult
        | otherResult -> test.unexpected otherResult


testCase "JObject parser works with non-empty nested objects" <| fun test ->
    "{\"nested\":{\"name\":1}}"
    |> parseUsing jobject
    |> function 
        | Some (JObject (map)) -> 
            match Map.toList map with
            | ["nested", JObject nested] -> 
                match Map.toList nested with
                | ["name", JNumber 1.0] -> test.pass()
                | otherResult -> test.unexpected otherResult

            | otherResult -> test.unexpected otherResult 
        | otherResult -> test.unexpected otherResult

testCase "JObject parser works with arrays and non-empty nested objects" <| fun test ->
    "{\"list\":[],\"nested\":{\"name\":1}}"
    |> parseUsing jobject
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

testCase "JObject parser works with more nested values" <| fun test ->
    "{\"other\":\"value\" , \"child\":{ }}"
    |> parseUsing jobject
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