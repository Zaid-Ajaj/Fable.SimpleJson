"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Json$reflection = Json$reflection;
exports.Json = void 0;

var _Types = require("../fable-library.2.3.14/Types");

var _Reflection = require("../fable-library.2.3.14/Reflection");

const Json = (0, _Types.declare)(function Fable_SimpleJson_Json(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Json = Json;

function Json$reflection() {
  return (0, _Reflection.union)("Fable.SimpleJson.Json", [], Json, () => [["JNumber", [_Reflection.float64]], ["JString", [_Reflection.string]], ["JBool", [_Reflection.bool]], "JNull", ["JArray", [(0, _Reflection.list)(Json$reflection())]], ["JObject", [(0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, Json$reflection()])]]]);
}