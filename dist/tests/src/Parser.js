"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withWhitespace = withWhitespace;
exports.jsonParser = exports.json = exports.comma = exports.jvalue = exports.jstring = exports.stringLiteral = exports.jnull = exports.jbool = exports.jnumber = exports.negativeJFloat = exports.jfloat = exports.negJint = exports.jint = exports.digits = void 0;

var _Parsimmon = require("../Fable.Parsimmon.4.0.0/Parsimmon");

var _Double = require("../fable-library.2.3.14/Double");

var _String = require("../fable-library.2.3.14/String");

var _Json = require("./Json");

var _List = require("../fable-library.2.3.14/List");

var _Util = require("../fable-library.2.3.14/Util");

var _Map = require("../fable-library.2.3.14/Map");

const digits = (0, _Parsimmon.Parsimmon$$$concat)((0, _Parsimmon.Parsimmon$$$atLeastOneOrMany)(_Parsimmon.Parsimmon$$$digit));
exports.digits = digits;
const jint = (0, _Parsimmon.Parsimmon$$$map)(_Double.parse, digits);
exports.jint = jint;
const negJint = (0, _Parsimmon.Parsimmon$$$map)(function f$$1(tupledArg) {
  return -tupledArg[1];
}, (0, _Parsimmon.Parsimmon$$$seq2)((0, _Parsimmon.Parsimmon$$$str)("-"), jint));
exports.negJint = negJint;

const jfloat = (() => {
  const digits$$1 = (0, _Parsimmon.Parsimmon$$$concat)((0, _Parsimmon.Parsimmon$$$many)(_Parsimmon.Parsimmon$$$digit));
  const dot = (0, _Parsimmon.Parsimmon$$$str)(".");
  const decimals = (0, _Parsimmon.Parsimmon$$$concat)((0, _Parsimmon.Parsimmon$$$atLeastOneOrMany)(_Parsimmon.Parsimmon$$$digit));
  return (0, _Parsimmon.Parsimmon$$$map)(function f$$2(tupledArg$$1) {
    var other;
    return (0, _Double.parse)((0, _String.join)("", ...[tupledArg$$1[0] === "" ? "0" : (other = tupledArg$$1[0], other), tupledArg$$1[1], tupledArg$$1[2]]));
  }, (0, _Parsimmon.Parsimmon$$$seq3)(digits$$1, dot, decimals));
})();

exports.jfloat = jfloat;
const negativeJFloat = (0, _Parsimmon.Parsimmon$$$map)(function f$$3(tupledArg$$2) {
  return -tupledArg$$2[1];
}, (0, _Parsimmon.Parsimmon$$$seq2)((0, _Parsimmon.Parsimmon$$$str)("-"), jfloat));
exports.negativeJFloat = negativeJFloat;
const jnumber = (0, _Parsimmon.Parsimmon$$$map)(function f$$4(arg0) {
  return new _Json.Json(0, "JNumber", arg0);
}, (0, _Parsimmon.Parsimmon$$$choose)((0, _List.ofArray)([jfloat, negativeJFloat, jint, negJint])));
exports.jnumber = jnumber;
const jbool = (0, _Parsimmon.Parsimmon$$$choose)((0, _List.ofArray)([(0, _Parsimmon.Parsimmon$$$stringReturn)("true", new _Json.Json(2, "JBool", true)), (0, _Parsimmon.Parsimmon$$$stringReturn)("false", new _Json.Json(2, "JBool", false))]));
exports.jbool = jbool;
const jnull = (0, _Parsimmon.Parsimmon$$$stringReturn)("null", new _Json.Json(3, "JNull"));
exports.jnull = jnull;

const stringLiteral = (() => {
  const escape = (0, _Parsimmon.Parsimmon$$$map)(function f$$5(_arg1) {
    switch (_arg1) {
      case "b":
        {
          return "\b";
        }

      case "f":
        {
          return "\f";
        }

      case "n":
        {
          return "\n";
        }

      case "r":
        {
          return "\r";
        }

      case "t":
        {
          return "\t";
        }

      default:
        {
          const c = _arg1;
          return c;
        }
    }
  }, (0, _Parsimmon.Parsimmon$$$oneOf)("\"\\/bfnrt"));
  const escapedCharSnippet = (0, _Parsimmon.Parsimmon$$$map)(function f$$6(tuple) {
    return tuple[1];
  }, (0, _Parsimmon.Parsimmon$$$seq2)((0, _Parsimmon.Parsimmon$$$str)("\\"), escape));
  const normalCharSnippet = (0, _Parsimmon.Parsimmon$$$satisfy)(function (c$$1) {
    return c$$1 !== "\"" ? c$$1 !== "\\" : false;
  });
  const anyCharSnippet = (0, _Parsimmon.Parsimmon$$$concat)((0, _Parsimmon.Parsimmon$$$many)((0, _Parsimmon.Parsimmon$$$orTry)(escapedCharSnippet, normalCharSnippet)));
  return (0, _Parsimmon.Parsimmon$$$between)((0, _Parsimmon.Parsimmon$$$str)("\""), (0, _Parsimmon.Parsimmon$$$str)("\""), anyCharSnippet);
})();

exports.stringLiteral = stringLiteral;
const jstring = stringLiteral.map(function (arg0$$1) {
  return new _Json.Json(1, "JString", arg0$$1);
});
exports.jstring = jstring;

function withWhitespace(p) {
  return (0, _Parsimmon.Parsimmon$$$between)(_Parsimmon.Parsimmon$$$optionalWhitespace, _Parsimmon.Parsimmon$$$optionalWhitespace, p);
}

const jvalue = (0, _Parsimmon.Parsimmon$$$choose)((0, _List.map)(withWhitespace, (0, _List.ofArray)([jnull, jbool, jnumber, jstring])));
exports.jvalue = jvalue;
const comma = withWhitespace((0, _Parsimmon.Parsimmon$$$str)(","));
exports.comma = comma;

function json$004099() {
  const f$$7 = function f$$7() {
    const leftBracket = withWhitespace((0, _Parsimmon.Parsimmon$$$str)("["));
    const rightBracket = withWhitespace((0, _Parsimmon.Parsimmon$$$str)("]"));
    const arrayValue = (0, _Parsimmon.Parsimmon$$$seperateBy)(comma, json$004099$002D1.Value);
    const jarray = (0, _Parsimmon.Parsimmon$$$map)(function f$$8($arg$$1) {
      return new _Json.Json(4, "JArray", (0, _List.ofArray)($arg$$1));
    }, (0, _Parsimmon.Parsimmon$$$between)(leftBracket, rightBracket, arrayValue));
    const leftBrace = withWhitespace((0, _Parsimmon.Parsimmon$$$str)("{"));
    const rightBrace = withWhitespace((0, _Parsimmon.Parsimmon$$$str)("}"));
    const keyValues = (0, _Parsimmon.Parsimmon$$$seperateBy)(comma, (0, _Parsimmon.Parsimmon$$$map)(function f$$9(tupledArg$$3) {
      return [tupledArg$$3[0], tupledArg$$3[2]];
    }, (0, _Parsimmon.Parsimmon$$$seq3)(withWhitespace(stringLiteral), withWhitespace((0, _Parsimmon.Parsimmon$$$str)(":")), withWhitespace(json$004099$002D1.Value))));
    const jobject = (0, _Parsimmon.Parsimmon$$$map)(function f$$10($arg$$5) {
      return new _Json.Json(5, "JObject", (0, _Map.ofList)((0, _List.ofArray)($arg$$5), {
        Compare: _Util.comparePrimitives
      }));
    }, (0, _Parsimmon.Parsimmon$$$between)(leftBrace, rightBrace, keyValues));
    return (0, _Parsimmon.Parsimmon$$$choose)((0, _List.ofArray)([jvalue, jarray, jobject]));
  };

  return (0, _Parsimmon.Parsimmon$$$ofLazy)(f$$7);
}

const json$004099$002D1 = new _Util.Lazy(json$004099);
const json = json$004099$002D1.Value;
exports.json = json;
const jsonParser = withWhitespace(json);
exports.jsonParser = jsonParser;