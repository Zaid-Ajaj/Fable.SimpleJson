"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$007CNativeString$007C_$007C = $007CNativeString$007C_$007C;
exports.$007CNativeBool$007C_$007C = $007CNativeBool$007C_$007C;
exports.$007CNativeNumber$007C_$007C = $007CNativeNumber$007C_$007C;
exports.$007CNativeObject$007C_$007C = $007CNativeObject$007C_$007C;
exports.$007CNull$007C_$007C = $007CNull$007C_$007C;
exports.$007CNativeArray$007C_$007C = $007CNativeArray$007C_$007C;

function $007CNativeString$007C_$007C(x) {
  if (typeof x === "string") {
    return x;
  } else {
    return null;
  }
}

function $007CNativeBool$007C_$007C(x$$1) {
  if (typeof x$$1 === "boolean") {
    return x$$1;
  } else {
    return null;
  }
}

function $007CNativeNumber$007C_$007C(x$$2) {
  if (typeof x$$2 === "number") {
    return x$$2;
  } else {
    return null;
  }
}

function $007CNativeObject$007C_$007C(x$$3) {
  if (typeof x$$3 === "object") {
    return x$$3;
  } else {
    return null;
  }
}

function $007CNull$007C_$007C(x$$4) {
  if (x$$4 == null) {
    return x$$4;
  } else {
    return null;
  }
}

function $007CNativeArray$007C_$007C(x$$5) {
  if (Array.isArray(x$$5)) {
    return x$$5;
  } else {
    return null;
  }
}