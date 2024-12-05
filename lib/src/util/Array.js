"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64UrlToUint8Array = void 0;
/**
 * Converts the URL-safe base64 encoded |base64UrlData| to an Uint8Array buffer.
 * We need this to convert the String object passed for the Push Registration Key into the right format for testing.
 */
function base64UrlToUint8Array(base64UrlData) {
    var padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
    var base64 = (base64UrlData + padding).replace(/\-/g, '+').replace(/_/g, '/');
    var rawData = window.atob(base64);
    var buffer = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; i += 1) {
        buffer[i] = rawData.charCodeAt(i);
    }
    return buffer;
}
exports.base64UrlToUint8Array = base64UrlToUint8Array;
