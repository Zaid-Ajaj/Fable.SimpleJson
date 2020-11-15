module Types

open System
open Fable.Core
open Fable.Core.JsInterop

type TupleStringArrays = {
    Highlights : (string * string []) [ ]
}

type RecordWithNullable = { Content : Nullable<int> }

type RecordAsKey = { Key: int; Value : string }

type WithByteArray = { Hash: byte [] }

type WithFloat32 = { Value: float32 }

type UnsignedIntegers = {
    Sixteen: uint16
    ThirtyTwo: uint32
    SixtyFour: uint64
}

type RecordWithDateOffset = { DateOffset:  DateTimeOffset }

type Balance = { Value : decimal }

type ComplexKey<'t> = ComplexKey of 't

type SimpleUnion =
    | One
    | Two

type SimpleEnum =
    | One = 1
    | Two = 2

type IStudent =
    abstract name: string with get,set
    abstract age: int with get,set
    abstract subjects: string [] with get,set

type SimpleRecord =
    { First: string
      Age: int
      Salary: float }

type SimpleDU =
    | One
    | Two of int
    | Three of string

type WithString = { Str: string }

type SimpleRec = { A: int; B: string; C: bool; D: float; E: decimal }

type RecordWithEnum = { EnumValue : SimpleEnum }

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

type RecordWithArray = { Arr : Option<Maybe<int>> [ ] }

type RecWithByte = { byteValue: byte }

type RecWithShort = { shortValue: int16 }

type ComplexRecord<'t> = {
    Value: 't;
    HasValue: bool;
    Dates: DateTime list
    DateTimeOffsets: DateTimeOffset list
    RecordList : SimpleRec list;
    ArrayOfOptionalRecords : Option<SimpleRec>[]
    OptionalRecord : Option<SimpleRec>
    Doubtful : Maybe<Maybe<Maybe<Maybe<int>>>>
    SimpleTuples : Option<string> * int * Guid
    NestedMaps: Map<string, Map<string, Maybe<int64>>> list
    Int64 : Maybe<int64> * Option<int64> * int64 list
    BigInt : Maybe<bigint> * Option<bigint> * bigint list
}

type RecordWithLong = { value : Maybe<Option<int64>>; other: string }

type RecordWithBigInt = { value : Maybe<Option<bigint>> }

type SingleCase = SingleCase of int64

type Dummy = { first: int }

type DummySeq = DummySeq of Dummy seq

type DummyList = DummyList of Dummy list

type Optional = {
    key: int;
    value: string option;
    number: int option
}

type Rec = { name: string; age: int option }

type SecureResponse<'t> = Result<'t, string>

type User = {
    Login: string
    IsAdmin: bool
    LastActivity: DateTime
}

type HighScore = { Name : string; Score : int }

type Recursive = {
    Name : string
    Children : Recursive list
}

type Tree =
    | Leaf of int
    | Branch of Tree * Tree

type ConfigKey =
    | Technique
    | Theme
    | Collection

type ConfigValue = {
    id : int option
    name : string
}

type Config = Map<ConfigKey,ConfigValue>

type DictValue = { name: string; age: int }

type AlbumId = AlbumId of int

type AlbumAuthor = AlbumAuthor of string

type GenericValue<'t> = { value: 't }

[<Measure>]
type someUnit

type Actor =
    | User of {| id: int; username: string |}
    | Bot of {| name: string |}

type SomeOtherDU =
    | SomeOtherCase

type DuWithSet =
    | SomeCase
    | CustomCase of Set<SomeOtherDU>