import { ISwrveSDKConfig } from '../interfaces/ISwrveSDKConfig';
declare class SwrveConfig {
    private externalUserId;
    private pushEnabled;
    private autoPushSubscribe;
    private userVisibleOnly?;
    private serviceWorker;
    constructor(config: ISwrveSDKConfig);
    get ExternalUserId(): string;
    get ServiceWorker(): string;
    get AutoPushSubscribe(): boolean;
    get UserVisibleOnly(): boolean;
}
export default SwrveConfig;
