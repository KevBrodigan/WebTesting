"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noOp = exports.isPresent = exports.isNil = void 0;
function isNil(variable) {
    return (variable === undefined || variable === null);
}
exports.isNil = isNil;
function isPresent(variable) {
    return !isNil(variable);
}
exports.isPresent = isPresent;
function noOp() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Function();
}
exports.noOp = noOp;
