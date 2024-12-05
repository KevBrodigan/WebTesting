"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osBlackList = exports.browserBlackList = exports.osRegex = exports.browsersRegex = exports.browserList = exports.SWRVE_NAV_LANGUAGE = exports.SWRVE_BROWSER_VERSION = exports.SWRVE_BROWSER_NAME = exports.SWRVE_DEVICE_TYPE = exports.SWRVE_UTC_OFFSET_SECONDS = exports.SWRVE_USER_ID = exports.SWRVE_TIMEZONE_NAME = exports.SWRVE_SDK_VERSION = exports.SWRVE_OS_VERSION = exports.SWRVE_OS = exports.SWRVE_LANGUAGE = exports.SWRVE_INSTALL_DATE = exports.SWRVE_DEVICE_DPI = exports.SWRVE_DEVICE_HEIGHT = exports.SWRVE_DEVICE_WIDTH = exports.SWRVE_DEVICE_REGION = exports.SWRVE_DEVICE_NAME = exports.SWRVE_DEVICE_ID = exports.SWRVE_COUNTRY_CODE = exports.SWRVE_APP_STORE = exports.appStore = exports.sdkVersion = void 0;
var package_json_1 = require("../../package.json");
exports.sdkVersion = "Web ".concat(package_json_1.version);
exports.appStore = 'web';
/** Common Swrve Device Update Properties */
exports.SWRVE_APP_STORE = 'swrve.app_store';
exports.SWRVE_COUNTRY_CODE = 'swrve.country_code';
exports.SWRVE_DEVICE_ID = 'swrve.device_id';
exports.SWRVE_DEVICE_NAME = 'swrve.device_name';
exports.SWRVE_DEVICE_REGION = 'swrve.device_region';
exports.SWRVE_DEVICE_WIDTH = 'swrve.device_width';
exports.SWRVE_DEVICE_HEIGHT = 'swrve.device_height';
exports.SWRVE_DEVICE_DPI = 'swrve.device_dpi';
exports.SWRVE_INSTALL_DATE = 'swrve.install_date';
exports.SWRVE_LANGUAGE = 'swrve.language';
exports.SWRVE_OS = 'swrve.os';
exports.SWRVE_OS_VERSION = 'swrve.os_version';
exports.SWRVE_SDK_VERSION = 'swrve.sdk_version';
exports.SWRVE_TIMEZONE_NAME = 'swrve.timezone_name';
exports.SWRVE_USER_ID = 'swrve.user_id';
exports.SWRVE_UTC_OFFSET_SECONDS = 'swrve.utc_offset_seconds';
exports.SWRVE_DEVICE_TYPE = 'swrve.device_type';
/** Unique to web-sdk Device Update Properties */
exports.SWRVE_BROWSER_NAME = 'swrve.browser_name';
exports.SWRVE_BROWSER_VERSION = 'swrve.browser_version';
/** Navigation Lookup */
exports.SWRVE_NAV_LANGUAGE = 'language';
/** Browser */
exports.browserList = ['chrome', 'opera', 'safari', 'firefox', 'msIE', 'Unknown'];
exports.browsersRegex = {
    appleWebkit: /applewebkit/,
    chrome: /chrome/,
    chromium: /chromium/,
    edge: /edge/,
    firefox: /firefox/,
    mozilla: /mozilla/,
    msIE: /msie/,
    opera: /opr/,
    safari: /safari/,
    seamonkey: /seamonkey/,
    trident: /trident/,
    webkit: /webkit/,
};
// tslint:disable-next-line:prefer-array-literal
exports.osRegex = [
    { name: 'Windows 10', regex: /(Windows 10.0|Windows NT 10.0)/ },
    { name: 'Windows 8.1', regex: /(Windows 8.1|Windows NT 6.3)/ },
    { name: 'Windows 8', regex: /(Windows 8|Windows NT 6.2)/ },
    { name: 'Windows 7', regex: /(Windows 7|Windows NT 6.1)/ },
    { name: 'Windows Vista', regex: /Windows NT 6.0/ },
    { name: 'Windows Server 2003', regex: /Windows NT 5.2/ },
    { name: 'Windows XP', regex: /(Windows NT 5.1|Windows XP)/ },
    { name: 'Windows 2000', regex: /(Windows NT 5.0|Windows 2000)/ },
    { name: 'Windows ME', regex: /(Win 9x 4.90|Windows ME)/ },
    { name: 'Windows 98', regex: /(Windows 98|Win98)/ },
    { name: 'Windows 95', regex: /(Windows 95|Win95|Windows_95)/ },
    { name: 'Windows NT 4.0', regex: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { name: 'Windows CE', regex: /Windows CE/ },
    { name: 'Windows 3.11', regex: /Win16/ },
    { name: 'Android', regex: /Android/ },
    { name: 'Open BSD', regex: /OpenBSD/ },
    { name: 'Sun OS', regex: /SunOS/ },
    { name: 'Linux', regex: /(Linux|X11)/ },
    { name: 'iOS', regex: /(iPhone|iPad|iPod)/ },
    { name: 'Mac OS X', regex: /Mac OS X/ },
    { name: 'Mac OS', regex: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { name: 'QNX', regex: /QNX/ },
    { name: 'UNIX', regex: /UNIX/ },
    { name: 'BeOS', regex: /BeOS/ },
    { name: 'OS/2', regex: /OS\/2/ },
    { name: 'Search Bot', regex: /(nuhk|Googlebot|Yammybot|python|ruby|curl|bingbot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
];
/** lists of items we do not officially support */
exports.browserBlackList = ['msIE'];
exports.osBlackList = ['Search Bot'];
