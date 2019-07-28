"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusState$reflection = FocusState$reflection;
exports.TestCase$reflection = TestCase$reflection;
exports.Test$$$testCase = Test$$$testCase;
exports.Test$$$ptestCase = Test$$$ptestCase;
exports.Test$$$ftestCase = Test$$$ftestCase;
exports.Test$$$testCaseAsync = Test$$$testCaseAsync;
exports.Test$$$ptestCaseAsync = Test$$$ptestCaseAsync;
exports.Test$$$ftestCaseAsync = Test$$$ftestCaseAsync;
exports.Test$$$testList = Test$$$testList;
exports.Expect$$$equal = Expect$$$equal;
exports.Expect$$$notEqual = Expect$$$notEqual;
exports.Expect$$$isTrue = Expect$$$isTrue;
exports.Expect$$$isFalse = Expect$$$isFalse;
exports.Expect$$$isZero = Expect$$$isZero;
exports.Expect$$$isEmpty = Expect$$$isEmpty;
exports.Expect$$$pass = Expect$$$pass;
exports.Mocha$$$isFocused = Mocha$$$isFocused;
exports.Mocha$$$invalidateTestResults = Mocha$$$invalidateTestResults;
exports.Mocha$$$runViaDotnet = Mocha$$$runViaDotnet;
exports.Mocha$$$runTests = Mocha$$$runTests;
exports.TestCase = exports.FocusState = void 0;

var _Types = require("../fable-library.2.3.14/Types");

var _Reflection = require("../fable-library.2.3.14/Reflection");

var _Util = require("../fable-library.2.3.14/Util");

var _Seq = require("../fable-library.2.3.14/Seq");

var _List = require("../fable-library.2.3.14/List");

var _String = require("../fable-library.2.3.14/String");

var _Async = require("../fable-library.2.3.14/Async");

var _AsyncBuilder = require("../fable-library.2.3.14/AsyncBuilder");

const FocusState = (0, _Types.declare)(function Fable_Mocha_FocusState(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.FocusState = FocusState;

function FocusState$reflection() {
  return (0, _Reflection.union)("Fable.Mocha.FocusState", [], FocusState, () => ["Normal", "Pending", "Focused"]);
}

const TestCase = (0, _Types.declare)(function Fable_Mocha_TestCase(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.TestCase = TestCase;

function TestCase$reflection() {
  return (0, _Reflection.union)("Fable.Mocha.TestCase", [], TestCase, () => [["SyncTest", [_Reflection.string, (0, _Reflection.lambda)(_Reflection.unit, _Reflection.unit), FocusState$reflection()]], ["AsyncTest", [_Reflection.string, (0, _Reflection.type)("Microsoft.FSharp.Control.FSharpAsync`1", [_Reflection.unit]), FocusState$reflection()]], ["TestList", [_Reflection.string, (0, _Reflection.list)(TestCase$reflection())]]]);
}

function Test$$$testCase(name, body) {
  return new TestCase(0, "SyncTest", name, body, new FocusState(0, "Normal"));
}

function Test$$$ptestCase(name$$1, body$$1) {
  return new TestCase(0, "SyncTest", name$$1, body$$1, new FocusState(1, "Pending"));
}

function Test$$$ftestCase(name$$2, body$$2) {
  return new TestCase(0, "SyncTest", name$$2, body$$2, new FocusState(2, "Focused"));
}

function Test$$$testCaseAsync(name$$3, body$$3) {
  return new TestCase(1, "AsyncTest", name$$3, body$$3, new FocusState(0, "Normal"));
}

function Test$$$ptestCaseAsync(name$$4, body$$4) {
  return new TestCase(1, "AsyncTest", name$$4, body$$4, new FocusState(1, "Pending"));
}

function Test$$$ftestCaseAsync(name$$5, body$$5) {
  return new TestCase(1, "AsyncTest", name$$5, body$$5, new FocusState(2, "Focused"));
}

function Test$$$testList(name$$6, tests) {
  return new TestCase(2, "TestList", name$$6, tests);
}

const Env$$$insideBrowser = new Function("try {return this===window;}catch(e){ return false;}")();

function Expect$$$equal(actual, expected, msg) {
  (0, _Util.assertEqual)(expected, actual, msg);
}

function Expect$$$notEqual(actual$$1, expected$$1, msg$$1) {
  (0, _Util.assertNotEqual)(expected$$1, actual$$1, msg$$1);
}

function Expect$$$isTrue(cond) {
  return function (msg$$2) {
    Expect$$$equal(cond, true, msg$$2);
  };
}

function Expect$$$isFalse(cond$$1) {
  return function (msg$$3) {
    Expect$$$equal(cond$$1, false, msg$$3);
  };
}

function Expect$$$isZero(number) {
  return function (msg$$4) {
    Expect$$$equal(0, number, msg$$4);
  };
}

function Expect$$$isEmpty(x) {
  const expected$$4 = (0, _Seq.isEmpty)(x);
  return function (msg$$5) {
    Expect$$$equal(true, expected$$4, msg$$5);
  };
}

function Expect$$$pass() {
  return function (msg$$6) {
    Expect$$$equal(true, true, msg$$6);
  };
}

const Html$002ENode = (0, _Types.declare)(function Fable_Mocha_Html_Node(arg1, arg2, arg3, arg4) {
  this.Tag = arg1;
  this.Attributes = arg2;
  this.Content = arg3;
  this.Children = arg4;
}, _Types.Record);

function Html$002ENode$reflection() {
  return (0, _Reflection.record)("Fable.Mocha.Html.Node", [], Html$002ENode, () => [["Tag", _Reflection.string], ["Attributes", (0, _Reflection.list)((0, _Reflection.tuple)(_Reflection.string, _Reflection.string))], ["Content", _Reflection.string], ["Children", (0, _Reflection.list)(Html$002ENode$reflection())]]);
}

function Html$$$createNode(node) {
  const el = document.createElement(node.Tag);
  el.innerHTML = node.Content;
  (0, _Seq.iterate)(function (forLoopVar) {
    el.setAttribute(forLoopVar[0], forLoopVar[1]);
  }, node.Attributes);
  (0, _Seq.iterate)(function (child) {
    const childElement = Html$$$createNode(child);
    el.appendChild(childElement);
  }, node.Children);
  return el;
}

function Html$$$simpleDiv(attrs, content) {
  return new Html$002ENode("div", attrs, content, new _Types.List());
}

function Html$$$div(attrs$$1, children) {
  return new Html$002ENode("div", attrs$$1, "", children);
}

function Mocha$$$isFocused(test) {
  var $target$$7, tests$$1;

  if (test.tag === 1) {
    if (test.fields[2].tag === 2) {
      $target$$7 = 1;
    } else {
      $target$$7 = 3;
    }
  } else if (test.tag === 2) {
    $target$$7 = 2;
    tests$$1 = test.fields[1];
  } else if (test.fields[2].tag === 2) {
    $target$$7 = 0;
  } else {
    $target$$7 = 3;
  }

  switch ($target$$7) {
    case 0:
      {
        return true;
      }

    case 1:
      {
        return true;
      }

    case 2:
      {
        return (0, _List.exists)(Mocha$$$isFocused, tests$$1);
      }

    case 3:
      {
        return false;
      }
  }
}

function Mocha$$$runSyncTestInBrowser(name$$7, test$$2, padding) {
  try {
    test$$2();
    return Html$$$simpleDiv((0, _List.ofArray)([["data-test", name$$7], ["class", "passed"], ["style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx; color:green"))(padding)]]), (0, _String.toText)((0, _String.printf)("✔ %s"))(name$$7));
  } catch (ex) {
    const error = new Html$002ENode("pre", new _Types.List(["style", "font-size:16px;color:red;margin:10px; padding:10px; border: 1px solid red; border-radius: 10px"], new _Types.List()), ex.message, new _Types.List());
    return Html$$$div(new _Types.List(), (0, _List.ofArray)([Html$$$simpleDiv((0, _List.ofArray)([["data-test", name$$7], ["class", "failed"], ["style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx; color:red"))(padding)]]), (0, _String.toText)((0, _String.printf)("✘ %s"))(name$$7)), error]));
  }
}

function Mocha$$$runAsyncTestInBrowser(name$$8, test$$3, padding$$1) {
  let id;
  let copyOfStruct = (0, _String.newGuid)();
  id = String(copyOfStruct);
  (0, _Async.startImmediate)(_AsyncBuilder.singleton.Delay(function () {
    return _AsyncBuilder.singleton.Bind((0, _Async.sleep)(1000), function () {
      return _AsyncBuilder.singleton.Bind((0, _Async.catchAsync)(test$$3), function (_arg2) {
        if (_arg2.tag === 1) {
          const err = _arg2.fields[0];
          const div$$1 = document.getElementById(id);
          div$$1.innerHTML = (0, _String.toText)((0, _String.printf)("✘ %s"))(name$$8);
          const error$$1 = new Html$002ENode("pre", new _Types.List(["style", "margin:10px; padding:10px; border: 1px solid red; border-radius: 10px"], new _Types.List()), err.message, new _Types.List());
          div$$1.setAttribute("style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx;color:red"))(padding$$1));
          div$$1.setAttribute("class", "failed");
          div$$1.appendChild(Html$$$createNode(error$$1));
          return _AsyncBuilder.singleton.Zero();
        } else {
          const div = document.getElementById(id);
          div.innerHTML = (0, _String.toText)((0, _String.printf)("✔ %s"))(name$$8);
          div.setAttribute("class", "passed");
          div.setAttribute("style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx;color:green"))(padding$$1));
          return _AsyncBuilder.singleton.Zero();
        }
      });
    });
  }));
  return Html$$$simpleDiv((0, _List.ofArray)([["id", id], ["data-test", name$$8], ["class", "executing"], ["style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx;color:gray"))(padding$$1)]]), (0, _String.toText)((0, _String.printf)("⏳ %s"))(name$$8));
}

function Mocha$$$renderBrowserTests(hasFocusedTests, tests$$2, padding$$2) {
  return (0, _List.map)(function mapping(_arg1$$1) {
    switch (_arg1$$1.tag) {
      case 1:
        {
          const test$$5 = _arg1$$1.fields[1];
          const name$$10 = _arg1$$1.fields[0];
          const focus$$1 = _arg1$$1.fields[2];
          var $target$$11;

          if (focus$$1.tag === 0) {
            if (hasFocusedTests) {
              $target$$11 = 0;
            } else {
              $target$$11 = 1;
            }
          } else {
            $target$$11 = 1;
          }

          switch ($target$$11) {
            case 0:
              {
                return Html$$$simpleDiv((0, _List.ofArray)([["class", "pending"], ["data-test", name$$10], ["style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx; color:#B8860B"))(padding$$2)]]), (0, _String.toText)((0, _String.printf)("🚧 skipping '%s' due to other focused tests"))(name$$10));
              }

            case 1:
              {
                switch (focus$$1.tag) {
                  case 1:
                    {
                      return Html$$$simpleDiv((0, _List.ofArray)([["class", "pending"], ["data-test", name$$10], ["style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx; color:#B8860B"))(padding$$2)]]), (0, _String.toText)((0, _String.printf)("🚧 skipping '%s' due to it being marked as pending"))(name$$10));
                    }

                  case 2:
                    {
                      return Mocha$$$runAsyncTestInBrowser(name$$10, test$$5, padding$$2);
                    }

                  default:
                    {
                      return Mocha$$$runAsyncTestInBrowser(name$$10, test$$5, padding$$2);
                    }
                }
              }
          }
        }

      case 2:
        {
          const testCases = _arg1$$1.fields[1];
          const name$$11 = _arg1$$1.fields[0];
          const tests$$3 = Html$$$div(new _Types.List(), Mocha$$$renderBrowserTests(hasFocusedTests, testCases, padding$$2 + 20));
          const header = new Html$002ENode("div", (0, _List.ofArray)([["class", "module"], ["data-module", name$$11], ["style", (0, _String.toText)((0, _String.printf)("font-size:20px; padding:%dpx"))(padding$$2)]]), name$$11, new _Types.List(tests$$3, new _Types.List()));
          return Html$$$div(new _Types.List(["style", "margin-bottom:20px;"], new _Types.List()), new _Types.List(header, new _Types.List()));
        }

      default:
        {
          const test$$4 = _arg1$$1.fields[1];
          const name$$9 = _arg1$$1.fields[0];
          const focus = _arg1$$1.fields[2];
          var $target$$12;

          if (focus.tag === 0) {
            if (hasFocusedTests) {
              $target$$12 = 0;
            } else {
              $target$$12 = 1;
            }
          } else {
            $target$$12 = 1;
          }

          switch ($target$$12) {
            case 0:
              {
                return Html$$$simpleDiv((0, _List.ofArray)([["class", "pending"], ["data-test", name$$9], ["style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx; color:#B8860B"))(padding$$2)]]), (0, _String.toText)((0, _String.printf)("🚧 skipping '%s' due to other focused tests"))(name$$9));
              }

            case 1:
              {
                switch (focus.tag) {
                  case 1:
                    {
                      return Html$$$simpleDiv((0, _List.ofArray)([["class", "pending"], ["data-test", name$$9], ["style", (0, _String.toText)((0, _String.printf)("font-size:16px; padding-left:%dpx; color:#B8860B"))(padding$$2)]]), (0, _String.toText)((0, _String.printf)("🚧 skipping '%s' due to it being marked as pending"))(name$$9));
                    }

                  case 2:
                    {
                      return Mocha$$$runSyncTestInBrowser(name$$9, test$$4, padding$$2);
                    }

                  default:
                    {
                      return Mocha$$$runSyncTestInBrowser(name$$9, test$$4, padding$$2);
                    }
                }
              }
          }
        }
    }
  }, tests$$2);
}

function Mocha$$$configureAsyncTest(test$$6, finished) {
  (0, _Async.startImmediate)(_AsyncBuilder.singleton.Delay(function () {
    return _AsyncBuilder.singleton.Bind((0, _Async.catchAsync)(test$$6), function (_arg1$$2) {
      if (_arg1$$2.tag === 1) {
        const err$$1 = _arg1$$2.fields[0];
        finished(err$$1);
        return _AsyncBuilder.singleton.Zero();
      } else {
        finished();
        return _AsyncBuilder.singleton.Zero();
      }
    });
  }));
}

function Mocha$$$invalidateTestResults() {
  (0, _Async.startImmediate)(_AsyncBuilder.singleton.Delay(function () {
    const passedCount = document.getElementsByClassName("passed").length | 0;
    const failedCount = document.getElementsByClassName("failed").length | 0;
    const executingCount = document.getElementsByClassName("executing").length | 0;
    const skippedCount = document.getElementsByClassName("pending").length | 0;
    const total = passedCount + failedCount + executingCount + skippedCount | 0;
    document.getElementById("total-tests").innerHTML = (0, _String.toText)((0, _String.printf)("Test Results (%d total)"))(total);
    document.getElementById("passed-tests").innerHTML = (0, _String.toText)((0, _String.printf)("✔ %d passed"))(passedCount);
    document.getElementById("failed-tests").innerHTML = (0, _String.toText)((0, _String.printf)("✘ %d failed"))(failedCount);
    document.getElementById("executing-tests").innerHTML = (0, _String.toText)((0, _String.printf)("⏳ %d being executed (async)"))(executingCount);
    document.getElementById("skipped-tests").innerHTML = (0, _String.toText)((0, _String.printf)("🚧 %d pending"))(skippedCount);
    return executingCount > 0 ? _AsyncBuilder.singleton.Bind((0, _Async.sleep)(1000), function () {
      Mocha$$$invalidateTestResults();
      return _AsyncBuilder.singleton.Zero();
    }) : _AsyncBuilder.singleton.Return();
  }));
}

function Mocha$$$runViaMocha(test$$7) {
  switch (test$$7.tag) {
    case 1:
      {
        const test$$9 = test$$7.fields[1];
        const msg$$8 = test$$7.fields[0];
        const focus$$3 = test$$7.fields[2];

        switch (focus$$3.tag) {
          case 1:
            {
              it.skip(msg$$8, function (finished$$2) {
                Mocha$$$configureAsyncTest(test$$9, finished$$2);
              });
              break;
            }

          case 2:
            {
              it.only(msg$$8, function (finished$$3) {
                Mocha$$$configureAsyncTest(test$$9, finished$$3);
              });
              break;
            }

          default:
            {
              it(msg$$8, function (finished$$1) {
                Mocha$$$configureAsyncTest(test$$9, finished$$1);
              });
            }
        }

        break;
      }

    case 2:
      {
        const testCases$$1 = test$$7.fields[1];
        const name$$12 = test$$7.fields[0];

        const f = function f() {
          (0, _List.iterate)(Mocha$$$runViaMocha, testCases$$1);
        };

        describe(name$$12, f);
        break;
      }

    default:
      {
        const test$$8 = test$$7.fields[1];
        const msg$$7 = test$$7.fields[0];
        const focus$$2 = test$$7.fields[2];
        describe(msg$$7, function () {
          switch (focus$$2.tag) {
            case 1:
              {
                it.skip(msg$$7, test$$8);
                break;
              }

            case 2:
              {
                it.only(msg$$7, test$$8);
                break;
              }

            default:
              {
                it(msg$$7, test$$8);
              }
          }
        });
      }
  }
}

function Mocha$$$runViaDotnet(test$$11) {
  throw new Error("Currently not implemented, use Expecto for now.");
  return 1;
}

function Mocha$$$runTests(test$$12) {
  if (Env$$$insideBrowser ? true : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
    const hasFocusedTests$$1 = Mocha$$$isFocused(test$$12);
    const renderedTests = Mocha$$$renderBrowserTests(hasFocusedTests$$1, new _Types.List(test$$12, new _Types.List()), 0);
    const testResults = Html$$$div(new _Types.List(["style", "margin-bottom: 20px"], new _Types.List()), (0, _List.ofArray)([Html$$$simpleDiv((0, _List.ofArray)([["id", "total-tests"], ["style", "font-size:20px; margin-bottom:5px"]]), "Test Results"), Html$$$simpleDiv((0, _List.ofArray)([["id", "passed-tests"], ["style", "color:green; margin-left:5px;"]]), "Passed"), Html$$$simpleDiv((0, _List.ofArray)([["id", "skipped-tests"], ["style", "color:#B8860B"]]), "Pending"), Html$$$simpleDiv((0, _List.ofArray)([["id", "failed-tests"], ["style", "color:red;margin-left:5px"]]), "Failed"), Html$$$simpleDiv((0, _List.ofArray)([["id", "executing-tests"], ["style", "color:gray;margin-left:5px"]]), "Executing")]));
    const container = Html$$$div(new _Types.List(["style", "padding:20px;"], new _Types.List()), (0, _List.ofSeq)((0, _Seq.delay)(function () {
      return (0, _Seq.append)((0, _Seq.singleton)(testResults), (0, _Seq.delay)(function () {
        return renderedTests;
      }));
    })));
    const element = Html$$$createNode(container);
    document.body.appendChild(element);
    Mocha$$$invalidateTestResults();
    return 0;
  } else {
    Mocha$$$runViaMocha(test$$12);
    return 0;
  }
}