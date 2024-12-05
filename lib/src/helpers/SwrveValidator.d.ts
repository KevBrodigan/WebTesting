import { ISwrveSDKConfig } from '../interfaces/ISwrveSDKConfig';
import { IValidateError } from '../interfaces/ISwrveValidator';
/** Validator Service(abstract class) */
declare abstract class SwrveValidator {
    /** Validates a externalUserId */
    static validateExternalUserId(userId: string | void): string[];
    /** Validates an appId */
    static validateAppId(appId: number | void): string[];
    /** Validates an apiKey */
    static validateApiKey(apiKey: string | void): string[];
    /** Validates a contentURL */
    static validateContentUrl(contentURL: string | void): string[];
    /** Validates a eventsUrl */
    static validateEventsUrl(eventsUrl: string | void): string[];
    /** Validates a apiURL */
    static validateVersion(version: string | void): string[];
    /** Validates a session timeout */
    static validateSessionTimeout(sessionTimeout: number | void): string[];
    /** Validates initial parameters passed to the SwrveSession constructor */
    static validateInitParams(params: ISwrveSDKConfig): IValidateError | void;
    static outputErrors(errors: IValidateError): void;
}
export default SwrveValidator;
