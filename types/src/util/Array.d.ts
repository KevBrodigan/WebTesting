/**
 * Converts the URL-safe base64 encoded |base64UrlData| to an Uint8Array buffer.
 * We need this to convert the String object passed for the Push Registration Key into the right format for testing.
 */
export declare function base64UrlToUint8Array(base64UrlData: any): Uint8Array;
