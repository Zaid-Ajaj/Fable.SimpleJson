"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Convert$002EInternalMap$reflection = Convert$002EInternalMap$reflection;
exports.Convert$$$flattenMap = Convert$$$flattenMap;
exports.Convert$$$$007CKeyValue$007C_$007C = Convert$$$$007CKeyValue$007C_$007C;
exports.Convert$$$$007CNonArray$007C_$007C = Convert$$$$007CNonArray$007C_$007C;
exports.Convert$$$$007CMapEmpty$007C_$007C = Convert$$$$007CMapEmpty$007C_$007C;
exports.Convert$$$$007CMapKey$007C_$007C = Convert$$$$007CMapKey$007C_$007C;
exports.Convert$$$$007CMapOne$007C_$007C = Convert$$$$007CMapOne$007C_$007C;
exports.Convert$$$$007CMapNode$007C_$007C = Convert$$$$007CMapNode$007C_$007C;
exports.Convert$$$generateMap = Convert$$$generateMap;
exports.Convert$$$arrayLike = Convert$$$arrayLike;
exports.Convert$$$isQuoted = Convert$$$isQuoted;
exports.Convert$$$removeQuotes = Convert$$$removeQuotes;
exports.Convert$$$fromJsonAs = Convert$$$fromJsonAs;
exports.Convert$$$fromJson = Convert$$$fromJson;
exports.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505 = Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505;
exports.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6 = Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6;
exports.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6 = Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6;
exports.Fable$002ESimpleJson$002EJson$$Json$002EtryParseAs$002EStatic$$Z7D14C7A6 = Fable$002ESimpleJson$002EJson$$Json$002EtryParseAs$002EStatic$$Z7D14C7A6;
exports.Fable$002ESimpleJson$002EJson$$Json$002EtryParseNativeAs$002EStatic$$Z7D14C7A6 = Fable$002ESimpleJson$002EJson$$Json$002EtryParseNativeAs$002EStatic$$Z7D14C7A6;
exports.Fable$002ESimpleJson$002EJson$$Json$002EconvertFromJsonAs$002EStatic$$340181C6 = Fable$002ESimpleJson$002EJson$$Json$002EconvertFromJsonAs$002EStatic$$340181C6;
exports.Fable$002ESimpleJson$002EJson$$Json$002EtrConvertFromJsonAs$002EStatic$$340181C6 = Fable$002ESimpleJson$002EJson$$Json$002EtrConvertFromJsonAs$002EStatic$$340181C6;
exports.Convert$002EInternalMap = exports.Convert$$$insideBrowser = void 0;

var _Types = require("../fable-library.2.3.14/Types");

var _Reflection = require("../fable-library.2.3.14/Reflection");

var _Json = require("./Json");

var _Seq = require("../fable-library.2.3.14/Seq");

var _List = require("../fable-library.2.3.14/List");

var _Map = require("../fable-library.2.3.14/Map");

var _Option = require("../fable-library.2.3.14/Option");

var _String = require("../fable-library.2.3.14/String");

var _Double = require("../fable-library.2.3.14/Double");

var _Int = require("../fable-library.2.3.14/Int32");

var _Decimal = _interopRequireDefault(require("../fable-library.2.3.14/Decimal"));

var _Long = require("../fable-library.2.3.14/Long");

var _BigInt = require("../fable-library.2.3.14/BigInt");

var _Date = require("../fable-library.2.3.14/Date");

var _DateOffset = require("../fable-library.2.3.14/DateOffset");

var _Array = require("../fable-library.2.3.14/Array");

var _BitConverter = require("../fable-library.2.3.14/BitConverter");

var _SimpleJson = require("./SimpleJson");

var _Set = require("../fable-library.2.3.14/Set");

var _TypeInfo = require("./TypeInfo");

var _Util = require("../fable-library.2.3.14/Util");

var _TypeInfo2 = require("./TypeInfo.Converter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Convert$$$insideBrowser = new Function("try {return this===window;}catch(e){ return false;}")();
exports.Convert$$$insideBrowser = Convert$$$insideBrowser;
const Convert$002EInternalMap = (0, _Types.declare)(function Fable_SimpleJson_Convert_InternalMap(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Convert$002EInternalMap = Convert$002EInternalMap;

function Convert$002EInternalMap$reflection() {
  return (0, _Reflection.union)("Fable.SimpleJson.Convert.InternalMap", [], Convert$002EInternalMap, () => ["MapEmpty", ["MapOne", [_Reflection.string, (0, _Json.Json$reflection)()]], ["MapNode", [_Reflection.string, (0, _Json.Json$reflection)(), Convert$002EInternalMap$reflection(), Convert$002EInternalMap$reflection()]]]);
}

function Convert$$$flattenMap(_arg1) {
  switch (_arg1.tag) {
    case 1:
      {
        const value = _arg1.fields[1];
        const key = _arg1.fields[0];
        return new _Types.List([key, value], new _Types.List());
      }

    case 2:
      {
        const value$$1 = _arg1.fields[1];
        const right = _arg1.fields[3];
        const left = _arg1.fields[2];
        const key$$1 = _arg1.fields[0];
        return (0, _List.ofSeq)((0, _Seq.delay)(function () {
          return (0, _Seq.append)(Convert$$$flattenMap(left), (0, _Seq.delay)(function () {
            return (0, _Seq.append)(Convert$$$flattenMap(right), (0, _Seq.delay)(function () {
              return (0, _Seq.singleton)([key$$1, value$$1]);
            }));
          }));
        }));
      }

    default:
      {
        return new _Types.List();
      }
  }
}

function Convert$$$$007CKeyValue$007C_$007C(key$$2, map) {
  return (0, _Option.defaultArg)((0, _Map.tryFind)(key$$2, map), null, function mapping(value$$2) {
    return [key$$2, value$$2, (0, _Map.remove)(key$$2, map)];
  });
}

function Convert$$$$007CNonArray$007C_$007C(_arg1$$1) {
  if (_arg1$$1.tag === 4) {
    return null;
  } else {
    const json = _arg1$$1;
    return json;
  }
}

function Convert$$$$007CMapEmpty$007C_$007C(json$$1) {
  var $target$$24;

  if (json$$1.tag === 1) {
    if (json$$1.fields[0] === "MapEmpty") {
      $target$$24 = 0;
    } else {
      $target$$24 = 1;
    }
  } else {
    $target$$24 = 1;
  }

  switch ($target$$24) {
    case 0:
      {
        return json$$1;
      }

    case 1:
      {
        return null;
      }
  }
}

function Convert$$$$007CMapKey$007C_$007C(_arg1$$2) {
  switch (_arg1$$2.tag) {
    case 0:
      {
        const number = _arg1$$2.fields[0];
        return number.toString();
      }

    case 1:
      {
        const key$$3 = _arg1$$2.fields[0];
        return key$$3;
      }

    default:
      {
        return null;
      }
  }
}

function Convert$$$$007CMapOne$007C_$007C(_arg1$$3) {
  var $target$$25, key$$4, value$$3;

  if (_arg1$$3.tag === 4) {
    if (_arg1$$3.fields[0].tail != null) {
      if (_arg1$$3.fields[0].head.tag === 1) {
        if (_arg1$$3.fields[0].head.fields[0] === "MapOne") {
          if (_arg1$$3.fields[0].tail.tail != null) {
            const activePatternResult590 = Convert$$$$007CMapKey$007C_$007C(_arg1$$3.fields[0].tail.head);

            if (activePatternResult590 != null) {
              if (_arg1$$3.fields[0].tail.tail.tail != null) {
                if (_arg1$$3.fields[0].tail.tail.tail.tail == null) {
                  $target$$25 = 0;
                  key$$4 = activePatternResult590;
                  value$$3 = _arg1$$3.fields[0].tail.tail.head;
                } else {
                  $target$$25 = 1;
                }
              } else {
                $target$$25 = 1;
              }
            } else {
              $target$$25 = 1;
            }
          } else {
            $target$$25 = 1;
          }
        } else {
          $target$$25 = 1;
        }
      } else {
        $target$$25 = 1;
      }
    } else {
      $target$$25 = 1;
    }
  } else {
    $target$$25 = 1;
  }

  switch ($target$$25) {
    case 0:
      {
        return [key$$4, value$$3];
      }

    case 1:
      {
        return null;
      }
  }
}

function Convert$$$$007CMapNode$007C_$007C(_arg1$$4) {
  var $target$$26, key$$5, left$$1, right$$1, value$$4;

  if (_arg1$$4.tag === 4) {
    if (_arg1$$4.fields[0].tail != null) {
      if (_arg1$$4.fields[0].head.tag === 1) {
        if (_arg1$$4.fields[0].head.fields[0] === "MapNode") {
          if (_arg1$$4.fields[0].tail.tail != null) {
            const activePatternResult592 = Convert$$$$007CMapKey$007C_$007C(_arg1$$4.fields[0].tail.head);

            if (activePatternResult592 != null) {
              if (_arg1$$4.fields[0].tail.tail.tail != null) {
                if (_arg1$$4.fields[0].tail.tail.tail.tail != null) {
                  if (_arg1$$4.fields[0].tail.tail.tail.tail.tail != null) {
                    if (_arg1$$4.fields[0].tail.tail.tail.tail.tail.tail != null) {
                      if (_arg1$$4.fields[0].tail.tail.tail.tail.tail.head.tag === 0) {
                        if (_arg1$$4.fields[0].tail.tail.tail.tail.tail.tail.tail == null) {
                          $target$$26 = 0;
                          key$$5 = activePatternResult592;
                          left$$1 = _arg1$$4.fields[0].tail.tail.tail.head;
                          right$$1 = _arg1$$4.fields[0].tail.tail.tail.tail.head;
                          value$$4 = _arg1$$4.fields[0].tail.tail.head;
                        } else {
                          $target$$26 = 1;
                        }
                      } else {
                        $target$$26 = 1;
                      }
                    } else {
                      $target$$26 = 1;
                    }
                  } else {
                    $target$$26 = 1;
                  }
                } else {
                  $target$$26 = 1;
                }
              } else {
                $target$$26 = 1;
              }
            } else {
              $target$$26 = 1;
            }
          } else {
            $target$$26 = 1;
          }
        } else {
          $target$$26 = 1;
        }
      } else {
        $target$$26 = 1;
      }
    } else {
      $target$$26 = 1;
    }
  } else {
    $target$$26 = 1;
  }

  switch ($target$$26) {
    case 0:
      {
        return [key$$5, value$$4, left$$1, right$$1];
      }

    case 1:
      {
        return null;
      }
  }
}

function Convert$$$generateMap(json$$2) {
  if (Convert$$$$007CMapEmpty$007C_$007C(json$$2) != null) {
    return new Convert$002EInternalMap(0, "MapEmpty");
  } else {
    const activePatternResult595 = Convert$$$$007CMapOne$007C_$007C(json$$2);

    if (activePatternResult595 != null) {
      const key$$6 = activePatternResult595[0];
      const value$$5 = activePatternResult595[1];
      return new Convert$002EInternalMap(1, "MapOne", key$$6, value$$5);
    } else {
      const activePatternResult594 = Convert$$$$007CMapNode$007C_$007C(json$$2);

      if (activePatternResult594 != null) {
        const key$$7 = activePatternResult594[0];
        const left$$2 = activePatternResult594[2];
        const right$$2 = activePatternResult594[3];
        const value$$6 = activePatternResult594[1];
        const matchValue = [Convert$$$generateMap(left$$2), Convert$$$generateMap(right$$2)];
        var $target$$27, leftMap, rightMap;

        if (matchValue[0] != null) {
          if (matchValue[1] != null) {
            $target$$27 = 0;
            leftMap = matchValue[0];
            rightMap = matchValue[1];
          } else {
            $target$$27 = 1;
          }
        } else {
          $target$$27 = 1;
        }

        switch ($target$$27) {
          case 0:
            {
              return new Convert$002EInternalMap(2, "MapNode", key$$7, value$$6, leftMap, rightMap);
            }

          case 1:
            {
              return null;
            }
        }
      } else {
        return null;
      }
    }
  }
}

function Convert$$$arrayLike(_arg1$$5) {
  switch (_arg1$$5.tag) {
    case 24:
      {
        return true;
      }

    case 22:
      {
        return true;
      }

    case 25:
      {
        return true;
      }

    case 26:
      {
        return true;
      }

    default:
      {
        return false;
      }
  }
}

function Convert$$$isQuoted(input) {
  if (input.indexOf("\"") === 0) {
    return (0, _String.endsWith)(input, "\"");
  } else {
    return false;
  }
}

function Convert$$$removeQuotes(input$$1) {
  return input$$1.substr(1, input$$1.length - 2);
}

function Convert$$$fromJsonAs(input$$2, typeInfo) {
  var foundCase, testExpr, tree, comparer, getTypes$$1, caseName$$3, optionalTypeDelayed, optionalTypeDelayed$$1, optionalTypeDelayed$$2, optionalTypeDelayed$$3, optionalTypeDelayed$$4;

  Convert$$$fromJsonAs: while (true) {
    const matchValue$$1 = [input$$2, typeInfo];
    var $target$$28, value$$7, value$$8, value$$9, value$$10, value$$11, value$$12, value$$13, value$$14, value$$15, value$$16, value$$17, value$$18, value$$19, value$$20, value$$21, value$$22, value$$23, value$$24, getElemType, value$$25, value$$26, value$$27, value$$28, value$$29, value$$30, value$$31, value$$32, getTypes, values, jsonValue$$5, optionalTypeDelayed$$5;

    if (matchValue$$1[0].tag === 0) {
      if (matchValue$$1[1].tag === 8) {
        $target$$28 = 0;
        value$$7 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 7) {
        $target$$28 = 1;
        value$$8 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 5) {
        $target$$28 = 3;
        value$$10 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 9) {
        $target$$28 = 8;
        value$$15 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 10) {
        $target$$28 = 10;
        value$$17 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 2) {
        $target$$28 = 11;
        value$$18 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 3) {
        $target$$28 = 13;
        value$$20 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 4) {
        $target$$28 = 15;
        value$$22 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 16) {
        $target$$28 = 17;
        value$$24 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 12) {
        $target$$28 = 23;
        value$$28 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 15) {
        $target$$28 = 25;
        value$$30 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 21) {
        if (optionalTypeDelayed = matchValue$$1[1].fields[0], !(0, _Util.equals)(matchValue$$1[0], new _Json.Json(3, "JNull"))) {
          $target$$28 = 30;
          jsonValue$$5 = matchValue$$1[0];
          optionalTypeDelayed$$5 = matchValue$$1[1].fields[0];
        } else {
          $target$$28 = 31;
        }
      } else {
        $target$$28 = 31;
      }
    } else if (matchValue$$1[0].tag === 1) {
      if (matchValue$$1[1].tag === 7) {
        $target$$28 = 2;
        value$$9 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 5) {
        $target$$28 = 5;
        value$$12 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 1) {
        $target$$28 = 6;
        value$$13 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 9) {
        $target$$28 = 7;
        value$$14 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 10) {
        $target$$28 = 9;
        value$$16 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 2) {
        $target$$28 = 12;
        value$$19 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 3) {
        $target$$28 = 14;
        value$$21 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 4) {
        $target$$28 = 16;
        value$$23 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 24) {
        $target$$28 = 18;
        getElemType = matchValue$$1[1].fields[0];
        value$$25 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 11) {
        $target$$28 = 21;
        value$$26 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 12) {
        $target$$28 = 22;
        value$$27 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 15) {
        $target$$28 = 24;
        value$$29 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 13) {
        $target$$28 = 26;
        value$$31 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 14) {
        $target$$28 = 27;
        value$$32 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 21) {
        if (optionalTypeDelayed$$1 = matchValue$$1[1].fields[0], !(0, _Util.equals)(matchValue$$1[0], new _Json.Json(3, "JNull"))) {
          $target$$28 = 30;
          jsonValue$$5 = matchValue$$1[0];
          optionalTypeDelayed$$5 = matchValue$$1[1].fields[0];
        } else {
          $target$$28 = 31;
        }
      } else {
        $target$$28 = 31;
      }
    } else if (matchValue$$1[0].tag === 2) {
      if (matchValue$$1[1].tag === 6) {
        $target$$28 = 4;
        value$$11 = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 21) {
        if (optionalTypeDelayed$$2 = matchValue$$1[1].fields[0], !(0, _Util.equals)(matchValue$$1[0], new _Json.Json(3, "JNull"))) {
          $target$$28 = 30;
          jsonValue$$5 = matchValue$$1[0];
          optionalTypeDelayed$$5 = matchValue$$1[1].fields[0];
        } else {
          $target$$28 = 31;
        }
      } else {
        $target$$28 = 31;
      }
    } else if (matchValue$$1[0].tag === 3) {
      if (matchValue$$1[1].tag === 1) {
        $target$$28 = 19;
      } else if (matchValue$$1[1].tag === 0) {
        $target$$28 = 20;
      } else if (matchValue$$1[1].tag === 21) {
        $target$$28 = 29;
      } else {
        $target$$28 = 31;
      }
    } else if (matchValue$$1[0].tag === 5) {
      if (matchValue$$1[1].tag === 33) {
        $target$$28 = 28;
        getTypes = matchValue$$1[1].fields[0];
        values = matchValue$$1[0].fields[0];
      } else if (matchValue$$1[1].tag === 21) {
        if (optionalTypeDelayed$$3 = matchValue$$1[1].fields[0], !(0, _Util.equals)(matchValue$$1[0], new _Json.Json(3, "JNull"))) {
          $target$$28 = 30;
          jsonValue$$5 = matchValue$$1[0];
          optionalTypeDelayed$$5 = matchValue$$1[1].fields[0];
        } else {
          $target$$28 = 31;
        }
      } else {
        $target$$28 = 31;
      }
    } else if (matchValue$$1[1].tag === 21) {
      if (optionalTypeDelayed$$4 = matchValue$$1[1].fields[0], !(0, _Util.equals)(matchValue$$1[0], new _Json.Json(3, "JNull"))) {
        $target$$28 = 30;
        jsonValue$$5 = matchValue$$1[0];
        optionalTypeDelayed$$5 = matchValue$$1[1].fields[0];
      } else {
        $target$$28 = 31;
      }
    } else {
      $target$$28 = 31;
    }

    switch ($target$$28) {
      case 0:
        {
          return value$$7;
        }

      case 1:
        {
          return value$$8;
        }

      case 2:
        {
          return (0, _Double.parse)(value$$9);
        }

      case 3:
        {
          return Math.floor(value$$10);
        }

      case 4:
        {
          return value$$11;
        }

      case 5:
        {
          return (0, _Int.parse)(value$$12, 511, false, 32);
        }

      case 6:
        {
          return value$$13;
        }

      case 7:
        {
          return new _Decimal.default(value$$14);
        }

      case 8:
        {
          return new _Decimal.default(value$$15);
        }

      case 9:
        {
          return (0, _Int.parse)(value$$16, 511, false, 16);
        }

      case 10:
        {
          return (value$$17 + 0x8000 & 0xFFFF) - 0x8000;
        }

      case 11:
        {
          return value$$18 & 0xFFFF;
        }

      case 12:
        {
          return (0, _Int.parse)(value$$19, 511, true, 16);
        }

      case 13:
        {
          return value$$20 >>> 0;
        }

      case 14:
        {
          return (0, _Int.parse)(value$$21, 511, true, 32);
        }

      case 15:
        {
          return (0, _Long.fromNumber)(value$$22, true);
        }

      case 16:
        {
          return (0, _Long.parse)(value$$23, 511, true, 64);
        }

      case 17:
        {
          return Math.floor(value$$24);
        }

      case 18:
        {
          const elemType = getElemType();

          if (elemType.tag === 12) {
            if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? true : Convert$$$insideBrowser) {
              return (0, _String.fromBase64String)(value$$25);
            } else {
              return Array.prototype.slice.call(Buffer.from(value$$25, "base64"));
            }
          } else {
            const otherType = elemType;
            return (0, _String.toFail)((0, _String.printf)("Cannot convert arbitrary string '%s' to %A"))(value$$25)(otherType);
          }
        }

      case 19:
        {
          return null;
        }

      case 20:
        {
          return null;
        }

      case 21:
        {
          return (0, _Long.parse)(value$$26, 511, false, 64);
        }

      case 22:
        {
          return (0, _Int.parse)(value$$27, 511, true, 8);
        }

      case 23:
        {
          return value$$28 & 0xFF;
        }

      case 24:
        {
          return (0, _BigInt.parse)(value$$29);
        }

      case 25:
        {
          return (0, _BigInt.fromInt32)(Math.floor(value$$30));
        }

      case 26:
        {
          return (0, _Date.parse)(value$$31);
        }

      case 27:
        {
          return (0, _DateOffset.parse)(value$$32);
        }

      case 28:
        {
          const patternInput = getTypes();
          const matchValue$$2 = (0, _Map.toList)(values);
          var $target$$29, caseName, values$$1, caseName$$1, json$$3;

          if (matchValue$$2.tail != null) {
            if (matchValue$$2.head[1].tag === 4) {
              if (matchValue$$2.tail.tail == null) {
                $target$$29 = 0;
                caseName = matchValue$$2.head[0];
                values$$1 = matchValue$$2.head[1].fields[0];
              } else {
                $target$$29 = 2;
              }
            } else {
              const activePatternResult608 = Convert$$$$007CNonArray$007C_$007C(matchValue$$2.head[1]);

              if (activePatternResult608 != null) {
                if (matchValue$$2.tail.tail == null) {
                  $target$$29 = 1;
                  caseName$$1 = matchValue$$2.head[0];
                  json$$3 = activePatternResult608;
                } else {
                  $target$$29 = 2;
                }
              } else {
                $target$$29 = 2;
              }
            }
          } else {
            $target$$29 = 2;
          }

          switch ($target$$29) {
            case 0:
              {
                const _arg1$$6 = (0, _Array.tryFind)(function predicate(case$) {
                  return case$.CaseName === caseName;
                }, patternInput[0]);

                if (_arg1$$6 != null) {
                  if (foundCase = _arg1$$6, foundCase.CaseTypes.length === 1 ? Convert$$$arrayLike(foundCase.CaseTypes[0]) : false) {
                    const foundCase$$1 = _arg1$$6;
                    const deserialized = Convert$$$fromJsonAs(new _Json.Json(4, "JArray", values$$1), foundCase$$1.CaseTypes[0]);
                    return (0, _Reflection.makeUnion)(foundCase$$1.Info, [deserialized]);
                  } else {
                    if (_arg1$$6 != null) {
                      const foundCase$$2 = _arg1$$6;

                      if ((foundCase$$2.CaseTypes.length === 1 ? !Convert$$$arrayLike(foundCase$$2.CaseTypes[0]) : false) ? foundCase$$2.CaseTypes.length !== (0, _List.length)(values$$1) : false) {
                        (0, _String.toFail)((0, _String.printf)("Expected case '%s' to have %d argument types but the JSON data only contained %d values"))(foundCase$$2.CaseName)(foundCase$$2.CaseTypes.length)((0, _List.length)(values$$1));
                      }

                      const parsedValues = (0, _Array.map)(function mapping$$1(tupledArg) {
                        return Convert$$$fromJsonAs(tupledArg[1], tupledArg[0]);
                      }, (0, _Array.zip)(foundCase$$2.CaseTypes, (0, _Array.ofList)(values$$1, Array)), Array);
                      return (0, _Reflection.makeUnion)(foundCase$$2.Info, parsedValues);
                    } else {
                      throw new Error("The match cases were incomplete");
                    }
                  }
                } else {
                  const caseNames = (0, _Array.map)(function (case$$$1) {
                    return (0, _String.toText)((0, _String.printf)(" '%s' "))(case$$$1.CaseName);
                  }, patternInput[0], Array);
                  const expectedCases = (0, _String.join)(", ", ...caseNames);
                  return (0, _String.toFail)((0, _String.printf)("Case %s was not valid for type '%s', expected one of the cases [%s]"))(caseName)((0, _Reflection.name)(patternInput[1]))(expectedCases);
                }
              }

            case 1:
              {
                const _arg2 = (0, _Array.tryFind)(function predicate$$1(case$$$2) {
                  return case$$$2.CaseName === caseName$$1;
                }, patternInput[0]);

                var $target$$30, caseInfo, caseName$$2, caseType;

                if (_arg2 != null) {
                  if (testExpr = _arg2.CaseTypes, !(0, _Array.equalsWith)(function ($x$$1, $y$$2) {
                    return $x$$1.CompareTo($y$$2);
                  }, testExpr, null) ? testExpr.length === 1 : false) {
                    $target$$30 = 0;
                    caseInfo = _arg2.Info;
                    caseName$$2 = _arg2.CaseName;
                    caseType = _arg2.CaseTypes[0];
                  } else {
                    $target$$30 = 1;
                  }
                } else {
                  $target$$30 = 1;
                }

                switch ($target$$30) {
                  case 0:
                    {
                      return (0, _Reflection.makeUnion)(caseInfo, [function (input$$3) {
                        return function (typeInfo$$1) {
                          return Convert$$$fromJsonAs(input$$3, typeInfo$$1);
                        };
                      }(json$$3)(caseType)]);
                    }

                  case 1:
                    {
                      const caseNames$$1 = (0, _Array.map)(function (case$$$3) {
                        return (0, _String.toText)((0, _String.printf)(" '%s' "))(case$$$3.CaseName);
                      }, patternInput[0], Array);
                      const expectedCases$$1 = (0, _String.join)(", ", ...caseNames$$1);
                      return (0, _String.toFail)((0, _String.printf)("Case %s was not valid for type '%s', expected one of the cases [%s]"))(caseName$$1)((0, _Reflection.name)(patternInput[1]))(expectedCases$$1);
                    }
                }
              }

            case 2:
              {
                const otherwise = matchValue$$2;
                const unexpectedJson = JSON.stringify(otherwise);
                const expectedType = JSON.stringify(patternInput[0]);
                return (0, _String.toFail)((0, _String.printf)("Expected JSON:\n%s\nto match the type\n%s"))(unexpectedJson)(expectedType);
              }
          }
        }

      case 29:
        {
          return null;
        }

      case 30:
        {
          const optionalType = optionalTypeDelayed$$5();
          const parsedOptional = Convert$$$fromJsonAs(jsonValue$$5, optionalType);
          return function (arg0) {
            return arg0;
          }(parsedOptional);
        }

      case 31:
        {
          var $target$$31, value$$37, value$$38, dict, caseName$$4, getTypes$$2;

          if (matchValue$$1[0].tag === 1) {
            if (matchValue$$1[1].tag === 17) {
              $target$$31 = 0;
              value$$37 = matchValue$$1[0].fields[0];
            } else if (matchValue$$1[1].tag === 33) {
              if (getTypes$$1 = matchValue$$1[1].fields[0], (caseName$$3 = matchValue$$1[0].fields[0], Convert$$$isQuoted(caseName$$3))) {
                $target$$31 = 3;
                caseName$$4 = matchValue$$1[0].fields[0];
                getTypes$$2 = matchValue$$1[1].fields[0];
              } else {
                $target$$31 = 4;
              }
            } else {
              $target$$31 = 4;
            }
          } else if (matchValue$$1[0].tag === 0) {
            if (matchValue$$1[1].tag === 11) {
              $target$$31 = 1;
              value$$38 = matchValue$$1[0].fields[0];
            } else {
              $target$$31 = 4;
            }
          } else if (matchValue$$1[0].tag === 5) {
            if (matchValue$$1[1].tag === 11) {
              $target$$31 = 2;
              dict = matchValue$$1[0].fields[0];
            } else {
              $target$$31 = 4;
            }
          } else {
            $target$$31 = 4;
          }

          switch ($target$$31) {
            case 0:
              {
                return (0, _String.validateGuid)(value$$37);
              }

            case 1:
              {
                return function (value$$39) {
                  return (0, _Long.fromInteger)(value$$39, false, 2);
                }(~~value$$38);
              }

            case 2:
              {
                const get = function get(key$$8) {
                  return (0, _Map.tryFind)(key$$8, dict);
                };

                const _arg3 = (0, _List.choose)(function chooser(x) {
                  return x;
                }, (0, _List.ofArray)([get("low"), get("high"), get("unsigned")]));

                var $target$$32, high, low;

                if (_arg3.tail != null) {
                  if (_arg3.head.tag === 0) {
                    if (_arg3.tail.tail != null) {
                      if (_arg3.tail.head.tag === 0) {
                        if (_arg3.tail.tail.tail != null) {
                          if (_arg3.tail.tail.head.tag === 2) {
                            if (_arg3.tail.tail.tail.tail == null) {
                              $target$$32 = 0;
                              high = _arg3.tail.head.fields[0];
                              low = _arg3.head.fields[0];
                            } else {
                              $target$$32 = 1;
                            }
                          } else {
                            $target$$32 = 1;
                          }
                        } else {
                          $target$$32 = 1;
                        }
                      } else {
                        $target$$32 = 1;
                      }
                    } else {
                      $target$$32 = 1;
                    }
                  } else {
                    $target$$32 = 1;
                  }
                } else {
                  $target$$32 = 1;
                }

                switch ($target$$32) {
                  case 0:
                    {
                      const lowBytes = (0, _BitConverter.getBytesInt32)(~~low);
                      const highBytes = (0, _BitConverter.getBytesInt32)(~~high);
                      const combinedBytes = (0, _Array.concat)([lowBytes, highBytes], Uint8Array);
                      return (0, _BitConverter.toInt64)(combinedBytes, 0);
                    }

                  case 1:
                    {
                      return (0, _String.toFail)((0, _String.printf)("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                    }
                }
              }

            case 3:
              {
                const patternInput$$1 = getTypes$$2();

                const _arg4 = (0, _Array.tryFind)(function predicate$$2(case$$$4) {
                  return case$$$4.CaseName === Convert$$$removeQuotes(caseName$$4);
                }, patternInput$$1[0]);

                if (_arg4 == null) {
                  const caseNames$$2 = (0, _Array.map)(function (case$$$5) {
                    return (0, _String.toText)((0, _String.printf)(" '%s' "))(case$$$5.CaseName);
                  }, patternInput$$1[0], Array);
                  const expectedCases$$2 = (0, _String.join)(", ", ...caseNames$$2);
                  return (0, _String.toFail)((0, _String.printf)("Case %s was not valid for type '%s', expected one of the cases [%s]"))(caseName$$4)((0, _Reflection.name)(patternInput$$1[1]))(expectedCases$$2);
                } else {
                  const caseInfo$$1 = _arg4.Info;
                  return (0, _Reflection.makeUnion)(caseInfo$$1, []);
                }
              }

            case 4:
              {
                var $target$$33, caseName$$5, getTypes$$3, getFields, serializedRecord, caseValue, getTypes$$4, elementTypeDelayed, values$$3, elementTypeDelayed$$1, values$$4, elementTypeDelayed$$2, values$$5, elementTypeDelayed$$3, values$$6, array$$8, tupleTypesDelayed, dict$$1, getTypes$$5, getTypes$$6, tuples, getTypes$$7, tuples$$1, dict$$2, getTypes$$8, getType, items, getTypes$$9, map$$1;

                if (matchValue$$1[0].tag === 1) {
                  if (matchValue$$1[1].tag === 33) {
                    $target$$33 = 0;
                    caseName$$5 = matchValue$$1[0].fields[0];
                    getTypes$$3 = matchValue$$1[1].fields[0];
                  } else if (matchValue$$1[1].tag === 32) {
                    $target$$33 = 1;
                    getFields = matchValue$$1[1].fields[0];
                    serializedRecord = matchValue$$1[0].fields[0];
                  } else {
                    $target$$33 = 14;
                  }
                } else if (matchValue$$1[0].tag === 4) {
                  if (matchValue$$1[1].tag === 33) {
                    $target$$33 = 2;
                    caseValue = matchValue$$1[0].fields[0];
                    getTypes$$4 = matchValue$$1[1].fields[0];
                  } else if (matchValue$$1[1].tag === 24) {
                    $target$$33 = 3;
                    elementTypeDelayed = matchValue$$1[1].fields[0];
                    values$$3 = matchValue$$1[0].fields[0];
                  } else if (matchValue$$1[1].tag === 22) {
                    $target$$33 = 4;
                    elementTypeDelayed$$1 = matchValue$$1[1].fields[0];
                    values$$4 = matchValue$$1[0].fields[0];
                  } else if (matchValue$$1[1].tag === 23) {
                    $target$$33 = 5;
                    elementTypeDelayed$$2 = matchValue$$1[1].fields[0];
                    values$$5 = matchValue$$1[0].fields[0];
                  } else if (matchValue$$1[1].tag === 25) {
                    $target$$33 = 6;
                    elementTypeDelayed$$3 = matchValue$$1[1].fields[0];
                    values$$6 = matchValue$$1[0].fields[0];
                  } else if (matchValue$$1[1].tag === 26) {
                    $target$$33 = 7;
                    array$$8 = matchValue$$1[0].fields[0];
                    tupleTypesDelayed = matchValue$$1[1].fields[0];
                  } else if (matchValue$$1[1].tag === 27) {
                    $target$$33 = 9;
                    getTypes$$6 = matchValue$$1[1].fields[0];
                    tuples = matchValue$$1[0].fields[0];
                  } else if (matchValue$$1[1].tag === 28) {
                    $target$$33 = 10;
                    getTypes$$7 = matchValue$$1[1].fields[0];
                    tuples$$1 = matchValue$$1[0].fields[0];
                  } else if (matchValue$$1[1].tag === 30) {
                    $target$$33 = 12;
                    getType = matchValue$$1[1].fields[0];
                    items = matchValue$$1[0].fields[0];
                  } else {
                    $target$$33 = 14;
                  }
                } else if (matchValue$$1[0].tag === 5) {
                  if (matchValue$$1[1].tag === 32) {
                    $target$$33 = 8;
                    dict$$1 = matchValue$$1[0].fields[0];
                    getTypes$$5 = matchValue$$1[1].fields[0];
                  } else if (matchValue$$1[1].tag === 28) {
                    $target$$33 = 11;
                    dict$$2 = matchValue$$1[0].fields[0];
                    getTypes$$8 = matchValue$$1[1].fields[0];
                  } else if (matchValue$$1[1].tag === 27) {
                    $target$$33 = 13;
                    getTypes$$9 = matchValue$$1[1].fields[0];
                    map$$1 = matchValue$$1[0].fields[0];
                  } else {
                    $target$$33 = 14;
                  }
                } else {
                  $target$$33 = 14;
                }

                switch ($target$$33) {
                  case 0:
                    {
                      const patternInput$$2 = getTypes$$3();

                      const _arg5 = (0, _Array.tryFind)(function predicate$$3(case$$$6) {
                        return case$$$6.CaseName === caseName$$5;
                      }, patternInput$$2[0]);

                      if (_arg5 == null) {
                        const caseNames$$3 = (0, _Array.map)(function (case$$$7) {
                          return (0, _String.toText)((0, _String.printf)(" '%s' "))(case$$$7.CaseName);
                        }, patternInput$$2[0], Array);
                        const expectedCases$$3 = (0, _String.join)(", ", ...caseNames$$3);
                        return (0, _String.toFail)((0, _String.printf)("Case %s was not valid for type '%s', expected one of the cases [%s]"))(caseName$$5)((0, _Reflection.name)(patternInput$$2[1]))(expectedCases$$3);
                      } else {
                        const caseInfo$$2 = _arg5.Info;
                        return (0, _Reflection.makeUnion)(caseInfo$$2, []);
                      }
                    }

                  case 1:
                    {
                      const $typeInfo$$34 = typeInfo;
                      input$$2 = (0, _SimpleJson.SimpleJson$$$parse)(serializedRecord);
                      typeInfo = $typeInfo$$34;
                      continue Convert$$$fromJsonAs;
                    }

                  case 2:
                    {
                      const patternInput$$3 = getTypes$$4();
                      var $target$$35, caseName$$6, caseName$$8, values$$2, otherwise$$1;

                      if (caseValue.tail != null) {
                        if (caseValue.head.tag === 1) {
                          if (caseValue.tail.tail == null) {
                            $target$$35 = 0;
                            caseName$$6 = caseValue.head.fields[0];
                          } else {
                            $target$$35 = 1;
                            caseName$$8 = caseValue.head.fields[0];
                            values$$2 = caseValue.tail;
                          }
                        } else {
                          $target$$35 = 2;
                          otherwise$$1 = caseValue;
                        }
                      } else {
                        $target$$35 = 2;
                        otherwise$$1 = caseValue;
                      }

                      switch ($target$$35) {
                        case 0:
                          {
                            const _arg6 = (0, _Array.tryFind)(function predicate$$4(case$$$8) {
                              return case$$$8.CaseName === caseName$$6;
                            }, patternInput$$3[0]);

                            if (_arg6 == null) {
                              const caseNames$$4 = (0, _Array.map)(function (case$$$9) {
                                return (0, _String.toText)((0, _String.printf)(" '%s' "))(case$$$9.CaseName);
                              }, patternInput$$3[0], Array);
                              const expectedCases$$4 = (0, _String.join)(", ", ...caseNames$$4);
                              return (0, _String.toFail)((0, _String.printf)("Case '%s' was not valid for type '%s', expected one of the cases [%s]"))(caseName$$6)((0, _Reflection.name)(patternInput$$3[1]))(expectedCases$$4);
                            } else {
                              const caseName$$7 = _arg6.CaseName;
                              const caseInfoTypes = _arg6.CaseTypes;
                              const caseInfo$$3 = _arg6.Info;
                              return (0, _Reflection.makeUnion)(caseInfo$$3, []);
                            }
                          }

                        case 1:
                          {
                            const _arg7 = (0, _Array.tryFind)(function predicate$$5(case$$$10) {
                              return case$$$10.CaseName === caseName$$8;
                            }, patternInput$$3[0]);

                            if (_arg7 != null) {
                              const types = _arg7.CaseTypes;
                              const foundCaseName = _arg7.CaseName;
                              const caseInfo$$4 = _arg7.Info;

                              if (types.length !== (0, _List.length)(values$$2)) {
                                (0, _String.toFail)((0, _String.printf)("The number of union case parameters for '%s' is different"))(foundCaseName);
                              }

                              const parsedValues$$1 = (0, _Array.map)(function mapping$$2(tupledArg$$1) {
                                return Convert$$$fromJsonAs(tupledArg$$1[1], tupledArg$$1[0]);
                              }, (0, _Array.zip)(types, (0, _Array.ofList)(values$$2, Array)), Array);
                              return (0, _Reflection.makeUnion)(caseInfo$$4, parsedValues$$1);
                            } else {
                              const caseNames$$5 = (0, _Array.map)(function (_arg1$$7) {
                                const name = _arg1$$7.CaseName;
                                return name;
                              }, patternInput$$3[0], Array);
                              const expectedCases$$5 = (0, _String.join)(", ", ...caseNames$$5);
                              return (0, _String.toFail)((0, _String.printf)("Case %s was not valid, expected one of [%s]"))(caseName$$8)(expectedCases$$5);
                            }
                          }

                        case 2:
                          {
                            const unexpectedJson$$1 = JSON.stringify(otherwise$$1);
                            const expectedType$$1 = JSON.stringify(patternInput$$3[0]);
                            return (0, _String.toFail)((0, _String.printf)("Expected JSON:\n%s\nto match the type\n%s"))(unexpectedJson$$1)(expectedType$$1);
                          }
                      }
                    }

                  case 3:
                    {
                      const elementType = elementTypeDelayed();
                      return (0, _Array.ofList)((0, _List.map)(function mapping$$3(value$$43) {
                        return Convert$$$fromJsonAs(value$$43, elementType);
                      }, values$$3), Array);
                    }

                  case 4:
                    {
                      const elementType$$1 = elementTypeDelayed$$1();
                      return (0, _List.map)(function mapping$$4(value$$45) {
                        return Convert$$$fromJsonAs(value$$45, elementType$$1);
                      }, values$$4);
                    }

                  case 5:
                    {
                      const elementType$$2 = elementTypeDelayed$$2();
                      return (0, _Set.ofList)((0, _List.map)(function mapping$$5(value$$47) {
                        return Convert$$$fromJsonAs(value$$47, elementType$$2);
                      }, values$$5), {
                        Compare($x$$3, $y$$4) {
                          return $x$$3.CompareTo($y$$4);
                        }

                      });
                    }

                  case 6:
                    {
                      const elementType$$3 = elementTypeDelayed$$3();
                      const converted = (0, _List.map)(function (value$$49) {
                        return Convert$$$fromJsonAs(value$$49, elementType$$3);
                      }, values$$6);
                      return converted;
                    }

                  case 7:
                    {
                      const tupleTypes = tupleTypesDelayed();
                      return (0, _Array.map)(function mapping$$6(tupledArg$$2) {
                        return Convert$$$fromJsonAs(tupledArg$$2[1], tupledArg$$2[0]);
                      }, (0, _Array.zip)(tupleTypes, (0, _Array.ofList)(array$$8, Array)), Array);
                    }

                  case 8:
                    {
                      const patternInput$$4 = getTypes$$5();
                      let recordValues;
                      const values$$7 = (0, _Map.toList)(dict$$1);
                      const array$$11 = patternInput$$4[0];
                      recordValues = (0, _Array.map)(function mapping$$9(_arg3$$1) {
                        const fieldType = _arg3$$1.FieldType;
                        const fieldName = _arg3$$1.FieldName;

                        const _arg8 = (0, _List.tryFind)(function predicate$$6(tupledArg$$3) {
                          return fieldName === tupledArg$$3[0];
                        }, values$$7);

                        if (_arg8 == null) {
                          if (fieldType.tag === 21) {
                            return null;
                          } else {
                            const dictKeys = (0, _String.toText)((0, _String.printf)("[ %s ]"))((0, _String.join)(", ", ...(0, _List.map)(function mapping$$7($arg$$5) {
                              return (0, _String.toText)((0, _String.printf)("'%s'"))($arg$$5[0]);
                            }, (0, _Map.toList)(dict$$1))));
                            const recordFields = (0, _String.toText)((0, _String.printf)("[ %s ]"))((0, _String.join)(", ", ...(0, _Array.map)(function mapping$$8(_arg2$$1) {
                              const name$$1 = _arg2$$1.FieldName;
                              const innerFieldType = _arg2$$1.FieldType;

                              if (innerFieldType.tag === 21) {
                                return (0, _String.toText)((0, _String.printf)("optional('%s')"))(name$$1);
                              } else {
                                return (0, _String.toText)((0, _String.printf)("required('%s')"))(name$$1);
                              }
                            }, patternInput$$4[0], Array)));
                            return (0, _String.toFail)((0, _String.printf)("Could not find the required key '%s' in the JSON object literal with keys %s to match with record type '%s' that has fields %s"))(fieldName)(dictKeys)((0, _Reflection.name)(patternInput$$4[1]))(recordFields);
                          }
                        } else {
                          const value$$52 = _arg8[1];
                          const key$$10 = _arg8[0];
                          return Convert$$$fromJsonAs(value$$52, fieldType);
                        }
                      }, array$$11, Array);
                      return (0, _Reflection.makeRecord)(patternInput$$4[1], recordValues);
                    }

                  case 9:
                    {
                      const patternInput$$5 = getTypes$$6();
                      const pairs = (0, _List.ofSeq)((0, _Seq.delay)(function () {
                        return (0, _Seq.collect)(function (keyValuePair) {
                          const tuple$$1 = Convert$$$fromJsonAs(keyValuePair, new _TypeInfo.TypeInfo(26, "Tuple", function () {
                            return [patternInput$$5[0], patternInput$$5[1]];
                          }));
                          return (0, _Seq.singleton)(tuple$$1);
                        }, tuples);
                      }));
                      var $target$$36;

                      if (patternInput$$5[0].tag === 5) {
                        $target$$36 = 0;
                      } else if (patternInput$$5[0].tag === 1) {
                        $target$$36 = 0;
                      } else if (patternInput$$5[0].tag === 6) {
                        $target$$36 = 0;
                      } else {
                        $target$$36 = 1;
                      }

                      switch ($target$$36) {
                        case 0:
                          {
                            return (0, _Map.ofList)(pairs, {
                              Compare: _Util.comparePrimitives
                            });
                          }

                        case 1:
                          {
                            return (0, _Map.ofList)(pairs, {
                              Compare: _Util.compare
                            });
                          }
                      }
                    }

                  case 10:
                    {
                      const patternInput$$6 = getTypes$$7();
                      const pairs$$1 = (0, _List.ofSeq)((0, _Seq.delay)(function () {
                        return (0, _Seq.collect)(function (keyValuePair$$1) {
                          const tuple$$2 = Convert$$$fromJsonAs(keyValuePair$$1, new _TypeInfo.TypeInfo(26, "Tuple", function () {
                            return [patternInput$$6[0], patternInput$$6[1]];
                          }));
                          return (0, _Seq.singleton)(tuple$$2);
                        }, tuples$$1);
                      }));
                      const output = (0, _Map.createMutable)([], {
                        Compare: _Util.compare
                      });
                      (0, _Seq.iterate)(function (forLoopVar) {
                        (0, _Util.addToDict)(output, forLoopVar[0], forLoopVar[1]);
                      }, pairs$$1);
                      return output;
                    }

                  case 11:
                    {
                      const patternInput$$7 = getTypes$$8();
                      const output$$1 = (0, _Map.createMutable)([], {
                        Compare: _Util.compare
                      });
                      (0, _Seq.iterate)(function (forLoopVar$$1) {
                        (0, _Util.addToDict)(output$$1, forLoopVar$$1[0], forLoopVar$$1[1]);
                      }, (0, _List.map)(function mapping$$10(tupledArg$$4) {
                        return [Convert$$$fromJsonAs(new _Json.Json(1, "JString", tupledArg$$4[0]), patternInput$$7[0]), Convert$$$fromJsonAs(tupledArg$$4[1], patternInput$$7[1])];
                      }, (0, _Map.toList)(dict$$2)));
                      return output$$1;
                    }

                  case 12:
                    {
                      const elemType$$1 = getType();
                      const hashset = (0, _Set.createMutable)([], {
                        Compare: _Util.compare
                      });
                      (0, _Seq.iterate)(function (item) {
                        const deserialized$$1 = Convert$$$fromJsonAs(item, elemType$$1);
                        (0, _Util.addToSet)(deserialized$$1, hashset), null;
                      }, items);
                      return hashset;
                    }

                  case 13:
                    {
                      const patternInput$$8 = getTypes$$9();
                      const matchValue$$3 = [(0, _Map.tryFind)("comparer", map$$1), (0, _Map.tryFind)("tree", map$$1)];
                      var $target$$37, comparer$$1, tree$$1;

                      if (matchValue$$3[0] != null) {
                        if (matchValue$$3[0].tag === 5) {
                          if (matchValue$$3[1] != null) {
                            if (matchValue$$3[1].tag === 4) {
                              if (tree = matchValue$$3[1].fields[0], (comparer = matchValue$$3[0].fields[0], (0, _Map.isEmpty)(comparer))) {
                                $target$$37 = 0;
                                comparer$$1 = matchValue$$3[0].fields[0];
                                tree$$1 = matchValue$$3[1].fields[0];
                              } else {
                                $target$$37 = 1;
                              }
                            } else {
                              $target$$37 = 1;
                            }
                          } else {
                            $target$$37 = 1;
                          }
                        } else {
                          $target$$37 = 1;
                        }
                      } else {
                        $target$$37 = 1;
                      }

                      switch ($target$$37) {
                        case 0:
                          {
                            const matchValue$$4 = Convert$$$generateMap(new _Json.Json(4, "JArray", tree$$1));

                            if (matchValue$$4 == null) {
                              const inputJson = (0, _SimpleJson.SimpleJson$$$toString)(new _Json.Json(4, "JArray", tree$$1));
                              return (0, _String.toFail)((0, _String.printf)("Could not generate map from JSON\n %s"))(inputJson);
                            } else {
                              const internalMap = matchValue$$4;
                              const pairs$$3 = (0, _List.map)(function mapping$$11(tupledArg$$5) {
                                const nextKey = !Convert$$$isQuoted(tupledArg$$5[0]) ? Convert$$$fromJsonAs(new _Json.Json(1, "JString", tupledArg$$5[0]), patternInput$$8[0]) : Convert$$$fromJsonAs((0, _SimpleJson.SimpleJson$$$parseNative)(tupledArg$$5[0]), patternInput$$8[0]);
                                const nextValue = Convert$$$fromJsonAs(tupledArg$$5[1], patternInput$$8[1]);
                                return [nextKey, nextValue];
                              }, Convert$$$flattenMap(internalMap));
                              var $target$$38;

                              if (patternInput$$8[0].tag === 5) {
                                $target$$38 = 0;
                              } else if (patternInput$$8[0].tag === 1) {
                                $target$$38 = 0;
                              } else if (patternInput$$8[0].tag === 6) {
                                $target$$38 = 0;
                              } else {
                                $target$$38 = 1;
                              }

                              switch ($target$$38) {
                                case 0:
                                  {
                                    return (0, _Map.ofList)(pairs$$3, {
                                      Compare: _Util.comparePrimitives
                                    });
                                  }

                                case 1:
                                  {
                                    return (0, _Map.ofList)(pairs$$3, {
                                      Compare: _Util.compare
                                    });
                                  }
                              }
                            }
                          }

                        case 1:
                          {
                            const pairs$$4 = (0, _List.map)(function mapping$$12(tupledArg$$6) {
                              const nextKey$$1 = !Convert$$$isQuoted(tupledArg$$6[0]) ? ((0, _TypeInfo2.isPrimitive)(patternInput$$8[0]) ? true : (0, _TypeInfo2.enumUnion)(patternInput$$8[0])) ? Convert$$$fromJsonAs(new _Json.Json(1, "JString", tupledArg$$6[0]), patternInput$$8[0]) : Convert$$$fromJsonAs((0, _SimpleJson.SimpleJson$$$parseNative)(tupledArg$$6[0]), patternInput$$8[0]) : Convert$$$fromJsonAs((0, _SimpleJson.SimpleJson$$$parseNative)(tupledArg$$6[0]), patternInput$$8[0]);
                              const nextValue$$1 = Convert$$$fromJsonAs(tupledArg$$6[1], patternInput$$8[1]);
                              return [nextKey$$1, nextValue$$1];
                            }, (0, _Map.toList)(map$$1));
                            var $target$$39;

                            if (patternInput$$8[0].tag === 5) {
                              $target$$39 = 0;
                            } else if (patternInput$$8[0].tag === 1) {
                              $target$$39 = 0;
                            } else if (patternInput$$8[0].tag === 6) {
                              $target$$39 = 0;
                            } else {
                              $target$$39 = 1;
                            }

                            switch ($target$$39) {
                              case 0:
                                {
                                  return (0, _Map.ofList)(pairs$$4, {
                                    Compare: _Util.comparePrimitives
                                  });
                                }

                              case 1:
                                {
                                  return (0, _Map.ofList)(pairs$$4, {
                                    Compare: _Util.compare
                                  });
                                }
                            }
                          }
                      }
                    }

                  case 14:
                    {
                      return (0, _String.toFail)((0, _String.printf)("Cannot convert %s to %s"))((0, _SimpleJson.SimpleJson$$$toString)(input$$2))(JSON.stringify(typeInfo));
                    }
                }
              }
          }
        }
    }

    break;
  }
}

function Convert$$$fromJson(json$$4, typeInfo$$2) {
  return Convert$$$fromJsonAs(json$$4, typeInfo$$2);
}

function Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505(x$$1) {
  return (0, _SimpleJson.SimpleJson$$$stringify)(x$$1);
}

function Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6(input$$4, resolver) {
  const matchValue$$5 = (0, _SimpleJson.SimpleJson$$$tryParse)(input$$4);

  if (matchValue$$5 != null) {
    const inputJson$$1 = matchValue$$5;
    const typeInfo$$3 = (0, _TypeInfo2.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)(resolver);
    return Convert$$$fromJson(inputJson$$1, typeInfo$$3);
  } else {
    throw new Error("Couldn't parse the input JSON string because it seems to be invalid");
  }
}

function Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6(input$$5, resolver$$1) {
  const inputJson$$2 = (0, _SimpleJson.SimpleJson$$$parseNative)(input$$5);
  const typeInfo$$4 = (0, _TypeInfo2.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)(resolver$$1);
  return Convert$$$fromJson(inputJson$$2, typeInfo$$4);
}

function Fable$002ESimpleJson$002EJson$$Json$002EtryParseAs$002EStatic$$Z7D14C7A6(input$$6, resolver$$2) {
  try {
    return new _Option.Result(0, "Ok", Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6(input$$6, resolver$$2));
  } catch (ex) {
    return new _Option.Result(1, "Error", ex.message);
  }
}

function Fable$002ESimpleJson$002EJson$$Json$002EtryParseNativeAs$002EStatic$$Z7D14C7A6(input$$7, resolver$$3) {
  try {
    return new _Option.Result(0, "Ok", Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6(input$$7, resolver$$3));
  } catch (ex$$1) {
    return new _Option.Result(1, "Error", ex$$1.message);
  }
}

function Fable$002ESimpleJson$002EJson$$Json$002EconvertFromJsonAs$002EStatic$$340181C6(input$$8, resolver$$4) {
  const typeInfo$$5 = (0, _TypeInfo2.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)(resolver$$4);
  return Convert$$$fromJson(input$$8, typeInfo$$5);
}

function Fable$002ESimpleJson$002EJson$$Json$002EtrConvertFromJsonAs$002EStatic$$340181C6(input$$9, resolver$$5) {
  try {
    return new _Option.Result(0, "Ok", Fable$002ESimpleJson$002EJson$$Json$002EconvertFromJsonAs$002EStatic$$340181C6(input$$9, resolver$$5));
  } catch (ex$$2) {
    return new _Option.Result(1, "Error", ex$$2.message);
  }
}