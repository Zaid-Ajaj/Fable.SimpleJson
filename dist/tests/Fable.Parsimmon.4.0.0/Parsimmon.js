"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenPosition$reflection = TokenPosition$reflection;
exports.NodeResult$00601$reflection = NodeResult$00601$reflection;
exports.Parsimmon$$$parseRaw = Parsimmon$$$parseRaw;
exports.Parsimmon$$$parse = Parsimmon$$$parse;
exports.Parsimmon$$$orTry = Parsimmon$$$orTry;
exports.Parsimmon$$$times = Parsimmon$$$times;
exports.Parsimmon$$$atLeast = Parsimmon$$$atLeast;
exports.Parsimmon$$$atMost = Parsimmon$$$atMost;
exports.Parsimmon$$$skip = Parsimmon$$$skip;
exports.Parsimmon$$$many = Parsimmon$$$many;
exports.Parsimmon$$$seperateByAtLeastOne = Parsimmon$$$seperateByAtLeastOne;
exports.Parsimmon$$$chain = Parsimmon$$$chain;
exports.Parsimmon$$$bind = Parsimmon$$$bind;
exports.Parsimmon$$$timesBetween = Parsimmon$$$timesBetween;
exports.Parsimmon$$$notFollowedBy = Parsimmon$$$notFollowedBy;
exports.Parsimmon$$$fallback = Parsimmon$$$fallback;
exports.Parsimmon$$$seperateBy = Parsimmon$$$seperateBy;
exports.Parsimmon$$$between = Parsimmon$$$between;
exports.Parsimmon$$$map = Parsimmon$$$map;
exports.Parsimmon$$$tie = Parsimmon$$$tie;
exports.Parsimmon$$$choose = Parsimmon$$$choose;
exports.Parsimmon$$$atLeastOneOrMany = Parsimmon$$$atLeastOneOrMany;
exports.Parsimmon$$$stringReturn = Parsimmon$$$stringReturn;
exports.Parsimmon$$$trim = Parsimmon$$$trim;
exports.Parsimmon$$$concat = Parsimmon$$$concat;
exports.Parsimmon$$$node = Parsimmon$$$node;
exports.Parsimmon$$$seq5 = exports.Parsimmon$$$seq4 = exports.Parsimmon$$$seq3 = exports.Parsimmon$$$seq2 = exports.Parsimmon$$$noneOf = exports.Parsimmon$$$optionalWhitespace = exports.Parsimmon$$$whitespace = exports.Parsimmon$$$oneOf = exports.Parsimmon$$$str = exports.Parsimmon$$$takeWhile = exports.Parsimmon$$$satisfy = exports.Parsimmon$$$fail = exports.Parsimmon$$$all = exports.Parsimmon$$$any = exports.Parsimmon$$$digits = exports.Parsimmon$$$digit = exports.Parsimmon$$$lookahead = exports.Parsimmon$$$succeed = exports.Parsimmon$$$endOfFile = exports.Parsimmon$$$letters = exports.Parsimmon$$$letter = exports.Parsimmon$$$ofLazy = exports.Parsimmon$$$index = exports.NodeResult$00601 = exports.TokenPosition = void 0;

var _Types = require("../fable-library.2.3.14/Types");

var _Reflection = require("../fable-library.2.3.14/Reflection");

var _Option = require("../fable-library.2.3.14/Option");

var _Parsimmon = require("./Parsimmon.1");

var _String = require("../fable-library.2.3.14/String");

var _List = require("../fable-library.2.3.14/List");

const TokenPosition = (0, _Types.declare)(function Fable_Parsimmon_TokenPosition(arg1, arg2, arg3) {
  this.offset = arg1 | 0;
  this.line = arg2 | 0;
  this.column = arg3 | 0;
}, _Types.Record);
exports.TokenPosition = TokenPosition;

function TokenPosition$reflection() {
  return (0, _Reflection.record)("Fable.Parsimmon.TokenPosition", [], TokenPosition, () => [["offset", _Reflection.int32], ["line", _Reflection.int32], ["column", _Reflection.int32]]);
}

const NodeResult$00601 = (0, _Types.declare)(function Fable_Parsimmon_NodeResult(arg1, arg2, arg3, arg4) {
  this.name = arg1;
  this.value = arg2;
  this.start = arg3;
  this.end = arg4;
}, _Types.Record);
exports.NodeResult$00601 = NodeResult$00601;

function NodeResult$00601$reflection($gen$$1) {
  return (0, _Reflection.record)("Fable.Parsimmon.NodeResult`1", [$gen$$1], NodeResult$00601, () => [["name", _Reflection.string], ["value", $gen$$1], ["start", TokenPosition$reflection()], ["end", TokenPosition$reflection()]]);
}

function Parsimmon$$$parseRaw(input, parser) {
  return parser.parse(input);
}

function Parsimmon$$$parse(input$$1, parser$$1) {
  const result = parser$$1.parse(input$$1);

  if (result.status) {
    return (0, _Option.some)(result.value);
  } else {
    return null;
  }
}

const Parsimmon$$$index = _Parsimmon.index;
exports.Parsimmon$$$index = Parsimmon$$$index;

function Parsimmon$$$orTry(otherParser, parser$$2) {
  return parser$$2.or(otherParser);
}

function Parsimmon$$$times(n, parser$$3) {
  return parser$$3.times(n);
}

function Parsimmon$$$atLeast(n$$1, parser$$4) {
  return parser$$4.atLeast(n$$1);
}

function Parsimmon$$$atMost(n$$2, parser$$5) {
  return parser$$5.atMost(n$$2);
}

function Parsimmon$$$skip(skipped, keep) {
  return keep.skip(skipped);
}

function Parsimmon$$$many(parser$$6) {
  return parser$$6.many();
}

const Parsimmon$$$ofLazy = _Parsimmon.lazy;
exports.Parsimmon$$$ofLazy = Parsimmon$$$ofLazy;

function Parsimmon$$$seperateByAtLeastOne(seperator, parser$$7) {
  return parser$$7.sepBy1(seperator);
}

function Parsimmon$$$chain(after, before) {
  return before.then(after);
}

function Parsimmon$$$bind(f$$1, p) {
  return p.chain(f$$1);
}

const Parsimmon$$$letter = _Parsimmon.letter;
exports.Parsimmon$$$letter = Parsimmon$$$letter;

function Parsimmon$$$timesBetween(min, max, parser$$8) {
  return parser$$8.times(min, max);
}

const Parsimmon$$$letters = _Parsimmon.letters;
exports.Parsimmon$$$letters = Parsimmon$$$letters;
const Parsimmon$$$endOfFile = _Parsimmon.eof;
exports.Parsimmon$$$endOfFile = Parsimmon$$$endOfFile;

function Parsimmon$$$notFollowedBy(p$$1, before$$1) {
  return before$$1.notFollowedBy(p$$1);
}

const Parsimmon$$$succeed = _Parsimmon.succeed;
exports.Parsimmon$$$succeed = Parsimmon$$$succeed;
const Parsimmon$$$lookahead = _Parsimmon.lookahead;
exports.Parsimmon$$$lookahead = Parsimmon$$$lookahead;
const Parsimmon$$$digit = _Parsimmon.digit;
exports.Parsimmon$$$digit = Parsimmon$$$digit;
const Parsimmon$$$digits = Parsimmon$$$many(Parsimmon$$$digit);
exports.Parsimmon$$$digits = Parsimmon$$$digits;

function Parsimmon$$$fallback(value$$1, parser$$11) {
  return parser$$11.fallback(value$$1);
}

function Parsimmon$$$seperateBy(content, others) {
  return others.sepBy(content);
}

function Parsimmon$$$between(left, right, middle) {
  return Parsimmon$$$skip(right, Parsimmon$$$chain(middle, left));
}

function Parsimmon$$$map(f$$2, parser$$12) {
  return parser$$12.map(f$$2);
}

function Parsimmon$$$tie(parser$$13) {
  return Parsimmon$$$map(function (strings) {
    return (0, _String.join)("", ...strings);
  }, parser$$13);
}

const Parsimmon$$$any = _Parsimmon.any;
exports.Parsimmon$$$any = Parsimmon$$$any;

function Parsimmon$$$choose(ps) {
  return (0, _List.reduce)(function (acc, parser$$14) {
    return acc.or(parser$$14);
  }, ps);
}

const Parsimmon$$$all = _Parsimmon.all;
exports.Parsimmon$$$all = Parsimmon$$$all;
const Parsimmon$$$fail = _Parsimmon.fail;
exports.Parsimmon$$$fail = Parsimmon$$$fail;
const Parsimmon$$$satisfy = _Parsimmon.test;
exports.Parsimmon$$$satisfy = Parsimmon$$$satisfy;
const Parsimmon$$$takeWhile = _Parsimmon.takeWhile;
exports.Parsimmon$$$takeWhile = Parsimmon$$$takeWhile;
const Parsimmon$$$str = _Parsimmon.string;
exports.Parsimmon$$$str = Parsimmon$$$str;
const Parsimmon$$$oneOf = _Parsimmon.oneOf;
exports.Parsimmon$$$oneOf = Parsimmon$$$oneOf;
const Parsimmon$$$whitespace = _Parsimmon.whitespace;
exports.Parsimmon$$$whitespace = Parsimmon$$$whitespace;
const Parsimmon$$$optionalWhitespace = _Parsimmon.optWhitespace;
exports.Parsimmon$$$optionalWhitespace = Parsimmon$$$optionalWhitespace;

function Parsimmon$$$atLeastOneOrMany(parser$$15) {
  return Parsimmon$$$atLeast(1, parser$$15);
}

function Parsimmon$$$stringReturn(input$$5, value$$2) {
  return Parsimmon$$$map(function f$$5(_arg1) {
    return value$$2;
  }, Parsimmon$$$str(input$$5));
}

const Parsimmon$$$noneOf = _Parsimmon.noneOf;
exports.Parsimmon$$$noneOf = Parsimmon$$$noneOf;
const Parsimmon$$$seq2 = _Parsimmon.seq;
exports.Parsimmon$$$seq2 = Parsimmon$$$seq2;

function Parsimmon$$$trim(trimmed, p$$2) {
  return p$$2.trim(trimmed);
}

function Parsimmon$$$concat(parser$$17) {
  return parser$$17.map(function (strings$$1) {
    return (0, _String.join)("", ...strings$$1);
  });
}

const Parsimmon$$$seq3 = _Parsimmon.seq;
exports.Parsimmon$$$seq3 = Parsimmon$$$seq3;
const Parsimmon$$$seq4 = _Parsimmon.seq;
exports.Parsimmon$$$seq4 = Parsimmon$$$seq4;
const Parsimmon$$$seq5 = _Parsimmon.seq;
exports.Parsimmon$$$seq5 = Parsimmon$$$seq5;

function Parsimmon$$$node(description, p$$3) {
  return p$$3.node(description);
}