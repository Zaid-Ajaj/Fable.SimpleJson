namespace Fable.SimpleJson

open Fable.Parsimmon

#nowarn "40"

module Parser =

    let digits = 
        Parsimmon.digit 
        |> Parsimmon.atLeastOneOrMany
        |> Parsimmon.concat

    let jint = digits |> Parsimmon.map float

    let negJint = 
        Parsimmon.seq2 (Parsimmon.str "-") jint 
        |> Parsimmon.map (fun (sign, number) -> -number)

    let jfloat = 

        let digits = 
            Parsimmon.digit 
            |> Parsimmon.many
            |> Parsimmon.concat

        let dot = Parsimmon.str "."

        let decimals = 
            Parsimmon.digit
            |> Parsimmon.atLeastOneOrMany
            |> Parsimmon.concat

        Parsimmon.seq3 digits dot decimals
        |> Parsimmon.map (fun (digitsLeft,dot,digitsRight) -> 
            match digitsLeft with
            | "" -> "0"
            | other -> other 
            |> fun digitsLeft ->
                [digitsLeft; dot; digitsRight]
                |> String.concat "" 
                |> float
        )

    let negativeJFloat = 
        Parsimmon.seq2 (Parsimmon.str "-") jfloat 
        |> Parsimmon.map (fun (sign, number) -> -number)

    let jnumber = 
        [jfloat; negativeJFloat; jint; negJint] 
        |> Parsimmon.choose
        |> Parsimmon.map JNumber

    let jbool = 
        [ Parsimmon.stringReturn "true" (JBool true)
          Parsimmon.stringReturn "false" (JBool false)]
        |> Parsimmon.choose

    let jnull = Parsimmon.stringReturn "null" JNull

    let stringLiteral =
        let escape =  
            Parsimmon.oneOf "\"\\/bfnrt"
            |> Parsimmon.map(function
                | "b" -> "\b"
                | "f" -> "\u000C"
                | "n" -> "\n"
                | "r" -> "\r"
                | "t" -> "\t"
                | c   -> c) // every other char is mapped to itself

        let escapedCharSnippet = 
            Parsimmon.seq2 (Parsimmon.str "\\") escape
            |> Parsimmon.map snd

        let hexDigit =
            Parsimmon.oneOf "0123456789ABCDEFabcdef"
            |> Parsimmon.map(function
                | "A" | "a" -> 10uy
                | "B" | "b" -> 11uy
                | "C" | "c" -> 12uy
                | "D" | "d" -> 13uy
                | "E" | "e" -> 14uy
                | "F" | "f" -> 15uy
                | c   -> System.Byte.Parse c)

        let utf16code =
            Parsimmon.seq4 hexDigit hexDigit hexDigit hexDigit
            |> Parsimmon.map (fun (d1,d2,d3,d4) -> System.Text.Encoding.Unicode.GetString([|d3 * 16uy + d4; d1 * 16uy + d2|]))

        let utf16CharSnippet =
            Parsimmon.seq2 (Parsimmon.str "\\u") utf16code
            |> Parsimmon.map snd

        let normalCharSnippet = Parsimmon.satisfy (fun c -> c <> "\"" && c <> "\\")

        let anyCharSnippet = 
            normalCharSnippet
            |> Parsimmon.orTry escapedCharSnippet
            |> Parsimmon.orTry utf16CharSnippet
            |> Parsimmon.many
            |> Parsimmon.concat

        anyCharSnippet
        |> Parsimmon.between (Parsimmon.str "\"") (Parsimmon.str "\"")
        
    let jstring = stringLiteral.map JString

    let withWhitespace p = 
        Parsimmon.between (Parsimmon.optionalWhitespace) (Parsimmon.optionalWhitespace) p
        
    let jvalue = 
        [ jnull; jbool; jnumber; jstring ]
        |> List.map withWhitespace
        |> Parsimmon.choose
    
    let comma = withWhitespace (Parsimmon.str ",")
 
    let rec json = Parsimmon.ofLazy <| fun () ->
        
        let leftBracket = withWhitespace (Parsimmon.str "[")
        let rightBracket = withWhitespace (Parsimmon.str "]")
                    
        let arrayValue = Parsimmon.seperateBy comma json
        
        let jarray = 
            arrayValue
            |> Parsimmon.between leftBracket rightBracket
            |> Parsimmon.map (List.ofArray >> JArray)

        let leftBrace = withWhitespace (Parsimmon.str "{")
        let rightBrace = withWhitespace (Parsimmon.str "}")
            
        let keyValues = 
            Parsimmon.seq3 
                (withWhitespace stringLiteral)
                (withWhitespace (Parsimmon.str ":"))
                (withWhitespace json)
            |> Parsimmon.map (fun (key, _ , value) -> key,value)
            |> Parsimmon.seperateBy comma

        let jobject = 
            keyValues
            |> Parsimmon.between leftBrace rightBrace
            |> Parsimmon.map (List.ofArray >> Map.ofList >> JObject)

        [jvalue; jarray; jobject]
        |> Parsimmon.choose
        
    let jsonParser = withWhitespace json
