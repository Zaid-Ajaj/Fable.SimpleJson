"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUsing = parseUsing;
exports.test$reflection = test$reflection;
exports.test$$$equal = test$$$equal;
exports.test$$$areEqual = test$$$areEqual;
exports.test$$$pass = test$$$pass;
exports.test$$$fail = test$$$fail;
exports.test$$$isTrue$$Z1FBCCD16 = test$$$isTrue$$Z1FBCCD16;
exports.test$$$unexpected$$1505 = test$$$unexpected$$1505;
exports.test$$$failwith$$Z721C83C5 = test$$$failwith$$Z721C83C5;
exports.test$$$passWith$$Z721C83C5 = test$$$passWith$$Z721C83C5;
exports.fromJson = fromJson;
exports.integersToInt64 = integersToInt64;
exports.int64ToIntegers = int64ToIntegers;
exports.everyTest = exports.jsonTestSample = exports.test = void 0;

var _Parsimmon = require("./Fable.Parsimmon.4.0.0/Parsimmon");

var _Types = require("./fable-library.2.3.14/Types");

var _Reflection = require("./fable-library.2.3.14/Reflection");

var _Mocha = require("./Fable.Mocha.2.4.0/Mocha");

var _Json = require("./src/Json.Converter");

var _BitConverter = require("./fable-library.2.3.14/BitConverter");

var _Array = require("./fable-library.2.3.14/Array");

var _Json2 = require("./src/Json");

var _List = require("./fable-library.2.3.14/List");

var _Parser = require("./src/Parser");

var _SimpleJson = require("./src/SimpleJson");

var _Map = require("./fable-library.2.3.14/Map");

var _Util = require("./fable-library.2.3.14/Util");

var _Types2 = require("./Types");

var _Decimal = require("./fable-library.2.3.14/Decimal");

var _Seq = require("./fable-library.2.3.14/Seq");

var _TypeInfo = require("./src/TypeInfo.Converter");

var _String = require("./fable-library.2.3.14/String");

var _Date = require("./fable-library.2.3.14/Date");

var _DateOffset = require("./fable-library.2.3.14/DateOffset");

var _Long = require("./fable-library.2.3.14/Long");

var _BigInt = require("./fable-library.2.3.14/BigInt");

var _Option = require("./fable-library.2.3.14/Option");

var _Async = require("./fable-library.2.3.14/Async");

var _AsyncBuilder = require("./fable-library.2.3.14/AsyncBuilder");

function parseUsing(p, input) {
  return (0, _Parsimmon.Parsimmon$$$parse)(input, p);
}

const test = (0, _Types.declare)(function Tests_test() {});
exports.test = test;

function test$reflection() {
  return (0, _Reflection.type)("Tests.test");
}

function test$$$equal(a, b) {
  (0, _Mocha.Expect$$$equal)(a, b, "They are equal");
}

function test$$$areEqual(a$$1, b$$1) {
  (0, _Mocha.Expect$$$equal)(a$$1, b$$1, "They are equal");
}

function test$$$pass() {
  (0, _Mocha.Expect$$$isTrue)(true)("It must be true");
}

function test$$$fail() {
  (0, _Mocha.Expect$$$isTrue)(false)("It must be false");
}

function test$$$isTrue$$Z1FBCCD16(x) {
  (0, _Mocha.Expect$$$isTrue)(x)("It must be true");
}

function test$$$unexpected$$1505(x$$1) {
  (0, _Mocha.Expect$$$isTrue)(false)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(x$$1));
}

function test$$$failwith$$Z721C83C5(x$$2) {
  throw new Error(x$$2);
}

function test$$$passWith$$Z721C83C5(x$$3) {
  (0, _Mocha.Expect$$$isTrue)(true)(x$$3);
}

function fromJson(json, typeInfo) {
  return (0, _Json.Convert$$$fromJsonAs)(json, typeInfo);
}

const jsonTestSample = "\r\n    {\r\n      \"product\": \"Live JSON generator\",\r\n      \"version\": 3.1,\r\n      \"releaseDate\": \"2014-06-25T00:00:00.000Z\",\r\n      \"demo\": true,\r\n      \"person\": {\r\n        \"id\": 12345,\r\n        \"name\": \"John Doe\",\r\n        \"phones\": {\r\n          \"home\": \"800-123-4567\",\r\n          \"mobile\": \"877-123-1234\"\r\n        },\r\n        \"email\": [\r\n          \"jd@example.com\",\r\n          \"jd@example.org\"\r\n        ],\r\n        \"dateOfBirth\": \"1980-01-02T00:00:00.000Z\",\r\n        \"registered\": true,\r\n        \"emergencyContacts\": [\r\n          {\r\n            \"name\": \"Jane Doe\",\r\n            \"phone\": \"888-555-1212\",\r\n            \"relationship\": \"spouse\"\r\n          },\r\n          {\r\n            \"name\": \"Justin Doe\",\r\n            \"phone\": \"877-123-1212\",\r\n            \"relationship\": \"parent\"\r\n          }\r\n        ]\r\n      }\r\n    }\r\n    ";
exports.jsonTestSample = jsonTestSample;

function integersToInt64(a$$2, b$$2) {
  const lowBytes = (0, _BitConverter.getBytesInt32)(a$$2);
  const highBytes = (0, _BitConverter.getBytesInt32)(b$$2);
  const combinedBytes = (0, _Array.concat)([lowBytes, highBytes], Uint8Array);
  return (0, _BitConverter.toInt64)(combinedBytes, 0);
}

function int64ToIntegers(n) {
  const longBytes = (0, _BitConverter.getBytesInt64)(n);
  const fstInteger = (0, _BitConverter.toInt32)(longBytes.slice(0, 3 + 1), 0);
  const sndInteger = (0, _BitConverter.toInt32)(longBytes.slice(4, 7 + 1), 0);
  return [fstInteger, sndInteger];
}

const everyTest = (0, _Mocha.Test$$$testList)("Simple Json Tests", (0, _List.ofArray)([(() => {
  const body = function body() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(0, "JNumber", 1), new _Json2.Json(0, "JNumber", 2.5), new _Json2.Json(0, "JNumber", 22.01), new _Json2.Json(0, "JNumber", 1.05), new _Json2.Json(0, "JNumber", 0.1), new _Json2.Json(0, "JNumber", 100)]), (0, _List.choose)(function chooser(input$$1) {
      return parseUsing(_Parser.jnumber, input$$1);
    }, (0, _List.ofArray)(["1.0", "2.5", "22.010", "1.05", "not-valid", ".1", "100"])));
  };

  return (0, _Mocha.Test$$$testCase)("JNUmber parser works", body);
})(), (() => {
  const body$$1 = function body$$1() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(2, "JBool", true), new _Json2.Json(2, "JBool", false)]), (0, _List.choose)(function chooser$$1(input$$2) {
      return parseUsing(_Parser.jbool, input$$2);
    }, (0, _List.ofArray)(["true", "false", "other"])));
  };

  return (0, _Mocha.Test$$$testCase)("JBool parser works", body$$1);
})(), (() => {
  const body$$2 = function body$$2() {
    test$$$areEqual(new _Types.List(new _Json2.Json(3, "JNull"), new _Types.List()), (0, _List.choose)(function chooser$$2(input$$3) {
      return parseUsing(_Parser.jnull, input$$3);
    }, (0, _List.ofArray)(["null", "other"])));
  };

  return (0, _Mocha.Test$$$testCase)("JNull parser works", body$$2);
})(), (() => {
  const body$$3 = function body$$3() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(1, "JString", ""), new _Json2.Json(1, "JString", "hello"), new _Json2.Json(1, "JString", " hello world ")]), (0, _List.choose)(function chooser$$3(input$$4) {
      return parseUsing(_Parser.jstring, input$$4);
    }, (0, _List.ofArray)(["\"\"", "\"hello\"", "\" hello world \"", "non-escaped"])));
  };

  return (0, _Mocha.Test$$$testCase)("JString parser works", body$$3);
})(), (() => {
  const body$$4 = function body$$4() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(3, "JNull"), new _Json2.Json(3, "JNull"), new _Json2.Json(3, "JNull")]), (0, _List.choose)(function chooser$$4(input$$5) {
      return parseUsing(_Parser.jvalue, input$$5);
    }, (0, _List.ofArray)(["null", "   null", "null "])));
  };

  return (0, _Mocha.Test$$$testCase)("Combined parsers JValue works on null values", body$$4);
})(), (() => {
  const body$$5 = function body$$5() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(2, "JBool", true), new _Json2.Json(2, "JBool", true), new _Json2.Json(2, "JBool", true), new _Json2.Json(2, "JBool", true)]), (0, _List.choose)(function chooser$$5(input$$6) {
      return parseUsing(_Parser.jvalue, input$$6);
    }, (0, _List.ofArray)(["true", "   true", "true ", " true "])));
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(2, "JBool", false), new _Json2.Json(2, "JBool", false), new _Json2.Json(2, "JBool", false), new _Json2.Json(2, "JBool", false)]), (0, _List.choose)(function chooser$$6(input$$7) {
      return parseUsing(_Parser.jvalue, input$$7);
    }, (0, _List.ofArray)(["false", "   false", "false ", " false "])));
  };

  return (0, _Mocha.Test$$$testCase)("Combined parsers JValue works on boolean values", body$$5);
})(), (() => {
  const body$$6 = function body$$6() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(0, "JNumber", 15), new _Json2.Json(0, "JNumber", 1), new _Json2.Json(0, "JNumber", 2.5), new _Json2.Json(0, "JNumber", 22.01), new _Json2.Json(0, "JNumber", 1.05), new _Json2.Json(0, "JNumber", 0.1), new _Json2.Json(0, "JNumber", 130)]), (0, _List.choose)(function chooser$$7(input$$8) {
      return parseUsing(_Parser.jvalue, input$$8);
    }, (0, _List.ofArray)(["15", " 1.0 ", " 2.5", "22.010 ", "  1.05  ", "not-valid", ".1", " 130 "])));
  };

  return (0, _Mocha.Test$$$testCase)("Combined parsers JValue works on number values", body$$6);
})(), (() => {
  const body$$7 = function body$$7() {
    const _arg1$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)("[1.0, null, true, false, \"text\"]");

    var $target$$94, otherResult;

    if (_arg1$$1 != null) {
      if (_arg1$$1.tag === 4) {
        if (_arg1$$1.fields[0].tail != null) {
          if (_arg1$$1.fields[0].head.tag === 0) {
            if (_arg1$$1.fields[0].head.fields[0] === 1) {
              if (_arg1$$1.fields[0].tail.tail != null) {
                if (_arg1$$1.fields[0].tail.head.tag === 3) {
                  if (_arg1$$1.fields[0].tail.tail.tail != null) {
                    if (_arg1$$1.fields[0].tail.tail.head.tag === 2) {
                      if (_arg1$$1.fields[0].tail.tail.head.fields[0]) {
                        if (_arg1$$1.fields[0].tail.tail.tail.tail != null) {
                          if (_arg1$$1.fields[0].tail.tail.tail.head.tag === 2) {
                            if (_arg1$$1.fields[0].tail.tail.tail.head.fields[0]) {
                              $target$$94 = 1;
                              otherResult = _arg1$$1;
                            } else if (_arg1$$1.fields[0].tail.tail.tail.tail.tail != null) {
                              if (_arg1$$1.fields[0].tail.tail.tail.tail.head.tag === 1) {
                                if (_arg1$$1.fields[0].tail.tail.tail.tail.head.fields[0] === "text") {
                                  if (_arg1$$1.fields[0].tail.tail.tail.tail.tail.tail == null) {
                                    $target$$94 = 0;
                                  } else {
                                    $target$$94 = 1;
                                    otherResult = _arg1$$1;
                                  }
                                } else {
                                  $target$$94 = 1;
                                  otherResult = _arg1$$1;
                                }
                              } else {
                                $target$$94 = 1;
                                otherResult = _arg1$$1;
                              }
                            } else {
                              $target$$94 = 1;
                              otherResult = _arg1$$1;
                            }
                          } else {
                            $target$$94 = 1;
                            otherResult = _arg1$$1;
                          }
                        } else {
                          $target$$94 = 1;
                          otherResult = _arg1$$1;
                        }
                      } else {
                        $target$$94 = 1;
                        otherResult = _arg1$$1;
                      }
                    } else {
                      $target$$94 = 1;
                      otherResult = _arg1$$1;
                    }
                  } else {
                    $target$$94 = 1;
                    otherResult = _arg1$$1;
                  }
                } else {
                  $target$$94 = 1;
                  otherResult = _arg1$$1;
                }
              } else {
                $target$$94 = 1;
                otherResult = _arg1$$1;
              }
            } else {
              $target$$94 = 1;
              otherResult = _arg1$$1;
            }
          } else {
            $target$$94 = 1;
            otherResult = _arg1$$1;
          }
        } else {
          $target$$94 = 1;
          otherResult = _arg1$$1;
        }
      } else {
        $target$$94 = 1;
        otherResult = _arg1$$1;
      }
    } else {
      $target$$94 = 1;
      otherResult = _arg1$$1;
    }

    switch ($target$$94) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherResult);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("JArray parser works", body$$7);
})(), (() => {
  const body$$8 = function body$$8() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(4, "JArray", new _Types.List()), new _Json2.Json(4, "JArray", new _Types.List()), new _Json2.Json(4, "JArray", new _Types.List()), new _Json2.Json(4, "JArray", new _Types.List())]), (0, _List.choose)(_SimpleJson.SimpleJson$$$tryParse, (0, _List.ofArray)(["[ ]", "[]", " []", " []"])));
  };

  return (0, _Mocha.Test$$$testCase)("JArray parser works on empty lists", body$$8);
})(), (() => {
  const body$$9 = function body$$9() {
    test$$$areEqual(new _Types.List(new _Json2.Json(4, "JArray", new _Types.List(new _Json2.Json(4, "JArray", new _Types.List()), new _Types.List())), new _Types.List()), (0, _List.choose)(_SimpleJson.SimpleJson$$$tryParse, new _Types.List("[[]]", new _Types.List())));
  };

  return (0, _Mocha.Test$$$testCase)("JArray parser works on nested arrays of json", body$$9);
})(), (() => {
  const body$$10 = function body$$10() {
    const _arg2$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)(" { \"customerId\": 1, \"customerName\": \"John\", \"jobs\":[1,true,null]}");

    var $target$$95, map, otherResult$$2;

    if (_arg2$$1 != null) {
      if (_arg2$$1.tag === 5) {
        $target$$95 = 0;
        map = _arg2$$1.fields[0];
      } else {
        $target$$95 = 1;
        otherResult$$2 = _arg2$$1;
      }
    } else {
      $target$$95 = 1;
      otherResult$$2 = _arg2$$1;
    }

    switch ($target$$95) {
      case 0:
        {
          const matchValue = (0, _Map.toList)(map);
          var $target$$96, otherResult$$1;

          if (matchValue.tail != null) {
            if (matchValue.head[0] === "customerId") {
              if (matchValue.head[1].tag === 0) {
                if (matchValue.head[1].fields[0] === 1) {
                  if (matchValue.tail.tail != null) {
                    if (matchValue.tail.head[0] === "customerName") {
                      if (matchValue.tail.head[1].tag === 1) {
                        if (matchValue.tail.head[1].fields[0] === "John") {
                          if (matchValue.tail.tail.tail != null) {
                            if (matchValue.tail.tail.head[0] === "jobs") {
                              if (matchValue.tail.tail.head[1].tag === 4) {
                                if (matchValue.tail.tail.head[1].fields[0].tail != null) {
                                  if (matchValue.tail.tail.head[1].fields[0].head.tag === 0) {
                                    if (matchValue.tail.tail.head[1].fields[0].head.fields[0] === 1) {
                                      if (matchValue.tail.tail.head[1].fields[0].tail.tail != null) {
                                        if (matchValue.tail.tail.head[1].fields[0].tail.head.tag === 2) {
                                          if (matchValue.tail.tail.head[1].fields[0].tail.head.fields[0]) {
                                            if (matchValue.tail.tail.head[1].fields[0].tail.tail.tail != null) {
                                              if (matchValue.tail.tail.head[1].fields[0].tail.tail.head.tag === 3) {
                                                if (matchValue.tail.tail.head[1].fields[0].tail.tail.tail.tail == null) {
                                                  if (matchValue.tail.tail.tail.tail == null) {
                                                    $target$$96 = 0;
                                                  } else {
                                                    $target$$96 = 1;
                                                    otherResult$$1 = matchValue;
                                                  }
                                                } else {
                                                  $target$$96 = 1;
                                                  otherResult$$1 = matchValue;
                                                }
                                              } else {
                                                $target$$96 = 1;
                                                otherResult$$1 = matchValue;
                                              }
                                            } else {
                                              $target$$96 = 1;
                                              otherResult$$1 = matchValue;
                                            }
                                          } else {
                                            $target$$96 = 1;
                                            otherResult$$1 = matchValue;
                                          }
                                        } else {
                                          $target$$96 = 1;
                                          otherResult$$1 = matchValue;
                                        }
                                      } else {
                                        $target$$96 = 1;
                                        otherResult$$1 = matchValue;
                                      }
                                    } else {
                                      $target$$96 = 1;
                                      otherResult$$1 = matchValue;
                                    }
                                  } else {
                                    $target$$96 = 1;
                                    otherResult$$1 = matchValue;
                                  }
                                } else {
                                  $target$$96 = 1;
                                  otherResult$$1 = matchValue;
                                }
                              } else {
                                $target$$96 = 1;
                                otherResult$$1 = matchValue;
                              }
                            } else {
                              $target$$96 = 1;
                              otherResult$$1 = matchValue;
                            }
                          } else {
                            $target$$96 = 1;
                            otherResult$$1 = matchValue;
                          }
                        } else {
                          $target$$96 = 1;
                          otherResult$$1 = matchValue;
                        }
                      } else {
                        $target$$96 = 1;
                        otherResult$$1 = matchValue;
                      }
                    } else {
                      $target$$96 = 1;
                      otherResult$$1 = matchValue;
                    }
                  } else {
                    $target$$96 = 1;
                    otherResult$$1 = matchValue;
                  }
                } else {
                  $target$$96 = 1;
                  otherResult$$1 = matchValue;
                }
              } else {
                $target$$96 = 1;
                otherResult$$1 = matchValue;
              }
            } else {
              $target$$96 = 1;
              otherResult$$1 = matchValue;
            }
          } else {
            $target$$96 = 1;
            otherResult$$1 = matchValue;
          }

          switch ($target$$96) {
            case 0:
              {
                test$$$pass();
                break;
              }

            case 1:
              {
                test$$$unexpected$$1505(otherResult$$1);
                break;
              }
          }

          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherResult$$2);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser works", body$$10);
})(), (() => {
  const body$$11 = function body$$11() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(0, "JNumber", -5), new _Json2.Json(0, "JNumber", -5.2), new _Json2.Json(0, "JNumber", -1), new _Json2.Json(0, "JNumber", -0.5)]), (0, _List.choose)(function chooser$$8(input$$13) {
      return parseUsing(_Parser.jnumber, input$$13);
    }, (0, _List.ofArray)(["-5", "-5.2", "-1", "-0.5"])));
  };

  return (0, _Mocha.Test$$$testCase)("Negative numbers can be parsed", body$$11);
})(), (() => {
  const body$$12 = function body$$12() {
    var nested;

    const _arg3$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)("{\"child\":{}}");

    var $target$$97, map$$1, otherResult$$4;

    if (_arg3$$1 != null) {
      if (_arg3$$1.tag === 5) {
        $target$$97 = 0;
        map$$1 = _arg3$$1.fields[0];
      } else {
        $target$$97 = 1;
        otherResult$$4 = _arg3$$1;
      }
    } else {
      $target$$97 = 1;
      otherResult$$4 = _arg3$$1;
    }

    switch ($target$$97) {
      case 0:
        {
          const matchValue$$1 = (0, _Map.toList)(map$$1);
          var $target$$98;

          if (matchValue$$1.tail != null) {
            if (matchValue$$1.head[0] === "child") {
              if (matchValue$$1.head[1].tag === 5) {
                if (matchValue$$1.tail.tail == null) {
                  if (nested = matchValue$$1.head[1].fields[0], (0, _Map.isEmpty)(nested)) {
                    $target$$98 = 0;
                  } else {
                    $target$$98 = 1;
                  }
                } else {
                  $target$$98 = 1;
                }
              } else {
                $target$$98 = 1;
              }
            } else {
              $target$$98 = 1;
            }
          } else {
            $target$$98 = 1;
          }

          switch ($target$$98) {
            case 0:
              {
                test$$$pass();
                break;
              }

            case 1:
              {
                const otherResult$$3 = matchValue$$1;
                test$$$unexpected$$1505(otherResult$$3);
                break;
              }
          }

          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherResult$$4);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser works with empty nested objects", body$$12);
})(), (() => {
  const body$$13 = function body$$13() {
    const _arg4$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)("{\"nested\":{\"name\":1}}");

    var $target$$99, map$$2, otherResult$$7;

    if (_arg4$$1 != null) {
      if (_arg4$$1.tag === 5) {
        $target$$99 = 0;
        map$$2 = _arg4$$1.fields[0];
      } else {
        $target$$99 = 1;
        otherResult$$7 = _arg4$$1;
      }
    } else {
      $target$$99 = 1;
      otherResult$$7 = _arg4$$1;
    }

    switch ($target$$99) {
      case 0:
        {
          const matchValue$$2 = (0, _Map.toList)(map$$2);
          var $target$$100, nested$$2, otherResult$$6;

          if (matchValue$$2.tail != null) {
            if (matchValue$$2.head[0] === "nested") {
              if (matchValue$$2.head[1].tag === 5) {
                if (matchValue$$2.tail.tail == null) {
                  $target$$100 = 0;
                  nested$$2 = matchValue$$2.head[1].fields[0];
                } else {
                  $target$$100 = 1;
                  otherResult$$6 = matchValue$$2;
                }
              } else {
                $target$$100 = 1;
                otherResult$$6 = matchValue$$2;
              }
            } else {
              $target$$100 = 1;
              otherResult$$6 = matchValue$$2;
            }
          } else {
            $target$$100 = 1;
            otherResult$$6 = matchValue$$2;
          }

          switch ($target$$100) {
            case 0:
              {
                const matchValue$$3 = (0, _Map.toList)(nested$$2);
                var $target$$101, otherResult$$5;

                if (matchValue$$3.tail != null) {
                  if (matchValue$$3.head[0] === "name") {
                    if (matchValue$$3.head[1].tag === 0) {
                      if (matchValue$$3.head[1].fields[0] === 1) {
                        if (matchValue$$3.tail.tail == null) {
                          $target$$101 = 0;
                        } else {
                          $target$$101 = 1;
                          otherResult$$5 = matchValue$$3;
                        }
                      } else {
                        $target$$101 = 1;
                        otherResult$$5 = matchValue$$3;
                      }
                    } else {
                      $target$$101 = 1;
                      otherResult$$5 = matchValue$$3;
                    }
                  } else {
                    $target$$101 = 1;
                    otherResult$$5 = matchValue$$3;
                  }
                } else {
                  $target$$101 = 1;
                  otherResult$$5 = matchValue$$3;
                }

                switch ($target$$101) {
                  case 0:
                    {
                      test$$$pass();
                      break;
                    }

                  case 1:
                    {
                      test$$$unexpected$$1505(otherResult$$5);
                      break;
                    }
                }

                break;
              }

            case 1:
              {
                test$$$unexpected$$1505(otherResult$$6);
                break;
              }
          }

          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherResult$$7);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser works with non-empty nested objects", body$$13);
})(), (() => {
  const body$$14 = function body$$14() {
    const _arg5$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)("{\"list\":[],\"nested\":{\"name\":1}}");

    var $target$$102, map$$3, otherResult$$10;

    if (_arg5$$1 != null) {
      if (_arg5$$1.tag === 5) {
        $target$$102 = 0;
        map$$3 = _arg5$$1.fields[0];
      } else {
        $target$$102 = 1;
        otherResult$$10 = _arg5$$1;
      }
    } else {
      $target$$102 = 1;
      otherResult$$10 = _arg5$$1;
    }

    switch ($target$$102) {
      case 0:
        {
          const matchValue$$4 = (0, _Map.toList)(map$$3);
          var $target$$103, nested$$3, otherResult$$9;

          if (matchValue$$4.tail != null) {
            if (matchValue$$4.head[0] === "list") {
              if (matchValue$$4.head[1].tag === 4) {
                if (matchValue$$4.head[1].fields[0].tail == null) {
                  if (matchValue$$4.tail.tail != null) {
                    if (matchValue$$4.tail.head[0] === "nested") {
                      if (matchValue$$4.tail.head[1].tag === 5) {
                        if (matchValue$$4.tail.tail.tail == null) {
                          $target$$103 = 0;
                          nested$$3 = matchValue$$4.tail.head[1].fields[0];
                        } else {
                          $target$$103 = 1;
                          otherResult$$9 = matchValue$$4;
                        }
                      } else {
                        $target$$103 = 1;
                        otherResult$$9 = matchValue$$4;
                      }
                    } else {
                      $target$$103 = 1;
                      otherResult$$9 = matchValue$$4;
                    }
                  } else {
                    $target$$103 = 1;
                    otherResult$$9 = matchValue$$4;
                  }
                } else {
                  $target$$103 = 1;
                  otherResult$$9 = matchValue$$4;
                }
              } else {
                $target$$103 = 1;
                otherResult$$9 = matchValue$$4;
              }
            } else {
              $target$$103 = 1;
              otherResult$$9 = matchValue$$4;
            }
          } else {
            $target$$103 = 1;
            otherResult$$9 = matchValue$$4;
          }

          switch ($target$$103) {
            case 0:
              {
                const matchValue$$5 = (0, _Map.toList)(nested$$3);
                var $target$$104, otherResult$$8;

                if (matchValue$$5.tail != null) {
                  if (matchValue$$5.head[0] === "name") {
                    if (matchValue$$5.head[1].tag === 0) {
                      if (matchValue$$5.head[1].fields[0] === 1) {
                        if (matchValue$$5.tail.tail == null) {
                          $target$$104 = 0;
                        } else {
                          $target$$104 = 1;
                          otherResult$$8 = matchValue$$5;
                        }
                      } else {
                        $target$$104 = 1;
                        otherResult$$8 = matchValue$$5;
                      }
                    } else {
                      $target$$104 = 1;
                      otherResult$$8 = matchValue$$5;
                    }
                  } else {
                    $target$$104 = 1;
                    otherResult$$8 = matchValue$$5;
                  }
                } else {
                  $target$$104 = 1;
                  otherResult$$8 = matchValue$$5;
                }

                switch ($target$$104) {
                  case 0:
                    {
                      test$$$pass();
                      break;
                    }

                  case 1:
                    {
                      test$$$unexpected$$1505(otherResult$$8);
                      break;
                    }
                }

                break;
              }

            case 1:
              {
                test$$$unexpected$$1505(otherResult$$9);
                break;
              }
          }

          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherResult$$10);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser works with arrays and non-empty nested objects", body$$14);
})(), (() => {
  const body$$15 = function body$$15() {
    const _arg6$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)("{\"other\":\"value\",\"child\":{ }}");

    var $target$$105, map$$4, otherResult$$13;

    if (_arg6$$1 != null) {
      if (_arg6$$1.tag === 5) {
        $target$$105 = 0;
        map$$4 = _arg6$$1.fields[0];
      } else {
        $target$$105 = 1;
        otherResult$$13 = _arg6$$1;
      }
    } else {
      $target$$105 = 1;
      otherResult$$13 = _arg6$$1;
    }

    switch ($target$$105) {
      case 0:
        {
          test$$$areEqual(true, (0, _Map.containsKey)("child", map$$4));
          test$$$areEqual(true, (0, _Map.containsKey)("other", map$$4));
          const matchValue$$6 = (0, _Map.find)("child", map$$4);

          if (matchValue$$6.tag === 5) {
            const nested$$4 = matchValue$$6.fields[0];
            test$$$areEqual(true, (0, _Map.isEmpty)(nested$$4));
          } else {
            const otherResult$$11 = matchValue$$6;
            test$$$unexpected$$1505(otherResult$$11);
          }

          const matchValue$$7 = (0, _Map.find)("other", map$$4);
          var $target$$106, otherResult$$12;

          if (matchValue$$7.tag === 1) {
            if (matchValue$$7.fields[0] === "value") {
              $target$$106 = 0;
            } else {
              $target$$106 = 1;
              otherResult$$12 = matchValue$$7;
            }
          } else {
            $target$$106 = 1;
            otherResult$$12 = matchValue$$7;
          }

          switch ($target$$106) {
            case 0:
              {
                test$$$pass();
                break;
              }

            case 1:
              {
                test$$$unexpected$$1505(otherResult$$12);
                break;
              }
          }

          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherResult$$13);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser works with more nested values", body$$15);
})(), (() => {
  const body$$16 = function body$$16() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(0, "JNumber", 12), new _Json2.Json(0, "JNumber", 12)]), (0, _List.choose)(_SimpleJson.SimpleJson$$$tryParse, (0, _List.ofArray)(["12", "12.0"])));
  };

  return (0, _Mocha.Test$$$testCase)("Json parser parses number values", body$$16);
})(), (() => {
  const body$$17 = function body$$17() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(2, "JBool", true), new _Json2.Json(2, "JBool", false)]), (0, _List.choose)(_SimpleJson.SimpleJson$$$tryParse, (0, _List.ofArray)(["true", "false", "something else"])));
  };

  return (0, _Mocha.Test$$$testCase)("Json parser parses boolean values", body$$17);
})(), (() => {
  const body$$18 = function body$$18() {
    var json$$1;
    const expected = new _Json2.Json(5, "JObject", (0, _Map.ofList)(new _Types.List(["empty", new _Json2.Json(5, "JObject", (0, _Map.empty)({
      Compare: _Util.comparePrimitives
    }))], new _Types.List()), {
      Compare: _Util.comparePrimitives
    }));
    const input$$20 = "\n{\"empty\":\n{\n}}\n";
    const matchValue$$8 = (0, _SimpleJson.SimpleJson$$$tryParse)(input$$20);
    var $target$$107;

    if (matchValue$$8 != null) {
      if (json$$1 = matchValue$$8, (0, _Util.equals)(json$$1, expected)) {
        $target$$107 = 0;
      } else {
        $target$$107 = 1;
      }
    } else {
      $target$$107 = 1;
    }

    switch ($target$$107) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          const otherwise = matchValue$$8;
          test$$$unexpected$$1505(otherwise);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser parses objects with new lines", body$$18);
})(), (() => {
  const body$$19 = function body$$19() {
    test$$$areEqual((0, _List.ofArray)([new _Json2.Json(1, "JString", "there is some json inside"), new _Json2.Json(1, "JString", "")]), (0, _List.choose)(_SimpleJson.SimpleJson$$$tryParse, (0, _List.ofArray)(["\"there is some json inside\"", "\"\""])));
  };

  return (0, _Mocha.Test$$$testCase)("Json parser works with escaped strings", body$$19);
})(), (() => {
  const body$$20 = function body$$20() {
    if ((0, _SimpleJson.SimpleJson$$$tryParse)(" {} ") == null) {
      test$$$fail();
    } else {
      test$$$pass();
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser can parse escaped empty objects", body$$20);
})(), (() => {
  const body$$21 = function body$$21() {
    const matchValue$$10 = (0, _SimpleJson.SimpleJson$$$tryParse)(" {\"prop\":\"value\"} ");

    if (matchValue$$10 == null) {
      test$$$fail();
    } else {
      const json$$3 = matchValue$$10;

      if (json$$3.tag === 5) {
        const map$$5 = json$$3.fields[0];
        const matchValue$$11 = (0, _Map.toList)(map$$5);
        var $target$$108, other;

        if (matchValue$$11.tail != null) {
          if (matchValue$$11.head[0] === "prop") {
            if (matchValue$$11.head[1].tag === 1) {
              if (matchValue$$11.head[1].fields[0] === "value") {
                if (matchValue$$11.tail.tail == null) {
                  $target$$108 = 0;
                } else {
                  $target$$108 = 1;
                  other = matchValue$$11;
                }
              } else {
                $target$$108 = 1;
                other = matchValue$$11;
              }
            } else {
              $target$$108 = 1;
              other = matchValue$$11;
            }
          } else {
            $target$$108 = 1;
            other = matchValue$$11;
          }
        } else {
          $target$$108 = 1;
          other = matchValue$$11;
        }

        switch ($target$$108) {
          case 0:
            {
              test$$$pass();
              break;
            }

          case 1:
            {
              test$$$unexpected$$1505(other);
              break;
            }
        }
      } else {
        const other$$1 = json$$3;
        test$$$unexpected$$1505(other$$1);
      }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser can parse escaped non-empty objects", body$$21);
})(), (() => {
  const body$$22 = function body$$22() {
    var x$$4;

    const _arg7$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)("[{}]");

    var $target$$109;

    if (_arg7$$1 != null) {
      if (_arg7$$1.tag === 4) {
        if (_arg7$$1.fields[0].tail != null) {
          if (_arg7$$1.fields[0].head.tag === 5) {
            if (_arg7$$1.fields[0].tail.tail == null) {
              if (x$$4 = _arg7$$1.fields[0].head.fields[0], x$$4.Equals((0, _Map.empty)({
                Compare: _Util.comparePrimitives
              }))) {
                $target$$109 = 0;
              } else {
                $target$$109 = 1;
              }
            } else {
              $target$$109 = 1;
            }
          } else {
            $target$$109 = 1;
          }
        } else {
          $target$$109 = 1;
        }
      } else {
        $target$$109 = 1;
      }
    } else {
      $target$$109 = 1;
    }

    switch ($target$$109) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$fail();
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json parser can parse list of objects", body$$22);
})(), (() => {
  const body$$23 = function body$$23() {
    if ((0, _SimpleJson.SimpleJson$$$tryParse)(jsonTestSample) == null) {
      test$$$fail();
    } else {
      test$$$pass();
    }
  };

  return (0, _Mocha.Test$$$testCase)("Parsing JSON test sample works", body$$23);
})(), (() => {
  const body$$24 = function body$$24() {
    const phones = new _Json2.Json(5, "JObject", (0, _Map.ofList)((0, _List.ofArray)([["home", new _Json2.Json(1, "JString", "800-123-4567")], ["mobile", new _Json2.Json(1, "JString", "877-123-1234")]]), {
      Compare: _Util.comparePrimitives
    }));
    const emergencyContacts = new _Json2.Json(4, "JArray", (0, _List.ofArray)([new _Json2.Json(5, "JObject", (0, _Map.ofList)((0, _List.ofArray)([["name", new _Json2.Json(1, "JString", "Jane Doe")], ["phone", new _Json2.Json(1, "JString", "888-555-1212")], ["relationship", new _Json2.Json(1, "JString", "spouse")]]), {
      Compare: _Util.comparePrimitives
    })), new _Json2.Json(5, "JObject", (0, _Map.ofList)((0, _List.ofArray)([["name", new _Json2.Json(1, "JString", "Justin Doe")], ["phone", new _Json2.Json(1, "JString", "877-123-1212")], ["relationship", new _Json2.Json(1, "JString", "parent")]]), {
      Compare: _Util.comparePrimitives
    }))]));
    const person = new _Json2.Json(5, "JObject", (0, _Map.ofList)((0, _List.ofArray)([["id", new _Json2.Json(0, "JNumber", 12345)], ["name", new _Json2.Json(1, "JString", "John Doe")], ["registered", new _Json2.Json(2, "JBool", true)], ["dateOfBirth", new _Json2.Json(1, "JString", "1980-01-02T00:00:00.000Z")], ["email", new _Json2.Json(4, "JArray", (0, _List.ofArray)([new _Json2.Json(1, "JString", "jd@example.com"), new _Json2.Json(1, "JString", "jd@example.org")]))], ["phones", phones], ["emergencyContacts", emergencyContacts]]), {
      Compare: _Util.comparePrimitives
    }));
    const testSample = new _Json2.Json(5, "JObject", (0, _Map.ofList)((0, _List.ofArray)([["product", new _Json2.Json(1, "JString", "Live JSON generator")], ["version", new _Json2.Json(0, "JNumber", 3.1)], ["releaseDate", new _Json2.Json(1, "JString", "2014-06-25T00:00:00.000Z")], ["demo", new _Json2.Json(2, "JBool", true)], ["person", person]]), {
      Compare: _Util.comparePrimitives
    }));
    const matchValue$$13 = (0, _SimpleJson.SimpleJson$$$tryParse)(jsonTestSample);

    if (matchValue$$13 != null) {
      const sampleResult = matchValue$$13;
      test$$$areEqual(testSample, sampleResult);
    } else {
      const otherResult$$14 = matchValue$$13;
      test$$$unexpected$$1505(otherResult$$14);
    }
  };

  return (0, _Mocha.Test$$$testCase)("JSON test sample is parsed correctly", body$$24);
})(), (() => {
  const body$$25 = function body$$25() {
    const matchValue$$14 = (0, _SimpleJson.SimpleJson$$$tryParse)(jsonTestSample);

    if (matchValue$$14 != null) {
      const sampleResult$$1 = matchValue$$14;
      const serialized = (0, _SimpleJson.SimpleJson$$$toString)(sampleResult$$1);
      const matchValue$$15 = (0, _SimpleJson.SimpleJson$$$tryParse)(serialized);

      if (matchValue$$15 == null) {
        test$$$failwith$$Z721C83C5("Could not deserialize json resulted from SimpleJson.toString");
      } else {
        const serializedSampleResult = matchValue$$15;
        test$$$areEqual(sampleResult$$1, serializedSampleResult);
        test$$$areEqual(serialized, (0, _SimpleJson.SimpleJson$$$toString)(serializedSampleResult));
      }
    } else {
      const otherResult$$15 = matchValue$$14;
      test$$$unexpected$$1505(otherResult$$15);
    }
  };

  return (0, _Mocha.Test$$$testCase)("Json serialization/deserialization works back and forth", body$$25);
})(), (() => {
  const body$$26 = function body$$26() {
    const _arg8$$1 = (0, _SimpleJson.SimpleJson$$$tryParse)("{ \"name\":\"john\", \"age\":20 }");

    var $target$$110, dict, other$$3;

    if (_arg8$$1 != null) {
      if (_arg8$$1.tag === 5) {
        $target$$110 = 0;
        dict = _arg8$$1.fields[0];
      } else {
        $target$$110 = 1;
        other$$3 = _arg8$$1;
      }
    } else {
      $target$$110 = 1;
      other$$3 = _arg8$$1;
    }

    switch ($target$$110) {
      case 0:
        {
          const value = function value(key) {
            return (0, _Map.tryFind)(key, dict);
          };

          const _arg9$$1 = (0, _List.choose)(function chooser$$9(x$$6) {
            return x$$6;
          }, (0, _List.ofArray)([value("name"), value("age")]));

          var $target$$111, other$$2;

          if (_arg9$$1.tail != null) {
            if (_arg9$$1.head.tag === 1) {
              if (_arg9$$1.head.fields[0] === "john") {
                if (_arg9$$1.tail.tail != null) {
                  if (_arg9$$1.tail.head.tag === 0) {
                    if (_arg9$$1.tail.head.fields[0] === 20) {
                      if (_arg9$$1.tail.tail.tail == null) {
                        $target$$111 = 0;
                      } else {
                        $target$$111 = 1;
                        other$$2 = _arg9$$1;
                      }
                    } else {
                      $target$$111 = 1;
                      other$$2 = _arg9$$1;
                    }
                  } else {
                    $target$$111 = 1;
                    other$$2 = _arg9$$1;
                  }
                } else {
                  $target$$111 = 1;
                  other$$2 = _arg9$$1;
                }
              } else {
                $target$$111 = 1;
                other$$2 = _arg9$$1;
              }
            } else {
              $target$$111 = 1;
              other$$2 = _arg9$$1;
            }
          } else {
            $target$$111 = 1;
            other$$2 = _arg9$$1;
          }

          switch ($target$$111) {
            case 0:
              {
                test$$$pass();
                break;
              }

            case 1:
              {
                test$$$unexpected$$1505(other$$2);
                break;
              }
          }

          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(other$$3);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing Person works", body$$26);
})(), (() => {
  const body$$27 = function body$$27() {
    const student = {};
    student.name = "John";
    student.age = 20;
    student.subjects = ["math"];
    const matchValue$$16 = (0, _SimpleJson.SimpleJson$$$fromObjectLiteral)(student);

    if (matchValue$$16 == null) {
      test$$$failwith$$Z721C83C5("No match");
    } else if (matchValue$$16.tag === 5) {
      const dict$$1 = matchValue$$16.fields[0];

      const value$$1 = function value$$1(key$$1) {
        return (0, _Map.tryFind)(key$$1, dict$$1);
      };

      const _arg10$$1 = (0, _List.choose)(function chooser$$10(x$$7) {
        return x$$7;
      }, (0, _List.ofArray)([value$$1("name"), value$$1("age"), value$$1("subjects")]));

      var $target$$112, otherResult$$16;

      if (_arg10$$1.tail != null) {
        if (_arg10$$1.head.tag === 1) {
          if (_arg10$$1.head.fields[0] === "John") {
            if (_arg10$$1.tail.tail != null) {
              if (_arg10$$1.tail.head.tag === 0) {
                if (_arg10$$1.tail.head.fields[0] === 20) {
                  if (_arg10$$1.tail.tail.tail != null) {
                    if (_arg10$$1.tail.tail.head.tag === 4) {
                      if (_arg10$$1.tail.tail.head.fields[0].tail != null) {
                        if (_arg10$$1.tail.tail.head.fields[0].head.tag === 1) {
                          if (_arg10$$1.tail.tail.head.fields[0].head.fields[0] === "math") {
                            if (_arg10$$1.tail.tail.head.fields[0].tail.tail == null) {
                              if (_arg10$$1.tail.tail.tail.tail == null) {
                                $target$$112 = 0;
                              } else {
                                $target$$112 = 1;
                                otherResult$$16 = _arg10$$1;
                              }
                            } else {
                              $target$$112 = 1;
                              otherResult$$16 = _arg10$$1;
                            }
                          } else {
                            $target$$112 = 1;
                            otherResult$$16 = _arg10$$1;
                          }
                        } else {
                          $target$$112 = 1;
                          otherResult$$16 = _arg10$$1;
                        }
                      } else {
                        $target$$112 = 1;
                        otherResult$$16 = _arg10$$1;
                      }
                    } else {
                      $target$$112 = 1;
                      otherResult$$16 = _arg10$$1;
                    }
                  } else {
                    $target$$112 = 1;
                    otherResult$$16 = _arg10$$1;
                  }
                } else {
                  $target$$112 = 1;
                  otherResult$$16 = _arg10$$1;
                }
              } else {
                $target$$112 = 1;
                otherResult$$16 = _arg10$$1;
              }
            } else {
              $target$$112 = 1;
              otherResult$$16 = _arg10$$1;
            }
          } else {
            $target$$112 = 1;
            otherResult$$16 = _arg10$$1;
          }
        } else {
          $target$$112 = 1;
          otherResult$$16 = _arg10$$1;
        }
      } else {
        $target$$112 = 1;
        otherResult$$16 = _arg10$$1;
      }

      switch ($target$$112) {
        case 0:
          {
            test$$$pass();
            break;
          }

        case 1:
          {
            test$$$unexpected$$1505(otherResult$$16);
            break;
          }
      }
    } else {
      const otherResult$$17 = matchValue$$16;
      test$$$unexpected$$1505(otherResult$$17);
    }
  };

  return (0, _Mocha.Test$$$testCase)("fromObjectLiteral works", body$$27);
})(), (() => {
  const body$$28 = function body$$28() {
    test$$$areEqual("[{\"Person\":{\"FirstName\":\"john\",\"LastName\":\"doe\"}}]", (0, _SimpleJson.SimpleJson$$$toString)((0, _SimpleJson.SimpleJson$$$mapKeys)(function f(_arg11$$1) {
      switch (_arg11$$1) {
        case "person":
          {
            return "Person";
          }

        case "first":
          {
            return "FirstName";
          }

        case "last":
          {
            return "LastName";
          }

        default:
          {
            const key$$2 = _arg11$$1;
            return key$$2;
          }
      }
    }, (0, _SimpleJson.SimpleJson$$$parse)("[{\"person\":{\"first\":\"john\", \"last\":\"doe\"}}]"))));
  };

  return (0, _Mocha.Test$$$testCase)("mapKeys works", body$$28);
})(), (() => {
  const body$$29 = function body$$29() {
    test$$$areEqual("[{\"Person\":{\"first_name\":\"john\",\"last_name\":\"doe\"}},{\"first\":\"not-mapped\"}]", (0, _SimpleJson.SimpleJson$$$toString)((0, _SimpleJson.SimpleJson$$$mapKeysByPath)(function f$$1(_arg12$$1) {
      var $target$$113;

      if (_arg12$$1.tail != null) {
        if (_arg12$$1.head === "person") {
          if (_arg12$$1.tail.tail != null) {
            if (_arg12$$1.tail.head === "first") {
              if (_arg12$$1.tail.tail.tail == null) {
                $target$$113 = 1;
              } else {
                $target$$113 = 3;
              }
            } else if (_arg12$$1.tail.head === "last") {
              if (_arg12$$1.tail.tail.tail == null) {
                $target$$113 = 2;
              } else {
                $target$$113 = 3;
              }
            } else {
              $target$$113 = 3;
            }
          } else {
            $target$$113 = 0;
          }
        } else {
          $target$$113 = 3;
        }
      } else {
        $target$$113 = 3;
      }

      switch ($target$$113) {
        case 0:
          {
            return "Person";
          }

        case 1:
          {
            return "first_name";
          }

        case 2:
          {
            return "last_name";
          }

        case 3:
          {
            return null;
          }
      }
    }, (0, _SimpleJson.SimpleJson$$$parse)("[{\"person\":{\"first\":\"john\", \"last\":\"doe\"}}, {\"first\":\"not-mapped\"}]"))));
  };

  return (0, _Mocha.Test$$$testCase)("mapKeysByPath works", body$$29);
})(), (() => {
  const body$$30 = function body$$30() {
    const makeUpper = function makeUpper(key$$3, value$$2) {
      const matchValue$$17 = [key$$3, value$$2];
      var $target$$114, value$$3;

      if (matchValue$$17[0] === "first_name") {
        if (matchValue$$17[1].tag === 1) {
          $target$$114 = 0;
        } else {
          $target$$114 = 1;
          value$$3 = matchValue$$17[1];
        }
      } else {
        $target$$114 = 1;
        value$$3 = matchValue$$17[1];
      }

      switch ($target$$114) {
        case 0:
          {
            const name$$31 = matchValue$$17[1].fields[0];
            return new _Json2.Json(1, "JString", name$$31.toLocaleUpperCase());
          }

        case 1:
          {
            return value$$3;
          }
      }
    };

    test$$$areEqual("[{\"first_name\":\"JOHN\"},{\"first_name\":\"JANE\"}]", (0, _SimpleJson.SimpleJson$$$toString)((0, _SimpleJson.SimpleJson$$$mapbyKey)(makeUpper, (0, _SimpleJson.SimpleJson$$$parse)("[{\"first_name\":\"john\"},{\"first_name\":\"jane\"}]"))));
  };

  return (0, _Mocha.Test$$$testCase)("SimpleJson.mapByKey works", body$$30);
})(), (() => {
  const body$$31 = function body$$31() {
    const expected$$1 = new _Types2.SimpleRecord("John", 21, 3.99);
    const deserialized = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("{\"First\": \"John\", \"Age\": 21, \"Salary\": 3.99 }", {
      ResolveType() {
        return (0, _Types2.SimpleRecord$reflection)();
      }

    });
    test$$$areEqual(expected$$1, deserialized);
  };

  return (0, _Mocha.Test$$$testCase)("fromJsonAs works generated type information", body$$31);
})(), (() => {
  const body$$32 = function body$$32() {
    const jsonInput = "[[\"One\"], [\"Two\", 20], [\"Three\", \"some value\"]]";
    const expected$$2 = (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")]);
    const deserialized$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(jsonInput, {
      ResolveType() {
        return (0, _Reflection.list)((0, _Types2.SimpleDU$reflection)());
      }

    });
    test$$$areEqual(expected$$2, deserialized$$1);
  };

  return (0, _Mocha.Test$$$testCase)("Auto derserialization: parsing lists of unions from Fable 2", body$$32);
})(), (() => {
  const body$$33 = function body$$33() {
    const jsonInput$$1 = "[\"One\", { \"Two\" : [20] }, {\"Three\": [\"some value\"] }]";
    const expected$$3 = (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")]);
    const deserialized$$2 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(jsonInput$$1, {
      ResolveType() {
        return (0, _Reflection.list)((0, _Types2.SimpleDU$reflection)());
      }

    });
    test$$$areEqual(expected$$3, deserialized$$2);
  };

  return (0, _Mocha.Test$$$testCase)("Auto derserialization: parsing lists of unions from Fable 1", body$$33);
})(), (() => {
  const body$$34 = function body$$34() {
    const jsonInput$$2 = "[\"One\", { \"Two\" : 20 }, {\"Three\": \"some value\" }]";
    const expected$$4 = (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")]);
    const deserialized$$3 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(jsonInput$$2, {
      ResolveType() {
        return (0, _Reflection.list)((0, _Types2.SimpleDU$reflection)());
      }

    });
    test$$$areEqual(expected$$4, deserialized$$3);
  };

  return (0, _Mocha.Test$$$testCase)("Auto derserialization: parsing lists of unions from Fable 1, values are non-arrays", body$$34);
})(), (() => {
  const body$$35 = function body$$35() {
    test$$$areEqual((0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("[\"One\", { \"Two\" :20 }, {\"Three\": \"some value\" }]", {
      ResolveType() {
        return (0, _Reflection.list)((0, _Types2.SimpleDU$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("fromJsonAs works with simple DU's serialized as objects with values as non-arrays", body$$35);
})(), (() => {
  const body$$36 = function body$$36() {
    test$$$areEqual((0, _List.ofArray)([["A", "a"], ["B", "b"], ["C", "c"]]), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(JSON.stringify((0, _Map.ofList)((0, _List.ofArray)([["A", "a"], ["B", "b"], ["C", "c"]]), {
      Compare: _Util.comparePrimitives
    })), {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, _Reflection.string]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Parsing maps serialized with JSON.stringify", body$$36);
})(), (() => {
  const body$$37 = function body$$37() {
    const inputJson = " { \"A\":\"a\", \"B\":\"b\", \"C\":\"c\" } ";
    test$$$areEqual((0, _List.ofArray)([["A", "a"], ["B", "b"], ["C", "c"]]), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(inputJson, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, _Reflection.string]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Parsing maps serialized with toJson from Fable 1", body$$37);
})(), (() => {
  const body$$38 = function body$$38() {
    test$$$areEqual((0, _List.ofArray)([[1, "one"], [2, "two"], [3, "three"]]), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("[[1, \"one\"], [2, \"two\"], [3,\"three\"]]", {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.int32, _Reflection.string]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Parsing maps with integers as keys from string works", body$$38);
})(), (() => {
  const body$$39 = function body$$39() {
    test$$$areEqual((0, _List.ofArray)([[1, "one"], [2, "two"], [3, "three"]]), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("[[\"1\", \"one\"], [\"2\", \"two\"], [\"3\",\"three\"]]", {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.int32, _Reflection.string]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Parsing maps with integers as keys from string works where integers are stringified", body$$39);
})(), (() => {
  const body$$40 = function body$$40() {
    test$$$areEqual((0, _List.ofArray)([[1, "one"], [2, "two"], [3, "three"]]), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _Map.ofList)((0, _List.ofArray)([[1, "one"], [2, "two"], [3, "three"]]), {
      Compare: _Util.comparePrimitives
    })), {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.int32, _Reflection.string]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Parsing maps with integers as keys", body$$40);
})(), (() => {
  const body$$41 = function body$$41() {
    test$$$areEqual(new _Types.List(["test", (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")])], new _Types.List()), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(JSON.stringify((0, _Map.ofList)(new _Types.List(["test", (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")])], new _Types.List()), {
      Compare: _Util.comparePrimitives
    })), {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, (0, _Reflection.list)((0, _Types2.SimpleDU$reflection)())]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Parsing maps with strings as keys with complex values", body$$41);
})(), (() => {
  const body$$42 = function body$$42() {
    test$$$areEqual((0, _List.ofArray)([[1, "one"], [2, "two"]]), (0, _Map.toList)((0, _Map.ofList)((0, _List.ofArray)([[1, "one"], [2, "two"]]), {
      Compare: _Util.comparePrimitives
    })));
  };

  return (0, _Mocha.Test$$$testCase)("Map.toList works", body$$42);
})(), (() => {
  const body$$43 = function body$$43() {
    const str = "1";
    const json1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.WithString(str));
    const json2 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.WithString(json1));
    const parsed2 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(json2, {
      ResolveType() {
        return (0, _Types2.WithString$reflection)();
      }

    });
    const parsed1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(parsed2.Str, {
      ResolveType() {
        return (0, _Types2.WithString$reflection)();
      }

    });
    test$$$areEqual(str, parsed1.Str);
  };

  return (0, _Mocha.Test$$$testCase)("Deserialize string with json inside", body$$43);
})(), (() => {
  const body$$44 = function body$$44() {
    const jsonString = "{\"a\": \"\\\"\\\"\"}";
    const json$$5 = (0, _SimpleJson.SimpleJson$$$parse)(jsonString);

    if (json$$5.tag === 5) {
      const literal = json$$5.fields[0];
      const matchValue$$18 = (0, _Map.find)("a", literal);
      var $target$$115;

      if (matchValue$$18.tag === 1) {
        if (matchValue$$18.fields[0] === "\"\"") {
          $target$$115 = 0;
        } else {
          $target$$115 = 1;
        }
      } else {
        $target$$115 = 1;
      }

      switch ($target$$115) {
        case 0:
          {
            test$$$pass();
            break;
          }

        case 1:
          {
            test$$$failwith$$Z721C83C5("Unexpected value of property 'a'");
            break;
          }
      }
    } else {
      test$$$failwith$$Z721C83C5("Unexpected json type");
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserialize string with escaped quotes", body$$44);
})(), (() => {
  const body$$45 = function body$$45() {
    const str$$1 = "\t";
    const o = new _Types2.WithString(str$$1);
    const json$$6 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(o);
    const deserialized$$4 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(json$$6, {
      ResolveType() {
        return (0, _Types2.WithString$reflection)();
      }

    });
    test$$$areEqual(str$$1, deserialized$$4.Str);
  };

  return (0, _Mocha.Test$$$testCase)("Deserialize string with special char", body$$45);
})(), (() => {
  const body$$46 = function body$$46() {
    test$$$areEqual(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))), {
      ResolveType() {
        return (0, _Types2.SimpleRec$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting records with simple types", body$$46);
})(), (() => {
  const body$$47 = function body$$47() {
    test$$$areEqual(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))), {
      ResolveType() {
        return (0, _Types2.SimpleRec$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting records with simple types", body$$47);
})(), (() => {
  const body$$48 = function body$$48() {
    test$$$areEqual(new _Types2.SimpleRec(20, null, false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SimpleRec(20, null, false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))), {
      ResolveType() {
        return (0, _Types2.SimpleRec$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting records with simple types, strings can be null", body$$48);
})(), (() => {
  const body$$49 = function body$$49() {
    test$$$areEqual(new _Types2.SimpleRec(20, null, false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SimpleRec(20, null, false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))), {
      ResolveType() {
        return (0, _Types2.SimpleRec$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting records with simple types, strings can be null", body$$49);
})(), (() => {
  const body$$50 = function body$$50() {
    test$$$areEqual(new _Types.List(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), new _Types.List()), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types.List(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), new _Types.List())), {
      ResolveType() {
        return (0, _Reflection.list)((0, _Types2.SimpleRec$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting lists records with simple types", body$$50);
})(), (() => {
  const body$$51 = function body$$51() {
    test$$$areEqual(new _Types2.SimpleRec(20, null, false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SimpleRec(20, null, false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))), {
      ResolveType() {
        return (0, _Types2.SimpleRec$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting records with simple types, strings can be null", body$$51);
})(), (() => {
  const body$$52 = function body$$52() {
    test$$$areEqual([new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))], (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)([new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))]), {
      ResolveType() {
        return (0, _Reflection.array)((0, _Types2.SimpleRec$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting arrays records with simple types", body$$52);
})(), (() => {
  const body$$53 = function body$$53() {
    test$$$areEqual([new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))], (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)([new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))]), {
      ResolveType() {
        return (0, _Reflection.array)((0, _Types2.SimpleRec$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting arrays records with simple types", body$$53);
})(), (() => {
  const body$$54 = function body$$54() {
    test$$$areEqual(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))), {
      ResolveType() {
        return (0, _Reflection.option)((0, _Types2.SimpleRec$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting optional (Some) records with simple types", body$$54);
})(), (() => {
  const body$$55 = function body$$55() {
    test$$$areEqual(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SimpleRec(20, "BB", false, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2))), {
      ResolveType() {
        return (0, _Reflection.option)((0, _Types2.SimpleRec$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting optional (Some) records with simple types", body$$55);
})(), (() => {
  const body$$56 = function body$$56() {
    test$$$areEqual(null, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(null), {
      ResolveType() {
        return (0, _Reflection.option)((0, _Types2.SimpleRec$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting optional (None) records with simple types", body$$56);
})(), (() => {
  const body$$57 = function body$$57() {
    test$$$areEqual(null, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(null), {
      ResolveType() {
        return (0, _Reflection.option)((0, _Types2.SimpleRec$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting optional (None) records with simple types", body$$57);
})(), (() => {
  const body$$58 = function body$$58() {
    const name$$60 = (0, _Types2.Types$$$getNameOf$$Z3747C43F)({
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)((0, _Types2.RecWithGenDU$00601$reflection)(_Reflection.string)));
      }

    });
    test$$$pass();
  };

  return (0, _Mocha.Test$$$testCase)("Name can be extracted from RecWithGenDU", body$$58);
})(), (() => {
  const body$$59 = function body$$59() {
    const name$$62 = (0, _Types2.Types$$$getNameOf$$Z3747C43F)({
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)((0, _Types2.GenericTestRecord$00601$reflection)(_Reflection.string)));
      }

    });
    test$$$pass();
  };

  return (0, _Mocha.Test$$$testCase)("Name can be extraced from GenericRecord", body$$59);
})(), (() => {
  const body$$60 = function body$$60() {
    const typeInfo$$1 = (0, _Types2.Types$$$get$$Z3747C43F)({
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Types2.Maybe$00601$reflection)(_Reflection.int32));
      }

    });

    const getGenericArgs = function getGenericArgs(typeDef) {
      return (0, _List.ofSeq)((0, _Seq.delay)(function () {
        return (0, _Seq.append)((0, _Seq.singleton)((0, _Reflection.name)(typeDef)), (0, _Seq.delay)(function () {
          return (0, _Seq.collect)(function (genericTypeArg) {
            return getGenericArgs(genericTypeArg);
          }, (0, _Reflection.getGenerics)(typeDef));
        }));
      }));
    };

    test$$$areEqual(new _Types.List("Maybe`1", new _Types.List()), (0, _List.ofArray)((0, _Array.map)(_Reflection.name, (0, _Reflection.getGenerics)(typeInfo$$1), Array)));
  };

  return (0, _Mocha.Test$$$testCase)("TypeInfo of Maybe<<Maybe<int>> can be generated", body$$60);
})(), (() => {
  const body$$61 = function body$$61() {
    test$$$areEqual(new _Types.List(["test", (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")])], new _Types.List()), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(JSON.stringify((0, _Map.ofList)(new _Types.List(["test", (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")])], new _Types.List()), {
      Compare: _Util.comparePrimitives
    })), {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, (0, _Reflection.list)((0, _Types2.SimpleDU$reflection)())]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Converting maps works", body$$61);
})(), (() => {
  const body$$62 = function body$$62() {
    test$$$areEqual(new _Types.List(["test", (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")])], new _Types.List()), (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(JSON.stringify((0, _Map.ofList)(new _Types.List(["test", (0, _List.ofArray)([new _Types2.SimpleDU(0, "One"), new _Types2.SimpleDU(1, "Two", 20), new _Types2.SimpleDU(2, "Three", "some value")])], new _Types.List()), {
      Compare: _Util.comparePrimitives
    })), {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [_Reflection.string, (0, _Reflection.list)((0, _Types2.SimpleDU$reflection)())]);
      }

    })));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting maps works", body$$62);
})(), (() => {
  const body$$63 = function body$$63() {
    const typeInfo$$2 = (0, _TypeInfo.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)({
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)((0, _Types2.GenericTestRecord$00601$reflection)(_Reflection.string)));
      }

    });
    test$$$pass();
  };

  return (0, _Mocha.Test$$$testCase)("TypeInfo can be generated from GenericTestRecord", body$$63);
})(), (() => {
  const body$$64 = function body$$64() {
    test$$$areEqual(new _Types2.Maybe$00601(0, "Just", new _Types.List(new _Types2.RecWithGenDU$00601("wise", new _Types2.Maybe$00601(0, "Just", 20)), new _Types.List())), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.Maybe$00601(0, "Just", new _Types.List(new _Types2.GenericTestRecord$00601("wise", new _Types2.Maybe$00601(0, "Just", 20)), new _Types.List()))), {
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)((0, _Types2.RecWithGenDU$00601$reflection)(_Reflection.string)));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting generic record with Maybe<int> as a field", body$$64);
})(), (() => {
  const body$$65 = function body$$65() {
    test$$$areEqual(new _Types2.Maybe$00601(0, "Just", new _Types.List(new _Types2.RecWithGenDU$00601("wise", new _Types2.Maybe$00601(0, "Just", 20)), new _Types.List())), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.Maybe$00601(0, "Just", new _Types.List(new _Types2.GenericTestRecord$00601("wise", new _Types2.Maybe$00601(0, "Just", 20)), new _Types.List()))), {
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)((0, _Types2.RecWithGenDU$00601$reflection)(_Reflection.string)));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting generic record with Maybe<int> as a field", body$$65);
})(), (() => {
  const body$$66 = function body$$66() {
    test$$$areEqual(new _Types2.RecordWithArray([new _Types2.Maybe$00601(1, "Nothing"), new _Types2.Maybe$00601(0, "Just", 20)]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecordWithArray([new _Types2.Maybe$00601(1, "Nothing"), new _Types2.Maybe$00601(0, "Just", 20)])), {
      ResolveType() {
        return (0, _Types2.RecordWithArray$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting record with arrays", body$$66);
})(), (() => {
  const body$$67 = function body$$67() {
    test$$$areEqual(new _Types2.RecordWithArray([new _Types2.Maybe$00601(1, "Nothing"), new _Types2.Maybe$00601(0, "Just", 20)]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecordWithArray([new _Types2.Maybe$00601(1, "Nothing"), new _Types2.Maybe$00601(0, "Just", 20)])), {
      ResolveType() {
        return (0, _Types2.RecordWithArray$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting record with arrays", body$$67);
})(), (() => {
  const body$$68 = function body$$68() {
    test$$$areEqual(new _Types2.RecWithByte(200 & 0xFF), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecWithByte(200 & 0xFF)), {
      ResolveType() {
        return (0, _Types2.RecWithByte$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting record with bytes", body$$68);
})(), (() => {
  const body$$69 = function body$$69() {
    test$$$areEqual(new _Types2.RecWithByte(200 & 0xFF), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecWithByte(200 & 0xFF)), {
      ResolveType() {
        return (0, _Types2.RecWithByte$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting record with bytes", body$$69);
})(), (() => {
  const body$$70 = function body$$70() {
    test$$$areEqual(new _Types2.RecWithShort((200 + 0x8000 & 0xFFFF) - 0x8000), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecWithShort((200 + 0x8000 & 0xFFFF) - 0x8000)), {
      ResolveType() {
        return (0, _Types2.RecWithShort$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting record with Int16", body$$70);
})(), (() => {
  const body$$71 = function body$$71() {
    test$$$areEqual(new _Types2.RecWithShort((200 + 0x8000 & 0xFFFF) - 0x8000), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecWithShort((200 + 0x8000 & 0xFFFF) - 0x8000)), {
      ResolveType() {
        return (0, _Types2.RecWithShort$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting record with Int16", body$$71);
})(), (() => {
  const body$$72 = function body$$72() {
    test$$$areEqual(new _Types2.RecWithShort((-200 + 0x8000 & 0xFFFF) - 0x8000), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecWithShort((-200 + 0x8000 & 0xFFFF) - 0x8000)), {
      ResolveType() {
        return (0, _Types2.RecWithShort$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting record with negative Int16", body$$72);
})(), (() => {
  const body$$73 = function body$$73() {
    test$$$areEqual(new _Types2.RecWithShort((-200 + 0x8000 & 0xFFFF) - 0x8000), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecWithShort((-200 + 0x8000 & 0xFFFF) - 0x8000)), {
      ResolveType() {
        return (0, _Types2.RecWithShort$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting record with negative Int16", body$$73);
})(), (() => {
  const body$$74 = function body$$74() {
    var SimpleTuples, copyOfStruct, copyOfStruct$$1;
    const complexValue = new _Types2.Maybe$00601(0, "Just", new _Types.List((SimpleTuples = ["value", 20, (0, _String.newGuid)()], new _Types2.ComplexRecord$00601(new _Types2.SimpleRec(20, "AA", false, 5.64134, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), true, (0, _List.ofArray)([(0, _Date.now)(), (copyOfStruct = (0, _Date.now)(), (0, _Date.addDays)(copyOfStruct, 5))]), (0, _List.ofArray)([(0, _DateOffset.now)(), (copyOfStruct$$1 = (0, _DateOffset.now)(), (0, _DateOffset.addDays)(copyOfStruct$$1, 5))]), new _Types.List(new _Types2.SimpleRec(30, "CC", true, 2.0451, (0, _Decimal.fromParts)(4223, 0, 0, false, 2)), new _Types.List()), [null, new _Types2.SimpleRec(35, "FF", false, 1.0451, (0, _Decimal.fromParts)(4242, 0, 0, false, 2)), null], new _Types2.SimpleRec(40, "BB", true, 3.0451, (0, _Decimal.fromParts)(2323, 0, 0, false, 2)), new _Types2.Maybe$00601(0, "Just", new _Types2.Maybe$00601(0, "Just", new _Types2.Maybe$00601(0, "Just", new _Types2.Maybe$00601(1, "Nothing")))), SimpleTuples, new _Types.List((0, _Map.ofList)(new _Types.List(["one", (0, _Map.ofList)(new _Types.List(["two", new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(100, 0, false))], new _Types.List()), {
      Compare: _Util.comparePrimitives
    })], new _Types.List()), {
      Compare: _Util.comparePrimitives
    }), new _Types.List()), [new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(5, 0, false)), null, new _Types.List((0, _Long.fromBits)(20, 0, false), new _Types.List())], [new _Types2.Maybe$00601(0, "Just", (0, _BigInt.fromInt32)(5)), null, new _Types.List((0, _BigInt.fromInt32)(-20), new _Types.List())])), new _Types.List()));
    test$$$areEqual(complexValue, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(complexValue), {
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)((0, _Types2.ComplexRecord$00601$reflection)((0, _Types2.SimpleRec$reflection)())));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting complex generic types", body$$74);
})(), (() => {
  const body$$75 = function body$$75() {
    var SimpleTuples$$1, copyOfStruct$$2, copyOfStruct$$3;
    const complexValue$$1 = new _Types2.Maybe$00601(0, "Just", new _Types.List((SimpleTuples$$1 = ["value", 20, (0, _String.newGuid)()], new _Types2.ComplexRecord$00601(new _Types2.SimpleRec(20, "AA", false, 5.64134, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), true, (0, _List.ofArray)([(0, _Date.now)(), (copyOfStruct$$2 = (0, _Date.now)(), (0, _Date.addDays)(copyOfStruct$$2, 5))]), (0, _List.ofArray)([(0, _DateOffset.now)(), (copyOfStruct$$3 = (0, _DateOffset.now)(), (0, _DateOffset.addDays)(copyOfStruct$$3, 5))]), new _Types.List(new _Types2.SimpleRec(30, "CC", true, 2.0451, (0, _Decimal.fromParts)(2342, 0, 0, false, 2)), new _Types.List()), [null, new _Types2.SimpleRec(35, "FF", false, 1.0451, (0, _Decimal.fromParts)(4223, 0, 0, false, 2)), null], new _Types2.SimpleRec(40, "BB", true, 3.0451, (0, _Decimal.fromParts)(4242, 0, 0, false, 2)), new _Types2.Maybe$00601(0, "Just", new _Types2.Maybe$00601(0, "Just", new _Types2.Maybe$00601(0, "Just", new _Types2.Maybe$00601(1, "Nothing")))), SimpleTuples$$1, new _Types.List((0, _Map.ofList)(new _Types.List(["one", (0, _Map.ofList)(new _Types.List(["two", new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(100, 0, false))], new _Types.List()), {
      Compare: _Util.comparePrimitives
    })], new _Types.List()), {
      Compare: _Util.comparePrimitives
    }), new _Types.List()), [new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(5, 0, false)), null, new _Types.List((0, _Long.fromBits)(20, 0, false), new _Types.List())], [new _Types2.Maybe$00601(0, "Just", (0, _BigInt.fromInt32)(5)), null, new _Types.List((0, _BigInt.fromInt32)(-20), new _Types.List())])), new _Types.List()));
    test$$$areEqual(complexValue$$1, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(complexValue$$1), {
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)((0, _Types2.ComplexRecord$00601$reflection)((0, _Types2.SimpleRec$reflection)())));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Converting complex generic types", body$$75);
})(), (() => {
  const body$$76 = function body$$76() {
    test$$$areEqual((0, _List.ofArray)([new _Option.Result(0, "Ok", "value"), new _Option.Result(1, "Error", new _Types2.Maybe$00601(0, "Just", 5))]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _List.ofArray)([new _Option.Result(0, "Ok", "value"), new _Option.Result(1, "Error", new _Types2.Maybe$00601(0, "Just", 5))])), {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [_Reflection.string, (0, _Types2.Maybe$00601$reflection)(_Reflection.int32)], _Option.Result, () => [["Ok", [_Reflection.string]], ["Error", [(0, _Types2.Maybe$00601$reflection)(_Reflection.int32)]]]));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Result can be converted", body$$76);
})(), (() => {
  const body$$77 = function body$$77() {
    test$$$areEqual((0, _List.ofArray)([new _Option.Result(0, "Ok", "value"), new _Option.Result(1, "Error", new _Types2.Maybe$00601(0, "Just", 5))]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _List.ofArray)([new _Option.Result(0, "Ok", "value"), new _Option.Result(1, "Error", new _Types2.Maybe$00601(0, "Just", 5))])), {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [_Reflection.string, (0, _Types2.Maybe$00601$reflection)(_Reflection.int32)], _Option.Result, () => [["Ok", [_Reflection.string]], ["Error", [(0, _Types2.Maybe$00601$reflection)(_Reflection.int32)]]]));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Result can be converted", body$$77);
})(), (() => {
  const body$$78 = function body$$78() {
    test$$$areEqual(new _Types2.SingleCase(0, "SingleCase", (0, _Long.fromBits)(20, 0, false)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SingleCase(0, "SingleCase", (0, _Long.fromBits)(20, 0, false))), {
      ResolveType() {
        return (0, _Types2.SingleCase$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("SingleCase of int64 can be converter", body$$78);
})(), (() => {
  const body$$79 = function body$$79() {
    test$$$areEqual(new _Types2.SingleCase(0, "SingleCase", (0, _Long.fromBits)(20, 0, false)), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.SingleCase(0, "SingleCase", (0, _Long.fromBits)(20, 0, false))), {
      ResolveType() {
        return (0, _Types2.SingleCase$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: SingleCase of int64 can be converter", body$$79);
})(), (() => {
  const body$$80 = function body$$80() {
    test$$$areEqual((0, _List.ofSeq)((0, _Seq.delay)(function () {
      return (0, _Seq.map)(function (i$$1) {
        return [i$$1, i$$1 * i$$1];
      }, (0, _Seq.rangeNumber)(1, 1, 10));
    })), (0, _List.map)(function mapping$$1($arg$$37) {
      return int64ToIntegers(integersToInt64($arg$$37[0], $arg$$37[1]));
    }, (0, _List.ofSeq)((0, _Seq.delay)(function () {
      return (0, _Seq.map)(function (i) {
        return [i, i * i];
      }, (0, _Seq.rangeNumber)(1, 1, 10));
    }))));
  };

  return (0, _Mocha.Test$$$testCase)("BitConverter works for int64 <-> (int32 * int32) conversion", body$$80);
})(), (() => {
  const body$$81 = function body$$81() {
    test$$$areEqual(new _Types2.RecordWithLong(new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(5, 0, false)), ""), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecordWithLong(new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(5, 0, false)), "")), {
      ResolveType() {
        return (0, _Types2.RecordWithLong$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Long can be converted", body$$81);
})(), (() => {
  const body$$82 = function body$$82() {
    test$$$areEqual(new _Types2.RecordWithLong(new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(5, 0, false)), ""), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecordWithLong(new _Types2.Maybe$00601(0, "Just", (0, _Long.fromBits)(5, 0, false)), "")), {
      ResolveType() {
        return (0, _Types2.RecordWithLong$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Long can be converted", body$$82);
})(), (() => {
  const body$$83 = function body$$83() {
    test$$$areEqual(new _Types2.RecordWithBigInt(new _Types2.Maybe$00601(0, "Just", (0, _BigInt.fromInt32)(5))), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecordWithBigInt(new _Types2.Maybe$00601(0, "Just", (0, _BigInt.fromInt32)(5)))), {
      ResolveType() {
        return (0, _Types2.RecordWithBigInt$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("BigInt can be converted", body$$83);
})(), (() => {
  const body$$84 = function body$$84() {
    test$$$areEqual((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2)]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2)])), {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.type)("System.Numerics.BigInteger"));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("bigint list can be converted", body$$84);
})(), (() => {
  const body$$85 = function body$$85() {
    test$$$areEqual((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2)]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2)])), {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.type)("System.Numerics.BigInteger"));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: bigint list can be converted", body$$85);
})(), (() => {
  const body$$86 = function body$$86() {
    test$$$areEqual((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2)]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("[5, 2]", {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.type)("System.Numerics.BigInteger"));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("bigint list can be converted from Json as numbers", body$$86);
})(), (() => {
  const body$$87 = function body$$87() {
    test$$$areEqual((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2)]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("[\"5\", \"2\"]", {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.type)("System.Numerics.BigInteger"));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("bigint list can be converted from Json as strings", body$$87);
})(), (() => {
  const body$$88 = function body$$88() {
    const typeInfo$$3 = (0, _TypeInfo.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)({
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.option)((0, _Reflection.type)("System.Numerics.BigInteger")));
      }

    });

    if (typeInfo$$3.tag === 22) {
      const getOptionBigInt = typeInfo$$3.fields[0];
      const optionBigInt = getOptionBigInt();

      if (optionBigInt.tag === 21) {
        const getBigInt = optionBigInt.fields[0];
        const bigInt = getBigInt();

        if (bigInt.tag === 15) {
          test$$$pass();
        } else {
          test$$$fail();
        }
      } else {
        test$$$fail();
      }
    } else {
      test$$$fail();
    }
  };

  return (0, _Mocha.Test$$$testCase)("TypeInfo for Option<bigint> list can be generated", body$$88);
})(), (() => {
  const body$$89 = function body$$89() {
    const typeInfo$$4 = (0, _TypeInfo.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)({
      ResolveType() {
        return (0, _Reflection.array)((0, _Reflection.option)((0, _Reflection.type)("System.Numerics.BigInteger")));
      }

    });

    if (typeInfo$$4.tag === 24) {
      const getOptionBigInt$$1 = typeInfo$$4.fields[0];
      const optionBigInt$$1 = getOptionBigInt$$1();

      if (optionBigInt$$1.tag === 21) {
        const getBigInt$$1 = optionBigInt$$1.fields[0];
        const bigInt$$1 = getBigInt$$1();

        if (bigInt$$1.tag === 15) {
          test$$$pass();
        } else {
          test$$$fail();
        }
      } else {
        test$$$fail();
      }
    } else {
      test$$$fail();
    }
  };

  return (0, _Mocha.Test$$$testCase)("TypeInfo for Option<bigint> array can be generated", body$$89);
})(), (() => {
  const body$$90 = function body$$90() {
    test$$$areEqual((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2), null]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("[\"5\", \"2\", null]", {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.option)((0, _Reflection.type)("System.Numerics.BigInteger")));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Simple Option<BigInt> can be converted from Json", body$$90);
})(), (() => {
  const body$$91 = function body$$91() {
    const typeInfo$$5 = (0, _TypeInfo.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)({
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.option)((0, _Reflection.type)("System.Numerics.BigInteger")));
      }

    });
    const inputJson$$1 = (0, _SimpleJson.SimpleJson$$$parse)("[\"5\", \"2\", null]");
    const result = (0, _Json.Convert$$$fromJsonAs)(inputJson$$1, typeInfo$$5);
    test$$$areEqual((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2), null]), result);
  };

  return (0, _Mocha.Test$$$testCase)("Simple Option<BigInt> can be converted manually from Json as string", body$$91);
})(), (() => {
  const body$$92 = function body$$92() {
    test$$$areEqual(new _Json2.Json(4, "JArray", (0, _List.ofArray)([new _Json2.Json(1, "JString", "5"), new _Json2.Json(1, "JString", "2"), new _Json2.Json(3, "JNull")])), (0, _SimpleJson.SimpleJson$$$parseNative)("[\"5\", \"2\", null]"));
  };

  return (0, _Mocha.Test$$$testCase)("Simple Json array can be parsed as Json", body$$92);
})(), (() => {
  const body$$93 = function body$$93() {
    test$$$areEqual(new _Json2.Json(4, "JArray", (0, _List.ofArray)([new _Json2.Json(0, "JNumber", 5), new _Json2.Json(0, "JNumber", 2), new _Json2.Json(3, "JNull")])), (0, _SimpleJson.SimpleJson$$$parseNative)("[5, 2, null]"));
  };

  return (0, _Mocha.Test$$$testCase)("Simple Option<Int> can be parsed as Json", body$$93);
})(), (() => {
  const body$$94 = function body$$94() {
    test$$$areEqual((0, _List.ofArray)([5, 2, null]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("[\"5\", \"2\", null]", {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.option)(_Reflection.int32));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Simple Option<Int> can be converted from Json", body$$94);
})(), (() => {
  const body$$95 = function body$$95() {
    test$$$areEqual((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2), null]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _List.ofArray)([(0, _BigInt.fromInt32)(5), (0, _BigInt.fromInt32)(2), null])), {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.option)((0, _Reflection.type)("System.Numerics.BigInteger")));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Simple Option<BigInt> can be converted", body$$95);
})(), (() => {
  const body$$96 = function body$$96() {
    test$$$areEqual(new _Types2.RecordWithBigInt(new _Types2.Maybe$00601(0, "Just", (0, _BigInt.fromInt32)(5))), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.RecordWithBigInt(new _Types2.Maybe$00601(0, "Just", (0, _BigInt.fromInt32)(5)))), {
      ResolveType() {
        return (0, _Types2.RecordWithBigInt$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: BigInt can be converted", body$$96);
})(), (() => {
  const body$$97 = function body$$97() {
    test$$$areEqual(new _Types2.DummyList(0, "DummyList", new _Types.List(new _Types2.Dummy(10), new _Types.List())), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.DummyList(0, "DummyList", new _Types.List(new _Types2.Dummy(10), new _Types.List()))), {
      ResolveType() {
        return (0, _Types2.DummyList$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("List<'t> can be deserialized", body$$97);
})(), (() => {
  const body$$98 = function body$$98() {
    const elems = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[\"DummySeq\", [{ \"first\": 10 }]]", {
      ResolveType() {
        return (0, _Types2.DummySeq$reflection)();
      }

    }).fields[0];
    const matchValue$$19 = (0, _List.ofSeq)(elems);
    var $target$$116;

    if (matchValue$$19.tail != null) {
      if (matchValue$$19.head.first === 10) {
        if (matchValue$$19.tail.tail == null) {
          $target$$116 = 0;
        } else {
          $target$$116 = 1;
        }
      } else {
        $target$$116 = 1;
      }
    } else {
      $target$$116 = 1;
    }

    switch ($target$$116) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$fail();
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Seq<'t> can be deserialized", body$$98);
})(), (() => {
  const body$$99 = function body$$99() {
    test$$$areEqual("[\"DummySeq\",[{\"first\":10}]]", (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.DummySeq(0, "DummySeq", (0, _Seq.delay)(function () {
      return (0, _Seq.singleton)(new _Types2.Dummy(10));
    }))));
  };

  return (0, _Mocha.Test$$$testCase)("Seq<'t> can be serialized correctly", body$$99);
})(), (() => {
  const body$$100 = function body$$100() {
    test$$$areEqual(new _Types2.Optional(5, null, null), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("{ \"key\": 5 }", {
      ResolveType() {
        return (0, _Types2.Optional$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Multiple optional fields can be omitted from the JSON", body$$100);
})(), (() => {
  const body$$101 = function body$$101() {
    test$$$areEqual(new _Types2.Optional(5, null, null), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("{ \"key\": 5 }", {
      ResolveType() {
        return (0, _Types2.Optional$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Native: Multiple optional fields can be omitted from the JSON", body$$101);
})(), (() => {
  const body$$102 = function body$$102() {
    test$$$areEqual(new _Types2.Maybe$00601(0, "Just", (0, _List.ofArray)([1, 2, 3, 4, 5])), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Types2.Maybe$00601(0, "Just", (0, _List.ofSeq)((0, _Seq.rangeNumber)(1, 1, 5)))), {
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Reflection.list)(_Reflection.int32));
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Generic union types with list-like type arguments work", body$$102);
})(), (() => {
  const body$$103 = function body$$103() {
    test$$$areEqual(new _Option.Result(0, "Ok", (0, _List.ofArray)([1, 2, 3])), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Option.Result(0, "Ok", (0, _List.ofArray)([1, 2, 3]))), {
      ResolveType() {
        return (0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [(0, _Reflection.list)(_Reflection.int32), _Reflection.string], _Option.Result, () => [["Ok", [(0, _Reflection.list)(_Reflection.int32)]], ["Error", [_Reflection.string]]]);
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Result<int list, string> conversion works", body$$103);
})(), (() => {
  const body$$104 = function body$$104() {
    const usersInput = [new _Types2.User("first", false, (0, _Date.now)()), new _Types2.User("second", true, (0, _Date.now)())];
    const serialized$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(usersInput);
    const matchValue$$20 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EtryParseNativeAs$002EStatic$$Z7D14C7A6)(serialized$$1, {
      ResolveType() {
        return (0, _Reflection.array)((0, _Types2.User$reflection)());
      }

    });

    if (matchValue$$20.tag === 1) {
      const msg = matchValue$$20.fields[0];
      test$$$failwith$$Z721C83C5(msg);
    } else {
      const users = matchValue$$20.fields[0];
      test$$$areEqual(2, users.length);
      test$$$areEqual("first", users[0].Login);
      test$$$areEqual(false, users[0].IsAdmin);
      test$$$areEqual("second", users[1].Login);
      test$$$areEqual(true, users[1].IsAdmin);
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing User array works", body$$104);
})(), (0, _Mocha.Test$$$testCaseAsync)("Async.bind runs after parsing arrays of users", _AsyncBuilder.singleton.Delay(function () {
  const usersInput$$1 = [new _Types2.User("first", false, (0, _Date.now)()), new _Types2.User("second", true, (0, _Date.now)())];

  const pgetUsers = function pgetUsers() {
    return new Promise(function (res, rej) {
      res((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(usersInput$$1), {
        ResolveType() {
          return (0, _Reflection.array)((0, _Types2.User$reflection)());
        }

      }));
    });
  };

  const getUsers = function getUsers() {
    return (0, _Async.awaitPromise)(pgetUsers());
  };

  return _AsyncBuilder.singleton.Bind(getUsers(), function (_arg13$$1) {
    const users$$1 = _arg13$$1;
    test$$$areEqual(2, users$$1.length);
    return _AsyncBuilder.singleton.Zero();
  });
})), (0, _Mocha.Test$$$testCaseAsync)("Async.bind runs after parsing arrays of users", _AsyncBuilder.singleton.Delay(function () {
  const input$$30 = (0, _Array.ofSeq)((0, _Seq.rangeNumber)(1, 1, 5), Int32Array);

  const pgetNumbers = function pgetNumbers() {
    return new Promise(function (res$$1, rej$$1) {
      res$$1((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(input$$30), {
        ResolveType() {
          return (0, _Reflection.array)(_Reflection.int32);
        }

      }));
    });
  };

  const getNumbers = function getNumbers() {
    return (0, _Async.awaitPromise)(pgetNumbers());
  };

  return _AsyncBuilder.singleton.Bind(getNumbers(), function (_arg14$$1) {
    const users$$2 = _arg14$$1;
    test$$$areEqual(5, users$$2.length);
    return _AsyncBuilder.singleton.Zero();
  });
})), (0, _Mocha.Test$$$testCaseAsync)("Async.bind runs after parsing arrays of HighScore", _AsyncBuilder.singleton.Delay(function () {
  const input$$31 = [new _Types2.HighScore("first", 1), new _Types2.HighScore("second", 2), new _Types2.HighScore("third", 3)];

  const pgetScores = function pgetScores() {
    return new Promise(function (res$$2, rej$$2) {
      res$$2((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(input$$31), {
        ResolveType() {
          return (0, _Reflection.array)((0, _Types2.HighScore$reflection)());
        }

      }));
    });
  };

  const getScores = function getScores() {
    return (0, _Async.awaitPromise)(pgetScores());
  };

  return _AsyncBuilder.singleton.Bind(getScores(), function (_arg15$$1) {
    const users$$3 = _arg15$$1;
    test$$$areEqual(3, users$$3.length);
    return _AsyncBuilder.singleton.Zero();
  });
})), (() => {
  const body$$108 = function body$$108() {
    const inputs = "\r\n            {\r\n                \"Ok\": [\r\n                    {\r\n                        \"Login\": \"foo\",\r\n                        \"IsAdmin\": false,\r\n                        \"LastActivity\": \"2018-08-15T15:12:50.0379614Z\"\r\n                    },\r\n                    {\r\n                        \"Login\": \"bar\",\r\n                        \"IsAdmin\": false,\r\n                        \"LastActivity\": \"2018-08-09T18:48:07.0638391Z\"\r\n                    }\r\n                ]\r\n            }\r\n        ";

    const _arg16$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(inputs, {
      ResolveType() {
        return (0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [(0, _Reflection.list)((0, _Types2.User$reflection)()), _Reflection.string], _Option.Result, () => [["Ok", [(0, _Reflection.list)((0, _Types2.User$reflection)())]], ["Error", [_Reflection.string]]]);
      }

    });

    var $target$$117;

    if (_arg16$$1.tag === 0) {
      if (_arg16$$1.fields[0].tail != null) {
        if (_arg16$$1.fields[0].head.Login === "foo") {
          if (_arg16$$1.fields[0].head.IsAdmin) {
            $target$$117 = 1;
          } else if (_arg16$$1.fields[0].tail.tail != null) {
            if (_arg16$$1.fields[0].tail.head.Login === "bar") {
              if (_arg16$$1.fields[0].tail.head.IsAdmin) {
                $target$$117 = 1;
              } else if (_arg16$$1.fields[0].tail.tail.tail == null) {
                $target$$117 = 0;
              } else {
                $target$$117 = 1;
              }
            } else {
              $target$$117 = 1;
            }
          } else {
            $target$$117 = 1;
          }
        } else {
          $target$$117 = 1;
        }
      } else {
        $target$$117 = 1;
      }
    } else {
      $target$$117 = 1;
    }

    switch ($target$$117) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$fail();
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing SecureRequest<User list> works", body$$108);
})(), (() => {
  const body$$109 = function body$$109() {
    test$$$areEqual(new _Option.Result(0, "Ok", null), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(new _Option.Result(0, "Ok", null)), {
      ResolveType() {
        return (0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [_Reflection.unit, _Reflection.string], _Option.Result, () => [["Ok", [_Reflection.unit]], ["Error", [_Reflection.string]]]);
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Result of unit can be converted", body$$109);
})(), (() => {
  const body$$110 = function body$$110() {
    const inputs$$1 = "\r\n            [ \"Ok\",\r\n                [{\r\n                    \"Login\": \"foo\",\r\n                    \"IsAdmin\": false,\r\n                    \"LastActivity\": \"2018-08-15T15:12:50.0379614Z\"\r\n                },\r\n                {\r\n                    \"Login\": \"bar\",\r\n                    \"IsAdmin\": false,\r\n                    \"LastActivity\": \"2018-08-09T18:48:07.0638391Z\"\r\n                }]\r\n            ]\r\n        ";

    const _arg17$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(inputs$$1, {
      ResolveType() {
        return (0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [(0, _Reflection.list)((0, _Types2.User$reflection)()), _Reflection.string], _Option.Result, () => [["Ok", [(0, _Reflection.list)((0, _Types2.User$reflection)())]], ["Error", [_Reflection.string]]]);
      }

    });

    var $target$$118;

    if (_arg17$$1.tag === 0) {
      if (_arg17$$1.fields[0].tail != null) {
        if (_arg17$$1.fields[0].head.Login === "foo") {
          if (_arg17$$1.fields[0].head.IsAdmin) {
            $target$$118 = 1;
          } else if (_arg17$$1.fields[0].tail.tail != null) {
            if (_arg17$$1.fields[0].tail.head.Login === "bar") {
              if (_arg17$$1.fields[0].tail.head.IsAdmin) {
                $target$$118 = 1;
              } else if (_arg17$$1.fields[0].tail.tail.tail == null) {
                $target$$118 = 0;
              } else {
                $target$$118 = 1;
              }
            } else {
              $target$$118 = 1;
            }
          } else {
            $target$$118 = 1;
          }
        } else {
          $target$$118 = 1;
        }
      } else {
        $target$$118 = 1;
      }
    } else {
      $target$$118 = 1;
    }

    switch ($target$$118) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$fail();
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing SecureRequest<User list> works from Fable 2 representation", body$$110);
})(), (() => {
  const body$$111 = function body$$111() {
    const _arg18$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EtryParseAs$002EStatic$$Z7D14C7A6)("{ \"answer\": 42 }", {
      ResolveType() {
        return (0, _Types2.Rec$reflection)();
      }

    });

    if (_arg18$$1.tag === 1) {
      const errorMsg = _arg18$$1.fields[0];
      test$$$passWith$$Z721C83C5(errorMsg);
    } else {
      test$$$fail();
    }
  };

  return (0, _Mocha.Test$$$testCase)("Nice error messages are created for missing JSON keys", body$$111);
})(), (() => {
  const body$$112 = function body$$112() {
    const input$$32 = new _Types2.Recursive("root", (0, _List.ofArray)([new _Types2.Recursive("Child 1", new _Types.List(new _Types2.Recursive("Grandchild 1", new _Types.List()), new _Types.List())), new _Types2.Recursive("Child 2", new _Types.List(new _Types2.Recursive("Grandchild 2", new _Types.List()), new _Types.List())), new _Types2.Recursive("Child 2", new _Types.List())]));
    test$$$areEqual(input$$32, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(input$$32), {
      ResolveType() {
        return (0, _Types2.Recursive$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Recursive records can be converted", body$$112);
})(), (() => {
  const body$$113 = function body$$113() {
    const input$$33 = new _Types2.Tree(1, "Branch", new _Types2.Tree(1, "Branch", new _Types2.Tree(0, "Leaf", 10), new _Types2.Tree(0, "Leaf", 5)), new _Types2.Tree(0, "Leaf", 5));
    test$$$areEqual(input$$33, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(input$$33), {
      ResolveType() {
        return (0, _Types2.Tree$reflection)();
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Recursive unions can be converted", body$$113);
})(), (() => {
  const body$$114 = function body$$114() {
    test$$$areEqual((0, _List.ofArray)([new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigKey(2, "Collection")]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[\"Technique\", \"Theme\", \"Collection\"]", {
      ResolveType() {
        return (0, _Reflection.list)((0, _Types2.ConfigKey$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing simple DU works", body$$114);
})(), (() => {
  const body$$115 = function body$$115() {
    test$$$areEqual((0, _List.ofArray)([new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigKey(2, "Collection")]), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[\"\\\"Technique\\\"\", \"\\\"Theme\\\"\", \"\\\"Collection\\\"\"]", {
      ResolveType() {
        return (0, _Reflection.list)((0, _Types2.ConfigKey$reflection)());
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing simple quoted DU works", body$$115);
})(), (() => {
  const body$$116 = function body$$116() {
    const input$$34 = "{\"Technique\":{\"name\":\"Техника\",\"id\":null}}";
    const expected$$5 = (0, _Map.ofList)(new _Types.List([new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], new _Types.List()), {
      Compare($x$$38, $y$$39) {
        return $x$$38.CompareTo($y$$39);
      }

    });
    test$$$areEqual(expected$$5, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$34, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.ConfigValue$reflection)()]);
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Simple maps with unqouted DU keys can be deserialized", body$$116);
})(), (() => {
  const body$$117 = function body$$117() {
    const input$$35 = "\r\n            {\r\n                \"Technique\": { \"name\": \"Zaid\", \"age\": 22 },\r\n                \"Collection\": { \"name\": \"John\", \"age\": 10 }\r\n            }\r\n        ";
    const result$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$35, {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.Dictionary`2", [_Reflection.string, (0, _Types2.DictValue$reflection)()]);
      }

    });
    test$$$isTrue$$Z1FBCCD16(result$$1.has("Technique"));
    test$$$isTrue$$Z1FBCCD16(result$$1.has("Collection"));
    test$$$areEqual("Zaid", (0, _Util.getItemFromDict)(result$$1, "Technique").name);
    test$$$areEqual("John", (0, _Util.getItemFromDict)(result$$1, "Collection").name);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing Dictionary<string, Record> works from object", body$$117);
})(), (() => {
  const body$$118 = function body$$118() {
    const input$$36 = "\r\n            {\r\n                \"Technique\": { \"name\": \"Zaid\", \"age\": 22 },\r\n                \"Collection\": { \"name\": \"John\", \"age\": 10 }\r\n            }\r\n        ";
    const result$$2 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$36, {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.Dictionary`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.DictValue$reflection)()]);
      }

    });
    test$$$isTrue$$Z1FBCCD16(result$$2.has(new _Types2.ConfigKey(0, "Technique")));
    test$$$isTrue$$Z1FBCCD16(result$$2.has(new _Types2.ConfigKey(2, "Collection")));
    test$$$areEqual("Zaid", (0, _Util.getItemFromDict)(result$$2, new _Types2.ConfigKey(0, "Technique")).name);
    test$$$areEqual("John", (0, _Util.getItemFromDict)(result$$2, new _Types2.ConfigKey(2, "Collection")).name);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing Dictionary<ConfigKey, Record> works from object", body$$118);
})(), (() => {
  const body$$119 = function body$$119() {
    const result$$3 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[\"One\", \"Two\"]", {
      ResolveType() {
        return (0, _Reflection.array)(_Reflection.string);
      }

    });
    test$$$areEqual("One", result$$3[0]);
    test$$$areEqual("Two", result$$3[1]);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing ResizeArray<string> works", body$$119);
})(), (() => {
  const body$$120 = function body$$120() {
    const result$$4 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[1, 2]", {
      ResolveType() {
        return (0, _Reflection.array)(_Reflection.int32);
      }

    });
    test$$$areEqual(1, result$$4[0]);
    test$$$areEqual(2, result$$4[1]);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing ResizeArray<int> works", body$$120);
})(), (() => {
  const body$$121 = function body$$121() {
    const result$$5 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[{ \"name\": \"zaid\", \"age\":22 }]", {
      ResolveType() {
        return (0, _Reflection.array)((0, _Types2.DictValue$reflection)());
      }

    });
    test$$$areEqual("zaid", result$$5[0].name);
    test$$$areEqual(22, result$$5[0].age);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing ResizeArray<Record> works", body$$121);
})(), (() => {
  const body$$122 = function body$$122() {
    const result$$6 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[1,2,3,4,5]", {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.HashSet`1", [_Reflection.int32]);
      }

    });
    (0, _Seq.iterate)(function (n$$2) {
      test$$$isTrue$$Z1FBCCD16(result$$6.has(n$$2));
    }, (0, _List.ofSeq)((0, _Seq.rangeNumber)(1, 1, 5)));
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing HashSet<int> works", body$$122);
})(), (() => {
  const body$$123 = function body$$123() {
    const input$$37 = new Set([]);
    (0, _Seq.iterate)(function (n$$3) {
      (0, _Util.addToSet)(n$$3, input$$37), null;
    }, (0, _List.ofSeq)((0, _Seq.rangeNumber)(1, 1, 5)));
    const result$$7 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(input$$37), {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.HashSet`1", [_Reflection.int32]);
      }

    });
    (0, _Seq.iterate)(function (n$$4) {
      test$$$isTrue$$Z1FBCCD16(result$$7.has(n$$4));
    }, (0, _List.ofSeq)((0, _Seq.rangeNumber)(1, 1, 5)));
  };

  return (0, _Mocha.Test$$$testCase)("HashSet<int> roundtrip", body$$123);
})(), (() => {
  const body$$124 = function body$$124() {
    const result$$8 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("[{ \"name\": \"zaid\", \"age\":22 }, { \"name\": \"john\", \"age\":10 }]", {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.HashSet`1", [(0, _Types2.DictValue$reflection)()]);
      }

    });
    test$$$isTrue$$Z1FBCCD16(result$$8.has(new _Types2.DictValue("zaid", 22)));
    test$$$isTrue$$Z1FBCCD16(result$$8.has(new _Types2.DictValue("john", 10)));
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing HashSet<DictValue> works", body$$124);
})(), (() => {
  const body$$125 = function body$$125() {
    const input$$38 = "\r\n            {\r\n                \"1\": { \"name\": \"Zaid\", \"age\": 22 },\r\n                \"2\": { \"name\": \"John\", \"age\": 10 }\r\n            }\r\n        ";
    const result$$9 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$38, {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.Dictionary`2", [_Reflection.int32, (0, _Types2.DictValue$reflection)()]);
      }

    });
    test$$$isTrue$$Z1FBCCD16(result$$9.has(1));
    test$$$isTrue$$Z1FBCCD16(result$$9.has(2));
    test$$$areEqual("Zaid", (0, _Util.getItemFromDict)(result$$9, 1).name);
    test$$$areEqual("John", (0, _Util.getItemFromDict)(result$$9, 2).name);
    test$$$areEqual(22, (0, _Util.getItemFromDict)(result$$9, 1).age);
    test$$$areEqual(10, (0, _Util.getItemFromDict)(result$$9, 2).age);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing Dictionary<int, Record> works from object", body$$125);
})(), (() => {
  const body$$126 = function body$$126() {
    const input$$39 = "\r\n            {\r\n                \"1\": { \"name\": \"Zaid\", \"age\": 22 },\r\n                \"2\": { \"name\": \"John\", \"age\": 10 }\r\n            }\r\n        ";
    const result$$10 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$39, {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.Dictionary`2", [_Reflection.string, (0, _Types2.DictValue$reflection)()]);
      }

    });
    test$$$isTrue$$Z1FBCCD16(result$$10.has("1"));
    test$$$isTrue$$Z1FBCCD16(result$$10.has("2"));
    test$$$areEqual("Zaid", (0, _Util.getItemFromDict)(result$$10, "1").name);
    test$$$areEqual("John", (0, _Util.getItemFromDict)(result$$10, "2").name);
    test$$$areEqual(22, (0, _Util.getItemFromDict)(result$$10, "1").age);
    test$$$areEqual(10, (0, _Util.getItemFromDict)(result$$10, "2").age);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing Dictionary<string, Record> works from object ", body$$126);
})(), (() => {
  const body$$127 = function body$$127() {
    const input$$40 = "\r\n            {\r\n                \"1\": { \"name\": \"Zaid\", \"age\": 22 },\r\n                \"2\": { \"name\": \"John\", \"age\": 10 }\r\n            }\r\n        ";
    const result$$11 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$40, {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.Dictionary`2", [(0, _Reflection.type)("System.Int64"), (0, _Types2.DictValue$reflection)()]);
      }

    });
    test$$$isTrue$$Z1FBCCD16(result$$11.has((0, _Long.fromBits)(1, 0, false)));
    test$$$isTrue$$Z1FBCCD16(result$$11.has((0, _Long.fromBits)(2, 0, false)));
    test$$$areEqual("Zaid", (0, _Util.getItemFromDict)(result$$11, (0, _Long.fromBits)(1, 0, false)).name);
    test$$$areEqual("John", (0, _Util.getItemFromDict)(result$$11, (0, _Long.fromBits)(2, 0, false)).name);
    test$$$areEqual(22, (0, _Util.getItemFromDict)(result$$11, (0, _Long.fromBits)(1, 0, false)).age);
    test$$$areEqual(10, (0, _Util.getItemFromDict)(result$$11, (0, _Long.fromBits)(2, 0, false)).age);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing Dictionary<int64, Record> works from object", body$$127);
})(), (() => {
  const body$$128 = function body$$128() {
    const input$$41 = "\r\n            [\r\n                [\"1\", { \"name\": \"Zaid\", \"age\": 22 }],\r\n                [\"2\", { \"name\": \"John\", \"age\": 10 }]\r\n            ]\r\n        ";
    const result$$12 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$41, {
      ResolveType() {
        return (0, _Reflection.type)("System.Collections.Generic.Dictionary`2", [_Reflection.int32, (0, _Types2.DictValue$reflection)()]);
      }

    });
    test$$$isTrue$$Z1FBCCD16(result$$12.has(1));
    test$$$isTrue$$Z1FBCCD16(result$$12.has(2));
    test$$$areEqual("Zaid", (0, _Util.getItemFromDict)(result$$12, 1).name);
    test$$$areEqual("John", (0, _Util.getItemFromDict)(result$$12, 2).name);
    test$$$areEqual(22, (0, _Util.getItemFromDict)(result$$12, 1).age);
    test$$$areEqual(10, (0, _Util.getItemFromDict)(result$$12, 2).age);
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing Dictionary<int, Record> works from array", body$$128);
})(), (() => {
  const body$$129 = function body$$129() {
    const input$$42 = "\r\n            {\r\n                \"Technique\": {\r\n                    \"name\": \"Техника\",\r\n                    \"id\": null\r\n                },\r\n                \"Theme\": {\r\n                    \"name\": \"Тема\",\r\n                    \"id\": null\r\n                }\r\n            }\r\n        ";
    const expected$$6 = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], [new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")]]), {
      Compare($x$$40, $y$$41) {
        return $x$$40.CompareTo($y$$41);
      }

    });
    test$$$areEqual(expected$$6, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$42, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.ConfigValue$reflection)()]);
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Simple maps with unqouted DU keys can be deserialized part 2", body$$129);
})(), (() => {
  const body$$130 = function body$$130() {
    const input$$43 = "\r\n            {\r\n                \"Technique\": {\r\n                    \"name\": \"Техника\",\r\n                    \"id\": null\r\n                },\r\n                \"Theme\": {\r\n                    \"name\": \"Тема\",\r\n                    \"id\": null\r\n                }\r\n            }\r\n        ";
    const expected$$7 = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")], [new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")]]), {
      Compare($x$$42, $y$$43) {
        return $x$$42.CompareTo($y$$43);
      }

    });
    const deserialized$$5 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$43, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.ConfigValue$reflection)()]);
      }

    });
    test$$$areEqual(true, (0, _Map.containsKey)(new _Types2.ConfigKey(0, "Technique"), deserialized$$5));
    test$$$areEqual(true, (0, _Map.containsKey)(new _Types2.ConfigKey(1, "Theme"), deserialized$$5));
  };

  return (0, _Mocha.Test$$$testCase)("Simple maps with unqouted DU keys can be deserialized interchanged", body$$130);
})(), (() => {
  const body$$131 = function body$$131() {
    const input$$44 = "\r\n            {\r\n                \"Technique\": {\r\n                    \"name\": \"Техника\",\r\n                    \"id\": null\r\n                },\r\n                \"Theme\": {\r\n                    \"name\": \"Тема\",\r\n                    \"id\": null\r\n                },\r\n                \"Collection\": {\r\n                    \"name\": \"Коллекция\",\r\n                    \"id\": null\r\n                }\r\n            }\r\n        ";
    const expected$$8 = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")], [new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], [new _Types2.ConfigKey(2, "Collection"), new _Types2.ConfigValue(null, "Коллекция")]]), {
      Compare($x$$44, $y$$45) {
        return $x$$44.CompareTo($y$$45);
      }

    });
    const deserialized$$6 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$44, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.ConfigValue$reflection)()]);
      }

    });
    test$$$areEqual(true, (0, _Map.containsKey)(new _Types2.ConfigKey(1, "Theme"), deserialized$$6));
    test$$$areEqual(true, (0, _Map.containsKey)(new _Types2.ConfigKey(0, "Technique"), deserialized$$6));
    test$$$areEqual(true, (0, _Map.containsKey)(new _Types2.ConfigKey(2, "Collection"), deserialized$$6));
    test$$$areEqual(expected$$8, deserialized$$6);
  };

  return (0, _Mocha.Test$$$testCase)("Simple maps with unqouted DU keys can be deserialized interchanged: part 2", body$$131);
})(), (() => {
  const body$$132 = function body$$132() {
    const input$$45 = "{\"Technique\":{\"name\":\"Техника\",\"id\":null},\"Theme\":{\"name\":\"Тема\",\"id\":null},\"Collection\":{\"name\":\"Коллекция\",\"id\":null}}";
    const expected$$9 = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(2, "Collection"), new _Types2.ConfigValue(null, "Коллекция")], [new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], [new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")]]), {
      Compare($x$$46, $y$$47) {
        return $x$$46.CompareTo($y$$47);
      }

    });
    test$$$areEqual(expected$$9, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$45, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.ConfigValue$reflection)()]);
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Maps with unqouted DU keys can be deserialized", body$$132);
})(), (() => {
  const body$$133 = function body$$133() {
    const input$$46 = "{\"\\\"Technique\\\"\":{\"name\":\"Техника\",\"id\":null},\"\\\"Theme\\\"\":{\"name\":\"Тема\",\"id\":null},\"\\\"Collection\\\"\":{\"name\":\"Коллекция\",\"id\":null}}";
    const expected$$10 = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(2, "Collection"), new _Types2.ConfigValue(null, "Коллекция")], [new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], [new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")]]), {
      Compare($x$$48, $y$$49) {
        return $x$$48.CompareTo($y$$49);
      }

    });
    test$$$areEqual(expected$$10, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$46, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.ConfigValue$reflection)()]);
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Maps with quoted DU keys can be deserialized", body$$133);
})(), (() => {
  const body$$134 = function body$$134() {
    test$$$areEqual(true, (0, _Json.Convert$$$isQuoted)("\"text\""));
  };

  return (0, _Mocha.Test$$$testCase)("isQuoted works", body$$134);
})(), (() => {
  const body$$135 = function body$$135() {
    test$$$areEqual("text", (0, _Json.Convert$$$removeQuotes)("\"text\""));
  };

  return (0, _Mocha.Test$$$testCase)("removeQuotes works", body$$135);
})(), (() => {
  const body$$136 = function body$$136() {
    const firstInput = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(2, "Collection"), new _Types2.ConfigValue(null, "Коллекция")], [new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], [new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")]]), {
      Compare($x$$50, $y$$51) {
        return $x$$50.CompareTo($y$$51);
      }

    });
    const secondInput = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")], [new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], [new _Types2.ConfigKey(2, "Collection"), new _Types2.ConfigValue(null, "Коллекция")]]), {
      Compare($x$$52, $y$$53) {
        return $x$$52.CompareTo($y$$53);
      }

    });
    test$$$areEqual(firstInput, secondInput);
  };

  return (0, _Mocha.Test$$$testCase)("Maps can use structural equality", body$$136);
})(), (() => {
  const body$$137 = function body$$137() {
    const input$$49 = (0, _Map.ofList)((0, _List.ofArray)([[new _Types2.ConfigKey(2, "Collection"), new _Types2.ConfigValue(null, "Коллекция")], [new _Types2.ConfigKey(0, "Technique"), new _Types2.ConfigValue(null, "Техника")], [new _Types2.ConfigKey(1, "Theme"), new _Types2.ConfigValue(null, "Тема")]]), {
      Compare($x$$54, $y$$55) {
        return $x$$54.CompareTo($y$$55);
      }

    });
    test$$$areEqual(input$$49, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(input$$49), {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ConfigKey$reflection)(), (0, _Types2.ConfigValue$reflection)()]);
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Maps with DU keys can be converted", body$$137);
})(), (() => {
  const body$$138 = function body$$138() {
    const inputJson$$2 = "\r\n            {\r\n                \"keys\": {\r\n                    \"first\": \"first value\",\r\n                    \"second\": \"second value\"\r\n                }\r\n            }\r\n            ";
    const input$$50 = (0, _SimpleJson.SimpleJson$$$parse)(inputJson$$2);

    const read = function read(keys) {
      return (0, _SimpleJson.SimpleJson$$$readPath)(keys, input$$50);
    };

    const matchValue$$21 = [read((0, _List.ofArray)(["keys", "first"])), read((0, _List.ofArray)(["keys", "second"]))];
    var $target$$119, first, second, result$$13;

    if (matchValue$$21[0] != null) {
      if (matchValue$$21[0].tag === 1) {
        if (matchValue$$21[1] != null) {
          if (matchValue$$21[1].tag === 1) {
            $target$$119 = 0;
            first = matchValue$$21[0].fields[0];
            second = matchValue$$21[1].fields[0];
          } else {
            $target$$119 = 1;
            result$$13 = matchValue$$21;
          }
        } else {
          $target$$119 = 1;
          result$$13 = matchValue$$21;
        }
      } else {
        $target$$119 = 1;
        result$$13 = matchValue$$21;
      }
    } else {
      $target$$119 = 1;
      result$$13 = matchValue$$21;
    }

    switch ($target$$119) {
      case 0:
        {
          test$$$areEqual(first, "first value");
          test$$$areEqual(second, "second value");
          break;
        }

      case 1:
        {
          test$$$failwith$$Z721C83C5((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(result$$13));
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("SimpleJson.readPath works", body$$138);
})(), (() => {
  const body$$139 = function body$$139() {
    const subscription = {
      keys: {
        first: "first value",
        second: "second value"
      }
    };
    test$$$areEqual(["first value", "second value"], (0, _Option.defaultArg)((0, _SimpleJson.SimpleJson$$$fromObjectLiteral)(subscription), null, function mapping$$2(subscription$$1) {
      const read$$1 = function read$$1(keys$$1) {
        return (0, _SimpleJson.SimpleJson$$$readPath)(keys$$1, subscription$$1);
      };

      const matchValue$$22 = [read$$1((0, _List.ofArray)(["keys", "first"])), read$$1((0, _List.ofArray)(["keys", "second"]))];
      var $target$$120, first$$1, second$$1;

      if (matchValue$$22[0] != null) {
        if (matchValue$$22[0].tag === 1) {
          if (matchValue$$22[1] != null) {
            if (matchValue$$22[1].tag === 1) {
              $target$$120 = 0;
              first$$1 = matchValue$$22[0].fields[0];
              second$$1 = matchValue$$22[1].fields[0];
            } else {
              $target$$120 = 1;
            }
          } else {
            $target$$120 = 1;
          }
        } else {
          $target$$120 = 1;
        }
      } else {
        $target$$120 = 1;
      }

      switch ($target$$120) {
        case 0:
          {
            return [first$$1, second$$1];
          }

        case 1:
          {
            return ["", ""];
          }
      }
    }));
  };

  return (0, _Mocha.Test$$$testCase)("SimpleJson.readPath works with fromObjectLiteral", body$$139);
})(), (() => {
  const body$$140 = function body$$140() {
    test$$$equal(true, (0, _List.forAll)(function predicate(_arg19$$1) {
      var $target$$121;

      if (_arg19$$1.tag === 0) {
        if (_arg19$$1.fields[0][0].fields[0] === 5) {
          if (_arg19$$1.fields[0][1].fields[0] === "author") {
            $target$$121 = 0;
          } else {
            $target$$121 = 1;
          }
        } else {
          $target$$121 = 1;
        }
      } else {
        $target$$121 = 1;
      }

      switch ($target$$121) {
        case 0:
          {
            return true;
          }

        case 1:
          {
            return false;
          }
      }
    }, (0, _List.map)(function mapping$$3(arg00$$279) {
      return (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(arg00$$279, {
        ResolveType() {
          return (0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [(0, _Reflection.tuple)((0, _Types2.AlbumId$reflection)(), (0, _Types2.AlbumAuthor$reflection)()), _Reflection.string], _Option.Result, () => [["Ok", [(0, _Reflection.tuple)((0, _Types2.AlbumId$reflection)(), (0, _Types2.AlbumAuthor$reflection)())]], ["Error", [_Reflection.string]]]);
        }

      });
    }, (0, _List.ofArray)(["\r\n            {\r\n                \"Ok\": [\r\n                    { \"AlbumId\": 5 },\r\n                    { \"AlbumAuthor\": \"author\" }\r\n                ]\r\n            }\r\n            ", "\r\n            [ \"Ok\", [{ \"AlbumId\": 5 }, { \"AlbumAuthor\": \"author\" }]]\r\n            ", "\r\n            { \"Ok\": [[\"AlbumId\", 5], [\"AlbumAuthor\", \"author\"]] }\r\n            ", "\r\n            [ \"Ok\", [[\"AlbumId\", 5], [\"AlbumAuthor\", \"author\"]]]\r\n            "]))));
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing tuple of single case unions works in Fable 1 representation", body$$140);
})(), (() => {
  const body$$141 = function body$$141() {
    const inputJson$$3 = "[\"first\", [\"1\"]]";
    const deserialized$$7 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(inputJson$$3, {
      ResolveType() {
        return (0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.array)(_Reflection.string));
      }

    });
    var $target$$122, otherwise$$3;

    if (deserialized$$7[0] === "first") {
      if (!(0, _Array.equalsWith)(_Util.comparePrimitives, deserialized$$7[1], null) ? deserialized$$7[1].length === 1 : false) {
        if (deserialized$$7[1][0] === "1") {
          $target$$122 = 0;
        } else {
          $target$$122 = 1;
          otherwise$$3 = deserialized$$7;
        }
      } else {
        $target$$122 = 1;
        otherwise$$3 = deserialized$$7;
      }
    } else {
      $target$$122 = 1;
      otherwise$$3 = deserialized$$7;
    }

    switch ($target$$122) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$3);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("string * string []", body$$141);
})(), (() => {
  const body$$142 = function body$$142() {
    const inputJson$$4 = "[\"first\", [\"1\", \"2\"]]";
    const deserialized$$8 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(inputJson$$4, {
      ResolveType() {
        return (0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.array)(_Reflection.string));
      }

    });
    var $target$$123, otherwise$$4;

    if (deserialized$$8[0] === "first") {
      if (!(0, _Array.equalsWith)(_Util.comparePrimitives, deserialized$$8[1], null) ? deserialized$$8[1].length === 2 : false) {
        if (deserialized$$8[1][0] === "1") {
          if (deserialized$$8[1][1] === "2") {
            $target$$123 = 0;
          } else {
            $target$$123 = 1;
            otherwise$$4 = deserialized$$8;
          }
        } else {
          $target$$123 = 1;
          otherwise$$4 = deserialized$$8;
        }
      } else {
        $target$$123 = 1;
        otherwise$$4 = deserialized$$8;
      }
    } else {
      $target$$123 = 1;
      otherwise$$4 = deserialized$$8;
    }

    switch ($target$$123) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$4);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("string * string [] - multi elements", body$$142);
})(), (() => {
  const body$$143 = function body$$143() {
    var testExpr$$2;
    const inputJson$$5 = "[ [\"first\", [\"1\"]] ]";
    const deserialized$$9 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(inputJson$$5, {
      ResolveType() {
        return (0, _Reflection.array)((0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.array)(_Reflection.string)));
      }

    });
    var $target$$124, otherwise$$5;

    if (!(0, _Array.equalsWith)(_Util.compareArrays, deserialized$$9, null) ? deserialized$$9.length === 1 : false) {
      if (deserialized$$9[0][0] === "first") {
        if (testExpr$$2 = deserialized$$9[0][1], !(0, _Array.equalsWith)(_Util.comparePrimitives, testExpr$$2, null) ? testExpr$$2.length === 1 : false) {
          if (deserialized$$9[0][1][0] === "1") {
            $target$$124 = 0;
          } else {
            $target$$124 = 1;
            otherwise$$5 = deserialized$$9;
          }
        } else {
          $target$$124 = 1;
          otherwise$$5 = deserialized$$9;
        }
      } else {
        $target$$124 = 1;
        otherwise$$5 = deserialized$$9;
      }
    } else {
      $target$$124 = 1;
      otherwise$$5 = deserialized$$9;
    }

    switch ($target$$124) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$5);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("(string * string []) [] - part 1", body$$143);
})(), (() => {
  const body$$144 = function body$$144() {
    const matchValue$$23 = (0, _SimpleJson.SimpleJson$$$parseNative)("[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]");
    var $target$$125;

    if (matchValue$$23.tag === 4) {
      if (matchValue$$23.fields[0].tail != null) {
        if (matchValue$$23.fields[0].head.tag === 4) {
          if (matchValue$$23.fields[0].head.fields[0].tail != null) {
            if (matchValue$$23.fields[0].head.fields[0].head.tag === 1) {
              if (matchValue$$23.fields[0].head.fields[0].head.fields[0] === "first") {
                if (matchValue$$23.fields[0].head.fields[0].tail.tail != null) {
                  if (matchValue$$23.fields[0].head.fields[0].tail.head.tag === 4) {
                    if (matchValue$$23.fields[0].head.fields[0].tail.head.fields[0].tail != null) {
                      if (matchValue$$23.fields[0].head.fields[0].tail.head.fields[0].head.tag === 1) {
                        if (matchValue$$23.fields[0].head.fields[0].tail.head.fields[0].head.fields[0] === "1") {
                          if (matchValue$$23.fields[0].head.fields[0].tail.head.fields[0].tail.tail == null) {
                            if (matchValue$$23.fields[0].head.fields[0].tail.tail.tail == null) {
                              if (matchValue$$23.fields[0].tail.tail != null) {
                                if (matchValue$$23.fields[0].tail.head.tag === 4) {
                                  if (matchValue$$23.fields[0].tail.head.fields[0].tail != null) {
                                    if (matchValue$$23.fields[0].tail.head.fields[0].head.tag === 1) {
                                      if (matchValue$$23.fields[0].tail.head.fields[0].head.fields[0] === "second") {
                                        if (matchValue$$23.fields[0].tail.head.fields[0].tail.tail != null) {
                                          if (matchValue$$23.fields[0].tail.head.fields[0].tail.head.tag === 4) {
                                            if (matchValue$$23.fields[0].tail.head.fields[0].tail.head.fields[0].tail != null) {
                                              if (matchValue$$23.fields[0].tail.head.fields[0].tail.head.fields[0].head.tag === 1) {
                                                if (matchValue$$23.fields[0].tail.head.fields[0].tail.head.fields[0].head.fields[0] === "2") {
                                                  if (matchValue$$23.fields[0].tail.head.fields[0].tail.head.fields[0].tail.tail == null) {
                                                    if (matchValue$$23.fields[0].tail.head.fields[0].tail.tail.tail == null) {
                                                      if (matchValue$$23.fields[0].tail.tail.tail == null) {
                                                        $target$$125 = 0;
                                                      } else {
                                                        $target$$125 = 1;
                                                      }
                                                    } else {
                                                      $target$$125 = 1;
                                                    }
                                                  } else {
                                                    $target$$125 = 1;
                                                  }
                                                } else {
                                                  $target$$125 = 1;
                                                }
                                              } else {
                                                $target$$125 = 1;
                                              }
                                            } else {
                                              $target$$125 = 1;
                                            }
                                          } else {
                                            $target$$125 = 1;
                                          }
                                        } else {
                                          $target$$125 = 1;
                                        }
                                      } else {
                                        $target$$125 = 1;
                                      }
                                    } else {
                                      $target$$125 = 1;
                                    }
                                  } else {
                                    $target$$125 = 1;
                                  }
                                } else {
                                  $target$$125 = 1;
                                }
                              } else {
                                $target$$125 = 1;
                              }
                            } else {
                              $target$$125 = 1;
                            }
                          } else {
                            $target$$125 = 1;
                          }
                        } else {
                          $target$$125 = 1;
                        }
                      } else {
                        $target$$125 = 1;
                      }
                    } else {
                      $target$$125 = 1;
                    }
                  } else {
                    $target$$125 = 1;
                  }
                } else {
                  $target$$125 = 1;
                }
              } else {
                $target$$125 = 1;
              }
            } else {
              $target$$125 = 1;
            }
          } else {
            $target$$125 = 1;
          }
        } else {
          $target$$125 = 1;
        }
      } else {
        $target$$125 = 1;
      }
    } else {
      $target$$125 = 1;
    }

    switch ($target$$125) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$fail();
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("ParseNative works with outer arrays", body$$144);
})(), (() => {
  const body$$145 = function body$$145() {
    const inputJson$$6 = "[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]";
    const deserialized$$10 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(inputJson$$6, {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.list)(_Reflection.string)));
      }

    });
    var $target$$126, otherwise$$6;

    if (deserialized$$10.tail != null) {
      if (deserialized$$10.head[0] === "first") {
        if (deserialized$$10.head[1].tail != null) {
          if (deserialized$$10.head[1].head === "1") {
            if (deserialized$$10.head[1].tail.tail == null) {
              if (deserialized$$10.tail.tail != null) {
                if (deserialized$$10.tail.head[0] === "second") {
                  if (deserialized$$10.tail.head[1].tail != null) {
                    if (deserialized$$10.tail.head[1].head === "2") {
                      if (deserialized$$10.tail.head[1].tail.tail == null) {
                        if (deserialized$$10.tail.tail.tail == null) {
                          $target$$126 = 0;
                        } else {
                          $target$$126 = 1;
                          otherwise$$6 = deserialized$$10;
                        }
                      } else {
                        $target$$126 = 1;
                        otherwise$$6 = deserialized$$10;
                      }
                    } else {
                      $target$$126 = 1;
                      otherwise$$6 = deserialized$$10;
                    }
                  } else {
                    $target$$126 = 1;
                    otherwise$$6 = deserialized$$10;
                  }
                } else {
                  $target$$126 = 1;
                  otherwise$$6 = deserialized$$10;
                }
              } else {
                $target$$126 = 1;
                otherwise$$6 = deserialized$$10;
              }
            } else {
              $target$$126 = 1;
              otherwise$$6 = deserialized$$10;
            }
          } else {
            $target$$126 = 1;
            otherwise$$6 = deserialized$$10;
          }
        } else {
          $target$$126 = 1;
          otherwise$$6 = deserialized$$10;
        }
      } else {
        $target$$126 = 1;
        otherwise$$6 = deserialized$$10;
      }
    } else {
      $target$$126 = 1;
      otherwise$$6 = deserialized$$10;
    }

    switch ($target$$126) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$6);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("(string * string []) [] - part 2", body$$145);
})(), (() => {
  const body$$146 = function body$$146() {
    const inputJson$$7 = "[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]";
    const deserialized$$11 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(inputJson$$7, {
      ResolveType() {
        return (0, _Reflection.list)((0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.array)(_Reflection.string)));
      }

    });
    var $target$$127, otherwise$$7;

    if (deserialized$$11.tail != null) {
      if (deserialized$$11.head[0] === "first") {
        if (!(0, _Array.equalsWith)(_Util.comparePrimitives, deserialized$$11.head[1], null) ? deserialized$$11.head[1].length === 1 : false) {
          if (deserialized$$11.head[1][0] === "1") {
            if (deserialized$$11.tail.tail != null) {
              if (deserialized$$11.tail.head[0] === "second") {
                if (!(0, _Array.equalsWith)(_Util.comparePrimitives, deserialized$$11.tail.head[1], null) ? deserialized$$11.tail.head[1].length === 1 : false) {
                  if (deserialized$$11.tail.head[1][0] === "2") {
                    if (deserialized$$11.tail.tail.tail == null) {
                      $target$$127 = 0;
                    } else {
                      $target$$127 = 1;
                      otherwise$$7 = deserialized$$11;
                    }
                  } else {
                    $target$$127 = 1;
                    otherwise$$7 = deserialized$$11;
                  }
                } else {
                  $target$$127 = 1;
                  otherwise$$7 = deserialized$$11;
                }
              } else {
                $target$$127 = 1;
                otherwise$$7 = deserialized$$11;
              }
            } else {
              $target$$127 = 1;
              otherwise$$7 = deserialized$$11;
            }
          } else {
            $target$$127 = 1;
            otherwise$$7 = deserialized$$11;
          }
        } else {
          $target$$127 = 1;
          otherwise$$7 = deserialized$$11;
        }
      } else {
        $target$$127 = 1;
        otherwise$$7 = deserialized$$11;
      }
    } else {
      $target$$127 = 1;
      otherwise$$7 = deserialized$$11;
    }

    switch ($target$$127) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$7);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("(string * string list) list - part 3", body$$146);
})(), (() => {
  const body$$147 = function body$$147() {
    const inputJson$$8 = "[ [\"first\", [\"1\"]], [\"second\", [\"2\"]] ]";
    const deserialized$$12 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)(inputJson$$8, {
      ResolveType() {
        return (0, _Reflection.array)((0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.list)(_Reflection.string)));
      }

    });
    var $target$$128, otherwise$$8;

    if (!(0, _Array.equalsWith)(_Util.compareArrays, deserialized$$12, null) ? deserialized$$12.length === 2 : false) {
      if (deserialized$$12[0][0] === "first") {
        if (deserialized$$12[0][1].tail != null) {
          if (deserialized$$12[0][1].head === "1") {
            if (deserialized$$12[0][1].tail.tail == null) {
              if (deserialized$$12[1][0] === "second") {
                if (deserialized$$12[1][1].tail != null) {
                  if (deserialized$$12[1][1].head === "2") {
                    if (deserialized$$12[1][1].tail.tail == null) {
                      $target$$128 = 0;
                    } else {
                      $target$$128 = 1;
                      otherwise$$8 = deserialized$$12;
                    }
                  } else {
                    $target$$128 = 1;
                    otherwise$$8 = deserialized$$12;
                  }
                } else {
                  $target$$128 = 1;
                  otherwise$$8 = deserialized$$12;
                }
              } else {
                $target$$128 = 1;
                otherwise$$8 = deserialized$$12;
              }
            } else {
              $target$$128 = 1;
              otherwise$$8 = deserialized$$12;
            }
          } else {
            $target$$128 = 1;
            otherwise$$8 = deserialized$$12;
          }
        } else {
          $target$$128 = 1;
          otherwise$$8 = deserialized$$12;
        }
      } else {
        $target$$128 = 1;
        otherwise$$8 = deserialized$$12;
      }
    } else {
      $target$$128 = 1;
      otherwise$$8 = deserialized$$12;
    }

    switch ($target$$128) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$8);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("(string * string list) list - part 3", body$$147);
})(), (() => {
  const body$$148 = function body$$148() {
    const typeInfo$$6 = (0, _TypeInfo.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F)({
      ResolveType() {
        return (0, _Reflection.array)((0, _Reflection.tuple)(_Reflection.int32, _Reflection.int32));
      }

    });

    if (typeInfo$$6.tag === 24) {
      const getElemType = typeInfo$$6.fields[0];
      const matchValue$$24 = getElemType();

      if (matchValue$$24.tag === 26) {
        const getTupleTypes = matchValue$$24.fields[0];
        const matchValue$$25 = getTupleTypes();
        var $target$$129;

        if (!(0, _Array.equalsWith)(function ($x$$70, $y$$71) {
          return $x$$70.CompareTo($y$$71);
        }, matchValue$$25, null) ? matchValue$$25.length === 2 : false) {
          if (matchValue$$25[0].tag === 5) {
            if (matchValue$$25[1].tag === 5) {
              $target$$129 = 0;
            } else {
              $target$$129 = 1;
            }
          } else {
            $target$$129 = 1;
          }
        } else {
          $target$$129 = 1;
        }

        switch ($target$$129) {
          case 0:
            {
              test$$$pass();
              break;
            }

          case 1:
            {
              test$$$failwith$$Z721C83C5("Expected int * int");
              break;
            }
        }
      } else {
        test$$$failwith$$Z721C83C5("Expected tuple");
      }
    } else {
      const other$$5 = typeInfo$$6;
      test$$$failwith$$Z721C83C5((0, _String.toText)((0, _String.printf)("Expected array but got %A"))(other$$5));
    }
  };

  return (0, _Mocha.Test$$$testCase)("Converter works for array of tuple", body$$148);
})(), (() => {
  const body$$149 = function body$$149() {
    const inputJson$$9 = "[ [2,3], [4,5], [5,6] ]";
    const matchValue$$26 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(inputJson$$9, {
      ResolveType() {
        return (0, _Reflection.array)((0, _Reflection.tuple)(_Reflection.int32, _Reflection.int32));
      }

    });
    var $target$$130;

    if (!(0, _Array.equalsWith)(_Util.compareArrays, matchValue$$26, null) ? matchValue$$26.length === 3 : false) {
      if (matchValue$$26[0][0] === 2) {
        if (matchValue$$26[0][1] === 3) {
          if (matchValue$$26[1][0] === 4) {
            if (matchValue$$26[1][1] === 5) {
              if (matchValue$$26[2][0] === 5) {
                if (matchValue$$26[2][1] === 6) {
                  $target$$130 = 0;
                } else {
                  $target$$130 = 1;
                }
              } else {
                $target$$130 = 1;
              }
            } else {
              $target$$130 = 1;
            }
          } else {
            $target$$130 = 1;
          }
        } else {
          $target$$130 = 1;
        }
      } else {
        $target$$130 = 1;
      }
    } else {
      $target$$130 = 1;
    }

    switch ($target$$130) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$fail();
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Array of tuples", body$$149);
})(), (() => {
  const body$$150 = function body$$150() {
    var testExpr$$6, testExpr$$7;
    const inputJson$$10 = "\r\n            {\r\n                \"Highlights\": [\r\n                    [ \"first\", [ \"1\" ] ],\r\n                    [ \"second\", [ \"2\" ] ]\r\n                ]\r\n            }\r\n        ";
    const matchValue$$27 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(inputJson$$10, {
      ResolveType() {
        return (0, _Types2.TupleStringArrays$reflection)();
      }

    });
    var $target$$131, otherwise$$9;

    if (!(0, _Array.equalsWith)(_Util.compareArrays, matchValue$$27.Highlights, null) ? matchValue$$27.Highlights.length === 2 : false) {
      if (matchValue$$27.Highlights[0][0] === "first") {
        if (testExpr$$6 = matchValue$$27.Highlights[0][1], !(0, _Array.equalsWith)(_Util.comparePrimitives, testExpr$$6, null) ? testExpr$$6.length === 1 : false) {
          if (matchValue$$27.Highlights[0][1][0] === "1") {
            if (matchValue$$27.Highlights[1][0] === "second") {
              if (testExpr$$7 = matchValue$$27.Highlights[1][1], !(0, _Array.equalsWith)(_Util.comparePrimitives, testExpr$$7, null) ? testExpr$$7.length === 1 : false) {
                if (matchValue$$27.Highlights[1][1][0] === "2") {
                  $target$$131 = 0;
                } else {
                  $target$$131 = 1;
                  otherwise$$9 = matchValue$$27;
                }
              } else {
                $target$$131 = 1;
                otherwise$$9 = matchValue$$27;
              }
            } else {
              $target$$131 = 1;
              otherwise$$9 = matchValue$$27;
            }
          } else {
            $target$$131 = 1;
            otherwise$$9 = matchValue$$27;
          }
        } else {
          $target$$131 = 1;
          otherwise$$9 = matchValue$$27;
        }
      } else {
        $target$$131 = 1;
        otherwise$$9 = matchValue$$27;
      }
    } else {
      $target$$131 = 1;
      otherwise$$9 = matchValue$$27;
    }

    switch ($target$$131) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$9);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing highlights", body$$150);
})(), (() => {
  const body$$151 = function body$$151() {
    const _arg20$$1 = (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _Map.ofList)(new _Types.List([new _Types2.RecordAsKey(1, "Value"), 1], new _Types.List()), {
      Compare($x$$80, $y$$81) {
        return $x$$80.CompareTo($y$$81);
      }

    })), {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.RecordAsKey$reflection)(), _Reflection.int32]);
      }

    }));

    var $target$$132, otherwise$$10;

    if (_arg20$$1.tail != null) {
      if (_arg20$$1.head[0].Key === 1) {
        if (_arg20$$1.head[0].Value === "Value") {
          if (_arg20$$1.head[1] === 1) {
            if (_arg20$$1.tail.tail == null) {
              $target$$132 = 0;
            } else {
              $target$$132 = 1;
              otherwise$$10 = _arg20$$1;
            }
          } else {
            $target$$132 = 1;
            otherwise$$10 = _arg20$$1;
          }
        } else {
          $target$$132 = 1;
          otherwise$$10 = _arg20$$1;
        }
      } else {
        $target$$132 = 1;
        otherwise$$10 = _arg20$$1;
      }
    } else {
      $target$$132 = 1;
      otherwise$$10 = _arg20$$1;
    }

    switch ($target$$132) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$10);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing maps with record as key", body$$151);
})(), (() => {
  const body$$152 = function body$$152() {
    const _arg21$$1 = (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("\r\n        [\r\n            [\"{\\\"Key\\\":1,\\\"Value\\\":\\\"Value\\\"}\", 1]\r\n        ]\r\n        ", {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.RecordAsKey$reflection)(), _Reflection.int32]);
      }

    }));

    var $target$$133, otherwise$$11;

    if (_arg21$$1.tail != null) {
      if (_arg21$$1.head[0].Key === 1) {
        if (_arg21$$1.head[0].Value === "Value") {
          if (_arg21$$1.head[1] === 1) {
            if (_arg21$$1.tail.tail == null) {
              $target$$133 = 0;
            } else {
              $target$$133 = 1;
              otherwise$$11 = _arg21$$1;
            }
          } else {
            $target$$133 = 1;
            otherwise$$11 = _arg21$$1;
          }
        } else {
          $target$$133 = 1;
          otherwise$$11 = _arg21$$1;
        }
      } else {
        $target$$133 = 1;
        otherwise$$11 = _arg21$$1;
      }
    } else {
      $target$$133 = 1;
      otherwise$$11 = _arg21$$1;
    }

    switch ($target$$133) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$11);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing maps with record as quoted serialized key", body$$152);
})(), (() => {
  const body$$153 = function body$$153() {
    const _arg22$$1 = (0, _Map.toList)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("\r\n        [\r\n            [{\"Key\":1,\"Value\":\"Value\"}, 1]\r\n        ]\r\n        ", {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.RecordAsKey$reflection)(), _Reflection.int32]);
      }

    }));

    var $target$$134, otherwise$$12;

    if (_arg22$$1.tail != null) {
      if (_arg22$$1.head[0].Key === 1) {
        if (_arg22$$1.head[0].Value === "Value") {
          if (_arg22$$1.head[1] === 1) {
            if (_arg22$$1.tail.tail == null) {
              $target$$134 = 0;
            } else {
              $target$$134 = 1;
              otherwise$$12 = _arg22$$1;
            }
          } else {
            $target$$134 = 1;
            otherwise$$12 = _arg22$$1;
          }
        } else {
          $target$$134 = 1;
          otherwise$$12 = _arg22$$1;
        }
      } else {
        $target$$134 = 1;
        otherwise$$12 = _arg22$$1;
      }
    } else {
      $target$$134 = 1;
      otherwise$$12 = _arg22$$1;
    }

    switch ($target$$134) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$12);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing maps with record as quoted serialized key 2", body$$153);
})(), (() => {
  const body$$154 = function body$$154() {
    const _arg23$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("{ \"Hash\": \"AQIDBAU=\" }", {
      ResolveType() {
        return (0, _Types2.WithByteArray$reflection)();
      }

    });

    var $target$$135, otherwise$$13;

    if (!(0, _Array.equalsWith)(_Util.comparePrimitives, _arg23$$1.Hash, null) ? _arg23$$1.Hash.length === 5 : false) {
      if (_arg23$$1.Hash[0] === 1) {
        if (_arg23$$1.Hash[1] === 2) {
          if (_arg23$$1.Hash[2] === 3) {
            if (_arg23$$1.Hash[3] === 4) {
              if (_arg23$$1.Hash[4] === 5) {
                $target$$135 = 0;
              } else {
                $target$$135 = 1;
                otherwise$$13 = _arg23$$1;
              }
            } else {
              $target$$135 = 1;
              otherwise$$13 = _arg23$$1;
            }
          } else {
            $target$$135 = 1;
            otherwise$$13 = _arg23$$1;
          }
        } else {
          $target$$135 = 1;
          otherwise$$13 = _arg23$$1;
        }
      } else {
        $target$$135 = 1;
        otherwise$$13 = _arg23$$1;
      }
    } else {
      $target$$135 = 1;
      otherwise$$13 = _arg23$$1;
    }

    switch ($target$$135) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$13);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing byte[] serialized as base64", body$$154);
})(), (() => {
  const body$$155 = function body$$155() {
    const _arg24$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseAs$002EStatic$$Z7D14C7A6)("{ \"Value\": 123 }", {
      ResolveType() {
        return (0, _Types2.WithFloat32$reflection)();
      }

    });

    if (_arg24$$1.Value === Math.fround(123)) {
      test$$$pass();
    } else {
      const otherwise$$14 = _arg24$$1;
      test$$$unexpected$$1505(otherwise$$14);
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing flaot32/single", body$$155);
})(), (() => {
  const body$$156 = function body$$156() {
    var first$$2;

    const _arg25$$1 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)("{ \"Sixteen\": 10, \"ThirtyTwo\": 10, \"SixtyFour\":10 }", {
      ResolveType() {
        return (0, _Types2.UnsignedIntegers$reflection)();
      }

    });

    var $target$$136;

    if (_arg25$$1.ThirtyTwo === 10) {
      if ((0, _Long.equals)(_arg25$$1.SixtyFour, (0, _Long.fromBits)(10, 0, true))) {
        if (first$$2 = _arg25$$1.Sixteen, ~~first$$2 === 10) {
          $target$$136 = 0;
        } else {
          $target$$136 = 1;
        }
      } else {
        $target$$136 = 1;
      }
    } else {
      $target$$136 = 1;
    }

    switch ($target$$136) {
      case 0:
        {
          const first$$3 = _arg25$$1.Sixteen;
          test$$$pass();
          break;
        }

      case 1:
        {
          const otherValue = _arg25$$1;
          test$$$unexpected$$1505(otherValue);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing unsigned integers", body$$156);
})(), (() => {
  const body$$157 = function body$$157() {
    test$$$equal(true, (0, _SimpleJson.InteropUtil$$$isBigInt)((0, _BigInt.fromInt32)(5)));
    test$$$equal(false, (0, _SimpleJson.InteropUtil$$$isBigInt)(null));
    test$$$equal(true, (0, _SimpleJson.InteropUtil$$$isBigInt)((0, _BigInt.fromInt32)(-5)));
  };

  return (0, _Mocha.Test$$$testCase)("BigInt can be detected in run time", body$$157);
})(), (() => {
  const body$$158 = function body$$158() {
    const matchValue$$28 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)((0, _BigInt.fromInt32)(5));

    if (matchValue$$28 === "\"5\"") {
      test$$$pass();
    } else {
      const otherwise$$15 = matchValue$$28;
      test$$$unexpected$$1505(otherwise$$15);
    }
  };

  return (0, _Mocha.Test$$$testCase)("BigInt can be JSON.stringified", body$$158);
})(), (() => {
  const body$$159 = function body$$159() {
    const dateOffset = (0, _DateOffset.now)();
    const record = new _Types2.RecordWithDateOffset(dateOffset);
    const stringified = (0, _Date.toString)(dateOffset, "O");
    const matchValue$$29 = (0, _SimpleJson.SimpleJson$$$parseNative)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(record));

    if (matchValue$$29.tag === 5) {
      const dict$$2 = matchValue$$29.fields[0];
      const matchValue$$30 = (0, _Map.tryFind)("DateOffset", dict$$2);
      var $target$$137, value$$5, otherwise$$16;

      if (matchValue$$30 != null) {
        if (matchValue$$30.tag === 1) {
          $target$$137 = 0;
          value$$5 = matchValue$$30.fields[0];
        } else {
          $target$$137 = 1;
          otherwise$$16 = matchValue$$30;
        }
      } else {
        $target$$137 = 1;
        otherwise$$16 = matchValue$$30;
      }

      switch ($target$$137) {
        case 0:
          {
            test$$$areEqual(value$$5, stringified);
            break;
          }

        case 1:
          {
            test$$$unexpected$$1505(otherwise$$16);
            break;
          }
      }
    } else {
      const otherwise$$17 = matchValue$$29;
      test$$$unexpected$$1505(otherwise$$17);
    }
  };

  return (0, _Mocha.Test$$$testCase)("Stringifying DateTimeOffset preserves timezone", body$$159);
})(), (() => {
  const body$$160 = function body$$160() {
    const dateOffset$$1 = (0, _DateOffset.now)();
    test$$$areEqual(true, (0, _SimpleJson.InteropUtil$$$isDateOffset)(dateOffset$$1));
  };

  return (0, _Mocha.Test$$$testCase)("Testing for DateTimeOffset works in runtime", body$$160);
})(), (() => {
  const body$$161 = function body$$161() {
    const dateOffset$$2 = (0, _DateOffset.now)();
    const expected$$11 = (0, _Date.toString)(dateOffset$$2, "O");
    const matchValue$$31 = (0, _SimpleJson.SimpleJson$$$parseNative)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(dateOffset$$2));

    if (matchValue$$31.tag === 1) {
      const actual = matchValue$$31.fields[0];
      test$$$areEqual(actual, expected$$11);
    } else {
      const otherwise$$18 = matchValue$$31;
      test$$$unexpected$$1505(otherwise$$18);
    }
  };

  return (0, _Mocha.Test$$$testCase)("DateTimeOffset uses ToString('O') when stringified", body$$161);
})(), (() => {
  const body$$162 = function body$$162() {
    const input$$51 = "{ \"Value\": 9.5 }";
    const matchValue$$32 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EtryParseNativeAs$002EStatic$$Z7D14C7A6)(input$$51, {
      ResolveType() {
        return (0, _Types2.Balance$reflection)();
      }

    });

    if (matchValue$$32.tag === 1) {
      const error = matchValue$$32.fields[0];
      test$$$unexpected$$1505(error);
    } else {
      const balance = matchValue$$32.fields[0];
      const value$$6 = balance.Value;
      const discount = (0, _Decimal.op_Subtraction)(value$$6, (0, _Decimal.fromParts)(90, 0, 0, false, 1));
      test$$$areEqual(discount, (0, _Decimal.fromParts)(5, 0, 0, false, 1));
    }
  };

  return (0, _Mocha.Test$$$testCase)("decimal arithmetic works after deserialization", body$$162);
})(), (() => {
  const body$$163 = function body$$163() {
    const input$$52 = "{ \"Ok\": { \"Value\": 9.5  } }";
    const matchValue$$33 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$52, {
      ResolveType() {
        return (0, _Reflection.union)("Microsoft.FSharp.Core.FSharpResult`2", [(0, _Types2.Balance$reflection)(), _Reflection.int32], _Option.Result, () => [["Ok", [(0, _Types2.Balance$reflection)()]], ["Error", [_Reflection.int32]]]);
      }

    });

    if (matchValue$$33.tag === 1) {
      const error$$1 = matchValue$$33.fields[0] | 0;
      test$$$unexpected$$1505(error$$1);
    } else {
      const balance$$1 = matchValue$$33.fields[0];
      const value$$7 = balance$$1.Value;
      const discount$$1 = (0, _Decimal.op_Subtraction)(value$$7, (0, _Decimal.fromParts)(90, 0, 0, false, 1));
      test$$$areEqual(discount$$1, (0, _Decimal.fromParts)(5, 0, 0, false, 1));
    }
  };

  return (0, _Mocha.Test$$$testCase)("decimal arithmetic works after deserialization from generic type: Result", body$$163);
})(), (() => {
  const body$$164 = function body$$164() {
    const input$$53 = "{ \"Just\": { \"Value\": 9.5  } }";
    const matchValue$$34 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$53, {
      ResolveType() {
        return (0, _Types2.Maybe$00601$reflection)((0, _Types2.Balance$reflection)());
      }

    });

    if (matchValue$$34.tag === 1) {
      test$$$unexpected$$1505("should not happen");
    } else {
      const balance$$2 = matchValue$$34.fields[0];
      const value$$8 = balance$$2.Value;
      const discount$$2 = (0, _Decimal.op_Subtraction)(value$$8, (0, _Decimal.fromParts)(90, 0, 0, false, 1));
      test$$$areEqual(discount$$2, (0, _Decimal.fromParts)(5, 0, 0, false, 1));
    }
  };

  return (0, _Mocha.Test$$$testCase)("decimal arithmetic works after deserialization from generic type: Maybe", body$$164);
})(), (() => {
  const body$$165 = function body$$165() {
    const value$$9 = (0, _Map.ofList)(new _Types.List([new _Types2.ComplexKey$00601(0, "ComplexKey", 1), new _Types2.Maybe$00601(0, "Just", 5)], new _Types.List()), {
      Compare($x$$84, $y$$85) {
        return $x$$84.CompareTo($y$$85);
      }

    });
    const input$$54 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(value$$9);

    const _arg26$$1 = (0, _Map.tryFind)(new _Types2.ComplexKey$00601(0, "ComplexKey", 1), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$54, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ComplexKey$00601$reflection)(_Reflection.int32), (0, _Types2.Maybe$00601$reflection)(_Reflection.int32)]);
      }

    }));

    var $target$$138, otherwise$$19;

    if (_arg26$$1 != null) {
      if (_arg26$$1.tag === 0) {
        if (_arg26$$1.fields[0] === 5) {
          $target$$138 = 0;
        } else {
          $target$$138 = 1;
          otherwise$$19 = _arg26$$1;
        }
      } else {
        $target$$138 = 1;
        otherwise$$19 = _arg26$$1;
      }
    } else {
      $target$$138 = 1;
      otherwise$$19 = _arg26$$1;
    }

    switch ($target$$138) {
      case 0:
        {
          test$$$passWith$$Z721C83C5((0, _String.toText)((0, _String.printf)("Succesfully deserialized %s"))(input$$54));
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$19);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing complex keys for Map", body$$165);
})(), (() => {
  const body$$166 = function body$$166() {
    const guid = (0, _String.newGuid)();
    const value$$10 = (0, _Map.ofList)(new _Types.List([new _Types2.ComplexKey$00601(0, "ComplexKey", guid), new _Types2.Maybe$00601(0, "Just", guid)], new _Types.List()), {
      Compare($x$$86, $y$$87) {
        return $x$$86.CompareTo($y$$87);
      }

    });
    const input$$55 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(value$$10);

    const _arg27$$1 = (0, _Map.tryFind)(new _Types2.ComplexKey$00601(0, "ComplexKey", guid), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$55, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ComplexKey$00601$reflection)((0, _Reflection.type)("System.Guid")), (0, _Types2.Maybe$00601$reflection)((0, _Reflection.type)("System.Guid"))]);
      }

    }));

    var $target$$139, value$$11, otherwise$$20;

    if (_arg27$$1 != null) {
      if (_arg27$$1.tag === 0) {
        $target$$139 = 0;
        value$$11 = _arg27$$1.fields[0];
      } else {
        $target$$139 = 1;
        otherwise$$20 = _arg27$$1;
      }
    } else {
      $target$$139 = 1;
      otherwise$$20 = _arg27$$1;
    }

    switch ($target$$139) {
      case 0:
        {
          test$$$areEqual(value$$11, guid);
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$20);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing complex keys with guids for Map", body$$166);
})(), (() => {
  const body$$167 = function body$$167() {
    const value$$12 = (0, _Map.ofList)(new _Types.List([new _Types2.ComplexKey$00601(0, "ComplexKey", "key"), new _Types2.Maybe$00601(0, "Just", "value")], new _Types.List()), {
      Compare($x$$88, $y$$89) {
        return $x$$88.CompareTo($y$$89);
      }

    });
    const input$$56 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(value$$12);

    const _arg28$$1 = (0, _Map.tryFind)(new _Types2.ComplexKey$00601(0, "ComplexKey", "key"), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$56, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ComplexKey$00601$reflection)(_Reflection.string), (0, _Types2.Maybe$00601$reflection)(_Reflection.string)]);
      }

    }));

    var $target$$140, otherwise$$21;

    if (_arg28$$1 != null) {
      if (_arg28$$1.tag === 0) {
        if (_arg28$$1.fields[0] === "value") {
          $target$$140 = 0;
        } else {
          $target$$140 = 1;
          otherwise$$21 = _arg28$$1;
        }
      } else {
        $target$$140 = 1;
        otherwise$$21 = _arg28$$1;
      }
    } else {
      $target$$140 = 1;
      otherwise$$21 = _arg28$$1;
    }

    switch ($target$$140) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$21);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing complex keys with guids for Map", body$$167);
})(), (() => {
  const body$$168 = function body$$168() {
    const input$$57 = "\r\n            {\"{\\\"ComplexKey\\\":1}\":{\"Just\":5}}\r\n        ";

    const _arg29$$1 = (0, _Map.tryFind)(new _Types2.ComplexKey$00601(0, "ComplexKey", 1), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$57, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ComplexKey$00601$reflection)(_Reflection.int32), (0, _Types2.Maybe$00601$reflection)(_Reflection.int32)]);
      }

    }));

    var $target$$141, otherwise$$22;

    if (_arg29$$1 != null) {
      if (_arg29$$1.tag === 0) {
        if (_arg29$$1.fields[0] === 5) {
          $target$$141 = 0;
        } else {
          $target$$141 = 1;
          otherwise$$22 = _arg29$$1;
        }
      } else {
        $target$$141 = 1;
        otherwise$$22 = _arg29$$1;
      }
    } else {
      $target$$141 = 1;
      otherwise$$22 = _arg29$$1;
    }

    switch ($target$$141) {
      case 0:
        {
          test$$$passWith$$Z721C83C5((0, _String.toText)((0, _String.printf)("Succesfully deserialized %s"))(input$$57));
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$22);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing complex keys for Map from server", body$$168);
})(), (() => {
  const body$$169 = function body$$169() {
    const input$$58 = "\r\n            {\"{\\\"ComplexKey\\\":\\\"key\\\"}\":{\"Just\":5}}\r\n        ";

    const _arg30$$1 = (0, _Map.tryFind)(new _Types2.ComplexKey$00601(0, "ComplexKey", "key"), (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(input$$58, {
      ResolveType() {
        return (0, _Reflection.type)("Microsoft.FSharp.Collections.FSharpMap`2", [(0, _Types2.ComplexKey$00601$reflection)(_Reflection.string), (0, _Types2.Maybe$00601$reflection)(_Reflection.int32)]);
      }

    }));

    var $target$$142, otherwise$$23;

    if (_arg30$$1 != null) {
      if (_arg30$$1.tag === 0) {
        if (_arg30$$1.fields[0] === 5) {
          $target$$142 = 0;
        } else {
          $target$$142 = 1;
          otherwise$$23 = _arg30$$1;
        }
      } else {
        $target$$142 = 1;
        otherwise$$23 = _arg30$$1;
      }
    } else {
      $target$$142 = 1;
      otherwise$$23 = _arg30$$1;
    }

    switch ($target$$142) {
      case 0:
        {
          test$$$passWith$$Z721C83C5((0, _String.toText)((0, _String.printf)("Succesfully deserialized %s"))(input$$58));
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(otherwise$$23);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing complex keys as strings for Map from server", body$$169);
})(), (() => {
  const body$$170 = function body$$170() {
    const result$$14 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(" { \"name\": \"John\"  } ", {
      ResolveType() {
        return (0, _Reflection.anonRecord)(["name", _Reflection.string]);
      }

    });

    if (result$$14.name === "John") {
      test$$$pass();
    } else {
      const other$$6 = result$$14.name;
      test$$$unexpected$$1505(other$$6);
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing JSON to anonymous records", body$$170);
})(), (() => {
  const body$$171 = function body$$171() {
    const result$$15 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(" { \"name\": \"John\" } ", {
      ResolveType() {
        return (0, _Reflection.anonRecord)(["age", (0, _Reflection.option)(_Reflection.int32)], ["name", _Reflection.string]);
      }

    });
    const matchValue$$36 = [result$$15.name, result$$15.age];
    var $target$$143, other$$7;

    if (matchValue$$36[0] === "John") {
      if (matchValue$$36[1] == null) {
        $target$$143 = 0;
      } else {
        $target$$143 = 1;
        other$$7 = matchValue$$36;
      }
    } else {
      $target$$143 = 1;
      other$$7 = matchValue$$36;
    }

    switch ($target$$143) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(other$$7);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing JSON to anonymous records with options", body$$171);
})(), (() => {
  const body$$172 = function body$$172() {
    const result$$16 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(" { \"name\": \"John\", \"child\": { \"name\": \"child\" }  } ", {
      ResolveType() {
        return (0, _Reflection.anonRecord)(["child", (0, _Reflection.anonRecord)(["name", _Reflection.string])], ["name", _Reflection.string]);
      }

    });
    const matchValue$$37 = [result$$16.name, result$$16.child.name];
    var $target$$144, other$$8;

    if (matchValue$$37[0] === "John") {
      if (matchValue$$37[1] === "child") {
        $target$$144 = 0;
      } else {
        $target$$144 = 1;
        other$$8 = matchValue$$37;
      }
    } else {
      $target$$144 = 1;
      other$$8 = matchValue$$37;
    }

    switch ($target$$144) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(other$$8);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing JSON to nested anonymous records", body$$172);
})(), (() => {
  const body$$173 = function body$$173() {
    const result$$17 = (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(" { \"name\": \"John\", \"child\": {  }  } ", {
      ResolveType() {
        return (0, _Reflection.anonRecord)(["child", (0, _Reflection.anonRecord)(["name", (0, _Reflection.option)(_Reflection.string)])], ["name", _Reflection.string]);
      }

    });
    const matchValue$$38 = [result$$17.name, result$$17.child.name];
    var $target$$145, other$$9;

    if (matchValue$$38[0] === "John") {
      if (matchValue$$38[1] == null) {
        $target$$145 = 0;
      } else {
        $target$$145 = 1;
        other$$9 = matchValue$$38;
      }
    } else {
      $target$$145 = 1;
      other$$9 = matchValue$$38;
    }

    switch ($target$$145) {
      case 0:
        {
          test$$$pass();
          break;
        }

      case 1:
        {
          test$$$unexpected$$1505(other$$9);
          break;
        }
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing JSON to optional nested anonymous records with props", body$$173);
})(), (() => {
  const body$$174 = function body$$174() {
    test$$$areEqual(15, (0, _Array.sum)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(" { \"numbers\": [1,2,3,4,5]  } ", {
      ResolveType() {
        return (0, _Reflection.anonRecord)(["numbers", (0, _Reflection.array)(_Reflection.int32)]);
      }

    }).numbers, {
      GetZero() {
        return 0;
      },

      Add($x$$90, $y$$91) {
        return $x$$90 + $y$$91;
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing JSON to anonymous records with arrays", body$$174);
})(), (() => {
  const body$$175 = function body$$175() {
    test$$$areEqual(15, (0, _List.sum)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(" { \"numbers\": [1,2,3,4,5]  } ", {
      ResolveType() {
        return (0, _Reflection.anonRecord)(["numbers", (0, _Reflection.list)(_Reflection.int32)]);
      }

    }).numbers, {
      GetZero() {
        return 0;
      },

      Add($x$$92, $y$$93) {
        return $x$$92 + $y$$93;
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing JSON to anonymous records with lists", body$$175);
})(), (() => {
  const body$$176 = function body$$176() {
    if ((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)(" { \"union\": \"One\" } ", {
      ResolveType() {
        return (0, _Reflection.anonRecord)(["union", (0, _Types2.SimpleUnion$reflection)()]);
      }

    }).union.tag === 1) {
      test$$$fail();
    } else {
      test$$$pass();
    }
  };

  return (0, _Mocha.Test$$$testCase)("Deserializing JSON to anonymous records with nested types", body$$176);
})(), (() => {
  const body$$177 = function body$$177() {
    test$$$areEqual(1000, (0, _Json.Fable$002ESimpleJson$002EJson$$Json$002EparseNativeAs$002EStatic$$Z7D14C7A6)((0, _Json.Fable$002ESimpleJson$002EJson$$Json$002Estringify$002EStatic$$1505)(1000), {
      ResolveType() {
        return (0, _Reflection.type)("System.TimeSpan");
      }

    }));
  };

  return (0, _Mocha.Test$$$testCase)("Converting TimeSpans works", body$$177);
})()]));
exports.everyTest = everyTest;

(function (args) {
  return (0, _Mocha.Mocha$$$runTests)(everyTest);
})(process.argv.slice(2));