"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteropUtil$$$isDateOffset = InteropUtil$$$isDateOffset;
exports.InteropUtil$$$isObjectLiteral = InteropUtil$$$isObjectLiteral;
exports.InteropUtil$$$isBigInt = InteropUtil$$$isBigInt;
exports.SimpleJson$$$tryParse = SimpleJson$$$tryParse;
exports.SimpleJson$$$parse = SimpleJson$$$parse;
exports.SimpleJson$$$toString = SimpleJson$$$toString;
exports.SimpleJson$$$stringify = SimpleJson$$$stringify;
exports.SimpleJson$$$parseNative$0027 = SimpleJson$$$parseNative$0027;
exports.SimpleJson$$$parseNative = SimpleJson$$$parseNative;
exports.SimpleJson$$$tryParseNative = SimpleJson$$$tryParseNative;
exports.SimpleJson$$$fromObjectLiteral = SimpleJson$$$fromObjectLiteral;
exports.SimpleJson$$$mapKeys = SimpleJson$$$mapKeys;
exports.SimpleJson$$$mapbyKey = SimpleJson$$$mapbyKey;
exports.SimpleJson$$$mapKeysByPath = SimpleJson$$$mapKeysByPath;
exports.SimpleJson$$$readPath = SimpleJson$$$readPath;

var _Parser = require("./Parser");

var _Parsimmon = require("../Fable.Parsimmon.4.0.0/Parsimmon");

var _String = require("../fable-library.2.3.14/String");

var _List = require("../fable-library.2.3.14/List");

var _Map = require("../fable-library.2.3.14/Map");

var _Date = require("../fable-library.2.3.14/Date");

var _BigInt = require("../fable-library.2.3.14/BigInt");

var _Util = require("../fable-library.2.3.14/Util");

var _TypeCheck = require("./TypeCheck");

var _Json = require("./Json");

var _Array = require("../fable-library.2.3.14/Array");

var _Seq = require("../fable-library.2.3.14/Seq");

var _Types = require("../fable-library.2.3.14/Types");

function InteropUtil$$$isDateOffset(x) {
  if (x instanceof Date) {
    return "offset" in x;
  } else {
    return false;
  }
}

function InteropUtil$$$isObjectLiteral(x$$1) {
  return typeof x$$1 === "object";
}

function InteropUtil$$$isBigInt(x$$2) {
  if ((((!(x$$2 == null) ? InteropUtil$$$isObjectLiteral(x$$2) : false) ? "signInt" in x$$2 : false) ? "v" in x$$2 : false) ? "digits" in x$$2["v"] : false) {
    return "bound" in x$$2["v"];
  } else {
    return false;
  }
}

function SimpleJson$$$tryParse(input) {
  return (0, _Parsimmon.Parsimmon$$$parse)(input, _Parser.jsonParser);
}

function SimpleJson$$$parse(input$$1) {
  const matchValue = SimpleJson$$$tryParse(input$$1);

  if (matchValue == null) {
    return (0, _String.toFail)((0, _String.printf)("Could not parse the JSON input: %s"))(input$$1);
  } else {
    const result = matchValue;
    return result;
  }
}

function SimpleJson$$$toString(_arg1) {
  if (_arg1.tag === 2) {
    if (_arg1.fields[0]) {
      return "true";
    } else {
      return "false";
    }
  } else if (_arg1.tag === 0) {
    const number = _arg1.fields[0];
    return number.toString();
  } else if (_arg1.tag === 1) {
    const text = _arg1.fields[0];
    return (0, _String.toText)((0, _String.printf)("\"%s\""))(text);
  } else if (_arg1.tag === 4) {
    const elements = _arg1.fields[0];
    return (0, _String.toText)((0, _String.printf)("[%s]"))((0, _String.join)(",", ...(0, _List.map)(SimpleJson$$$toString, elements)));
  } else if (_arg1.tag === 5) {
    const map = _arg1.fields[0];
    return (0, _String.toText)((0, _String.printf)("{%s}"))((0, _String.join)(",", ...(0, _List.map)(function mapping$$1(tupledArg) {
      return (0, _String.toText)((0, _String.printf)("\"%s\":%s"))(tupledArg[0])(SimpleJson$$$toString(tupledArg[1]));
    }, (0, _Map.toList)(map))));
  } else {
    return "null";
  }
}

function SimpleJson$$$stringify(value$$1) {
  return JSON.stringify(value$$1, function (key$$1, v) {
    var copyOfStruct;

    if (InteropUtil$$$isDateOffset(this[key$$1])) {
      const dateOffset = this[key$$1];
      return (0, _Date.toString)(dateOffset, "O");
    } else if (InteropUtil$$$isBigInt(this[key$$1])) {
      const bigInt = this[key$$1];
      return String((0, _BigInt.toDecimal)(bigInt));
    } else {
      return typeof v === "string" ? v : (0, _Util.isIterable)(v) ? Array.isArray(v) ? v : Array.from(v) : InteropUtil$$$isBigInt(v) ? String((0, _BigInt.toDecimal)(v)) : InteropUtil$$$isDateOffset(v) ? (copyOfStruct = v, (0, _Date.toString)(copyOfStruct, "O")) : v;
    }
  }, 0);
}

function SimpleJson$$$parseNative$0027(x$$3) {
  const activePatternResult520 = (0, _TypeCheck.$007CNativeString$007C_$007C)(x$$3);

  if (activePatternResult520 != null) {
    const str = activePatternResult520;
    return new _Json.Json(1, "JString", str);
  } else {
    const activePatternResult519 = (0, _TypeCheck.$007CNativeNumber$007C_$007C)(x$$3);

    if (activePatternResult519 != null) {
      const number$$1 = activePatternResult519;
      return new _Json.Json(0, "JNumber", number$$1);
    } else {
      const activePatternResult518 = (0, _TypeCheck.$007CNativeBool$007C_$007C)(x$$3);

      if (activePatternResult518 != null) {
        const value$$2 = activePatternResult518;
        return new _Json.Json(2, "JBool", value$$2);
      } else {
        if ((0, _TypeCheck.$007CNull$007C_$007C)(x$$3) != null) {
          return new _Json.Json(3, "JNull");
        } else {
          const activePatternResult516 = (0, _TypeCheck.$007CNativeArray$007C_$007C)(x$$3);

          if (activePatternResult516 != null) {
            const arr = activePatternResult516;
            return new _Json.Json(4, "JArray", (0, _List.ofArray)((0, _Array.map)(SimpleJson$$$parseNative$0027, arr, Array)));
          } else {
            const activePatternResult515 = (0, _TypeCheck.$007CNativeObject$007C_$007C)(x$$3);

            if (activePatternResult515 != null) {
              const object = activePatternResult515;
              return new _Json.Json(5, "JObject", (0, _Map.ofList)((0, _List.ofSeq)((0, _Seq.delay)(function () {
                return (0, _Seq.map)(function (key$$2) {
                  return [key$$2, SimpleJson$$$parseNative$0027(object[key$$2])];
                }, Object.keys(object));
              })), {
                Compare: _Util.comparePrimitives
              }));
            } else {
              return new _Json.Json(3, "JNull");
            }
          }
        }
      }
    }
  }
}

function SimpleJson$$$parseNative(input$$2) {
  const parsed = JSON.parse(input$$2);
  return SimpleJson$$$parseNative$0027(parsed);
}

function SimpleJson$$$tryParseNative(input$$3) {
  try {
    return SimpleJson$$$parseNative(input$$3);
  } catch (ex) {
    return null;
  }
}

function SimpleJson$$$fromObjectLiteral(x$$5) {
  try {
    return SimpleJson$$$parseNative$0027(x$$5);
  } catch (matchValue$$1) {
    return null;
  }
}

function SimpleJson$$$mapKeys(f, _arg1$$2) {
  switch (_arg1$$2.tag) {
    case 5:
      {
        const dictionary = _arg1$$2.fields[0];
        return new _Json.Json(5, "JObject", (0, _Map.ofList)((0, _List.map)(function mapping$$2(tupledArg$$1) {
          return [f(tupledArg$$1[0]), SimpleJson$$$mapKeys(f, tupledArg$$1[1])];
        }, (0, _Map.toList)(dictionary)), {
          Compare: _Util.comparePrimitives
        }));
      }

    case 4:
      {
        const values = _arg1$$2.fields[0];
        return new _Json.Json(4, "JArray", (0, _List.map)(function mapping$$3(_arg1$$3) {
          return SimpleJson$$$mapKeys(f, _arg1$$3);
        }, values));
      }

    default:
      {
        const otherJsonValue = _arg1$$2;
        return otherJsonValue;
      }
  }
}

function SimpleJson$$$mapbyKey(f$$1, _arg1$$4) {
  switch (_arg1$$4.tag) {
    case 5:
      {
        const dictionary$$1 = _arg1$$4.fields[0];
        return new _Json.Json(5, "JObject", (0, _Map.ofList)((0, _List.map)(function mapping$$4(tupledArg$$2) {
          return [tupledArg$$2[0], f$$1(tupledArg$$2[0], tupledArg$$2[1])];
        }, (0, _Map.toList)(dictionary$$1)), {
          Compare: _Util.comparePrimitives
        }));
      }

    case 4:
      {
        const values$$1 = _arg1$$4.fields[0];
        return new _Json.Json(4, "JArray", (0, _List.map)(function mapping$$5(_arg1$$5) {
          return SimpleJson$$$mapbyKey(f$$1, _arg1$$5);
        }, values$$1));
      }

    default:
      {
        const otherJsonValue$$1 = _arg1$$4;
        return otherJsonValue$$1;
      }
  }
}

function SimpleJson$$$mapKeysByPath(f$$2, json) {
  const mapKey = function mapKey(xs, _arg1$$6) {
    switch (_arg1$$6.tag) {
      case 5:
        {
          const dictionary$$2 = _arg1$$6.fields[0];
          return new _Json.Json(5, "JObject", (0, _Map.ofList)((0, _List.map)(function mapping$$6(tupledArg$$3) {
            const keyPath = (0, _List.concat)([xs, new _Types.List(tupledArg$$3[0], new _Types.List())]);
            const matchValue$$2 = f$$2(keyPath);

            if (matchValue$$2 == null) {
              return [tupledArg$$3[0], mapKey(keyPath, tupledArg$$3[1])];
            } else {
              const nextKey = matchValue$$2;
              return [nextKey, mapKey(keyPath, tupledArg$$3[1])];
            }
          }, (0, _Map.toList)(dictionary$$2)), {
            Compare: _Util.comparePrimitives
          }));
        }

      case 4:
        {
          const values$$2 = _arg1$$6.fields[0];
          return new _Json.Json(4, "JArray", (0, _List.map)((0, _Util.partialApply)(1, mapKey, [xs]), values$$2));
        }

      default:
        {
          const otherJsonValue$$2 = _arg1$$6;
          return otherJsonValue$$2;
        }
    }
  };

  return mapKey(new _Types.List(), json);
}

function SimpleJson$$$readPath(keys, input$$4) {
  SimpleJson$$$readPath: while (true) {
    const matchValue$$3 = [keys, input$$4];
    var $target$$15, dict, key$$6, dict$$1, firstKey, rest;

    if (matchValue$$3[0].tail != null) {
      if (matchValue$$3[0].tail.tail == null) {
        if (matchValue$$3[1].tag === 5) {
          $target$$15 = 1;
          dict = matchValue$$3[1].fields[0];
          key$$6 = matchValue$$3[0].head;
        } else {
          $target$$15 = 3;
        }
      } else if (matchValue$$3[1].tag === 5) {
        $target$$15 = 2;
        dict$$1 = matchValue$$3[1].fields[0];
        firstKey = matchValue$$3[0].head;
        rest = matchValue$$3[0].tail;
      } else {
        $target$$15 = 3;
      }
    } else {
      $target$$15 = 0;
    }

    switch ($target$$15) {
      case 0:
        {
          return null;
        }

      case 1:
        {
          return (0, _Map.tryFind)(key$$6, dict);
        }

      case 2:
        {
          const matchValue$$4 = (0, _Map.tryFind)(firstKey, dict$$1);
          var $target$$16, nextDict;

          if (matchValue$$4 != null) {
            if (matchValue$$4.tag === 5) {
              $target$$16 = 0;
              nextDict = matchValue$$4.fields[0];
            } else {
              $target$$16 = 1;
            }
          } else {
            $target$$16 = 1;
          }

          switch ($target$$16) {
            case 0:
              {
                keys = rest;
                input$$4 = new _Json.Json(5, "JObject", nextDict);
                continue SimpleJson$$$readPath;
              }

            case 1:
              {
                return null;
              }
          }
        }

      case 3:
        {
          return null;
        }
    }

    break;
  }
}