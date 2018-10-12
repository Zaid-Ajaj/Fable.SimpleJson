module Tests

open QUnit
open Fable.Core
open Fable.Parsimmon
open Fable.SimpleJson
open Fable.SimpleJson.Parser
open Fable.Core.JsInterop
open System

registerModule "Simple Json Tests"


[<Emit("console.log($0)")>]
let log (x: 't) : unit = jsNative

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

testCase "Negative numbers can be parsed" <| fun test ->
    ["-5"; "-5.2"; "-1"; "-0.5"]
    |> List.choose (parseUsing jnumber)
    |> test.areEqual [JNumber -5.0; JNumber -5.2; JNumber -1.0; JNumber -0.5]

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


testCase "SimpleJson.mapByKey works" <| fun test ->
    let makeUpper key value =
        match key, value with
        | "first_name", JString name -> JString (name.ToUpper())
        | _, value -> value

    "[{\"first_name\":\"john\"},{\"first_name\":\"jane\"}]"
    |> SimpleJson.parse
    |> SimpleJson.mapbyKey makeUpper
    |> SimpleJson.toString
    |> test.areEqual "[{\"first_name\":\"JOHN\"},{\"first_name\":\"JANE\"}]"

registerModule "Convert Tests"

type SimpleRecord =
    { First: string;
      Age: int
      Salary: float }

let fromJson<'t> json typeInfo =
    unbox<'t> (Convert.fromJsonAs json typeInfo)


testCase "fromJsonAs works generated type information" <| fun test ->
    let expected =  { First = "John"; Age = 21; Salary = 3.99 }
    let deserialized = Json.parseAs<SimpleRecord> """{"First": "John", "Age": 21, "Salary": 3.99 }"""
    test.areEqual expected deserialized

type SimpleDU =
    | One
    | Two of int
    | Three of string

testCase "Auto derserialization: parsing lists of unions from Fable 2" <| fun test ->
    let jsonInput = """[["One"], ["Two", 20], ["Three", "some value"]]"""
    let expected =  [ One; Two 20; Three "some value" ]
    let deserialized = Json.parseAs<SimpleDU list> jsonInput
    test.areEqual expected deserialized

testCase "Auto derserialization: parsing lists of unions from Fable 1" <| fun test ->
    let jsonInput =  """["One", { "Two" : [20] }, {"Three": ["some value"] }]"""
    let expected =  [ One; Two 20; Three "some value" ]
    let deserialized = Json.parseAs<SimpleDU list> jsonInput
    test.areEqual expected deserialized

testCase "Auto derserialization: parsing lists of unions from Fable 1, values are non-arrays" <| fun test ->
    let jsonInput =  """["One", { "Two" : 20 }, {"Three": "some value" }]"""
    let expected =  [ One; Two 20; Three "some value" ]
    let deserialized = Json.parseAs<SimpleDU list> jsonInput
    test.areEqual expected deserialized

testCase "fromJsonAs works with simple DU's serialized as objects with values as non-arrays" <| fun test ->
    """["One", { "Two" :20 }, {"Three": "some value" }]"""
    |> Json.parseAs<SimpleDU list>
    |> test.areEqual [ One; Two 20; Three "some value" ]

testCase "Parsing maps serialized with JSON.stringify" <| fun test ->
    [ "A", "a"; "B", "b"; "C", "c" ]
    |> Map.ofList
    |> Fable.Import.JS.JSON.stringify
    |> Json.parseAs<Map<string, string>>
    |> Map.toList
    |> test.areEqual [ "A", "a"; "B", "b"; "C", "c" ]

testCase "Parsing maps serialized with toJson from Fable 1" <| fun test ->
    let inputJson = """ { "A":"a", "B":"b", "C":"c" } """
    Json.parseAs<Map<string, string>> inputJson
    |> Map.toList
    |> test.areEqual [ "A", "a"; "B", "b"; "C", "c" ]

testCase "Parsing maps with integers as keys from string works" <| fun test ->
    "[[1, \"one\"], [2, \"two\"], [3,\"three\"]]"
    |> Json.parseAs<Map<int, string>>
    |> Map.toList
    |> test.areEqual [ 1, "one"; 2, "two"; 3, "three" ]

testCase "Parsing maps with integers as keys from string works where integers are stringified" <| fun test ->
    "[[\"1\", \"one\"], [\"2\", \"two\"], [\"3\",\"three\"]]"
    |> Json.parseAs<Map<int, string>>
    |> Map.toList
    |> test.areEqual [ 1, "one"; 2, "two"; 3, "three" ]

testCase "Parsing maps with integers as keys" <| fun test ->
    [ 1, "one"; 2, "two"; 3, "three" ]
    |> Map.ofList
    |> Json.stringify
    |> Json.parseAs<Map<int, string>>
    |> Map.toList
    |> test.areEqual [ 1, "one"; 2, "two"; 3, "three" ]

testCase "Parsing maps with strings as keys with complex values" <| fun test ->
    [ "test", [ One; Two 20; Three "some value" ] ]
    |> Map.ofList
    |> Fable.Import.JS.JSON.stringify
    |> Json.parseAs<Map<string, SimpleDU list>>
    |> Map.toList
    |> test.areEqual [ "test", [ One; Two 20; Three "some value" ] ]

testCase "Map.toList works" <| fun test ->
    [ 1, "one"; 2, "two" ]
    |> Map.ofList
    |> Map.toList
    |> test.areEqual [ 1, "one"; 2, "two" ]

registerModule "Json"

type WithString = { Str: string }

testCase "Deserialize string with json inside" <| fun test ->
    let str = "1"
    let json1 = { Str = str } |> Json.stringify
    let json2 = { Str = json1 } |> Json.stringify
    let parsed2 = Json.parseAs<WithString> json2
    let parsed1 = Json.parseAs<WithString> parsed2.Str
    test.areEqual str parsed1.Str

testCase "Deserialize string with escaped quotes" <| fun test ->
    let jsonString = "{\"a\": \"\\\"\\\"\"}"
    let json = jsonString |> SimpleJson.parse

    match json with
    | JObject literal -> 
        match Map.find "a" literal with 
        | JString "\"\"" -> test.pass()
        | _ -> test.failwith "Unexpected value of property 'a'"
    | _ -> test.failwith "Unexpected json type"

testCase "Deserialize string with special char" <| fun test ->
    let str = "\t"
    let o = { Str = str }
    let json = o |> Json.stringify
    let deserialized = json |> Json.parseAs<WithString>
    deserialized.Str |> test.areEqual str

type SimpleRec = { A: int; B: string; C: bool; D: float; E: decimal }

testCase "Converting records with simple types" <| fun test ->
    { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
    |> Json.stringify
    |> Json.parseAs<SimpleRec>
    |> test.areEqual { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }

testCase "Native: Converting records with simple types" <| fun test ->
    { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
    |> Json.stringify
    |> Json.parseNativeAs<SimpleRec>
    |> test.areEqual { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }

testCase "Converting records with simple types, strings can be null" <| fun test ->
    { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }
    |> Json.stringify
    |> Json.parseAs<SimpleRec>
    |> test.areEqual { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }


testCase "Native: Converting records with simple types, strings can be null" <| fun test ->
    { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }
    |> Json.stringify
    |> Json.parseNativeAs<SimpleRec>
    |> test.areEqual { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }

testCase "Converting lists records with simple types" <| fun test ->
    [ { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } ]
    |> Json.stringify
    |> Json.parseAs<SimpleRec list>
    |> test.areEqual [ { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } ]

testCase "Native: Converting records with simple types, strings can be null" <| fun test ->
    { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }
    |> Json.stringify
    |> Json.parseNativeAs<SimpleRec>
    |> test.areEqual { A = 20; B = null; C = false; D = 2.0451; E = 23.42M }

testCase "Converting arrays records with simple types" <| fun test ->
    [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]
    |> Json.stringify
    |> Json.parseAs<SimpleRec[]>
    |> test.areEqual [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]

testCase "Native: Converting arrays records with simple types" <| fun test ->
    [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]
    |> Json.stringify
    |> Json.parseNativeAs<SimpleRec[]>
    |> test.areEqual [| { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M } |]

testCase "Converting optional (Some) records with simple types" <| fun test ->
    { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
    |> Some
    |> Json.stringify
    |> Json.parseAs<Option<SimpleRec>>
    |> test.areEqual (Some { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M })

testCase "Native: Converting optional (Some) records with simple types" <| fun test ->
    { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M }
    |> Some
    |> Json.stringify
    |> Json.parseAs<Option<SimpleRec>>
    |> test.areEqual (Some { A = 20; B = "BB"; C = false; D = 2.0451; E = 23.42M })

testCase "Converting optional (None) records with simple types" <| fun test ->
    None
    |> Json.stringify
    |> Json.parseAs<Option<SimpleRec>>
    |> test.areEqual None

testCase "Native: Converting optional (None) records with simple types" <| fun test ->
    None
    |> Json.stringify
    |> Json.parseAs<Option<SimpleRec>>
    |> test.areEqual None

type Maybe<'t> =
    | Just of 't
    | Nothing

type RecWithGenDU<'t> = { Other: 't; Value : Maybe<int> }

type GenericTestRecord<'t> = { Other: 't; Value : Maybe<int> }

type Types() =
    static member getNameOf<'t> ([<Inject>] ?resolver: ITypeResolver<'t>) : string =
        let resolvedType = resolver.Value.ResolveType()
        resolvedType.Name

    static member get<'t> ([<Inject>] ?resolver: ITypeResolver<'t>) : System.Type =
        let resolvedType = resolver.Value.ResolveType()
        resolvedType

testCase "Name can be extracted from RecWithGenDU" <| fun test ->
    let name = Types.getNameOf<Maybe<list<RecWithGenDU<string>>>>()
    test.pass()

testCase "Name can be extraced from GenericRecord" <| fun test ->
    let name = Types.getNameOf<Maybe<list<GenericTestRecord<string>>>>()
    test.pass()

testCase "TypeInfo of Maybe<<Maybe<int>> can be generated" <| fun test ->
    let typeInfo = Types.get<Maybe<Maybe<int>>>()

    let rec getGenericArgs (typeDef: System.Type) : string list =
        [ yield typeDef.Name
          for genericTypeArg in typeDef.GetGenericArguments() do
            yield! getGenericArgs genericTypeArg ]

    typeInfo.GetGenericArguments()
    |> Array.map (fun t -> t.Name)
    |> List.ofArray
    |> test.areEqual ["Maybe`1"]

testCase "Converting maps works" <| fun test ->
    [ "test", [ One; Two 20; Three "some value" ] ]
    |> Map.ofList
    |> Fable.Import.JS.JSON.stringify
    |> Json.parseAs<Map<string, SimpleDU list>>
    |> Map.toList
    |> test.areEqual [ "test", [ One; Two 20; Three "some value" ] ]

testCase "Native: Converting maps works" <| fun test ->
    [ "test", [ One; Two 20; Three "some value" ] ]
    |> Map.ofList
    |> Fable.Import.JS.JSON.stringify
    |> Json.parseNativeAs<Map<string, SimpleDU list>>
    |> Map.toList
    |> test.areEqual [ "test", [ One; Two 20; Three "some value" ] ]

testCase "TypeInfo can be generated from GenericTestRecord" <| fun test ->
    let typeInfo = TypeInfo.createFrom<Maybe<list<GenericTestRecord<string>>>>()
    test.pass()

testCase "Converting generic record with Maybe<int> as a field" <| fun test ->
    Just [ { Other = "wise"; Value = Just 20 } ]
    |> Json.stringify
    |> Json.parseAs<Maybe<list<RecWithGenDU<string>>>>
    |> test.areEqual (Just [ { Other = "wise"; Value = Just 20 } ] )

testCase "Native: Converting generic record with Maybe<int> as a field" <| fun test ->
    Just [ { Other = "wise"; Value = Just 20 } ]
    |> Json.stringify
    |> Json.parseNativeAs<Maybe<list<RecWithGenDU<string>>>>
    |> test.areEqual (Just [ { Other = "wise"; Value = Just 20 } ] )

type RecordWithArray = { Arr : Option<Maybe<int>> [ ] }

testCase "Converting record with arrays" <| fun test ->
    { Arr = [| Some Nothing; Some (Just 20) |] }
    |> Json.stringify
    |> Json.parseAs<RecordWithArray>
    |> test.areEqual { Arr = [| Some Nothing; Some (Just 20) |] }

testCase "Native: Converting record with arrays" <| fun test ->
    { Arr = [| Some Nothing; Some (Just 20) |] }
    |> Json.stringify
    |> Json.parseNativeAs<RecordWithArray>
    |> test.areEqual { Arr = [| Some Nothing; Some (Just 20) |] }

type RecWithByte = { byteValue: byte }

testCase "Converting record with bytes" <| fun test ->
    { byteValue = byte 200  }
    |> Json.stringify
    |> Json.parseAs<RecWithByte>
    |> test.areEqual { byteValue = byte 200 }

testCase "Native: Converting record with bytes" <| fun test ->
    { byteValue = byte 200  }
    |> Json.stringify
    |> Json.parseNativeAs<RecWithByte>
    |> test.areEqual { byteValue = byte 200 }

type RecWithShort = { shortValue: int16 }

testCase "Converting record with Int16" <| fun test ->
    { shortValue = int16 200  }
    |> Json.stringify
    |> Json.parseAs<RecWithShort>
    |> test.areEqual { shortValue = int16 200 }

testCase "Native: Converting record with Int16" <| fun test ->
    { shortValue = int16 200  }
    |> Json.stringify
    |> Json.parseNativeAs<RecWithShort>
    |> test.areEqual { shortValue = int16 200 } 

testCase "Converting record with negative Int16" <| fun test ->
    { shortValue = int16 -200  }
    |> Json.stringify
    |> Json.parseAs<RecWithShort>
    |> test.areEqual { shortValue = int16 -200 }

testCase "Native: Converting record with negative Int16" <| fun test ->
    { shortValue = int16 -200  }
    |> Json.stringify
    |> Json.parseNativeAs<RecWithShort>
    |> test.areEqual { shortValue = int16 -200 } 

type ComplexRecord<'t> = {
    Value: 't;
    HasValue: bool;
    Dates: DateTime list
    DateTimeOffsets: DateTimeOffset list
    RecordList : SimpleRec list;
    ArrayOfOptionalRecords : Option<SimpleRec>[]
    OptionalRecord : Option<SimpleRec>
    Doubtful : Maybe<Maybe<Maybe<Maybe<int>>>>
    SimpleTuples : Option<string> * int * System.Guid
    NestedMaps: Map<string, Map<string, Maybe<int64>>> list
    Int64 : Maybe<int64> * Option<int64> * int64 list
    BigInt : Maybe<bigint> * Option<bigint> * bigint list
}

testCase "Converting complex generic types" <| fun test ->
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

testCase "Native: Converting complex generic types" <| fun test ->
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

testCase "Result can be converted" <| fun test ->
    [ Ok "value"; Error (Maybe.Just 5) ]
    |> Json.stringify
    |> Json.parseAs<list<Result<string, Maybe<int>>>>
    |> test.areEqual [ Ok "value"; Error (Maybe.Just 5) ]

testCase "Native: Result can be converted" <| fun test ->
    [ Ok "value"; Error (Maybe.Just 5) ]
    |> Json.stringify
    |> Json.parseNativeAs<list<Result<string, Maybe<int>>>>
    |> test.areEqual [ Ok "value"; Error (Maybe.Just 5) ]

type RecordWithLong = { value : Maybe<Option<int64>>; other: string }
type RecordWithBigInt = { value : Maybe<Option<bigint>> }

type SingleCase = SingleCase of int64

testCase "SingleCase of int64 can be converter" <| fun test ->
    SingleCase 20L
    |> Json.stringify
    |> Json.parseAs<SingleCase>
    |> test.areEqual (SingleCase 20L)

testCase "Native: SingleCase of int64 can be converter" <| fun test ->
    SingleCase 20L
    |> Json.stringify
    |> Json.parseNativeAs<SingleCase>
    |> test.areEqual (SingleCase 20L)

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

testCase "BitConverter works for int64 <-> (int32 * int32) conversion" <| fun test ->
    [ for i in 1 .. 10 -> i, i * i]
    |> List.map (integersToInt64 >> int64ToIntegers)
    |> test.areEqual [for i in 1 .. 10 -> i, i * i ]

testCase "Long can be converted" <| fun test ->
    { value = Just (Some 5L); other = "" }
    |> Json.stringify
    |> Json.parseAs<RecordWithLong>
    |> test.areEqual { value = Just (Some 5L); other = "" }

testCase "Native: Long can be converted" <| fun test ->
    { value = Just (Some 5L); other = "" }
    |> Json.stringify
    |> Json.parseNativeAs<RecordWithLong>
    |> test.areEqual { value = Just (Some 5L); other = "" }

testCase "BigInt can be converted" <| fun test ->
    { value = Just (Some 5I) }
    |> Json.stringify
    |> Json.parseAs<RecordWithBigInt>
    |> test.areEqual { value = Just (Some 5I) }

testCase "bigint list can be converted" <| fun test ->
    [ 5I; 2I ]
    |> Json.stringify
    |> Json.parseAs<bigint list>
    |> test.areEqual [ 5I; 2I ]

testCase "Native: bigint list can be converted" <| fun test ->
    [ 5I; 2I ]
    |> Json.stringify
    |> Json.parseNativeAs<bigint list>
    |> test.areEqual [ 5I; 2I ]

testCase "bigint list can be converted from Json as numbers" <| fun test ->
    "[5, 2]"
    |> Json.parseAs<bigint list>
    |> test.areEqual [ 5I; 2I ]

testCase "bigint list can be converted from Json as strings" <| fun test ->
    "[\"5\", \"2\"]"
    |> Json.parseAs<bigint list>
    |> test.areEqual [ 5I; 2I ]

testCase "TypeInfo for Option<bigint> list can be generated" <| fun test ->
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

testCase "TypeInfo for Option<bigint> array can be generated" <| fun test ->
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

testCase "Simple Option<BigInt> can be converted from Json" <| fun test ->
    "[\"5\", \"2\", null]"
    |> Json.parseAs<Option<bigint> list>
    |> test.areEqual [ Some 5I; Some 2I; None ]

testCase "Simple Option<BigInt> can be converted manually from Json as string" <| fun test ->
    let typeInfo = TypeInfo.createFrom<Option<bigint> list>()
    let inputJson = SimpleJson.parse "[\"5\", \"2\", null]"
    let result = Convert.fromJsonAs inputJson typeInfo
    unbox<Option<bigint> list> result
    |> test.areEqual [ Some 5I; Some 2I; None ]

testCase "Simple Json array can be parsed as Json" <| fun test ->
    "[\"5\", \"2\", null]"
    |> SimpleJson.parseNative
    |> test.areEqual (JArray [ JString "5"; JString "2" ; JNull ])

testCase "Simple Option<Int> can be parsed as Json" <| fun test ->
    "[5, 2, null]"
    |> SimpleJson.parseNative
    |> test.areEqual (JArray [ JNumber 5.0; JNumber 2.0 ; JNull ])

testCase "Simple Option<Int> can be converted from Json" <| fun test ->
    "[\"5\", \"2\", null]"
    |> Json.parseAs<Option<int> list>
    |> test.areEqual [ Some 5; Some 2; None ]

testCase "Simple Option<BigInt> can be converted" <| fun test ->
    [ Some 5I; Some 2I; None ]
    |> Json.stringify
    |> Json.parseAs<Option<bigint> list>
    |> test.areEqual [ Some 5I; Some 2I; None ]

testCase "Native: BigInt can be converted" <| fun test ->
    { value = Just (Some 5I) }
    |> Json.stringify
    |> Json.parseNativeAs<RecordWithBigInt>
    |> test.areEqual { value = Just (Some 5I) }

type Dummy = { first: int }
type DummySeq = DummySeq of Dummy seq
type DummyList = DummyList of Dummy list

testCase "List<'t> can be deserialized" <| fun test ->
    [{ first = 10 }]
    |> DummyList
    |> Json.stringify
    |> Json.parseNativeAs<DummyList>
    |> test.areEqual (DummyList [{ first = 10 }])

testCase "Seq<'t> can be deserialized" <| fun test ->
    "[\"DummySeq\", [{ \"first\": 10 }]]"
    |> Json.parseNativeAs<DummySeq>
    |> fun dummy ->
        match dummy with
        | DummySeq elems ->
            match List.ofSeq elems with
            | [ { first = 10 } ] -> test.pass()
            | _ -> test.fail()

testCase "Seq<'t> can be serialized correctly" <| fun test ->
    seq { yield { first = 10 } }
    |> DummySeq
    |> Json.stringify
    |> test.areEqual "[\"DummySeq\",[{\"first\":10}]]"

type Optional = {
    key: int;
    value: string option;
    number: int option
}

testCase "Multiple optional fields can be omitted from the JSON" <| fun test ->
    "{ \"key\": 5 }"
    |> Json.parseAs<Optional>
    |> test.areEqual { key = 5; value = None; number = None }

testCase "Native: Multiple optional fields can be omitted from the JSON" <| fun test ->
    "{ \"key\": 5 }"
    |> Json.parseNativeAs<Optional>
    |> test.areEqual { key = 5; value = None; number = None }

type Rec = { name: string; age: int option }

testCase "Generic union types with list-like type arguments work" <| fun test ->
    Just [1 .. 5]
    |> Json.stringify
    |> Json.parseNativeAs<Maybe<int list>>
    |> test.areEqual (Just [1;2;3;4;5])

testCase "Result<int list, string> conversion works" <| fun test ->
    Ok [1;2;3]
    |> Json.stringify
    |> Json.parseNativeAs<Result<int list, string>>
    |> test.areEqual (Ok [1;2;3])

type SecureResponse<'t> = Result<'t, string>

type User = {
    Login: string
    IsAdmin: bool
    LastActivity: DateTime
}

testCase "Deserializing User array works" <| fun test -> 
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
 
testCaseAsync "Async.bind runs after parsing arrays of users" <| fun test -> 
    let usersInput = [| 
        { Login = "first"; IsAdmin = false; LastActivity = DateTime.Now } 
        { Login = "second"; IsAdmin = true; LastActivity = DateTime.Now } 
    |]

    let pgetUsers() = Fable.Import.JS.Promise.Create(fun res rej -> res(Json.parseAs<User array>(Json.stringify usersInput)))
    let getUsers() = Async.AwaitPromise(pgetUsers())
 
    async { 
        let! users = getUsers()
        do test.areEqual 2 (Array.length users)
    }

testCaseAsync "Async.bind runs after parsing arrays of users" <| fun test -> 
    let input = [| 1 .. 5 |]

    let pgetNumbers() = Fable.Import.JS.Promise.Create(fun res rej -> res(Json.parseAs<int array>(Json.stringify input)))
    let getNumbers() = Async.AwaitPromise(pgetNumbers())
 
    async { 
        let! users = getNumbers()
        do test.areEqual 5 (Array.length users)
    }

type HighScore = { Name : string; Score : int }

testCaseAsync "Async.bind runs after parsing arrays of HighScore" <| fun test -> 
    let input = [| { Name = "first"; Score = 1 }; { Name = "second"; Score = 2 }; { Name = "third"; Score = 3 } |]

    let pgetScores() = Fable.Import.JS.Promise.Create(fun res rej -> res(Json.parseAs<HighScore array>(Json.stringify input)))
    let getScores() = Async.AwaitPromise(pgetScores())
 
    async { 
        let! users = getScores()
        do test.areEqual 3 (Array.length users)
    }

testCase "Deserializing SecureRequest<User list> works" <| fun test ->
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

testCase "Result of unit can be converted" <| fun test ->
    Ok ()
    |> Json.stringify
    |> Json.parseNativeAs<Result<unit, string>>
    |> test.areEqual (Ok ())

testCase "Deserializing SecureRequest<User list> works from Fable 2 representation" <| fun test ->
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

testCase "Nice error messages are created for missing JSON keys" <| fun test ->
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

type Recursive = {
    Name : string
    Children : Recursive list
}

testCase "Recursive records can be converted" <| fun test ->
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

type Tree =
    | Leaf of int
    | Branch of Tree * Tree

testCase "Recursive unions can be converted" <| fun test ->
    let input = Branch(Branch(Leaf 10, Leaf 5), Leaf 5)

    input
    |> Json.stringify
    |> Json.parseAs<Tree>
    |> test.areEqual input

type ConfigKey =
    | Technique
    | Theme
    | Collection

type ConfigValue = {
    id : int option
    name : string
}

type Config = Map<ConfigKey,ConfigValue>

testCase "Deserializing simple DU works" <| fun test ->
    "[\"Technique\", \"Theme\", \"Collection\"]"
    |> Json.parseNativeAs<ConfigKey list>
    |> test.areEqual [ Technique ; Theme ; Collection ]

testCase "Deserializing simple quoted DU works" <| fun test ->
    """["\"Technique\"", "\"Theme\"", "\"Collection\""]"""
    |> Json.parseNativeAs<ConfigKey list>
    |> test.areEqual [ Technique ; Theme ; Collection ]

testCase "Simple maps with unqouted DU keys can be deserialized" <| fun test ->
    // This is what received from Giraffe
    let input = """{"Technique":{"name":"Техника","id":null}}"""
    let expected = Map.ofList [ Technique, { id = None; name = "Техника" } ]

    input
    |> Json.parseNativeAs<Config>
    |> test.areEqual expected


testCase "Simple maps with unqouted DU keys can be deserialized part 2" <| fun test ->
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

testCase "Simple maps with unqouted DU keys can be deserialized interchanged" <| fun test ->
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

testCase "Simple maps with unqouted DU keys can be deserialized interchanged: part 2" <| fun test ->
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

testCase "Maps with unqouted DU keys can be deserialized" <| fun test ->
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

testCase "Maps with quoted DU keys can be deserialized" <| fun test ->
    // This is what received from Giraffe
    let input = """{"\"Technique\"":{"name":"Техника","id":null},"\"Theme\"":{"name":"Тема","id":null},"\"Collection\"":{"name":"Коллекция","id":null}}"""

    let expected =
        [ Collection, {id=None;name="Коллекция"}
          Technique, {id=None;name="Техника"}
          Theme, {id=None;name="Тема"} ] |> Map.ofList

    input
    |> Json.parseNativeAs<Config>
    |> test.areEqual expected

testCase "isQuoted works" <| fun test ->
    "\"text\""
    |> Convert.isQuoted
    |> test.areEqual true

testCase "removeQuotes works" <| fun test ->
    "\"text\""
    |> Convert.removeQuotes
    |> test.areEqual "text"

testCase "Maps can use structural equality" <| fun test ->
    let firstInput =
        [ Collection, { id=None; name="Коллекция"}
          Technique,  { id=None; name="Техника"}
          Theme,      { id=None; name="Тема"} ] |> Map.ofList

    let secondInput =
        [ Theme,  { id = None; name="Тема"}
          Technique, { id = None; name="Техника"}
          Collection, { id = None; name="Коллекция"} ] |> Map.ofList

    test.areEqual firstInput secondInput

testCase "Maps with DU keys can be converted" <| fun test ->
    let input =
        [ Collection, { id=None; name="Коллекция"}
          Technique,  { id=None; name="Техника"}
          Theme,      { id=None; name="Тема"} ] |> Map.ofList

    input
    |> Json.stringify
    |> Json.parseNativeAs<Config>
    |> test.areEqual input

testCase "SimpleJson.readPath works" <| fun test ->
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

testCase "SimpleJson.readPath works with fromObjectLiteral" <| fun test ->
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