"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TupleStringArrays$reflection = TupleStringArrays$reflection;
exports.RecordAsKey$reflection = RecordAsKey$reflection;
exports.WithByteArray$reflection = WithByteArray$reflection;
exports.WithFloat32$reflection = WithFloat32$reflection;
exports.UnsignedIntegers$reflection = UnsignedIntegers$reflection;
exports.RecordWithDateOffset$reflection = RecordWithDateOffset$reflection;
exports.Balance$reflection = Balance$reflection;
exports.ComplexKey$00601$reflection = ComplexKey$00601$reflection;
exports.SimpleUnion$reflection = SimpleUnion$reflection;
exports.SimpleRecord$reflection = SimpleRecord$reflection;
exports.SimpleDU$reflection = SimpleDU$reflection;
exports.WithString$reflection = WithString$reflection;
exports.SimpleRec$reflection = SimpleRec$reflection;
exports.Maybe$00601$reflection = Maybe$00601$reflection;
exports.RecWithGenDU$00601$reflection = RecWithGenDU$00601$reflection;
exports.GenericTestRecord$00601$reflection = GenericTestRecord$00601$reflection;
exports.Types$reflection = Types$reflection;
exports.Types$$$$002Ector = Types$$$$002Ector;
exports.Types$$$getNameOf$$Z3747C43F = Types$$$getNameOf$$Z3747C43F;
exports.Types$$$get$$Z3747C43F = Types$$$get$$Z3747C43F;
exports.RecordWithArray$reflection = RecordWithArray$reflection;
exports.RecWithByte$reflection = RecWithByte$reflection;
exports.RecWithShort$reflection = RecWithShort$reflection;
exports.ComplexRecord$00601$reflection = ComplexRecord$00601$reflection;
exports.RecordWithLong$reflection = RecordWithLong$reflection;
exports.RecordWithBigInt$reflection = RecordWithBigInt$reflection;
exports.SingleCase$reflection = SingleCase$reflection;
exports.Dummy$reflection = Dummy$reflection;
exports.DummySeq$reflection = DummySeq$reflection;
exports.DummyList$reflection = DummyList$reflection;
exports.Optional$reflection = Optional$reflection;
exports.Rec$reflection = Rec$reflection;
exports.User$reflection = User$reflection;
exports.HighScore$reflection = HighScore$reflection;
exports.Recursive$reflection = Recursive$reflection;
exports.Tree$reflection = Tree$reflection;
exports.ConfigKey$reflection = ConfigKey$reflection;
exports.ConfigValue$reflection = ConfigValue$reflection;
exports.DictValue$reflection = DictValue$reflection;
exports.AlbumId$reflection = AlbumId$reflection;
exports.AlbumAuthor$reflection = AlbumAuthor$reflection;
exports.AlbumAuthor = exports.AlbumId = exports.DictValue = exports.ConfigValue = exports.ConfigKey = exports.Tree = exports.Recursive = exports.HighScore = exports.User = exports.Rec = exports.Optional = exports.DummyList = exports.DummySeq = exports.Dummy = exports.SingleCase = exports.RecordWithBigInt = exports.RecordWithLong = exports.ComplexRecord$00601 = exports.RecWithShort = exports.RecWithByte = exports.RecordWithArray = exports.Types = exports.GenericTestRecord$00601 = exports.RecWithGenDU$00601 = exports.Maybe$00601 = exports.SimpleRec = exports.WithString = exports.SimpleDU = exports.SimpleRecord = exports.SimpleUnion = exports.ComplexKey$00601 = exports.Balance = exports.RecordWithDateOffset = exports.UnsignedIntegers = exports.WithFloat32 = exports.WithByteArray = exports.RecordAsKey = exports.TupleStringArrays = void 0;

var _Types = require("./fable-library.2.3.14/Types");

var _Reflection = require("./fable-library.2.3.14/Reflection");

const TupleStringArrays = (0, _Types.declare)(function Types_TupleStringArrays(arg1) {
  this.Highlights = arg1;
}, _Types.Record);
exports.TupleStringArrays = TupleStringArrays;

function TupleStringArrays$reflection() {
  return (0, _Reflection.record)("Types.TupleStringArrays", [], TupleStringArrays, () => [["Highlights", (0, _Reflection.array)((0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.array)(_Reflection.string)))]]);
}

const RecordAsKey = (0, _Types.declare)(function Types_RecordAsKey(arg1, arg2) {
  this.Key = arg1 | 0;
  this.Value = arg2;
}, _Types.Record);
exports.RecordAsKey = RecordAsKey;

function RecordAsKey$reflection() {
  return (0, _Reflection.record)("Types.RecordAsKey", [], RecordAsKey, () => [["Key", _Reflection.int32], ["Value", _Reflection.string]]);
}

const WithByteArray = (0, _Types.declare)(function Types_WithByteArray(arg1) {
  this.Hash = arg1;
}, _Types.Record);
exports.WithByteArray = WithByteArray;

function WithByteArray$reflection() {
  return (0, _Reflection.record)("Types.WithByteArray", [], WithByteArray, () => [["Hash", (0, _Reflection.array)(_Reflection.uint8)]]);
}

const WithFloat32 = (0, _Types.declare)(function Types_WithFloat32(arg1) {
  this.Value = arg1;
}, _Types.Record);
exports.WithFloat32 = WithFloat32;

function WithFloat32$reflection() {
  return (0, _Reflection.record)("Types.WithFloat32", [], WithFloat32, () => [["Value", _Reflection.float32]]);
}

const UnsignedIntegers = (0, _Types.declare)(function Types_UnsignedIntegers(arg1, arg2, arg3) {
  this.Sixteen = arg1;
  this.ThirtyTwo = arg2;
  this.SixtyFour = arg3;
}, _Types.Record);
exports.UnsignedIntegers = UnsignedIntegers;

function UnsignedIntegers$reflection() {
  return (0, _Reflection.record)("Types.UnsignedIntegers", [], UnsignedIntegers, () => [["Sixteen", _Reflection.uint16], ["ThirtyTwo", _Reflection.uint32], ["SixtyFour", (0, _Reflection.type)("System.UInt64")]]);
}

const RecordWithDateOffset = (0, _Types.declare)(function Types_RecordWithDateOffset(arg1) {
  this.DateOffset = arg1;
}, _Types.Record);
exports.RecordWithDateOffset = RecordWithDateOffset;

function RecordWithDateOffset$reflection() {
  return (0, _Reflection.record)("Types.RecordWithDateOffset", [], RecordWithDateOffset, () => [["DateOffset", (0, _Reflection.type)("System.DateTimeOffset")]]);
}

const Balance = (0, _Types.declare)(function Types_Balance(arg1) {
  this.Value = arg1;
}, _Types.Record);
exports.Balance = Balance;

function Balance$reflection() {
  return (0, _Reflection.record)("Types.Balance", [], Balance, () => [["Value", (0, _Reflection.type)("System.Decimal")]]);
}

const ComplexKey$00601 = (0, _Types.declare)(function Types_ComplexKey(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.ComplexKey$00601 = ComplexKey$00601;

function ComplexKey$00601$reflection($gen$$2) {
  return (0, _Reflection.union)("Types.ComplexKey`1", [$gen$$2], ComplexKey$00601, () => [["ComplexKey", [$gen$$2]]]);
}

const SimpleUnion = (0, _Types.declare)(function Types_SimpleUnion(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.SimpleUnion = SimpleUnion;

function SimpleUnion$reflection() {
  return (0, _Reflection.union)("Types.SimpleUnion", [], SimpleUnion, () => ["One", "Two"]);
}

const SimpleRecord = (0, _Types.declare)(function Types_SimpleRecord(arg1, arg2, arg3) {
  this.First = arg1;
  this.Age = arg2 | 0;
  this.Salary = arg3;
}, _Types.Record);
exports.SimpleRecord = SimpleRecord;

function SimpleRecord$reflection() {
  return (0, _Reflection.record)("Types.SimpleRecord", [], SimpleRecord, () => [["First", _Reflection.string], ["Age", _Reflection.int32], ["Salary", _Reflection.float64]]);
}

const SimpleDU = (0, _Types.declare)(function Types_SimpleDU(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.SimpleDU = SimpleDU;

function SimpleDU$reflection() {
  return (0, _Reflection.union)("Types.SimpleDU", [], SimpleDU, () => ["One", ["Two", [_Reflection.int32]], ["Three", [_Reflection.string]]]);
}

const WithString = (0, _Types.declare)(function Types_WithString(arg1) {
  this.Str = arg1;
}, _Types.Record);
exports.WithString = WithString;

function WithString$reflection() {
  return (0, _Reflection.record)("Types.WithString", [], WithString, () => [["Str", _Reflection.string]]);
}

const SimpleRec = (0, _Types.declare)(function Types_SimpleRec(arg1, arg2, arg3, arg4, arg5) {
  this.A = arg1 | 0;
  this.B = arg2;
  this.C = arg3;
  this.D = arg4;
  this.E = arg5;
}, _Types.Record);
exports.SimpleRec = SimpleRec;

function SimpleRec$reflection() {
  return (0, _Reflection.record)("Types.SimpleRec", [], SimpleRec, () => [["A", _Reflection.int32], ["B", _Reflection.string], ["C", _Reflection.bool], ["D", _Reflection.float64], ["E", (0, _Reflection.type)("System.Decimal")]]);
}

const Maybe$00601 = (0, _Types.declare)(function Types_Maybe(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Maybe$00601 = Maybe$00601;

function Maybe$00601$reflection($gen$$3) {
  return (0, _Reflection.union)("Types.Maybe`1", [$gen$$3], Maybe$00601, () => [["Just", [$gen$$3]], "Nothing"]);
}

const RecWithGenDU$00601 = (0, _Types.declare)(function Types_RecWithGenDU(arg1, arg2) {
  this.Other = arg1;
  this.Value = arg2;
}, _Types.Record);
exports.RecWithGenDU$00601 = RecWithGenDU$00601;

function RecWithGenDU$00601$reflection($gen$$4) {
  return (0, _Reflection.record)("Types.RecWithGenDU`1", [$gen$$4], RecWithGenDU$00601, () => [["Other", $gen$$4], ["Value", Maybe$00601$reflection(_Reflection.int32)]]);
}

const GenericTestRecord$00601 = (0, _Types.declare)(function Types_GenericTestRecord(arg1, arg2) {
  this.Other = arg1;
  this.Value = arg2;
}, _Types.Record);
exports.GenericTestRecord$00601 = GenericTestRecord$00601;

function GenericTestRecord$00601$reflection($gen$$5) {
  return (0, _Reflection.record)("Types.GenericTestRecord`1", [$gen$$5], GenericTestRecord$00601, () => [["Other", $gen$$5], ["Value", Maybe$00601$reflection(_Reflection.int32)]]);
}

const Types = (0, _Types.declare)(function Types_Types() {});
exports.Types = Types;

function Types$reflection() {
  return (0, _Reflection.type)("Types.Types");
}

function Types$$$$002Ector() {
  return this instanceof Types ? Types.call(this) : new Types();
}

function Types$$$getNameOf$$Z3747C43F(resolver) {
  const resolvedType = resolver.ResolveType();
  return (0, _Reflection.name)(resolvedType);
}

function Types$$$get$$Z3747C43F(resolver$$1) {
  const resolvedType$$1 = resolver$$1.ResolveType();
  return resolvedType$$1;
}

const RecordWithArray = (0, _Types.declare)(function Types_RecordWithArray(arg1) {
  this.Arr = arg1;
}, _Types.Record);
exports.RecordWithArray = RecordWithArray;

function RecordWithArray$reflection() {
  return (0, _Reflection.record)("Types.RecordWithArray", [], RecordWithArray, () => [["Arr", (0, _Reflection.array)((0, _Reflection.option)(Maybe$00601$reflection(_Reflection.int32)))]]);
}

const RecWithByte = (0, _Types.declare)(function Types_RecWithByte(arg1) {
  this.byteValue = arg1;
}, _Types.Record);
exports.RecWithByte = RecWithByte;

function RecWithByte$reflection() {
  return (0, _Reflection.record)("Types.RecWithByte", [], RecWithByte, () => [["byteValue", _Reflection.uint8]]);
}

const RecWithShort = (0, _Types.declare)(function Types_RecWithShort(arg1) {
  this.shortValue = arg1 | 0;
}, _Types.Record);
exports.RecWithShort = RecWithShort;

function RecWithShort$reflection() {
  return (0, _Reflection.record)("Types.RecWithShort", [], RecWithShort, () => [["shortValue", _Reflection.int16]]);
}

const ComplexRecord$00601 = (0, _Types.declare)(function Types_ComplexRecord(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
  this.Value = arg1;
  this.HasValue = arg2;
  this.Dates = arg3;
  this.DateTimeOffsets = arg4;
  this.RecordList = arg5;
  this.ArrayOfOptionalRecords = arg6;
  this.OptionalRecord = arg7;
  this.Doubtful = arg8;
  this.SimpleTuples = arg9;
  this.NestedMaps = arg10;
  this.Int64 = arg11;
  this.BigInt = arg12;
}, _Types.Record);
exports.ComplexRecord$00601 = ComplexRecord$00601;

function ComplexRecord$00601$reflection($gen$$6) {
  return (0, _Reflection.record)("Types.ComplexRecord`1", [$gen$$6], ComplexRecord$00601, () => [["Value", $gen$$6], ["HasValue", _Reflection.bool], ["Dates", (0, _Reflection.list)((0, _Reflection.type)("System.DateTime"))], ["DateTimeOffsets", (0, _Reflection.list)((0, _Reflection.type)("System.DateTimeOffset"))], ["RecordList", (0, _Reflection.list)(SimpleRec$reflection())], ["ArrayOfOptionalRecords", (0, _Reflection.array)((0, _Reflection.option)(SimpleRec$reflection()))], ["OptionalRecord", (0, _Reflection.option)(SimpleRec$reflection())], ["Doubtful", Maybe$00601$reflection(Maybe$00601$reflection(Maybe$00601$reflection(Maybe$00601$reflection(_Reflection.int32))))], ["SimpleTuples", (0, _Reflection.tuple)((0, _Reflection.option)(_Reflection.string), _Reflection.int32, (0, _Reflection.type)("System.Guid"))], ["NestedMaps", (0, _Reflection.list)((0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, Maybe$00601$reflection((0, _Reflection.type)("System.Int64"))])]))], ["Int64", (0, _Reflection.tuple)(Maybe$00601$reflection((0, _Reflection.type)("System.Int64")), (0, _Reflection.option)((0, _Reflection.type)("System.Int64")), (0, _Reflection.list)((0, _Reflection.type)("System.Int64")))], ["BigInt", (0, _Reflection.tuple)(Maybe$00601$reflection((0, _Reflection.type)("System.Numerics.BigInteger")), (0, _Reflection.option)((0, _Reflection.type)("System.Numerics.BigInteger")), (0, _Reflection.list)((0, _Reflection.type)("System.Numerics.BigInteger")))]]);
}

const RecordWithLong = (0, _Types.declare)(function Types_RecordWithLong(arg1, arg2) {
  this.value = arg1;
  this.other = arg2;
}, _Types.Record);
exports.RecordWithLong = RecordWithLong;

function RecordWithLong$reflection() {
  return (0, _Reflection.record)("Types.RecordWithLong", [], RecordWithLong, () => [["value", Maybe$00601$reflection((0, _Reflection.option)((0, _Reflection.type)("System.Int64")))], ["other", _Reflection.string]]);
}

const RecordWithBigInt = (0, _Types.declare)(function Types_RecordWithBigInt(arg1) {
  this.value = arg1;
}, _Types.Record);
exports.RecordWithBigInt = RecordWithBigInt;

function RecordWithBigInt$reflection() {
  return (0, _Reflection.record)("Types.RecordWithBigInt", [], RecordWithBigInt, () => [["value", Maybe$00601$reflection((0, _Reflection.option)((0, _Reflection.type)("System.Numerics.BigInteger")))]]);
}

const SingleCase = (0, _Types.declare)(function Types_SingleCase(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.SingleCase = SingleCase;

function SingleCase$reflection() {
  return (0, _Reflection.union)("Types.SingleCase", [], SingleCase, () => [["SingleCase", [(0, _Reflection.type)("System.Int64")]]]);
}

const Dummy = (0, _Types.declare)(function Types_Dummy(arg1) {
  this.first = arg1 | 0;
}, _Types.Record);
exports.Dummy = Dummy;

function Dummy$reflection() {
  return (0, _Reflection.record)("Types.Dummy", [], Dummy, () => [["first", _Reflection.int32]]);
}

const DummySeq = (0, _Types.declare)(function Types_DummySeq(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.DummySeq = DummySeq;

function DummySeq$reflection() {
  return (0, _Reflection.union)("Types.DummySeq", [], DummySeq, () => [["DummySeq", [(0, _Reflection.type)("System.Collections.Generic.IEnumerable`1", [Dummy$reflection()])]]]);
}

const DummyList = (0, _Types.declare)(function Types_DummyList(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.DummyList = DummyList;

function DummyList$reflection() {
  return (0, _Reflection.union)("Types.DummyList", [], DummyList, () => [["DummyList", [(0, _Reflection.list)(Dummy$reflection())]]]);
}

const Optional = (0, _Types.declare)(function Types_Optional(arg1, arg2, arg3) {
  this.key = arg1 | 0;
  this.value = arg2;
  this.number = arg3;
}, _Types.Record);
exports.Optional = Optional;

function Optional$reflection() {
  return (0, _Reflection.record)("Types.Optional", [], Optional, () => [["key", _Reflection.int32], ["value", (0, _Reflection.option)(_Reflection.string)], ["number", (0, _Reflection.option)(_Reflection.int32)]]);
}

const Rec = (0, _Types.declare)(function Types_Rec(arg1, arg2) {
  this.name = arg1;
  this.age = arg2;
}, _Types.Record);
exports.Rec = Rec;

function Rec$reflection() {
  return (0, _Reflection.record)("Types.Rec", [], Rec, () => [["name", _Reflection.string], ["age", (0, _Reflection.option)(_Reflection.int32)]]);
}

const User = (0, _Types.declare)(function Types_User(arg1, arg2, arg3) {
  this.Login = arg1;
  this.IsAdmin = arg2;
  this.LastActivity = arg3;
}, _Types.Record);
exports.User = User;

function User$reflection() {
  return (0, _Reflection.record)("Types.User", [], User, () => [["Login", _Reflection.string], ["IsAdmin", _Reflection.bool], ["LastActivity", (0, _Reflection.type)("System.DateTime")]]);
}

const HighScore = (0, _Types.declare)(function Types_HighScore(arg1, arg2) {
  this.Name = arg1;
  this.Score = arg2 | 0;
}, _Types.Record);
exports.HighScore = HighScore;

function HighScore$reflection() {
  return (0, _Reflection.record)("Types.HighScore", [], HighScore, () => [["Name", _Reflection.string], ["Score", _Reflection.int32]]);
}

const Recursive = (0, _Types.declare)(function Types_Recursive(arg1, arg2) {
  this.Name = arg1;
  this.Children = arg2;
}, _Types.Record);
exports.Recursive = Recursive;

function Recursive$reflection() {
  return (0, _Reflection.record)("Types.Recursive", [], Recursive, () => [["Name", _Reflection.string], ["Children", (0, _Reflection.list)(Recursive$reflection())]]);
}

const Tree = (0, _Types.declare)(function Types_Tree(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Tree = Tree;

function Tree$reflection() {
  return (0, _Reflection.union)("Types.Tree", [], Tree, () => [["Leaf", [_Reflection.int32]], ["Branch", [Tree$reflection(), Tree$reflection()]]]);
}

const ConfigKey = (0, _Types.declare)(function Types_ConfigKey(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.ConfigKey = ConfigKey;

function ConfigKey$reflection() {
  return (0, _Reflection.union)("Types.ConfigKey", [], ConfigKey, () => ["Technique", "Theme", "Collection"]);
}

const ConfigValue = (0, _Types.declare)(function Types_ConfigValue(arg1, arg2) {
  this.id = arg1;
  this.name = arg2;
}, _Types.Record);
exports.ConfigValue = ConfigValue;

function ConfigValue$reflection() {
  return (0, _Reflection.record)("Types.ConfigValue", [], ConfigValue, () => [["id", (0, _Reflection.option)(_Reflection.int32)], ["name", _Reflection.string]]);
}

const DictValue = (0, _Types.declare)(function Types_DictValue(arg1, arg2) {
  this.name = arg1;
  this.age = arg2 | 0;
}, _Types.Record);
exports.DictValue = DictValue;

function DictValue$reflection() {
  return (0, _Reflection.record)("Types.DictValue", [], DictValue, () => [["name", _Reflection.string], ["age", _Reflection.int32]]);
}

const AlbumId = (0, _Types.declare)(function Types_AlbumId(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.AlbumId = AlbumId;

function AlbumId$reflection() {
  return (0, _Reflection.union)("Types.AlbumId", [], AlbumId, () => [["AlbumId", [_Reflection.int32]]]);
}

const AlbumAuthor = (0, _Types.declare)(function Types_AlbumAuthor(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.AlbumAuthor = AlbumAuthor;

function AlbumAuthor$reflection() {
  return (0, _Reflection.union)("Types.AlbumAuthor", [], AlbumAuthor, () => [["AlbumAuthor", [_Reflection.string]]]);
}