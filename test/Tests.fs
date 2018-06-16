module Tests

open QUnit
open Fable.Core
open Fable.Parsimmon
open Fable.SimpleJson
open Fable.SimpleJson.Parser
open Fable.Core.JsInterop
open System
open Fable.SimpleJson

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

type SimpleRec = { A: int; B: string; C: bool; D: float }

testCase "Converting records with simple types" <| fun test -> 
    { A = 20; B = "BB"; C = false; D = 2.0451 }
    |> Json.stringify
    |> Json.parseAs<SimpleRec> 
    |> test.areEqual { A = 20; B = "BB"; C = false; D = 2.0451 }

testCase "Converting records with simple types, strings can be null" <| fun test -> 
    { A = 20; B = null; C = false; D = 2.0451 }
    |> Json.stringify
    |> Json.parseAs<SimpleRec> 
    |> test.areEqual { A = 20; B = null; C = false; D = 2.0451 }

testCase "Converting lists records with simple types" <| fun test -> 
    [ { A = 20; B = "BB"; C = false; D = 2.0451 } ] 
    |> Json.stringify
    |> Json.parseAs<SimpleRec list> 
    |> test.areEqual [ { A = 20; B = "BB"; C = false; D = 2.0451 } ] 

testCase "Converting arrays records with simple types" <| fun test -> 
    [| { A = 20; B = "BB"; C = false; D = 2.0451 } |] 
    |> Json.stringify
    |> Json.parseAs<SimpleRec[]> 
    |> test.areEqual [| { A = 20; B = "BB"; C = false; D = 2.0451 } |] 

testCase "Converting optional (Some) records with simple types" <| fun test -> 
    { A = 20; B = "BB"; C = false; D = 2.0451 }
    |> Some
    |> Json.stringify
    |> Json.parseAs<Option<SimpleRec>> 
    |> test.areEqual (Some { A = 20; B = "BB"; C = false; D = 2.0451 }) 

testCase "Converting optional (None) records with simple types" <| fun test -> 
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

testCase "TypeInfo can be generated from GenericTestRecord" <| fun test -> 
    let typeInfo = TypeInfo.createFrom<Maybe<list<GenericTestRecord<string>>>>() 
    test.pass() 

testCase "Converting generic record with Maybe<int> as a field" <| fun test ->
    Just [ { Other = "wise"; Value = Just 20 } ] 
    |> Json.stringify
    |> Json.parseAs<Maybe<list<RecWithGenDU<string>>>>
    |> test.areEqual (Just [ { Other = "wise"; Value = Just 20 } ] )

type RecordWithArray = { Arr : Option<Maybe<int>> [ ] }  

testCase "Converting record with arrays" <| fun test ->
    { Arr = [| Some Nothing; Some (Just 20) |] }
    |> Json.stringify
    |> Json.parseAs<RecordWithArray>
    |> test.areEqual { Arr = [| Some Nothing; Some (Just 20) |] }

type ComplexRecord<'t> = { 
    Value: 't; 
    HasValue: bool;
    Dates: DateTime list
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
        [ { Value = { A = 20; B = "AA"; C = false; D = 5.64134 } 
            HasValue = true
            Dates = [ DateTime.Now; DateTime.Now.AddDays(5.0) ]
            RecordList = [ { A = 30; B = "CC"; C = true; D = 2.0451 } ]
            ArrayOfOptionalRecords = [| None; Some { A = 35; B = "FF"; C = false; D = 1.0451 }; None |]
            OptionalRecord = Some { A = 40; B = "BB"; C = true; D = 3.0451 }
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

testCase "Result can be converter" <| fun test -> 
    [ Ok "value"; Error (Maybe.Just 5) ]
    |> Json.stringify
    |> Json.parseAs<list<Result<string, Maybe<int>>>>
    |> test.areEqual [ Ok "value"; Error (Maybe.Just 5) ]

type RecordWithLong = { value : Maybe<Option<int64>>; other: string } 
type RecordWithBigInt = { value : Maybe<Option<bigint>> } 

type SingleCase = SingleCase of int64 

testCase "SingleCase of int64 can be converter" <| fun test -> 
    SingleCase 20L
    |> Json.stringify
    |> Json.parseAs<SingleCase>
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

testCase "BigInt can be converter" <| fun test -> 
    { value = Just (Some 5I) } 
    |> Json.stringify
    |> Json.parseAs<RecordWithBigInt>
    |> test.areEqual { value = Just (Some 5I) }

type Optional = { 
    key: int; 
    value: string option; 
    number: int option 
}

testCase "Multiple optional fields can be omitted from the JSON" <| fun test -> 
    "{ \"key\": 5 }"
    |> Json.parseAs<Optional>
    |> test.areEqual { key = 5; value = None; number = None }

type Rec = { name: string; age: int option }

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