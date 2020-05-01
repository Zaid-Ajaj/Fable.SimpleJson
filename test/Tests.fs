module Tests

open Fable.Core
open Fable.Parsimmon
open Fable.SimpleJson
open Fable.SimpleJson.Parser
open Fable.Core.JsInterop
open System
open System
open System.Reflection
open System.Collections.Generic
open Fable.Mocha
open Types

[<Emit("console.log($0)")>]
let log (x: 't) : unit = jsNative

let parseUsing p input =
    Parsimmon.parse input p

type test =
    static member equal a b = Expect.equal a b "They are equal"
    static member areEqual a b = Expect.equal a b "They are equal"
    static member pass() = Expect.isTrue true "It must be true"
    static member fail() = Expect.isTrue false "It must be false"
    static member isTrue x = Expect.isTrue x "It must be true"
    static member unexpected (x: 't) = Expect.isTrue false (Json.stringify x)
    static member failwith x = failwith x
    static member passWith x = Expect.isTrue true x

[<Flags>]
type FlagsEnum = A = 1 | B = 2 | C = 4

let fromJson<'t> json typeInfo =
    unbox<'t> (Convert.fromJsonAs json typeInfo)

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

let integersToInt64 (a: int, b: int) =
    let lowBytes = BitConverter.GetBytes(a)
    let highBytes = BitConverter.GetBytes(b)
    let combinedBytes = Array.concat [ lowBytes; highBytes ]
    BitConverter.ToInt64(combinedBytes, 0)

let int64ToIntegers (n: int64) =
    let longBytes = BitConverter.GetBytes(n)
    let fstInteger = BitConverter.ToInt32(longBytes.[0 .. 3], 0)
    let sndInteger = BitConverter.ToInt32(longBytes.[4 .. 7], 0)
    fstInteger, sndInteger

let everyTest =
  testList "Simple Json Tests" [

    testCase "JNUmber parser works" <| fun _ ->
        ["1.0"; "2.5"; "22.010"; "1.05"; "not-valid"; ".1"; "100"]
        |> List.choose (parseUsing jnumber)
        |> test.areEqual [ JNumber 1.0
                           JNumber 2.5
                           JNumber 22.010
                           JNumber 1.05
                           JNumber 0.1
                           JNumber 100.0 ]

    testCase "JBool parser works" <| fun _ ->
        ["true"; "false"; "other"]
        |> List.choose (parseUsing jbool)
        |> test.areEqual [JBool true; JBool false]

    testCase "JNull parser works" <| fun _ ->
        ["null"; "other"]
        |> List.choose (parseUsing jnull)
        |> test.areEqual [JNull]

    testCase "JString parser works" <| fun _ ->
        ["\"\""; "\"hello\""; "\" hello world \"";"non-escaped"]
        |> List.choose (parseUsing jstring)
        |> test.areEqual [JString ""; JString "hello"; JString " hello world "]

    testCase "Combined parsers JValue works on null values" <| fun _ ->
        ["null"; "   null"; "null "]
        |> List.choose (parseUsing jvalue)
        |> test.areEqual [JNull; JNull; JNull]

    testCase "Combined parsers JValue works on boolean values" <| fun _ ->
        ["true"; "   true"; "true "; " true "]
        |> List.choose (parseUsing jvalue)
        |> test.areEqual [JBool true; JBool true; JBool true; JBool true]

        ["false"; "   false"; "false "; " false "]
        |> List.choose (parseUsing jvalue)
        |> test.areEqual [JBool false; JBool false; JBool false; JBool false]

    testCase "Combined parsers JValue works on number values" <| fun _ ->
        ["15";" 1.0 "; " 2.5"; "22.010 "; "  1.05  "; "not-valid"; ".1"; " 130 "]
        |> List.choose (parseUsing jvalue)
        |> test.areEqual [ JNumber 15.0
                           JNumber 1.0
                           JNumber 2.5
                           JNumber 22.010
                           JNumber 1.05
                           JNumber 0.1
                           JNumber 130.0 ]

    testCase "JArray parser works" <| fun _ ->
        "[1.0, null, true, false, \"text\"]"
        |> SimpleJson.tryParse
        |> function
            | Some (JArray [JNumber 1.0; JNull; JBool true; JBool false; JString "text"]) -> test.pass()
            | otherResult -> test.unexpected otherResult

    testCase "JArray parser works on empty lists" <| fun _ ->
        ["[ ]"; "[]"; " []"; " []"]
        |> List.choose (SimpleJson.tryParse)
        |> test.areEqual [JArray []; JArray []; JArray []; JArray []]

    testCase "JArray parser works on nested arrays of json" <| fun _ ->
        ["[[]]"]
        |> List.choose (SimpleJson.tryParse)
        |> test.areEqual [JArray [JArray []]]

    testCase "Json parser works" <| fun _ ->
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

    testCase "Negative numbers can be parsed" <| fun _ ->
        ["-5"; "-5.2"; "-1"; "-0.5"]
        |> List.choose (parseUsing jnumber)
        |> test.areEqual [JNumber -5.0; JNumber -5.2; JNumber -1.0; JNumber -0.5]

    testCase "Json parser works with empty nested objects" <| fun _ ->
        "{\"child\":{}}"
        |> SimpleJson.tryParse
        |> function
            | Some (JObject (map)) ->
                match Map.toList map with
                | ["child", JObject nested] when Map.isEmpty nested -> test.pass()
                | otherResult -> test.unexpected otherResult
            | otherResult -> test.unexpected otherResult

    testCase "Json parser works with non-empty nested objects" <| fun _ ->
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

    testCase "Json parser works with arrays and non-empty nested objects" <| fun _ ->
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

    testCase "Json parser works with more nested values" <| fun _ ->
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

    testCase "Json parser parses number values" <| fun _ ->
        ["12"; "12.0"]
        |> List.choose SimpleJson.tryParse
        |> test.areEqual [JNumber 12.0; JNumber 12.0]

    testCase "Json parser parses boolean values" <| fun _ ->
        ["true"; "false"; "something else"]
        |> List.choose SimpleJson.tryParse
        |> test.areEqual [JBool true; JBool false]

    testCase "Json parser parses objects with new lines" <| fun _ ->
        let expected = JObject (Map.ofList ["empty", JObject Map.empty])
        let input = "\n{\"empty\":\n{\n}}\n"
        match SimpleJson.tryParse input with
        | Some json when json = expected -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "Json parser works with escaped strings" <| fun _ ->
        ["\"there is some json inside\""; "\"\""]
        |> List.choose SimpleJson.tryParse
        |> test.areEqual [JString "there is some json inside"; JString ""]

    testCase "Json parser can parse escaped empty objects" <| fun _ ->
        match SimpleJson.tryParse """ {} """ with
        | Some _ -> test.pass()
        | None -> test.fail()

    testCase "Json parser can parse escaped non-empty objects" <| fun _ ->
        match SimpleJson.tryParse """ {"prop":"value"} """ with
        | Some json ->
            match json with
            | JObject map ->
                match Map.toList map with
                | ["prop", JString "value"] -> test.pass()
                | other -> test.unexpected other
            | other -> test.unexpected other
        | None -> test.fail()


    testCase "Json parser can parse list of objects" <| fun _ ->
        "[{}]"
        |> SimpleJson.tryParse
        |> function
            | Some (JArray [JObject x]) when x = Map.empty -> test.pass()
            | _ -> test.fail()

    testCase "Parsing JSON test sample works" <| fun _ ->
        match SimpleJson.tryParse jsonTestSample with
        | Some _ -> test.pass()
        | None -> test.fail()

    testCase "JSON test sample is parsed correctly" <| fun _ ->
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

    testCase "Json serialization/deserialization works back and forth" <| fun _ ->
        match SimpleJson.tryParse jsonTestSample with
        | Some sampleResult ->
            let serialized = SimpleJson.toString sampleResult
            match SimpleJson.tryParse serialized with
            | Some serializedSampleResult ->
                test.areEqual sampleResult serializedSampleResult
                test.areEqual serialized (SimpleJson.toString serializedSampleResult)
            | None -> test.failwith "Could not deserialize json resulted from SimpleJson.toString"
        | otherResult -> test.unexpected otherResult


    testCase "Deserializing Person works" <| fun _ ->
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

    testCase "fromObjectLiteral works" <| fun _ ->
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


    testCase "mapKeys works" <| fun _ ->
        "[{\"person\":{\"first\":\"john\", \"last\":\"doe\"}}]"
        |> SimpleJson.parse
        |> SimpleJson.mapKeys (function
            | "person" -> "Person"
            | "first" -> "FirstName"
            | "last" -> "LastName"
            | key -> key)
        |> SimpleJson.toString
        |> test.areEqual "[{\"Person\":{\"FirstName\":\"john\",\"LastName\":\"doe\"}}]"


    testCase "mapKeysByPath works" <| fun _ ->
        "[{\"person\":{\"first\":\"john\", \"last\":\"doe\"}}, {\"first\":\"not-mapped\"}]"
        |> SimpleJson.parse
        |> SimpleJson.mapKeysByPath (function
            | ["person"] -> Some "Person"
            | ["person";"first"] -> Some "first_name"
            | ["person";"last"] -> Some "last_name"
            | other -> None)
        |> SimpleJson.toString
        |> test.areEqual "[{\"Person\":{\"first_name\":\"john\",\"last_name\":\"doe\"}},{\"first\":\"not-mapped\"}]"


    testCase "SimpleJson.mapByKey works" <| fun _ ->
        let makeUpper key value =
            match key, value with
            | "first_name", JString name -> JString (name.ToUpper())
            | _, value -> value

        "[{\"first_name\":\"john\"},{\"first_name\":\"jane\"}]"
        |> SimpleJson.parse
        |> SimpleJson.mapbyKey makeUpper
        |> SimpleJson.toString
        |> test.areEqual "[{\"first_name\":\"JOHN\"},{\"first_name\":\"JANE\"}]"

    testCase "fromJsonAs works generated type information" <| fun _ ->
        let expected =  { First = "John"; Age = 21; Salary = 3.99 }
        let deserialized = Json.parseAs<SimpleRecord> """{"First": "John", "Age": 21, "Salary": 3.99 }"""
        test.areEqual expected deserialized

    testCase "Auto derserialization: parsing lists of unions from Fable 2" <| fun _ ->
        let jsonInput = """[["One"], ["Two", 20], ["Three", "some value"]]"""
        let expected =  [ One; Two 20; Three "some value" ]
        let deserialized = Json.parseAs<SimpleDU list> jsonInput
        test.areEqual expected deserialized

    testCase "Auto derserialization: parsing lists of unions from Fable 1" <| fun _ ->
        let jsonInput =  """["One", { "Two" : [20] }, {"Three": ["some value"] }]"""
        let expected =  [ One; Two 20; Three "some value" ]
        let deserialized = Json.parseAs<SimpleDU list> jsonInput
        test.areEqual expected deserialized

    testCase "Auto derserialization: parsing lists of unions from Fable 1, values are non-arrays" <| fun _ ->
        let jsonInput =  """["One", { "Two" : 20 }, {"Three": "some value" }]"""
        let expected =  [ One; Two 20; Three "some value" ]
        let deserialized = Json.parseAs<SimpleDU list> jsonInput
        test.areEqual expected deserialized

    testCase "fromJsonAs works with simple DU's serialized as objects with values as non-arrays" <| fun _ ->
        """["One", { "Two" :20 }, {"Three": "some value" }]"""
        |> Json.parseAs<SimpleDU list>
        |> test.areEqual [ One; Two 20; Three "some value" ]

    testCase "Parsing maps serialized with JSON.stringify" <| fun _ ->
        [ "A", "a"; "B", "b"; "C", "c" ]
        |> Map.ofList
        |> Fable.Core.JS.JSON.stringify
        |> Json.parseAs<Map<string, string>>
        |> Map.toList
        |> test.areEqual [ "A", "a"; "B", "b"; "C", "c" ]

    testCase "Parsing maps serialized with toJson from Fable 1" <| fun _ ->
        let inputJson = """ { "A":"a", "B":"b", "C":"c" } """
        Json.parseAs<Map<string, string>> inputJson
        |> Map.toList
        |> test.areEqual [ "A", "a"; "B", "b"; "C", "c" ]

    testCase "Parsing maps with integers as keys from string works" <| fun _ ->
        "[[1, \"one\"], [2, \"two\"], [3,\"three\"]]"
        |> Json.parseAs<Map<int, string>>
        |> Map.toList
        |> test.areEqual [ 1, "one"; 2, "two"; 3, "three" ]

    testCase "Parsing maps with integers as keys from string works where integers are stringified" <| fun _ ->
        "[[\"1\", \"one\"], [\"2\", \"two\"], [\"3\",\"three\"]]"
        |> Json.parseAs<Map<int, string>>
        |> Map.toList
        |> test.areEqual [ 1, "one"; 2, "two"; 3, "three" ]

    testCase "Parsing maps with integers as keys" <| fun _ ->
        [ 1, "one"; 2, "two"; 3, "three" ]
        |> Map.ofList
        |> Json.stringify
        |> Json.parseAs<Map<int, string>>
        |> Map.toList
        |> test.areEqual [ 1, "one"; 2, "two"; 3, "three" ]

    testCase "Parsing maps with strings as keys with complex values" <| fun _ ->
        [ "test", [ One; Two 20; Three "some value" ] ]
        |> Map.ofList
        |> Fable.Core.JS.JSON.stringify
        |> Json.parseAs<Map<string, SimpleDU list>>
        |> Map.toList
        |> test.areEqual [ "test", [ One; Two 20; Three "some value" ] ]

    testCase "Map.toList works" <| fun _ ->
        [ 1, "one"; 2, "two" ]
        |> Map.ofList
        |> Map.toList
        |> test.areEqual [ 1, "one"; 2, "two" ]

    testCase "Deserialize string with json inside" <| fun _ ->
        let str = "1"
        let json1 = { Str = str } |> Json.stringify
        let json2 = { Str = json1 } |> Json.stringify
        let parsed2 = Json.parseAs<WithString> json2
        let parsed1 = Json.parseAs<WithString> parsed2.Str
        test.areEqual str parsed1.Str

    testCase "Deserialize string with escaped quotes" <| fun _ ->
        let jsonString = "{\"a\": \"\\\"\\\"\"}"
        let json = jsonString |> SimpleJson.parse

        match json with
        | JObject literal ->
            match Map.find "a" literal with
            | JString "\"\"" -> test.pass()
            | _ -> test.failwith "Unexpected value of property 'a'"
        | _ -> test.failwith "Unexpected json type"

    testCase "Deserialize string with special char" <| fun _ ->
        let str = "\t"
        let o = { Str = str }
        let json = o |> Json.stringify
        let deserialized = json |> Json.parseAs<WithString>
        deserialized.Str |> test.areEqual str

    testCase "Converting records with simple types" <| fun _ ->
        { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
        |> Json.stringify
        |> Json.parseAs<SimpleRec>
        |> test.areEqual { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }

    testCase "Native: Converting records with simple types" <| fun _ ->
        { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
        |> Json.stringify
        |> Json.parseNativeAs<SimpleRec>
        |> test.areEqual { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }

    testCase "Converting records with simple types, strings can be null" <| fun _ ->
        { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }
        |> Json.stringify
        |> Json.parseAs<SimpleRec>
        |> test.areEqual { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }


    testCase "Native: Converting records with simple types, strings can be null" <| fun _ ->
        { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }
        |> Json.stringify
        |> Json.parseNativeAs<SimpleRec>
        |> test.areEqual { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }

    testCase "Converting lists records with simple types" <| fun _ ->
        [ { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } ]
        |> Json.stringify
        |> Json.parseAs<SimpleRec list>
        |> test.areEqual [ { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } ]

    testCase "Native: Converting records with simple types, strings can be null" <| fun _ ->
        { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }
        |> Json.stringify
        |> Json.parseNativeAs<SimpleRec>
        |> test.areEqual { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }

    testCase "Converting arrays records with simple types" <| fun _ ->
        [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]
        |> Json.stringify
        |> Json.parseAs<SimpleRec[]>
        |> test.areEqual [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]

    testCase "Native: Converting arrays records with simple types" <| fun _ ->
        [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]
        |> Json.stringify
        |> Json.parseNativeAs<SimpleRec[]>
        |> test.areEqual [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]

    testCase "Converting optional (Some) records with simple types" <| fun _ ->
        { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
        |> Some
        |> Json.stringify
        |> Json.parseAs<Option<SimpleRec>>
        |> test.areEqual (Some { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M })

    testCase "Native: Converting optional (Some) records with simple types" <| fun _ ->
        { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
        |> Some
        |> Json.stringify
        |> Json.parseAs<Option<SimpleRec>>
        |> test.areEqual (Some { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M })

    testCase "Converting optional (None) records with simple types" <| fun _ ->
        None
        |> Json.stringify
        |> Json.parseAs<Option<SimpleRec>>
        |> test.areEqual None

    testCase "Native: Converting optional (None) records with simple types" <| fun _ ->
        None
        |> Json.stringify
        |> Json.parseAs<Option<SimpleRec>>
        |> test.areEqual None

    testCase "Name can be extracted from RecWithGenDU" <| fun _ ->
        let name = Types.getNameOf<Maybe<list<RecWithGenDU<string>>>>()
        test.pass()

    testCase "Name can be extraced from GenericRecord" <| fun _ ->
        let name = Types.getNameOf<Maybe<list<GenericTestRecord<string>>>>()
        test.pass()

    testCase "TypeInfo of Maybe<<Maybe<int>> can be generated" <| fun _ ->
        let typeInfo = Types.get<Maybe<Maybe<int>>>()

        let rec getGenericArgs (typeDef: System.Type) : string list =
            [ yield typeDef.Name
              for genericTypeArg in typeDef.GetGenericArguments() do
                yield! getGenericArgs genericTypeArg ]

        typeInfo.GetGenericArguments()
        |> Array.map (fun t -> t.Name)
        |> List.ofArray
        |> test.areEqual ["Maybe`1"]

    testCase "Converting maps works" <| fun _ ->
        [ "test", [ One; Two 20; Three "some value" ] ]
        |> Map.ofList
        |> Fable.Core.JS.JSON.stringify
        |> Json.parseAs<Map<string, SimpleDU list>>
        |> Map.toList
        |> test.areEqual [ "test", [ One; Two 20; Three "some value" ] ]

    testCase "Native: Converting maps works" <| fun _ ->
        [ "test", [ One; Two 20; Three "some value" ] ]
        |> Map.ofList
        |> Fable.Core.JS.JSON.stringify
        |> Json.parseNativeAs<Map<string, SimpleDU list>>
        |> Map.toList
        |> test.areEqual [ "test", [ One; Two 20; Three "some value" ] ]

    testCase "TypeInfo can be generated from GenericTestRecord" <| fun _ ->
        let typeInfo = TypeInfo.createFrom<Maybe<list<GenericTestRecord<string>>>>()
        test.pass()

    testCase "Converting generic record with Maybe<int> as a field" <| fun _ ->
        Just [ { Other = "wise"; Value = Just 20 } ]
        |> Json.stringify
        |> Json.parseAs<Maybe<list<RecWithGenDU<string>>>>
        |> test.areEqual (Just [ { Other = "wise"; Value = Just 20 } ] )

    testCase "Native: Converting generic record with Maybe<int> as a field" <| fun _ ->
        Just [ { Other = "wise"; Value = Just 20 } ]
        |> Json.stringify
        |> Json.parseNativeAs<Maybe<list<RecWithGenDU<string>>>>
        |> test.areEqual (Just [ { Other = "wise"; Value = Just 20 } ] )

    testCase "Converting record with arrays" <| fun _ ->
        { Arr = [| Some Nothing; Some (Just 20) |] }
        |> Json.stringify
        |> Json.parseAs<RecordWithArray>
        |> test.areEqual { Arr = [| Some Nothing; Some (Just 20) |] }

    testCase "Native: Converting record with arrays" <| fun _ ->
        { Arr = [| Some Nothing; Some (Just 20) |] }
        |> Json.stringify
        |> Json.parseNativeAs<RecordWithArray>
        |> test.areEqual { Arr = [| Some Nothing; Some (Just 20) |] }

    testCase "Converting record with bytes" <| fun _ ->
        { byteValue = byte 200  }
        |> Json.stringify
        |> Json.parseAs<RecWithByte>
        |> test.areEqual { byteValue = byte 200 }

    testCase "Native: Converting record with bytes" <| fun _ ->
        { byteValue = byte 200  }
        |> Json.stringify
        |> Json.parseNativeAs<RecWithByte>
        |> test.areEqual { byteValue = byte 200 }

    testCase "Converting record with Int16" <| fun _ ->
        { shortValue = int16 200  }
        |> Json.stringify
        |> Json.parseAs<RecWithShort>
        |> test.areEqual { shortValue = int16 200 }

    testCase "Native: Converting record with Int16" <| fun _ ->
        { shortValue = int16 200  }
        |> Json.stringify
        |> Json.parseNativeAs<RecWithShort>
        |> test.areEqual { shortValue = int16 200 }

    testCase "Converting record with negative Int16" <| fun _ ->
        { shortValue = int16 -200  }
        |> Json.stringify
        |> Json.parseAs<RecWithShort>
        |> test.areEqual { shortValue = int16 -200 }

    testCase "Native: Converting record with negative Int16" <| fun _ ->
        { shortValue = int16 -200  }
        |> Json.stringify
        |> Json.parseNativeAs<RecWithShort>
        |> test.areEqual { shortValue = int16 -200 }

    testCase "Converting complex generic types" <| fun _ ->
        let complexValue : Maybe<ComplexRecord<SimpleRec> list> =
            [ { Value = { A = 20; B = "AA"; C = false; D = 5.64134; E = 23.42M }
                HasValue = true
                Dates = [ DateTime.Now; DateTime.Now.AddDays(5.0) ]
                DateTimeOffsets = [ DateTimeOffset.Now; DateTimeOffset.Now.AddDays(5.0) ]
                RecordList = [ { A = 30; B = "CC"; C = true; D = 2.0451; E = 42.23M } ]
                ArrayOfOptionalRecords = [| None; Some { A = 35; B = "FF"; C = false; D = 1.0451; E = 42.42M }; None |]
                OptionalRecord = Some { A = 40; B = "BB"; C = true; D = 3.0451; E = 23.23M }
                NestedMaps  = [ Map.ofList [ "one", Map.ofList [ "two", Just 100L ] ] ]
                SimpleTuples = Some "value", 20, System.Guid.NewGuid()
                Doubtful = Just (Just (Just Nothing))
                Int64 = Just 5L, None, [ 20L ]
                BigInt = Just 5I, None, [ -20I ] } ]
            |> Just

        complexValue
        |> Json.stringify
        |> Json.parseAs<Maybe<ComplexRecord<SimpleRec> list>>
        |> test.areEqual complexValue

    testCase "Native: Converting complex generic types" <| fun _ ->
        let complexValue : Maybe<ComplexRecord<SimpleRec> list> =
            [ { Value = { A = 20; B = "AA"; C = false; D = 5.64134; E = 23.42M }
                HasValue = true
                Dates = [ DateTime.Now; DateTime.Now.AddDays(5.0) ]
                DateTimeOffsets = [ DateTimeOffset.Now; DateTimeOffset.Now.AddDays(5.0) ]
                RecordList = [ { A = 30; B = "CC"; C = true; D = 2.0451; E = 23.42M } ]
                ArrayOfOptionalRecords = [| None; Some { A = 35; B = "FF"; C = false; D = 1.0451; E = 42.23M }; None |]
                OptionalRecord = Some { A = 40; B = "BB"; C = true; D = 3.0451; E = 42.42M }
                NestedMaps  = [ Map.ofList [ "one", Map.ofList [ "two", Just 100L ] ] ]
                SimpleTuples = Some "value", 20, System.Guid.NewGuid()
                Doubtful = Just (Just (Just Nothing))
                Int64 = Just 5L, None, [ 20L ]
                BigInt = Just 5I, None, [ -20I ] } ]
            |> Just

        complexValue
        |> Json.stringify
        |> Json.parseAs<Maybe<ComplexRecord<SimpleRec> list>>
        |> test.areEqual complexValue

    testCase "Result can be converted" <| fun _ ->
        [ Ok "value"; Error (Maybe.Just 5) ]
        |> Json.stringify
        |> Json.parseAs<list<Result<string, Maybe<int>>>>
        |> test.areEqual [ Ok "value"; Error (Maybe.Just 5) ]

    testCase "Native: Result can be converted" <| fun _ ->
        [ Ok "value"; Error (Maybe.Just 5) ]
        |> Json.stringify
        |> Json.parseNativeAs<list<Result<string, Maybe<int>>>>
        |> test.areEqual [ Ok "value"; Error (Maybe.Just 5) ]

    testCase "SingleCase of int64 can be converter" <| fun _ ->
        SingleCase 20L
        |> Json.stringify
        |> Json.parseAs<SingleCase>
        |> test.areEqual (SingleCase 20L)

    testCase "Native: SingleCase of int64 can be converter" <| fun _ ->
        SingleCase 20L
        |> Json.stringify
        |> Json.parseNativeAs<SingleCase>
        |> test.areEqual (SingleCase 20L)

    testCase "BitConverter works for int64 <-> (int32 * int32) conversion" <| fun _ ->
        [ for i in 1 .. 10 -> i, i * i]
        |> List.map (integersToInt64 >> int64ToIntegers)
        |> test.areEqual [for i in 1 .. 10 -> i, i * i ]

    testCase "Long can be converted" <| fun _ ->
        { value = Just (Some 5L); other = "" }
        |> Json.stringify
        |> Json.parseAs<RecordWithLong>
        |> test.areEqual { value = Just (Some 5L); other = "" }

    testCase "Native: Long can be converted" <| fun _ ->
        { value = Just (Some 5L); other = "" }
        |> Json.stringify
        |> Json.parseNativeAs<RecordWithLong>
        |> test.areEqual { value = Just (Some 5L); other = "" }

    testCase "BigInt can be converted" <| fun _ ->
        { value = Just (Some 5I) }
        |> Json.stringify
        |> Json.parseAs<RecordWithBigInt>
        |> test.areEqual { value = Just (Some 5I) }

    testCase "bigint list can be converted" <| fun _ ->
        [ 5I; 2I ]
        |> Json.stringify
        |> Json.parseAs<bigint list>
        |> test.areEqual [ 5I; 2I ]

    testCase "Native: bigint list can be converted" <| fun _ ->
        [ 5I; 2I ]
        |> Json.stringify
        |> Json.parseNativeAs<bigint list>
        |> test.areEqual [ 5I; 2I ]

    testCase "bigint list can be converted from Json as numbers" <| fun _ ->
        "[5, 2]"
        |> Json.parseAs<bigint list>
        |> test.areEqual [ 5I; 2I ]

    testCase "bigint list can be converted from Json as strings" <| fun _ ->
        "[\"5\", \"2\"]"
        |> Json.parseAs<bigint list>
        |> test.areEqual [ 5I; 2I ]

    testCase "TypeInfo for Option<bigint> list can be generated" <| fun _ ->
        let typeInfo = TypeInfo.createFrom<Option<bigint> list>()
        match typeInfo with
        | TypeInfo.List getOptionBigInt ->
            let optionBigInt = getOptionBigInt()
            match optionBigInt with
            | TypeInfo.Option getBigInt ->
                let bigInt = getBigInt()
                match bigInt with
                | TypeInfo.BigInt -> test.pass()
                | _ -> test.fail()
            | _ -> test.fail()
        | _ -> test.fail()

    testCase "TypeInfo for Option<bigint> array can be generated" <| fun _ ->
        let typeInfo = TypeInfo.createFrom<Option<bigint> [ ]>()
        match typeInfo with
        | TypeInfo.Array getOptionBigInt ->
            let optionBigInt = getOptionBigInt()
            match optionBigInt with
            | TypeInfo.Option getBigInt ->
                let bigInt = getBigInt()
                match bigInt with
                | TypeInfo.BigInt -> test.pass()
                | _ -> test.fail()
            | _ -> test.fail()
        | _ -> test.fail()

    testCase "Simple Option<BigInt> can be converted from Json" <| fun _ ->
        "[\"5\", \"2\", null]"
        |> Json.parseAs<Option<bigint> list>
        |> test.areEqual [ Some 5I; Some 2I; None ]

    testCase "Simple Option<BigInt> can be converted manually from Json as string" <| fun _ ->
        let typeInfo = TypeInfo.createFrom<Option<bigint> list>()
        let inputJson = SimpleJson.parse "[\"5\", \"2\", null]"
        let result = Convert.fromJsonAs inputJson typeInfo
        unbox<Option<bigint> list> result
        |> test.areEqual [ Some 5I; Some 2I; None ]

    testCase "Simple Json array can be parsed as Json" <| fun _ ->
        "[\"5\", \"2\", null]"
        |> SimpleJson.parseNative
        |> test.areEqual (JArray [ JString "5"; JString "2" ; JNull ])

    testCase "Simple Option<Int> can be parsed as Json" <| fun _ ->
        "[5, 2, null]"
        |> SimpleJson.parseNative
        |> test.areEqual (JArray [ JNumber 5.0; JNumber 2.0 ; JNull ])

    testCase "Simple Option<Int> can be converted from Json" <| fun _ ->
        "[\"5\", \"2\", null]"
        |> Json.parseAs<Option<int> list>
        |> test.areEqual [ Some 5; Some 2; None ]

    testCase "Simple Option<BigInt> can be converted" <| fun _ ->
        [ Some 5I; Some 2I; None ]
        |> Json.stringify
        |> Json.parseAs<Option<bigint> list>
        |> test.areEqual [ Some 5I; Some 2I; None ]

    testCase "Native: BigInt can be converted" <| fun _ ->
        { value = Just (Some 5I) }
        |> Json.stringify
        |> Json.parseNativeAs<RecordWithBigInt>
        |> test.areEqual { value = Just (Some 5I) }

    testCase "List<'t> can be deserialized" <| fun _ ->
        [{ first = 10 }]
        |> DummyList
        |> Json.stringify
        |> Json.parseNativeAs<DummyList>
        |> test.areEqual (DummyList [{ first = 10 }])

    testCase "Seq<'t> can be deserialized" <| fun _ ->
        "[\"DummySeq\", [{ \"first\": 10 }]]"
        |> Json.parseNativeAs<DummySeq>
        |> fun dummy ->
            match dummy with
            | DummySeq elems ->
                match List.ofSeq elems with
                | [ { first = 10 } ] -> test.pass()
                | _ -> test.fail()

    testCase "Seq<'t> can be serialized correctly" <| fun _ ->
        seq { yield { first = 10 } }
        |> DummySeq
        |> Json.stringify
        |> test.areEqual "[\"DummySeq\",[{\"first\":10}]]"

    testCase "Multiple optional fields can be omitted from the JSON" <| fun _ ->
        "{ \"key\": 5 }"
        |> Json.parseAs<Optional>
        |> test.areEqual { key = 5; value = None; number = None }

    testCase "Native: Multiple optional fields can be omitted from the JSON" <| fun _ ->
        "{ \"key\": 5 }"
        |> Json.parseNativeAs<Optional>
        |> test.areEqual { key = 5; value = None; number = None }

    testCase "Generic union types with list-like type arguments work" <| fun _ ->
        Just [1 .. 5]
        |> Json.stringify
        |> Json.parseNativeAs<Maybe<int list>>
        |> test.areEqual (Just [1;2;3;4;5])

    testCase "Result<int list, string> conversion works" <| fun _ ->
        Ok [1;2;3]
        |> Json.stringify
        |> Json.parseNativeAs<Result<int list, string>>
        |> test.areEqual (Ok [1;2;3])

    testCase "Deserializing User array works" <| fun _ ->
        let usersInput = [|
            { Login = "first"; IsAdmin = false; LastActivity = DateTime.Now }
            { Login = "second"; IsAdmin = true; LastActivity = DateTime.Now }
        |]

        let serialized = Json.stringify usersInput
        match Json.tryParseNativeAs<User array>(serialized) with
        | Ok users ->
            test.areEqual 2 (Array.length users)
            test.areEqual "first" users.[0].Login
            test.areEqual false users.[0].IsAdmin
            test.areEqual "second" users.[1].Login
            test.areEqual true users.[1].IsAdmin

        | Error msg -> test.failwith msg

    testCaseAsync "Async.bind runs after parsing arrays of users" <|
        async {
            let usersInput = [|
                { Login = "first"; IsAdmin = false; LastActivity = DateTime.Now }
                { Login = "second"; IsAdmin = true; LastActivity = DateTime.Now }
            |]

            let pgetUsers() = Fable.Core.JS.Constructors.Promise.Create(fun res rej -> res(Json.parseAs<User array>(Json.stringify usersInput)))
            let getUsers() = Async.AwaitPromise(pgetUsers())
            let! users = getUsers()
            do test.areEqual 2 (Array.length users)
        }

    testCaseAsync "Async.bind runs after parsing arrays of users" <|
        async {
            let input = [| 1 .. 5 |]

            let pgetNumbers() = Fable.Core.JS.Constructors.Promise.Create(fun res rej -> res(Json.parseAs<int array>(Json.stringify input)))
            let getNumbers() = Async.AwaitPromise(pgetNumbers())

            let! users = getNumbers()
            do test.areEqual 5 (Array.length users)
        }

    testCaseAsync "Async.bind runs after parsing arrays of HighScore" <|
        async {
            let input = [| { Name = "first"; Score = 1 }; { Name = "second"; Score = 2 }; { Name = "third"; Score = 3 } |]

            let pgetScores() = Fable.Core.JS.Constructors.Promise.Create(fun res rej -> res(Json.parseAs<HighScore array>(Json.stringify input)))
            let getScores() = Async.AwaitPromise(pgetScores())

            let! users = getScores()
            do test.areEqual 3 (Array.length users)
        }

    testCase "Deserializing SecureRequest<User list> works" <| fun _ ->
        let inputs = """
            {
                "Ok": [
                    {
                        "Login": "foo",
                        "IsAdmin": false,
                        "LastActivity": "2018-08-15T15:12:50.0379614Z"
                    },
                    {
                        "Login": "bar",
                        "IsAdmin": false,
                        "LastActivity": "2018-08-09T18:48:07.0638391Z"
                    }
                ]
            }
        """

        inputs
        |> Json.parseNativeAs<SecureResponse<User list>>
        |> function
            | Ok [{ Login = "foo"; IsAdmin = false }; { Login = "bar"; IsAdmin = false }] -> test.pass()
            | otherwise -> test.fail()

    testCase "Result of unit can be converted" <| fun _ ->
        Ok ()
        |> Json.stringify
        |> Json.parseNativeAs<Result<unit, string>>
        |> test.areEqual (Ok ())

    testCase "Deserializing SecureRequest<User list> works from Fable 2 representation" <| fun _ ->
        let inputs = """
            [ "Ok",
                [{
                    "Login": "foo",
                    "IsAdmin": false,
                    "LastActivity": "2018-08-15T15:12:50.0379614Z"
                },
                {
                    "Login": "bar",
                    "IsAdmin": false,
                    "LastActivity": "2018-08-09T18:48:07.0638391Z"
                }]
            ]
        """

        inputs
        |> Json.parseNativeAs<SecureResponse<User list>>
        |> function
            | Ok [{ Login = "foo"; IsAdmin = false }; { Login = "bar"; IsAdmin = false }] -> test.pass()
            | otherwise -> test.fail()

    testCase "Nice error messages are created for missing JSON keys" <| fun _ ->
        "{ \"answer\": 42 }"
        |> Json.tryParseAs<Rec>
        |> function
            | Error errorMsg ->
                // generates (as one line):
                // Could not find the required key 'name' in the
                // JSON object literal with keys [ 'answer' ] to match
                // with record type 'Rec' that has fields [ required('name'), optional('age') ]
                test.passWith errorMsg
            | _ -> test.fail()

    testCase "Recursive records can be converted" <| fun _ ->
        let input = {
            Name = "root"
            Children = [
                { Name = "Child 1"; Children = [ { Name = "Grandchild 1"; Children = [ ] } ] }
                { Name = "Child 2"; Children = [ { Name = "Grandchild 2"; Children = [ ] } ] }
                { Name = "Child 2"; Children = [  ] }
            ]
        }

        input
        |> Json.stringify
        |> Json.parseAs<Recursive>
        |> test.areEqual input

    testCase "Recursive unions can be converted" <| fun _ ->
        let input = Branch(Branch(Leaf 10, Leaf 5), Leaf 5)

        input
        |> Json.stringify
        |> Json.parseAs<Tree>
        |> test.areEqual input

    testCase "Deserializing simple DU works" <| fun _ ->
        "[\"Technique\", \"Theme\", \"Collection\"]"
        |> Json.parseNativeAs<ConfigKey list>
        |> test.areEqual [ Technique ; Theme ; Collection ]

    testCase "Deserializing simple quoted DU works" <| fun _ ->
        """["\"Technique\"", "\"Theme\"", "\"Collection\""]"""
        |> Json.parseNativeAs<ConfigKey list>
        |> test.areEqual [ Technique ; Theme ; Collection ]

    testCase "Simple maps with unqouted DU keys can be deserialized" <| fun _ ->
        // This is what received from Giraffe
        let input = """{"Technique":{"name":"Техника","id":null}}"""
        let expected = Map.ofList [ Technique, { id = None; name = "Техника" } ]

        input
        |> Json.parseNativeAs<Config>
        |> test.areEqual expected

    testCase "Deserializing Dictionary<string, Record> works from object" <| fun _ ->
        let input = """
            {
                "Technique": { "name": "Zaid", "age": 22 },
                "Collection": { "name": "John", "age": 10 }
            }
        """

        input
        |> Json.parseNativeAs<Dictionary<string, DictValue>>
        |> fun result ->
            test.isTrue (result.ContainsKey "Technique")
            test.isTrue (result.ContainsKey "Collection")
            test.areEqual "Zaid" result.["Technique"].name
            test.areEqual "John" result.["Collection"].name

    testCase "Deserializing Dictionary<ConfigKey, Record> works from object" <| fun _ ->
        let input = """
            {
                "Technique": { "name": "Zaid", "age": 22 },
                "Collection": { "name": "John", "age": 10 }
            }
        """

        input
        |> Json.parseNativeAs<Dictionary<ConfigKey, DictValue>>
        |> fun result ->
            test.isTrue (result.ContainsKey Technique)
            test.isTrue (result.ContainsKey Collection)
            test.areEqual "Zaid" result.[Technique].name
            test.areEqual "John" result.[Collection].name


    testCase "Deserializing ResizeArray<string> works" <| fun _ ->
        "[\"One\", \"Two\"]"
        |> Json.parseNativeAs<ResizeArray<string>>
        |> fun result ->
            test.areEqual "One" result.[0]
            test.areEqual "Two" result.[1]

    testCase "Deserializing ResizeArray<int> works" <| fun _ ->
        "[1, 2]"
        |> Json.parseNativeAs<System.Collections.Generic.List<int>>
        |> fun result ->
            test.areEqual 1 result.[0]
            test.areEqual 2 result.[1]

    testCase "Deserializing ResizeArray<Record> works" <| fun _ ->
        "[{ \"name\": \"zaid\", \"age\":22 }]"
        |> Json.parseNativeAs<System.Collections.Generic.List<DictValue>>
        |> fun result ->
            test.areEqual "zaid" result.[0].name
            test.areEqual 22 result.[0].age

    testCase "Deserializing HashSet<int> works" <| fun _ ->
        "[1,2,3,4,5]"
        |> Json.parseNativeAs<HashSet<int>>
        |> fun result ->
            for n in [1..5] do test.isTrue (result.Contains n)


    testCase "HashSet<int> roundtrip" <| fun _ ->
        let input = HashSet<int>()
        for n in [1 .. 5] do
            input.Add n |> ignore

        input
        |> Json.stringify
        |> Json.parseNativeAs<HashSet<int>>
        |> fun result ->
            for n in [1..5] do test.isTrue (result.Contains n)

    testCase "Deserializing HashSet<DictValue> works" <| fun _ ->
        "[{ \"name\": \"zaid\", \"age\":22 }, { \"name\": \"john\", \"age\":10 }]"
        |> Json.parseNativeAs<HashSet<DictValue>>
        |> fun result ->
             test.isTrue (result.Contains { name = "zaid"; age = 22 })
             test.isTrue (result.Contains { name = "john"; age = 10 })

    testCase "Deserializing Dictionary<int, Record> works from object" <| fun _ ->
        let input = """
            {
                "1": { "name": "Zaid", "age": 22 },
                "2": { "name": "John", "age": 10 }
            }
        """

        input
        |> Json.parseNativeAs<Dictionary<int, DictValue>>
        |> fun result ->
            test.isTrue (result.ContainsKey(1))
            test.isTrue (result.ContainsKey(2))

            test.areEqual "Zaid" result.[1].name
            test.areEqual "John" result.[2].name

            test.areEqual 22 result.[1].age
            test.areEqual 10 result.[2].age

    testCase "Deserializing Dictionary<string, Record> works from object " <| fun _ ->
        let input = """
            {
                "1": { "name": "Zaid", "age": 22 },
                "2": { "name": "John", "age": 10 }
            }
        """

        input
        |> Json.parseNativeAs<Dictionary<string, DictValue>>
        |> fun result ->
            test.isTrue (result.ContainsKey("1"))
            test.isTrue (result.ContainsKey("2"))

            test.areEqual "Zaid" result.["1"].name
            test.areEqual "John" result.["2"].name

            test.areEqual 22 result.["1"].age
            test.areEqual 10 result.["2"].age

    testCase "Deserializing Dictionary<int64, Record> works from object" <| fun _ ->
        let input = """
            {
                "1": { "name": "Zaid", "age": 22 },
                "2": { "name": "John", "age": 10 }
            }
        """

        input
        |> Json.parseNativeAs<Dictionary<int64, DictValue>>
        |> fun result ->
            test.isTrue (result.ContainsKey 1L)
            test.isTrue (result.ContainsKey 2L)

            test.areEqual "Zaid" result.[1L].name
            test.areEqual "John" result.[2L].name

            test.areEqual 22 result.[1L].age
            test.areEqual 10 result.[2L].age

    testCase "Deserializing Dictionary<int, Record> works from array" <| fun _ ->
        let input = """
            [
                ["1", { "name": "Zaid", "age": 22 }],
                ["2", { "name": "John", "age": 10 }]
            ]
        """

        input
        |> Json.parseNativeAs<Dictionary<int, DictValue>>
        |> fun result ->
            test.isTrue (result.ContainsKey(1))
            test.isTrue (result.ContainsKey(2))

            test.areEqual "Zaid" result.[1].name
            test.areEqual "John" result.[2].name

            test.areEqual 22 result.[1].age
            test.areEqual 10 result.[2].age

    testCase "Simple maps with unqouted DU keys can be deserialized part 2" <| fun _ ->
        // This is what received from Giraffe
        let input = """
            {
                "Technique": {
                    "name": "Техника",
                    "id": null
                },
                "Theme": {
                    "name": "Тема",
                    "id": null
                }
            }
        """

        let expected = Map.ofList [
            Technique, { id = None; name = "Техника" }
            Theme, { id = None; name = "Тема" }
        ]

        input
        |> Json.parseNativeAs<Config>
        |> test.areEqual expected

    testCase "Simple maps with unqouted DU keys can be deserialized interchanged" <| fun _ ->
        // This is what received from Giraffe
        let input = """
            {
                "Technique": {
                    "name": "Техника",
                    "id": null
                },
                "Theme": {
                    "name": "Тема",
                    "id": null
                }
            }
        """

        let expected = Map.ofList [
            Theme, { id = None; name = "Тема" }
            Technique, { id = None; name = "Техника" }
        ]

        let deserialized = Json.parseNativeAs<Config> input

        Map.containsKey Technique deserialized
        |> test.areEqual true

        Map.containsKey Theme deserialized
        |> test.areEqual true

    testCase "Simple maps with unqouted DU keys can be deserialized interchanged: part 2" <| fun _ ->
        // This is what received from Giraffe
        let input = """
            {
                "Technique": {
                    "name": "Техника",
                    "id": null
                },
                "Theme": {
                    "name": "Тема",
                    "id": null
                },
                "Collection": {
                    "name": "Коллекция",
                    "id": null
                }
            }
        """

        let expected = Map.ofList [
            Theme, { id = None; name = "Тема" }
            Technique, { id = None; name = "Техника" }
            Collection, { id = None; name = "Коллекция" }
        ]

        let deserialized = Json.parseNativeAs<Config> input

        Map.containsKey Theme deserialized
        |> test.areEqual true

        Map.containsKey Technique deserialized
        |> test.areEqual true

        Map.containsKey Collection deserialized
        |> test.areEqual true

        test.areEqual expected deserialized

    testCase "Maps with unqouted DU keys can be deserialized" <| fun _ ->
        // This is what received from Giraffe
        let input = """{"Technique":{"name":"Техника","id":null},"Theme":{"name":"Тема","id":null},"Collection":{"name":"Коллекция","id":null}}"""

        let expected =
            [ Collection, {id=None;name="Коллекция"}
              Technique, {id=None;name="Техника"}
              Theme, {id=None;name="Тема"} ]
            |> Map.ofList

        input
        |> Json.parseNativeAs<Config>
        |> test.areEqual expected

    testCase "Maps with quoted DU keys can be deserialized" <| fun _ ->
        // This is what received from Giraffe
        let input = """{"\"Technique\"":{"name":"Техника","id":null},"\"Theme\"":{"name":"Тема","id":null},"\"Collection\"":{"name":"Коллекция","id":null}}"""

        let expected =
            [ Collection, {id=None;name="Коллекция"}
              Technique, {id=None;name="Техника"}
              Theme, {id=None;name="Тема"} ] |> Map.ofList

        input
        |> Json.parseNativeAs<Config>
        |> test.areEqual expected

    testCase "isQuoted works" <| fun _ ->
        "\"text\""
        |> Convert.isQuoted
        |> test.areEqual true

    testCase "removeQuotes works" <| fun _ ->
        "\"text\""
        |> Convert.removeQuotes
        |> test.areEqual "text"

    testCase "Maps can use structural equality" <| fun _ ->
        let firstInput =
            [ Collection, { id=None; name="Коллекция"}
              Technique,  { id=None; name="Техника"}
              Theme,      { id=None; name="Тема"} ] |> Map.ofList

        let secondInput =
            [ Theme,  { id = None; name="Тема"}
              Technique, { id = None; name="Техника"}
              Collection, { id = None; name="Коллекция"} ] |> Map.ofList

        test.areEqual firstInput secondInput

    testCase "Maps with DU keys can be converted" <| fun _ ->
        let input =
            [ Collection, { id=None; name="Коллекция"}
              Technique,  { id=None; name="Техника"}
              Theme,      { id=None; name="Тема"} ] |> Map.ofList

        input
        |> Json.stringify
        |> Json.parseNativeAs<Config>
        |> test.areEqual input

    testCase "SimpleJson.readPath works" <| fun _ ->
        let inputJson =
            """
            {
                "keys": {
                    "first": "first value",
                    "second": "second value"
                }
            }
            """

        let input = SimpleJson.parse inputJson
        let read keys = SimpleJson.readPath keys input
        match read ["keys"; "first"], read [ "keys"; "second" ] with
        | Some (JString first), Some (JString second) ->
            test.areEqual first "first value"
            test.areEqual second "second value"
        | result -> test.failwith (Json.stringify result)

    testCase "SimpleJson.readPath works with fromObjectLiteral" <| fun _ ->
        let subscription = createObj [
            "keys" ==> createObj [
                "first" ==> "first value"
                "second" ==> "second value"
            ]
        ]

        subscription
        |> SimpleJson.fromObjectLiteral
        |> Option.map (fun subscription ->
            let read keys = SimpleJson.readPath keys subscription
            match read ["keys"; "first"], read [ "keys"; "second" ] with
            | Some (JString first), Some (JString second) -> first, second
            | _ -> "", ""
        )
        |> test.areEqual (Some ("first value", "second value"))

    testCase "Deserializing tuple of single case unions works in Fable 1 representation" <| fun _ ->
        [
            // Fable 1 -> sent from server
            """
            {
                "Ok": [
                    { "AlbumId": 5 },
                    { "AlbumAuthor": "author" }
                ]
            }
            """
            // Mix Fable 1 and Fable 2
            """
            [ "Ok", [{ "AlbumId": 5 }, { "AlbumAuthor": "author" }]]
            """

            """
            { "Ok": [["AlbumId", 5], ["AlbumAuthor", "author"]] }
            """

            // Fable 2
            """
            [ "Ok", [["AlbumId", 5], ["AlbumAuthor", "author"]]]
            """
        ]
        |> List.map Json.parseNativeAs<Result<AlbumId * AlbumAuthor, string>>
        |> List.forall (function
            | Ok (AlbumId 5, AlbumAuthor "author") -> true
            | somethingElse -> false)
        |> test.equal true

    testCase "string * string []" <| fun _ ->
        let inputJson = "[\"first\", [\"1\"]]"

        let deserialized = Json.parseNativeAs<string * string []> inputJson
        match deserialized with
        | "first", [| "1" |] -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "string * string [] - multi elements" <| fun _ ->
        let inputJson = "[\"first\", [\"1\", \"2\"]]"

        let deserialized = Json.parseNativeAs<string * string []> inputJson
        match deserialized with
        | "first", [| "1"; "2" |] -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "(string * string []) [] - part 1" <| fun _ ->
        let inputJson = "[ [\"first\", [\"1\"]] ]"

        let deserialized = Json.parseAs<(string * string []) [ ]> inputJson
        match deserialized with
        | [| "first", [| "1" |] |] -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "ParseNative works with outer arrays" <| fun _ ->
        match SimpleJson.parseNative "[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]" with
        | JArray [ JArray [ JString "first"; JArray [ JString "1" ] ]; JArray [ JString "second"; JArray [ JString "2" ] ] ] ->
            test.pass()
        | _ -> test.fail()

    testCase "(string * string []) [] - part 2" <| fun _ ->
        let inputJson = "[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]"

        let deserialized = Json.parseNativeAs<(string * string list) list> inputJson
        match deserialized with
        | [ "first", [ "1" ]; "second", [ "2" ] ] -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "(string * string list) list - part 3" <| fun _ ->
        let inputJson = "[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]"

        let deserialized = Json.parseAs<(string * string []) list> inputJson
        match deserialized with
        | [ "first", [| "1" |]; "second", [| "2" |] ] -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "(string * string list) list - part 3" <| fun _ ->
        let inputJson = "[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]"
        let deserialized = Json.parseAs<(string * string list) [ ]> inputJson
        match deserialized with
        | [| "first", [ "1" ]; "second", [ "2" ] |] -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "Converter works for array of tuple" <| fun _ ->
        let typeInfo = TypeInfo.createFrom<(int * int) []>()
        match typeInfo with
        | TypeInfo.Array getElemType ->
            match getElemType() with
            | TypeInfo.Tuple getTupleTypes ->
                match getTupleTypes() with
                | [| TypeInfo.Int32; TypeInfo.Int32 |] -> test.pass()
                | _ -> test.failwith "Expected int * int"
            | _ -> test.failwith "Expected tuple"
        | other -> test.failwith (sprintf "Expected array but got %A" other)

    testCase "Array of tuples" <| fun _ ->
        let inputJson = "[ [2,3], [4,5], [5,6] ]"
        match Json.parseNativeAs<(int * int) []> inputJson with
        | [| (2,3); (4,5); (5,6) |] -> test.pass()
        | _ -> test.fail()

    testCase "Deserializing highlights" <| fun _ ->
        let inputJson = """
            {
                "Highlights": [
                    [ "first", [ "1" ] ],
                    [ "second", [ "2" ] ]
                ]
            }
        """

        match Json.parseNativeAs<TupleStringArrays> inputJson with
        | { Highlights = [| "first", [| "1" |]; "second", [| "2" |] |] } -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "Deserializing maps with record as key" <| fun _ ->
        [ { Key = 1; Value = "Value" }, 1 ]
        |> Map.ofList
        |> Json.stringify
        |> Json.parseNativeAs<Map<RecordAsKey, int>>
        |> Map.toList
        |> function
            | [ { Key = 1; Value = "Value" }, 1 ] -> test.pass()
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing maps with record as quoted serialized key" <| fun _ ->
        """
        [
            ["{\"Key\":1,\"Value\":\"Value\"}", 1]
        ]
        """
        |> Json.parseNativeAs<Map<RecordAsKey, int>>
        |> Map.toList
        |> function
            | [ { Key = 1; Value = "Value" }, 1 ] -> test.pass()
            | otherwise -> test.unexpected otherwise


    testCase "Deserializing maps with record as quoted serialized key 2" <| fun _ ->
        "
        [
            [{\"Key\":1,\"Value\":\"Value\"}, 1]
        ]
        "
        |> Json.parseNativeAs<Map<RecordAsKey, int>>
        |> Map.toList
        |> function
            | [ { Key = 1; Value = "Value" }, 1 ] -> test.pass()
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing byte[] serialized as base64" <| fun _ ->
        "{ \"Hash\": \"AQIDBAU=\" }"
        |> Json.parseNativeAs<WithByteArray>
        |> function
            | { Hash = [| 1uy; 2uy; 3uy; 4uy; 5uy |] } -> test.pass()
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing flaot32/single" <| fun _ ->
        "{ \"Value\": 123 }"
        |> Json.parseAs<WithFloat32>
        |> function
            | { Value = 123.0f } -> test.pass()
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing unsigned integers" <| fun _ ->
        "{ \"Sixteen\": 10, \"ThirtyTwo\": 10, \"SixtyFour\":10 }"
        |> Json.parseNativeAs<UnsignedIntegers>
        |> function
            | { Sixteen = first; ThirtyTwo = 10u;  SixtyFour = 10UL } when int first = 10 -> test.pass()
            | otherValue -> test.unexpected otherValue

    testCase "BigInt can be detected in run time" <| fun _ ->
        InteropUtil.isBigInt (bigint 5)
        |> test.equal true

        InteropUtil.isBigInt null
        |> test.equal false

        InteropUtil.isBigInt (bigint -5)
        |> test.equal true

    testCase "BigInt can be JSON.stringified" <| fun _ ->
        match Json.stringify 5I with
        | "\"5\"" -> test.pass()
        | otherwise -> test.unexpected otherwise

    testCase "Stringifying DateTimeOffset preserves timezone" <| fun _ ->
        let dateOffset = DateTimeOffset.Now
        let record = { DateOffset = dateOffset }
        let stringified = dateOffset.ToString("O")
        match SimpleJson.parseNative (Json.stringify record) with
        | JObject dict ->
            match Map.tryFind "DateOffset" dict with
            | Some (JString value) -> test.areEqual value stringified
            | otherwise -> test.unexpected otherwise
        | otherwise -> test.unexpected otherwise

    testCase "Testing for DateTimeOffset works in runtime" <| fun _ ->
        let dateOffset = DateTimeOffset.Now
        InteropUtil.isDateOffset dateOffset
        |> test.areEqual true

    testCase "DateTimeOffset uses ToString('O') when stringified" <| fun _ ->
        let dateOffset = DateTimeOffset.Now
        let expected = dateOffset.ToString("O")
        match SimpleJson.parseNative (Json.stringify dateOffset) with
        | JString actual -> test.areEqual actual expected
        | otherwise -> test.unexpected otherwise

    testCase "decimal arithmetic works after deserialization" <| fun _ ->
        let input = """{ "Value": 9.5 }"""
        match Json.tryParseNativeAs<Balance> input with
        | Ok balance ->
            let value = balance.Value
            let discount = value - 9.0M
            test.areEqual discount 0.5M

        | Error error ->
            test.unexpected error

    testCase "decimal arithmetic works after deserialization from generic type: Result" <| fun _ ->
        let input = """{ "Ok": { "Value": 9.5  } }"""
        match Json.parseNativeAs<Result<Balance, int>> input with
        | Ok balance ->
            let value = balance.Value
            let discount = value - 9.0M
            test.areEqual discount 0.5M

        | Error error ->
            test.unexpected error

    testCase "decimal arithmetic works after deserialization from generic type: Maybe" <| fun _ ->
        let input = """{ "Just": { "Value": 9.5  } }"""
        match Json.parseNativeAs<Maybe<Balance>> input with
        | Just balance ->
            let value = balance.Value
            let discount = value - 9.0M
            test.areEqual discount 0.5M

        | Nothing -> test.unexpected "should not happen"

    testCase "Deserializing complex keys for Map" <| fun _ ->
        let value = Map.ofList [ ComplexKey 1, Just 5 ]
        let input = Json.stringify value
        input
        |> Json.parseNativeAs<Map<ComplexKey<int>, Maybe<int>>>
        |> Map.tryFind (ComplexKey 1)
        |> function
            | Some (Just 5) -> test.passWith (sprintf "Succesfully deserialized %s" input)
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing complex keys with guids for Map" <| fun _ ->
        let guid = Guid.NewGuid()
        let value = Map.ofList [ ComplexKey guid, Just guid ]
        let input = Json.stringify value
        input
        |> Json.parseNativeAs<Map<ComplexKey<Guid>, Maybe<Guid>>>
        |> Map.tryFind (ComplexKey guid)
        |> function
            | Some (Just value) -> test.areEqual value guid
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing complex keys with guids for Map" <| fun _ ->
        let value = Map.ofList [ ComplexKey "key", Just "value" ]
        let input = Json.stringify value
        input
        |> Json.parseNativeAs<Map<ComplexKey<string>, Maybe<string>>>
        |> Map.tryFind (ComplexKey "key")
        |> function
            | Some (Just "value") -> test.pass()
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing complex keys for Map from server" <| fun _ ->
        let input = """
            {"{\"ComplexKey\":1}":{"Just":5}}
        """
        input
        |> Json.parseNativeAs<Map<ComplexKey<int>, Maybe<int>>>
        |> Map.tryFind (ComplexKey 1)
        |> function
            | Some (Just 5) -> test.passWith (sprintf "Succesfully deserialized %s" input)
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing complex keys as strings for Map from server" <| fun _ ->
        let input = """
            {"{\"ComplexKey\":\"key\"}":{"Just":5}}
        """
        input
        |> Json.parseNativeAs<Map<ComplexKey<string>, Maybe<int>>>
        |> Map.tryFind (ComplexKey "key")
        |> function
            | Some (Just 5) -> test.passWith (sprintf "Succesfully deserialized %s" input)
            | otherwise -> test.unexpected otherwise

    testCase "Deserializing JSON to anonymous records" <| fun _ ->
        """ { "name": "John"  } """
        |> Json.parseNativeAs<{| name: string |}>
        |> fun result ->
            match result.name with
            | "John" -> test.pass()
            | other -> test.unexpected other

    testCase "Deserializing JSON to anonymous records with options" <| fun _ ->
        """ { "name": "John" } """
        |> Json.parseNativeAs<{| name: string; age : int option |}>
        |> fun result ->
            match result.name, result.age with
            | "John", None -> test.pass()
            | other -> test.unexpected other

    testCase "Deserializing JSON to nested anonymous records" <| fun _ ->
        """ { "name": "John", "child": { "name": "child" }  } """
        |> Json.parseNativeAs<{| name: string; child: {| name: string |} |}>
        |> fun result ->
            match result.name, result.child.name with
            | "John", "child" -> test.pass()
            | other -> test.unexpected other

    testCase "Deserializing JSON to optional nested anonymous records with props" <| fun _ ->
        """ { "name": "John", "child": {  }  } """
        |> Json.parseNativeAs<{| name: string; child: {| name: string option |} |}>
        |> fun result ->
            match result.name, result.child.name with
            | "John", None -> test.pass()
            | other -> test.unexpected other

    testCase "Deserializing JSON to anonymous records with arrays" <| fun _ ->
        """ { "numbers": [1,2,3,4,5]  } """
        |> Json.parseNativeAs<{| numbers: int array |}>
        |> fun result -> result.numbers
        |> Array.sum
        |> test.areEqual 15

    testCase "Deserializing JSON to anonymous records with lists" <| fun _ ->
        """ { "numbers": [1,2,3,4,5]  } """
        |> Json.parseNativeAs<{| numbers: int list |}>
        |> fun result -> result.numbers
        |> List.sum
        |> test.areEqual 15

    testCase "Deserializing JSON to anonymous records with nested types" <| fun _ ->
        """ { "union": "One" } """
        |> Json.parseNativeAs<{| union: SimpleUnion |}>
        |> fun result -> result.union
        |> function
            | SimpleUnion.One -> test.pass()
            | SimpleUnion.Two -> test.fail()

    testCase "Converting TimeSpans works" <| fun _ ->
        TimeSpan.FromMilliseconds 1000.0
        |> Json.stringify
        |> Json.parseNativeAs<TimeSpan>
        |> test.areEqual (TimeSpan.FromMilliseconds 1000.0)

    testCase "Anonymous Records with generic unions" <| fun _ ->
        Just {| one = 1 |}
        |> Json.stringify
        |> Json.parseNativeAs<Maybe<{| one: int |}>>
        |> function
            | Just record -> test.areEqual 1  record.one
            | otherwise -> test.fail()

    testCase "Nested anonymous records with generic unions" <| fun _ ->
        """
        {"Just":{"nested":{"name":"John"}}}
        """
        |> Json.parseNativeAs<Maybe<{| nested: {| name: string |} |}>>
        |> function
            | Just record -> test.areEqual record.nested.name "John"
            | otherwise -> failwithf "%s" (Json.stringify otherwise)

    testCase "Nested anonymous records with generic unions" <| fun _ ->
        """
        {"Just":{"parent":{"child":"Node"}}}
        """
        |> Json.parseNativeAs<Maybe<{| parent: {| child: string |} |}>>
        |> function
            | Just record -> test.areEqual record.parent.child "Node"
            | otherwise -> failwithf "%s" (Json.stringify otherwise)

    testCase "Nested anonymous records with deeply nested generic unions" <| fun _ ->
        """
        {"Just":{"parent":{"child":{"grandChild": "Nested Node"}}}}
        """
        |> Json.parseNativeAs<Maybe<{| parent: {| child: {| grandChild: string |} |} |}>>
        |> function
            | Just record -> test.areEqual record.parent.child.grandChild "Nested Node"
            | otherwise -> failwithf "%s" (Json.stringify otherwise)

    testCase "Nested anonymous records with deeply nested generic unions and optional types" <| fun _ ->
        """
        {"Just":{"parent":{"child":{"grandChild": "Nested Node"}}}}
        """
        |> Json.parseNativeAs<Maybe<{| parent: {| child: {| grandChild: string; whatever: string option |} |} |}>>
        |> function
            | Just record ->
                test.areEqual record.parent.child.grandChild "Nested Node"
                test.areEqual record.parent.child.whatever None

            | otherwise -> failwithf "%s" (Json.stringify otherwise)

    testCase "Nested anonymous records with optional deeply nested generic unions and optional types" <| fun _ ->
        """
        {"Just":{"parent":{"child":{"grandChild": "Nested Node"}}}}
        """
        |> Json.parseNativeAs<Maybe<{| parent: {| child: {| grandChild: string |} option |} |}>>
        |> function
            | Just record ->
                match record.parent.child with
                | Some child -> test.areEqual child.grandChild "Nested Node"
                | None -> test.fail()
            | otherwise -> failwithf "%s" (Json.stringify otherwise)

    testCase "Deserializing generic record with anonymous records" <| fun _ ->
        """
        {"value":{"parent":{"child":{"grandChild": "Nested Node"}}}}
        """
        |> Json.parseNativeAs<GenericValue<{| parent: {| child: {| grandChild: string |} option |} |}>>
        |> fun record ->
            match record.value.parent.child with
            | Some child -> test.areEqual child.grandChild "Nested Node"
            | None -> test.fail()

    testCase "Deserializing generic union with tuple option as type parameter" <| fun _ ->
        """
        {"ComplexKey": [1, "foo"] }
        """
        |> Json.parseNativeAs<ComplexKey<(int * string) option>>
        |> fun union ->
            match union with
            | ComplexKey (Some (1, "foo")) -> test.pass()
            | ComplexKey _ -> test.fail()

    testCase "Deserializing generic union with nested tuple and options as type parameter" <| fun _ ->
        """
        {"ComplexKey": [1, [null, 3]] }
        """
        |> Json.parseNativeAs<ComplexKey<(int * (string option * int) option) option>>
        |> fun union ->
            match union with
            | ComplexKey (Some (1, Some (None, 3))) -> test.pass()
            | ComplexKey _ -> test.fail()

    testCase "Deserializing enums works from integers" <| fun _ ->
        """
        { "EnumValue": 1 }
        """
        |> Json.parseNativeAs<RecordWithEnum>
        |> fun value ->
            match value.EnumValue with
            | SimpleEnum.One -> test.pass()
            | _ -> test.fail()

    testCase "Deserializing enums works from floats" <| fun _ ->
        """
        { "EnumValue": 1.0 }
        """
        |> Json.parseNativeAs<RecordWithEnum>
        |> fun value ->
            match value.EnumValue with
            | SimpleEnum.One -> test.pass()
            | _ -> test.fail()

    testCase "Deserializing enums works from strings" <| fun _ ->
        """
        { "EnumValue": "2" }
        """
        |> Json.parseNativeAs<RecordWithEnum>
        |> fun value ->
            match value.EnumValue with
            | SimpleEnum.Two -> test.pass()
            | _ -> test.fail()

    testCase "Deserializing int16 with a unit of measure" <| fun _ ->
        let expected = 5s<someUnit>

        Json.stringify expected
        |> Json.parseNativeAs<int16<someUnit>>
        |> fun value ->
            test.areEqual value expected

    testCase "Deserializing int with a unit of measure" <| fun _ ->
        let expected = 4<someUnit>

        Json.stringify expected
        |> Json.parseNativeAs<int<someUnit>>
        |> fun value ->
            test.areEqual value expected

    testCase "Deserializing int64 with a unit of measure" <| fun _ ->
        let expected = 222222222222L<someUnit>

        Json.stringify expected
        |> Json.parseNativeAs<int64<someUnit>>
        |> fun value ->
            test.areEqual value expected

    testCase "Deserializing decimal with a unit of measure" <| fun _ ->
        let expected = 2.0M<someUnit>

        Json.stringify expected
        |> Json.parseNativeAs<decimal<someUnit>>
        |> fun value ->
            test.areEqual value expected

    testCase "Deserializing float with a unit of measure" <| fun _ ->
        let expected = 42.3333<someUnit>

        Json.stringify expected
        |> Json.parseNativeAs<float<someUnit>>
        |> fun value -> test.areEqual value expected

    testCase "Reading a number as a string should just work" <| fun _ ->
        "{\"value\": 2010 }"
        |> Json.parseNativeAs<{| value: string |}>
        |> fun result -> test.areEqual result.value "2010"


    testCase "Flags Enum roundtrip" <| fun _ ->
        let input = FlagsEnum.A ||| FlagsEnum.C

        input
        |> Json.stringify
        |> Json.parseNativeAs<FlagsEnum>
        |> fun result -> test.areEqual result input
]


[<EntryPoint>]
let main args = Mocha.runTests everyTest