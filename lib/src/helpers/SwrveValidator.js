"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfigParams_1 = require("../config/AppConfigParams");
var SwrveLogger_1 = __importDefault(require("../util/SwrveLogger"));
/** Main Error Title */
var urlExpr = /[(https):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
/** Validator Service(abstract class) */
var SwrveValidator = /** @class */ (function () {
    function SwrveValidator() {
    }
    /** Validates a externalUserId */
    SwrveValidator.validateExternalUserId = function (userId) {
        var errors = [];
        var type = 'string';
        if (userId != null && typeof userId !== type) {
            errors.push("externalUserId should be a ".concat(type));
        }
        return errors;
    };
    /** Validates an appId */
    SwrveValidator.validateAppId = function (appId) {
        var errors = [];
        if (!appId) {
            errors.push('appId doesn\'t exist');
        }
        var type = 'number';
        if (appId && isNaN(appId)) {
            errors.push("appId should be a ".concat(type));
        }
        return errors;
    };
    /** Validates an apiKey */
    SwrveValidator.validateApiKey = function (apiKey) {
        var errors = [];
        var websdkKeyPrefix = 'web_sdk-';
        if (!apiKey) {
            errors.push('apiKey doesn\'t exist');
        }
        var type = 'string';
        if (apiKey && typeof apiKey !== type) {
            errors.push("apiKey should be a ".concat(type));
        }
        if (apiKey && typeof apiKey === type && !apiKey.startsWith(websdkKeyPrefix)) {
            errors.push('apiKey should be a valid web_sdk api key');
        }
        return errors;
    };
    /** Validates a contentURL */
    SwrveValidator.validateContentUrl = function (contentURL) {
        var errors = [];
        var type = 'string';
        if (contentURL && typeof contentURL !== type) {
            errors.push("contentURL should be a ".concat(type));
        }
        var urlRegex = new RegExp(urlExpr);
        if (contentURL && !urlRegex.test(contentURL)) {
            errors.push('contentURL isn\'t valid URL');
        }
        return errors;
    };
    /** Validates a eventsUrl */
    SwrveValidator.validateEventsUrl = function (eventsUrl) {
        var errors = [];
        var type = 'string';
        if (eventsUrl && typeof eventsUrl !== type) {
            errors.push("eventsUrl should be a ".concat(type));
        }
        var urlRegex = new RegExp(urlExpr);
        if (eventsUrl && !urlRegex.test(eventsUrl)) {
            errors.push('eventsUrl isn\'t a valid URL');
        }
        return errors;
    };
    /** Validates a apiURL */
    SwrveValidator.validateVersion = function (version) {
        var errors = [];
        var type = 'string';
        if (version && typeof version !== type) {
            errors.push("version should be a ".concat(type));
        }
        var versionRegex = /(([0-9])+(\.([0-9])+)+)/;
        if (version && !versionRegex.test(version)) {
            errors.push('version isn\'t valid');
        }
        return errors;
    };
    /** Validates a session timeout */
    SwrveValidator.validateSessionTimeout = function (sessionTimeout) {
        var errors = [];
        var type = 'number';
        if (sessionTimeout && typeof sessionTimeout !== type) {
            errors.push("sessionTimeout should be a ".concat(type));
        }
        if (sessionTimeout && sessionTimeout < 0) {
            errors.push('sessionTimeout should be positive integer or 0');
        }
        return errors;
    };
    /** Validates initial parameters passed to the SwrveSession constructor */
    SwrveValidator.validateInitParams = function (params) {
        var errorObj = {};
        if (!params || Object.prototype.toString.call(params) !== '[object Object]') {
            errorObj.devErrors = [
                "Init params should follow the scheme:\n        {\n          externalUserId: string - *required\n          appId: number - *required\n          apiKey: string - *required\n          eventsUrl: string\n          contentUrl: string\n          sessionTimeout: number\n          version: string\n        }",
            ];
        }
        else {
            errorObj.devErrors = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], this.validateExternalUserId(params.externalUserId), true), this.validateApiKey(params.apiKey), true), this.validateAppId(params.appId), true), this.validateContentUrl(params.contentUrl), true), this.validateEventsUrl(params.eventsUrl), true), this.validateVersion(params.appVersion), true), this.validateSessionTimeout(params.httpsTimeoutSeconds), true);
        }
        if (errorObj.devErrors.length) {
            errorObj.mainError = 'Initial configuration parameters are incorrect';
            return errorObj;
        }
    };
    SwrveValidator.outputErrors = function (errors) {
        SwrveLogger_1.default.error("".concat(AppConfigParams_1.messageConfig.title, " ").concat(AppConfigParams_1.messageConfig.types.error, ": ").concat(errors.mainError));
        errors.devErrors.forEach(function (devError) {
            SwrveLogger_1.default.error(" ".concat(devError));
        });
    };
    return SwrveValidator;
}());
exports.default = SwrveValidator;
