import { ISwrveWebPushConfig } from "@swrve/web-core";
import { ISwrveConfig } from "@swrve/web-core";
/** SwrveConfig Parameters */
export interface ISwrveSDKConfig extends ISwrveConfig {
    externalUserId: string;
    /** Push Parameters */
    pushEnabled?: boolean;
    serviceWorker?: string;
    autoPushSubscribe?: boolean;
    userVisibleOnly?: boolean;
    webPushConfig?: ISwrveWebPushConfig;
}
export interface IFlushConfig {
    flushFrequency: number;
    flushRefreshDelay: number;
}
