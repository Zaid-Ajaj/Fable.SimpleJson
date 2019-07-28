// Learn more about F# at http://fsharp.org

open System

[<EntryPoint>]
let main argv =
    "./public"
    |> System.IO.Path.GetFullPath
    |> Puppeteer.runTests
    |> Async.RunSynchronously