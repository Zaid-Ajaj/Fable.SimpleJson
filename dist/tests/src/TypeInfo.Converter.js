"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$007CPrimitiveType$007C_$007C = $007CPrimitiveType$007C_$007C;
exports.$007CRecordType$007C_$007C = $007CRecordType$007C_$007C;
exports.$007CSetType$007C_$007C = $007CSetType$007C_$007C;
exports.$007CUnionType$007C_$007C = $007CUnionType$007C_$007C;
exports.$007CMapType$007C_$007C = $007CMapType$007C_$007C;
exports.$007CListType$007C_$007C = $007CListType$007C_$007C;
exports.flattenFuncTypes = flattenFuncTypes;
exports.$007CFuncType$007C_$007C = $007CFuncType$007C_$007C;
exports.$007CArrayType$007C_$007C = $007CArrayType$007C_$007C;
exports.$007COptionType$007C_$007C = $007COptionType$007C_$007C;
exports.$007CTupleType$007C_$007C = $007CTupleType$007C_$007C;
exports.$007CSeqType$007C_$007C = $007CSeqType$007C_$007C;
exports.$007CDictionaryType$007C_$007C = $007CDictionaryType$007C_$007C;
exports.$007CResizeArrayType$007C_$007C = $007CResizeArrayType$007C_$007C;
exports.$007CHashSetType$007C_$007C = $007CHashSetType$007C_$007C;
exports.$007CAsyncType$007C_$007C = $007CAsyncType$007C_$007C;
exports.$007CPromiseType$007C_$007C = $007CPromiseType$007C_$007C;
exports.createTypeInfo = createTypeInfo;
exports.Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F = Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F;
exports.isPrimitive = isPrimitive;
exports.enumUnion = enumUnion;

var _Reflection = require("../fable-library.2.3.14/Reflection");

var _TypeInfo = require("./TypeInfo");

var _Array = require("../fable-library.2.3.14/Array");

var _Seq = require("../fable-library.2.3.14/Seq");

function $007CPrimitiveType$007C_$007C(primType) {
  const matchValue = (0, _Reflection.fullName)(primType);

  switch (matchValue) {
    case "System.String":
      {
        return new _TypeInfo.TypeInfo(1, "String");
      }

    case "System.Int16":
      {
        return new _TypeInfo.TypeInfo(10, "Short");
      }

    case "System.Int32":
      {
        return new _TypeInfo.TypeInfo(5, "Int32");
      }

    case "System.Int64":
      {
        return new _TypeInfo.TypeInfo(11, "Long");
      }

    case "System.UInt16":
      {
        return new _TypeInfo.TypeInfo(2, "UInt16");
      }

    case "System.UInt32":
      {
        return new _TypeInfo.TypeInfo(3, "UInt32");
      }

    case "System.UInt64":
      {
        return new _TypeInfo.TypeInfo(4, "UInt64");
      }

    case "System.DateTime":
      {
        return new _TypeInfo.TypeInfo(13, "DateTime");
      }

    case "System.TimeSpan":
      {
        return new _TypeInfo.TypeInfo(16, "TimeSpan");
      }

    case "System.DateTimeOffset":
      {
        return new _TypeInfo.TypeInfo(14, "DateTimeOffset");
      }

    case "System.Boolean":
      {
        return new _TypeInfo.TypeInfo(6, "Bool");
      }

    case "System.Single":
      {
        return new _TypeInfo.TypeInfo(7, "Float32");
      }

    case "System.Double":
      {
        return new _TypeInfo.TypeInfo(8, "Float");
      }

    case "System.Decimal":
      {
        return new _TypeInfo.TypeInfo(9, "Decimal");
      }

    case "System.Numerics.BigInteger":
      {
        return new _TypeInfo.TypeInfo(15, "BigInt");
      }

    case "Microsoft.FSharp.Core.Unit":
      {
        return new _TypeInfo.TypeInfo(0, "Unit");
      }

    case "System.Guid":
      {
        return new _TypeInfo.TypeInfo(17, "Guid");
      }

    case "System.Byte":
      {
        return new _TypeInfo.TypeInfo(12, "Byte");
      }

    default:
      {
        return null;
      }
  }
}

function $007CRecordType$007C_$007C(t) {
  if ((0, _Reflection.isRecord)(t)) {
    return (0, _Array.map)(function mapping(prop) {
      return [(0, _Reflection.name)(prop), prop[1]];
    }, (0, _Reflection.getRecordElements)(t), Array);
  } else {
    return null;
  }
}

function $007CSetType$007C_$007C(t$$1) {
  if ((0, _Reflection.fullName)(t$$1).indexOf("Microsoft.FSharp.Collections.FSharpSet`1") === 0) {
    return (0, _Reflection.getGenerics)(t$$1)[0];
  } else {
    return null;
  }
}

function $007CUnionType$007C_$007C(t$$2) {
  if ((0, _Reflection.isUnion)(t$$2)) {
    return (0, _Array.map)(function mapping$$2(info) {
      const caseName = (0, _Reflection.name)(info);
      const caseTypes = (0, _Array.map)(function mapping$$1(prop$$1) {
        return prop$$1[1];
      }, (0, _Reflection.getUnionCaseFields)(info), Array);
      return [caseName, info, caseTypes];
    }, (0, _Reflection.getUnionCases)(t$$2), Array);
  } else {
    return null;
  }
}

function $007CMapType$007C_$007C(t$$3) {
  if ((0, _Reflection.fullName)(t$$3).indexOf("Microsoft.FSharp.Collections.FSharpMap`2") === 0) {
    const genArgs = (0, _Reflection.getGenerics)(t$$3);
    return [genArgs[0], genArgs[1]];
  } else {
    return null;
  }
}

function $007CListType$007C_$007C(t$$4) {
  if ((0, _Reflection.fullName)(t$$4).indexOf("Microsoft.FSharp.Collections.FSharpList`1") === 0) {
    return (0, _Reflection.getGenerics)(t$$4)[0];
  } else {
    return null;
  }
}

function flattenFuncTypes(typeDef) {
  return (0, _Array.ofSeq)((0, _Seq.delay)(function () {
    if ((0, _Reflection.isFunction)(typeDef)) {
      const patternInput = (0, _Reflection.getFunctionElements)(typeDef);
      return (0, _Seq.append)(flattenFuncTypes(patternInput[0]), (0, _Seq.delay)(function () {
        return flattenFuncTypes(patternInput[1]);
      }));
    } else {
      return (0, _Seq.singleton)(typeDef);
    }
  }), Array);
}

function $007CFuncType$007C_$007C(t$$5) {
  if ((0, _Reflection.isFunction)(t$$5)) {
    return flattenFuncTypes(t$$5);
  } else {
    return null;
  }
}

function $007CArrayType$007C_$007C(t$$6) {
  if ((0, _Reflection.isArray)(t$$6)) {
    return (0, _Reflection.getElementType)(t$$6);
  } else {
    return null;
  }
}

function $007COptionType$007C_$007C(t$$7) {
  if ((0, _Reflection.fullName)(t$$7).indexOf("Microsoft.FSharp.Core.FSharpOption`1") === 0) {
    return (0, _Reflection.getGenerics)(t$$7)[0];
  } else {
    return null;
  }
}

function $007CTupleType$007C_$007C(t$$8) {
  if ((0, _Reflection.isTuple)(t$$8)) {
    return (0, _Reflection.getTupleElements)(t$$8);
  } else {
    return null;
  }
}

function $007CSeqType$007C_$007C(t$$9) {
  if ((0, _Reflection.fullName)(t$$9).indexOf("System.Collections.Generic.IEnumerable`1") === 0) {
    return (0, _Reflection.getGenerics)(t$$9)[0];
  } else {
    return null;
  }
}

function $007CDictionaryType$007C_$007C(t$$10) {
  if ((0, _Reflection.fullName)(t$$10).indexOf("System.Collections.Generic.Dictionary") === 0) {
    const genArgs$$1 = (0, _Reflection.getGenerics)(t$$10);
    return [genArgs$$1[0], genArgs$$1[1]];
  } else {
    return null;
  }
}

function $007CResizeArrayType$007C_$007C(t$$11) {
  if ((0, _Reflection.fullName)(t$$11).indexOf("System.Collections.Generic.List") === 0) {
    return (0, _Reflection.getGenerics)(t$$11)[0];
  } else {
    return null;
  }
}

function $007CHashSetType$007C_$007C(t$$12) {
  if ((0, _Reflection.fullName)(t$$12).indexOf("System.Collections.Generic.HashSet") === 0) {
    return (0, _Reflection.getGenerics)(t$$12)[0];
  } else {
    return null;
  }
}

function $007CAsyncType$007C_$007C(t$$13) {
  if ((0, _Reflection.fullName)(t$$13).indexOf("Microsoft.FSharp.Control.FSharpAsync`1") === 0) {
    return (0, _Reflection.getGenerics)(t$$13)[0];
  } else {
    return null;
  }
}

function $007CPromiseType$007C_$007C(t$$14) {
  if ((0, _Reflection.fullName)(t$$14).indexOf("Fable.Core.JS.Promise`1") === 0) {
    return (0, _Reflection.getGenerics)(t$$14)[0];
  } else {
    return null;
  }
}

function createTypeInfo(resolvedType) {
  const activePatternResult450 = $007CPrimitiveType$007C_$007C(resolvedType);

  if (activePatternResult450 != null) {
    const typeInfo = activePatternResult450;
    return typeInfo;
  } else {
    const activePatternResult449 = $007CFuncType$007C_$007C(resolvedType);

    if (activePatternResult449 != null) {
      const types = activePatternResult449;
      return new _TypeInfo.TypeInfo(31, "Func", function () {
        return (0, _Array.map)(createTypeInfo, types, Array);
      });
    } else {
      const activePatternResult448 = $007CRecordType$007C_$007C(resolvedType);

      if (activePatternResult448 != null) {
        const fields = activePatternResult448;

        const arg0$$13 = function arg0$$13() {
          const fields$$1 = (0, _Array.ofSeq)((0, _Seq.delay)(function () {
            return (0, _Seq.collect)(function (matchValue$$1) {
              return (0, _Seq.singleton)(new _TypeInfo.RecordField(matchValue$$1[0], createTypeInfo(matchValue$$1[1])));
            }, fields);
          }), Array);
          return [fields$$1, resolvedType];
        };

        return new _TypeInfo.TypeInfo(32, "Record", arg0$$13);
      } else {
        const activePatternResult447 = $007CUnionType$007C_$007C(resolvedType);

        if (activePatternResult447 != null) {
          const cases = activePatternResult447;

          const arg0$$14 = function arg0$$14() {
            return [(0, _Array.ofSeq)((0, _Seq.delay)(function () {
              return (0, _Seq.collect)(function (matchValue$$2) {
                return (0, _Seq.singleton)(new _TypeInfo.UnionCase(matchValue$$2[0], (0, _Array.map)(createTypeInfo, matchValue$$2[2], Array), matchValue$$2[1]));
              }, cases);
            }), Array), resolvedType];
          };

          return new _TypeInfo.TypeInfo(33, "Union", arg0$$14);
        } else {
          const activePatternResult446 = $007CListType$007C_$007C(resolvedType);

          if (activePatternResult446 != null) {
            const elemType = activePatternResult446;
            return new _TypeInfo.TypeInfo(22, "List", function () {
              return createTypeInfo(elemType);
            });
          } else {
            const activePatternResult445 = $007CResizeArrayType$007C_$007C(resolvedType);

            if (activePatternResult445 != null) {
              const elemType$$1 = activePatternResult445;
              return new _TypeInfo.TypeInfo(29, "ResizeArray", function () {
                return createTypeInfo(elemType$$1);
              });
            } else {
              const activePatternResult444 = $007CHashSetType$007C_$007C(resolvedType);

              if (activePatternResult444 != null) {
                const elemType$$2 = activePatternResult444;
                return new _TypeInfo.TypeInfo(30, "HashSet", function () {
                  return createTypeInfo(elemType$$2);
                });
              } else {
                const activePatternResult443 = $007CArrayType$007C_$007C(resolvedType);

                if (activePatternResult443 != null) {
                  const elemType$$3 = activePatternResult443;
                  return new _TypeInfo.TypeInfo(24, "Array", function () {
                    return createTypeInfo(elemType$$3);
                  });
                } else {
                  const activePatternResult442 = $007CTupleType$007C_$007C(resolvedType);

                  if (activePatternResult442 != null) {
                    const types$$1 = activePatternResult442;
                    return new _TypeInfo.TypeInfo(26, "Tuple", function () {
                      return (0, _Array.map)(createTypeInfo, types$$1, Array);
                    });
                  } else {
                    const activePatternResult441 = $007COptionType$007C_$007C(resolvedType);

                    if (activePatternResult441 != null) {
                      const elemType$$4 = activePatternResult441;
                      return new _TypeInfo.TypeInfo(21, "Option", function () {
                        return createTypeInfo(elemType$$4);
                      });
                    } else {
                      const activePatternResult440 = $007CSetType$007C_$007C(resolvedType);

                      if (activePatternResult440 != null) {
                        const elemType$$5 = activePatternResult440;
                        return new _TypeInfo.TypeInfo(23, "Set", function () {
                          return createTypeInfo(elemType$$5);
                        });
                      } else {
                        const activePatternResult439 = $007CMapType$007C_$007C(resolvedType);

                        if (activePatternResult439 != null) {
                          const keyType = activePatternResult439[0];
                          const valueType = activePatternResult439[1];
                          return new _TypeInfo.TypeInfo(27, "Map", function () {
                            return [createTypeInfo(keyType), createTypeInfo(valueType)];
                          });
                        } else {
                          const activePatternResult438 = $007CDictionaryType$007C_$007C(resolvedType);

                          if (activePatternResult438 != null) {
                            const keyType$$1 = activePatternResult438[0];
                            const valueType$$1 = activePatternResult438[1];
                            return new _TypeInfo.TypeInfo(28, "Dictionary", function () {
                              return [createTypeInfo(keyType$$1), createTypeInfo(valueType$$1)];
                            });
                          } else {
                            const activePatternResult437 = $007CSeqType$007C_$007C(resolvedType);

                            if (activePatternResult437 != null) {
                              const elemType$$6 = activePatternResult437;
                              return new _TypeInfo.TypeInfo(25, "Seq", function () {
                                return createTypeInfo(elemType$$6);
                              });
                            } else {
                              const activePatternResult436 = $007CAsyncType$007C_$007C(resolvedType);

                              if (activePatternResult436 != null) {
                                const elemType$$7 = activePatternResult436;
                                return new _TypeInfo.TypeInfo(19, "Async", function () {
                                  return createTypeInfo(elemType$$7);
                                });
                              } else {
                                const activePatternResult435 = $007CPromiseType$007C_$007C(resolvedType);

                                if (activePatternResult435 != null) {
                                  const elemType$$8 = activePatternResult435;
                                  return new _TypeInfo.TypeInfo(20, "Promise", function () {
                                    return createTypeInfo(elemType$$8);
                                  });
                                } else {
                                  return new _TypeInfo.TypeInfo(18, "Any", function () {
                                    return resolvedType;
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function Fable$002ESimpleJson$002ETypeInfo$$TypeInfo$002EcreateFrom$002EStatic$$Z3747C43F(resolver) {
  const resolvedType$$4 = resolver.ResolveType();
  return createTypeInfo(resolvedType$$4);
}

function isPrimitive(_arg1) {
  switch (_arg1.tag) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 17:
    case 21:
      {
        return true;
      }

    default:
      {
        const otherwise = _arg1;
        return false;
      }
  }
}

function enumUnion(_arg1$$1) {
  if (_arg1$$1.tag === 33) {
    const getCases = _arg1$$1.fields[0];
    return getCases()[0].every(function predicate(case$) {
      return case$.CaseTypes.length === 0;
    });
  } else {
    const otherwise$$1 = _arg1$$1;
    return false;
  }
}