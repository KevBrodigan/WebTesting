"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SwrveLogger_1 = __importDefault(require("../util/SwrveLogger"));
var ClientInfoConstants_1 = require("./ClientInfoConstants");
var ClientInfoHelper = /** @class */ (function () {
    function ClientInfoHelper() {
    }
    ClientInfoHelper.getClientInfo = function () {
        var _a;
        var osInfo = this.getOS();
        var browserInfo = this.getBrowserInfo();
        return _a = {},
            _a[ClientInfoConstants_1.SWRVE_DEVICE_NAME] = this.getDeviceName(),
            _a[ClientInfoConstants_1.SWRVE_OS] = "web",
            _a[ClientInfoConstants_1.SWRVE_OS_VERSION] = osInfo.version,
            _a[ClientInfoConstants_1.SWRVE_SDK_VERSION] = this.getSDKVersion(),
            _a[ClientInfoConstants_1.SWRVE_LANGUAGE] = this.getBrowserLanguage(),
            _a[ClientInfoConstants_1.SWRVE_COUNTRY_CODE] = this.getCountryCode(),
            _a[ClientInfoConstants_1.SWRVE_DEVICE_REGION] = this.getRegion(),
            _a[ClientInfoConstants_1.SWRVE_TIMEZONE_NAME] = this.getTimezoneName(),
            _a[ClientInfoConstants_1.SWRVE_APP_STORE] = ClientInfoConstants_1.appStore,
            _a[ClientInfoConstants_1.SWRVE_BROWSER_NAME] = browserInfo.name,
            _a[ClientInfoConstants_1.SWRVE_BROWSER_VERSION] = browserInfo.version,
            _a[ClientInfoConstants_1.SWRVE_DEVICE_TYPE] = this.getDeviceType(),
            _a;
    };
    /** OS */
    ClientInfoHelper.getOS = function () {
        var clientOS = {};
        var versionInfo = navigator.userAgent.match(/\((.*?)\)/);
        if (versionInfo && versionInfo.length >= 2) {
            clientOS.version = versionInfo[1];
        }
        var os;
        for (var _i = 0, osRegex_1 = ClientInfoConstants_1.osRegex; _i < osRegex_1.length; _i++) {
            os = osRegex_1[_i];
            if (os.regex.test(navigator.userAgent)) {
                clientOS.name = os.name;
                break;
            }
        }
        return clientOS;
    };
    /** Device name */
    ClientInfoHelper.getDeviceName = function () {
        return "".concat(this.getOS().name, " ").concat(this.getBrowserInfo().name, " ").concat(this.getBrowserInfo().version);
    };
    /** Screen Resolution */
    ClientInfoHelper.getScreenResolution = function () {
        return {
            height: window.screen.availHeight.toString() || "Unknown",
            width: window.screen.availWidth.toString() || "Unknown",
        };
    };
    ClientInfoHelper.getDocumentHeight = function () {
        var body = document.body;
        var html = document.documentElement;
        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    };
    ClientInfoHelper.getDocumentWidth = function () {
        var body = document.body;
        var html = document.documentElement;
        return Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
    };
    ClientInfoHelper.getAvailableScreenHeight = function () {
        return typeof navigator !== "undefined" ? screen.availHeight : 0 || 0;
    };
    ClientInfoHelper.getAvailableScreenWidth = function () {
        // need to check each time because they might've resized their page
        return typeof navigator !== "undefined" ? screen.availWidth : 0 || 0;
    };
    /** Get the Language the Browser is set to */
    ClientInfoHelper.getBrowserLanguage = function () {
        /** Default language => Unknown */
        return navigator[ClientInfoConstants_1.SWRVE_NAV_LANGUAGE] ||
            navigator.language.split("-")[0] ||
            "Unknown";
    };
    /** Timezone Name */
    ClientInfoHelper.getTimezoneName = function () {
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return timezone || "Unknown";
    };
    /** UTC Offset(Seconds) */
    ClientInfoHelper.getUTCOffsetSeconds = function (date) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        // Returns the difference between local time and UTC time in minutes and thus for our system we need to invert
        // So UTC+1 returns -60 and UTC-1 returns 60
        var utcOffsetSeconds = date.getTimezoneOffset() * -60;
        // Javascript use IEEE 754 standard for floating point arithmetic
        // which allows for signed zero values. To avoid this madness being
        // pass to our backend we need to remove the sign information
        return utcOffsetSeconds === -0 ? 0 : utcOffsetSeconds;
    };
    /** CountryCode */
    ClientInfoHelper.getCountryCode = function () {
        var region = new Intl.Locale(navigator.language).region;
        return region || "Unknown";
    };
    /** Region Info */
    ClientInfoHelper.getRegion = function () {
        var region = new Intl.Locale(navigator.language).region;
        return region || "Unknown";
    };
    /** Device Type */
    ClientInfoHelper.getDeviceType = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/android|webos|iphone|ipad|ipod|ios|blackberry|iemobile|opera mini|mobi/i.test(ua)) {
            return "mobile";
        }
        return "desktop";
    };
    /** Browser Information */
    ClientInfoHelper.getBrowserInfo = function () {
        var clientBrowser = { name: "Unknown", version: "N/A" };
        var userAgent = navigator.userAgent.toLowerCase();
        var browsersInfo = this.checkBrowser();
        for (var key in browsersInfo) {
            if (browsersInfo[key]) {
                clientBrowser.name = key;
                clientBrowser.version = ClientInfoHelper.extractBrowserVersion(key, userAgent);
                return clientBrowser;
            }
        }
        SwrveLogger_1.default.error("Cannot identify browser");
        return clientBrowser;
    };
    ClientInfoHelper.getSDKVersion = function () {
        return ClientInfoConstants_1.sdkVersion;
    };
    ClientInfoHelper.extractBrowserVersion = function (key, userAgent) {
        var safariVersionRegex = new RegExp("version/(([0-9])+(.([0-9])+)+)");
        var defaultVersionRegex = new RegExp("rv:(([0-9])+(.([0-9])+)+)");
        var match;
        /** Safari Special */
        if (key === "safari") {
            match = userAgent.match(safariVersionRegex);
            return match ? match[1] : "N/A";
        }
        /** Microsoft Special */
        match = userAgent.match(new RegExp("(".concat(key === "msIE" ? "msIE|edge" : key, ")( |/)(([0-9])+(.([0-9])+)+)")));
        if (match) {
            return match[3] || "N/A";
        }
        /** Fallback Default */
        match = userAgent.match(defaultVersionRegex);
        return match ? match[1] : "N/A";
    };
    ClientInfoHelper.checkBrowser = function () {
        var uAgent = navigator.userAgent.toLowerCase();
        return {
            chrome: ClientInfoConstants_1.browsersRegex.webkit.test(uAgent) &&
                ClientInfoConstants_1.browsersRegex.chrome.test(uAgent) &&
                !ClientInfoConstants_1.browsersRegex.edge.test(uAgent) &&
                !ClientInfoConstants_1.browsersRegex.chromium.test(uAgent),
            firefox: ClientInfoConstants_1.browsersRegex.mozilla.test(uAgent) &&
                ClientInfoConstants_1.browsersRegex.firefox.test(uAgent) &&
                !ClientInfoConstants_1.browsersRegex.seamonkey.test(uAgent),
            msIE: ClientInfoConstants_1.browsersRegex.msIE.test(uAgent) ||
                ClientInfoConstants_1.browsersRegex.trident.test(uAgent) ||
                ClientInfoConstants_1.browsersRegex.edge.test(uAgent),
            opera: ClientInfoConstants_1.browsersRegex.mozilla.test(uAgent) &&
                ClientInfoConstants_1.browsersRegex.appleWebkit.test(uAgent) &&
                ClientInfoConstants_1.browsersRegex.chrome.test(uAgent) &&
                ClientInfoConstants_1.browsersRegex.safari.test(uAgent) &&
                ClientInfoConstants_1.browsersRegex.opera.test(uAgent),
            safari: ClientInfoConstants_1.browsersRegex.safari.test(uAgent) &&
                ClientInfoConstants_1.browsersRegex.appleWebkit.test(uAgent) &&
                !ClientInfoConstants_1.browsersRegex.chrome.test(uAgent),
        };
    };
    return ClientInfoHelper;
}());
exports.default = ClientInfoHelper;
