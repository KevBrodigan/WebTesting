import { IBrowsersRegex } from '../interfaces/IClientInfo';
export declare const sdkVersion: string;
export declare const appStore = "web";
/** Common Swrve Device Update Properties */
export declare const SWRVE_APP_STORE = "swrve.app_store";
export declare const SWRVE_COUNTRY_CODE = "swrve.country_code";
export declare const SWRVE_DEVICE_ID = "swrve.device_id";
export declare const SWRVE_DEVICE_NAME = "swrve.device_name";
export declare const SWRVE_DEVICE_REGION = "swrve.device_region";
export declare const SWRVE_DEVICE_WIDTH = "swrve.device_width";
export declare const SWRVE_DEVICE_HEIGHT = "swrve.device_height";
export declare const SWRVE_DEVICE_DPI = "swrve.device_dpi";
export declare const SWRVE_INSTALL_DATE = "swrve.install_date";
export declare const SWRVE_LANGUAGE = "swrve.language";
export declare const SWRVE_OS = "swrve.os";
export declare const SWRVE_OS_VERSION = "swrve.os_version";
export declare const SWRVE_SDK_VERSION = "swrve.sdk_version";
export declare const SWRVE_TIMEZONE_NAME = "swrve.timezone_name";
export declare const SWRVE_USER_ID = "swrve.user_id";
export declare const SWRVE_UTC_OFFSET_SECONDS = "swrve.utc_offset_seconds";
export declare const SWRVE_DEVICE_TYPE = "swrve.device_type";
/** Unique to web-sdk Device Update Properties */
export declare const SWRVE_BROWSER_NAME = "swrve.browser_name";
export declare const SWRVE_BROWSER_VERSION = "swrve.browser_version";
/** Navigation Lookup */
export declare const SWRVE_NAV_LANGUAGE = "language";
/** Browser */
export declare const browserList: string[];
export declare const browsersRegex: IBrowsersRegex;
export declare const osRegex: Array<{
    name: string;
    regex: RegExp;
}>;
/** lists of items we do not officially support */
export declare const browserBlackList: string[];
export declare const osBlackList: string[];
