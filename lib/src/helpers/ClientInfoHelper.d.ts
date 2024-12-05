import { IBrowser, IClientOS, IScreen } from "../interfaces/IClientInfo";
import IDictionary from "../interfaces/IDictionary";
declare abstract class ClientInfoHelper {
    static getClientInfo(): IDictionary<string>;
    /** OS */
    static getOS(): IClientOS;
    /** Device name */
    static getDeviceName(): string;
    /** Screen Resolution */
    static getScreenResolution(): IScreen;
    static getDocumentHeight(): number;
    static getDocumentWidth(): number;
    static getAvailableScreenHeight(): number;
    static getAvailableScreenWidth(): number;
    /** Get the Language the Browser is set to */
    static getBrowserLanguage(): string;
    /** Timezone Name */
    static getTimezoneName(): string;
    /** UTC Offset(Seconds) */
    static getUTCOffsetSeconds(date: Date): number;
    /** CountryCode */
    static getCountryCode(): string;
    /** Region Info */
    static getRegion(): string;
    /** Device Type */
    static getDeviceType(): string;
    /** Browser Information */
    static getBrowserInfo(): IBrowser;
    static getSDKVersion(): string;
    private static extractBrowserVersion;
    private static checkBrowser;
}
export default ClientInfoHelper;
