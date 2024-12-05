"use strict";
/* tslint:disable:no-console */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var SwrveLogger = /** @class */ (function () {
    function SwrveLogger() {
    }
    SwrveLogger.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_level <= SwrveLogger.ERROR) {
            console.error.apply(console, __spreadArray([message], args, false));
        }
    };
    SwrveLogger.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_level <= SwrveLogger.WARN) {
            console.warn.apply(console, __spreadArray([message], args, false));
        }
    };
    SwrveLogger.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_level <= SwrveLogger.INFO) {
            console.log.apply(console, __spreadArray([message], args, false));
        }
    };
    SwrveLogger.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_level <= SwrveLogger.DEBUG) {
            console.log.apply(console, __spreadArray(["DEBUG:", message], args, false));
        }
    };
    SwrveLogger.level = function (level) {
        if (level === undefined) {
            return _level;
        }
        else {
            return (_level = level);
        }
    };
    SwrveLogger.DEBUG = 20;
    SwrveLogger.INFO = 30;
    SwrveLogger.WARN = 40;
    SwrveLogger.ERROR = 50;
    SwrveLogger.NONE = 100;
    return SwrveLogger;
}());
exports.default = SwrveLogger;
var _level = SwrveLogger.DEBUG; //TODO: change back to error when we figure out how to set it
