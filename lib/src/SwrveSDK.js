"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwrveSDK = void 0;
var WebPlatformBridge_1 = __importDefault(require("./platform/WebPlatformBridge"));
var web_core_1 = require("@swrve/web-core");
var SwrvePushManager_1 = __importDefault(require("./push/SwrvePushManager"));
var SwrveLogger_1 = __importDefault(require("./util/SwrveLogger"));
var ClientInfoConstants_1 = require("./helpers/ClientInfoConstants");
var SwrveValidator_1 = __importDefault(require("./helpers/SwrveValidator"));
var webApiKeyCallback = function (key, autoSubscribe) {
    /** Initialize Push Manager */
    SwrveLogger_1.default.debug("Initializing PushManager with WebPushAPIKey: ".concat(key));
    SwrveSDK.initializePushManager(key);
    if (autoSubscribe) {
        /** Register for push if auto subscribe */
        SwrveLogger_1.default.debug("autoPushSubscribe: ON");
        SwrveSDK.registerPush();
    }
    else {
        SwrveLogger_1.default.debug("SwrvePushManager Will not register for push. Auto subscribe is disabled");
    }
};
var _swrveCoreSDK = null;
var SwrveSDK = /** @class */ (function () {
    function SwrveSDK(config) {
        _swrveCoreSDK = web_core_1.SwrveCoreSDK.createInstance(config, {
            platform: new WebPlatformBridge_1.default(),
        });
    }
    SwrveSDK.initWithConfig = function (config, onLoaded) {
        SwrveSDK.createInstance(config);
        SwrveSDK._instance.init(onLoaded);
        return SwrveSDK._instance;
    };
    SwrveSDK.createInstance = function (config) {
        if (config.apiKey.toLowerCase().startsWith("secret-")) {
            throw Error("API Key ".concat(config.apiKey, " is invalid. It should not start with 'secret-'"));
        }
        if (SwrveSDK._instance)
            return SwrveSDK._instance;
        var errors = SwrveValidator_1.default.validateInitParams(config);
        if (errors) {
            SwrveValidator_1.default.outputErrors(errors);
            if (errors.devErrors.length == 1) {
                throw new Error(errors.devErrors[0]);
            }
            else {
                throw new Error("Multiple issues found with configuration");
            }
        }
        this._swrvePushManager = new SwrvePushManager_1.default(config);
        /**  Apply WebAPI Config callback  */
        config.webPushConfig = {
            webApiKeyCallback: webApiKeyCallback,
            autoPushSubscribe: config.autoPushSubscribe,
        };
        this._config = config;
        SwrveSDK._instance = new SwrveSDK(this._config);
        return SwrveSDK._instance;
    };
    SwrveSDK.prototype.init = function (onLoaded) {
        if (_swrveCoreSDK == null)
            throw Error("Please call SwrveSDK.createInstance() first.");
        _swrveCoreSDK.init(onLoaded);
    };
    SwrveSDK.checkCoreInstance = function () {
        if (_swrveCoreSDK == null)
            throw Error("Please call SwrveSDK.createInstance() first.");
        return web_core_1.SwrveCoreSDK;
    };
    //*************************************** Accessor methods ************************************//
    SwrveSDK.getInstance = function () {
        if (SwrveSDK._instance == null)
            throw Error("Please call SwrveSDK.createInstance() first.");
        return SwrveSDK._instance;
    };
    SwrveSDK.getUserInfo = function () {
        return SwrveSDK.checkCoreInstance().getUserInfo();
    };
    SwrveSDK.getUserId = function () {
        return SwrveSDK.checkCoreInstance().getUserId();
    };
    SwrveSDK.getExternalUserId = function () {
        return SwrveSDK.checkCoreInstance().getExternalUserId();
    };
    SwrveSDK.getConfig = function () {
        var coreConfig = SwrveSDK.checkCoreInstance().getConfig();
        coreConfig.externalUserId = this._config.externalUserId;
        return coreConfig;
    };
    SwrveSDK.getSDKVersion = function () {
        return ClientInfoConstants_1.sdkVersion;
    };
    SwrveSDK.getRealTimeUserProperties = function () {
        return SwrveSDK.checkCoreInstance().getRealTimeUserProperties();
    };
    //*************************************** Event Management ************************************//
    SwrveSDK.event = function (name, payload) {
        if (payload === void 0) { payload = {}; }
        SwrveSDK.checkCoreInstance().event(name, payload);
    };
    SwrveSDK.userUpdate = function (attributes) {
        SwrveSDK.checkCoreInstance().userUpdate(attributes);
    };
    SwrveSDK.userUpdateWithDate = function (keyName, date) {
        SwrveSDK.checkCoreInstance().userUpdateWithDate(keyName, date);
    };
    SwrveSDK.purchase = function (name, currency, cost, quantity) {
        SwrveSDK.checkCoreInstance().purchase(name, currency, cost, quantity);
    };
    SwrveSDK.iap = function (quantity, productId, productPrice, currency, rewards) {
        SwrveSDK.checkCoreInstance().iap(quantity, productId, productPrice, currency, rewards);
    };
    SwrveSDK.currencyGiven = function (currencyGiven, amount) {
        SwrveSDK.checkCoreInstance().currencyGiven(currencyGiven, amount);
    };
    SwrveSDK.sendQueuedEvents = function () {
        SwrveSDK.checkCoreInstance().sendQueuedEvents();
    };
    //*************************************** Lifecycle Management ************************************//
    SwrveSDK.shutdown = function () {
        // ensure the background thread is closed for push event sync loop
        if (this._swrvePushManager) {
            this._swrvePushManager.shutdown();
        }
        SwrveSDK.checkCoreInstance().shutdown();
        _swrveCoreSDK = null;
        SwrveSDK._instance = null;
    };
    SwrveSDK.stopTracking = function () {
        SwrveSDK.checkCoreInstance().stopTracking();
    };
    //*************************************** Other ************************************//
    SwrveSDK.saveToStorage = function () {
        SwrveSDK.checkCoreInstance().saveToStorage();
    };
    //*************************************** User Resources *****************************//
    SwrveSDK.getResourceManager = function () {
        return SwrveSDK.checkCoreInstance().getResourceManager();
    };
    SwrveSDK.onResourcesLoaded = function (callback) {
        SwrveSDK.checkCoreInstance().onResourcesLoaded(callback);
    };
    SwrveSDK.getResources = function (callback) {
        SwrveSDK.checkCoreInstance().getUserResources(callback);
    };
    SwrveSDK.getUserResourcesDiff = function (callback) {
        SwrveSDK.checkCoreInstance().getUserResourcesDiff(callback);
    };
    //*************************************** Embedded Campaigns *****************************//
    SwrveSDK.embeddedMessageWasShownToUser = function (message) {
        SwrveSDK.checkCoreInstance().embeddedMessageWasShownToUser(message);
    };
    SwrveSDK.embeddedMessageButtonWasPressed = function (message, buttonName) {
        SwrveSDK.checkCoreInstance().embeddedMessageButtonWasPressed(message, buttonName);
    };
    SwrveSDK.getPersonalizedEmbeddedMessageData = function (message, personalizationProperties) {
        return SwrveSDK.checkCoreInstance().getPersonalizedEmbeddedMessageData(message, personalizationProperties);
    };
    SwrveSDK.getPersonalizedText = function (text, personalizationProperties) {
        return SwrveSDK.checkCoreInstance().getPersonalizedText(text, personalizationProperties);
    };
    //*************************************** Message Center ******************************//
    SwrveSDK.getMessageCenterCampaigns = function (personalizationProperties) {
        return SwrveSDK.checkCoreInstance().getMessageCenterCampaigns(personalizationProperties);
    };
    SwrveSDK.showMessageCenterCampaign = function (campaign, personalizationProperties) {
        return SwrveSDK.checkCoreInstance().showMessageCenterCampaign(campaign, personalizationProperties);
    };
    SwrveSDK.markMessageCenterCampaignAsSeen = function (campaign) {
        SwrveSDK.checkCoreInstance().markMessageCenterCampaignAsSeen(campaign);
    };
    SwrveSDK.removeMessageCenterCampaign = function (campaign) {
        SwrveSDK.checkCoreInstance().removeMessageCenterCampaign(campaign);
    };
    //**************************************** Push Management ****************************//
    SwrveSDK.initializePushManager = function (webPushApiKey) {
        var userId = SwrveSDK.checkCoreInstance().getUserId();
        this._swrvePushManager.init(webPushApiKey, userId);
    };
    SwrveSDK.getPushManager = function () {
        return this._swrvePushManager;
    };
    SwrveSDK.registerPush = function (onSuccess, onFailure) {
        SwrveSDK.checkCoreInstance();
        this._swrvePushManager.registerPush(onSuccess, onFailure);
    };
    SwrveSDK.unregisterPush = function (onSuccess, onFailure) {
        SwrveSDK.checkCoreInstance();
        this._swrvePushManager.unregisterPush(onSuccess, onFailure);
    };
    SwrveSDK._instance = null;
    SwrveSDK._swrvePushManager = null;
    SwrveSDK._config = null;
    return SwrveSDK;
}());
exports.SwrveSDK = SwrveSDK;
