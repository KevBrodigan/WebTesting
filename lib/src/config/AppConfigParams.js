"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFlushRefreshDelay = exports.defaultFlushFrequency = exports.swrveVersion = exports.swrveServiceWorkerName = exports.swrveDefaultDBVersion = exports.swrveDefaultDBName = exports.webWorkerDbName = exports.messageConfig = void 0;
/** Console messages config */
exports.messageConfig = {
    title: 'Swrve WebSDK',
    types: {
        error: 'Error',
        info: 'Info',
        warn: 'Warning',
    },
};
exports.webWorkerDbName = 'SwrveWebWorkerDB';
exports.swrveDefaultDBName = 'SwrveWebSDK';
exports.swrveDefaultDBVersion = 1;
/** Swrve Push Registration ServiceWorker */
exports.swrveServiceWorkerName = 'SwrveWorker.js';
/** Swrve Event Schema Version */
exports.swrveVersion = 3;
/** Default flush config params */
exports.defaultFlushFrequency = 60 * 1000;
exports.defaultFlushRefreshDelay = 5 * 1000;
