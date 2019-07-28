"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordField$reflection = RecordField$reflection;
exports.UnionCase$reflection = UnionCase$reflection;
exports.TypeInfo$reflection = TypeInfo$reflection;
exports.TypeInfo = exports.UnionCase = exports.RecordField = void 0;

var _Types = require("../fable-library.2.3.14/Types");

var _Reflection = require("../fable-library.2.3.14/Reflection");

const RecordField = (0, _Types.declare)(function Fable_SimpleJson_RecordField(arg1, arg2) {
  this.FieldName = arg1;
  this.FieldType = arg2;
}, _Types.Record);
exports.RecordField = RecordField;

function RecordField$reflection() {
  return (0, _Reflection.record)("Fable.SimpleJson.RecordField", [], RecordField, () => [["FieldName", _Reflection.string], ["FieldType", TypeInfo$reflection()]]);
}

const UnionCase = (0, _Types.declare)(function Fable_SimpleJson_UnionCase(arg1, arg2, arg3) {
  this.CaseName = arg1;
  this.CaseTypes = arg2;
  this.Info = arg3;
}, _Types.Record);
exports.UnionCase = UnionCase;

function UnionCase$reflection() {
  return (0, _Reflection.record)("Fable.SimpleJson.UnionCase", [], UnionCase, () => [["CaseName", _Reflection.string], ["CaseTypes", (0, _Reflection.array)(TypeInfo$reflection())], ["Info", (0, _Reflection.type)("Microsoft.FSharp.Reflection.UnionCaseInfo")]]);
}

const TypeInfo = (0, _Types.declare)(function Fable_SimpleJson_TypeInfo(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.TypeInfo = TypeInfo;

function TypeInfo$reflection() {
  return (0, _Reflection.union)("Fable.SimpleJson.TypeInfo", [], TypeInfo, () => ["Unit", "String", "UInt16", "UInt32", "UInt64", "Int32", "Bool", "Float32", "Float", "Decimal", "Short", "Long", "Byte", "DateTime", "DateTimeOffset", "BigInt", "TimeSpan", "Guid", ["Any", [(0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.type)("System.Type"))]], ["Async", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["Promise", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["Option", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["List", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["Set", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["Array", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["Seq", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["Tuple", [(0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.array)(TypeInfo$reflection()))]], ["Map", [(0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.tuple)(TypeInfo$reflection(), TypeInfo$reflection()))]], ["Dictionary", [(0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.tuple)(TypeInfo$reflection(), TypeInfo$reflection()))]], ["ResizeArray", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["HashSet", [(0, _Reflection.lambda)(_Reflection.unit, TypeInfo$reflection())]], ["Func", [(0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.array)(TypeInfo$reflection()))]], ["Record", [(0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.tuple)((0, _Reflection.array)(RecordField$reflection()), (0, _Reflection.type)("System.Type")))]], ["Union", [(0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.tuple)((0, _Reflection.array)(UnionCase$reflection()), (0, _Reflection.type)("System.Type")))]]]);
}