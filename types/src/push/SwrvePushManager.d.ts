import { ISwrveSDKConfig } from "../interfaces/ISwrveSDKConfig";
export declare const serviceWorkerEventTypes: {
    swrvePushNotificationClicked: string;
    swrvePushNotificationClosed: string;
    swrvePushReceived: string;
};
declare class SwrvePushManager {
    private _isInitialized;
    private _eventFlushFreqency;
    private _pushEventLoopTimer;
    private _webPushToken;
    private _webPushApiKey;
    private _userId;
    private _config;
    private callBackPushReceived;
    private callBackPushClicked;
    private callBackPushClosed;
    constructor(config: ISwrveSDKConfig, onPushReceived?: () => void, onPushClicked?: () => void, onPushClosed?: () => void);
    get IsInitialized(): boolean;
    get WebPushApiKey(): string;
    init(webPushApiKey: string, userId: string): void;
    registerPush(onSuccess?: () => void, onFailure?: (err: Error) => void): Promise<void>;
    unregisterPush(onSuccess?: () => void, onFailure?: (err: Error) => void): Promise<void>;
    syncServiceWorkerThread(): Promise<void>;
    isPushSupported(): boolean;
    shutdown(): void;
    private registerPushListeners;
    private pushHandler;
    private check;
    private validatePushSubscription;
    private sendPushRegistrationProperties;
    private sendBrowserPermissions;
    private flushPushEventQueue;
    private fetchPushEvents;
    private setPushSession;
    private browserHasPermissionsAccess;
    private static sendPermissionsUpdate;
}
export default SwrvePushManager;
