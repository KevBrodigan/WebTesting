import { SwrveCoreSDK, ResourceManager, IUserInfo, ISwrveCampaign, IDictionary, IReadonlyDictionary, IReward, ISwrveEmbeddedMessage, IUserResource } from "@swrve/web-core";
import SwrvePushManager from "./push/SwrvePushManager";
import { ISwrveSDKConfig } from "./interfaces/ISwrveSDKConfig";
/** Callbacks */
export type OnSwrveLoadedCallback = () => void;
export type OnResourcesLoadedCallback = (resources: ReadonlyArray<IUserResource> | null) => void;
export type GetResourcesCallback = (resources: ReadonlyArray<IUserResource>) => void;
export type GetUserResourcesDiffCallback = (oldDictionary: IDictionary<IUserResource>, newDictionary: IDictionary<IUserResource>, json: any) => any;
export declare class SwrveSDK {
    private static _instance;
    private static _swrvePushManager;
    private static _config;
    static initWithConfig(config: ISwrveSDKConfig, onLoaded?: OnSwrveLoadedCallback): SwrveSDK;
    static createInstance(config: ISwrveSDKConfig): SwrveSDK;
    private constructor();
    init(onLoaded?: OnSwrveLoadedCallback): void;
    static checkCoreInstance(): typeof SwrveCoreSDK;
    static getInstance(): SwrveSDK;
    static getUserInfo(): IUserInfo;
    static getUserId(): string;
    static getExternalUserId(): string | null;
    static getConfig(): Readonly<ISwrveSDKConfig>;
    static getSDKVersion(): string;
    static getRealTimeUserProperties(): IDictionary<string>;
    static event(name: string, payload?: IDictionary<string | number>): void;
    static userUpdate(attributes: IReadonlyDictionary<string | number | boolean>): void;
    static userUpdateWithDate(keyName: string, date: Date): void;
    static purchase(name: string, currency: string, cost: number, quantity: number): void;
    static iap(quantity: number, productId: string, productPrice: number, currency: string, rewards?: IReadonlyDictionary<IReward>): void;
    static currencyGiven(currencyGiven: string, amount: number): void;
    static sendQueuedEvents(): void;
    static shutdown(): void;
    static stopTracking(): void;
    static saveToStorage(): void;
    static getResourceManager(): ResourceManager;
    static onResourcesLoaded(callback: OnResourcesLoadedCallback): void;
    static getResources(callback: GetResourcesCallback): void;
    static getUserResourcesDiff(callback: GetUserResourcesDiffCallback): void;
    static embeddedMessageWasShownToUser(message: ISwrveEmbeddedMessage): void;
    static embeddedMessageButtonWasPressed(message: ISwrveEmbeddedMessage, buttonName: string): void;
    static getPersonalizedEmbeddedMessageData(message: ISwrveEmbeddedMessage, personalizationProperties: IDictionary<string>): string | null;
    static getPersonalizedText(text: string, personalizationProperties: IDictionary<string>): string | null;
    static getMessageCenterCampaigns(personalizationProperties?: IDictionary<string>): ISwrveCampaign[];
    static showMessageCenterCampaign(campaign: ISwrveCampaign, personalizationProperties?: IDictionary<string>): boolean;
    static markMessageCenterCampaignAsSeen(campaign: ISwrveCampaign): void;
    static removeMessageCenterCampaign(campaign: ISwrveCampaign): void;
    static initializePushManager(webPushApiKey: string): void;
    static getPushManager(): SwrvePushManager;
    static registerPush(onSuccess?: () => void, onFailure?: (error: Error) => void): void;
    static unregisterPush(onSuccess?: () => void, onFailure?: (err: Error) => void): void;
}
