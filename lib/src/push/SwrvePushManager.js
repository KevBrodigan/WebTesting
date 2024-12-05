"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceWorkerEventTypes = void 0;
var SwrveSDK_1 = require("../SwrveSDK");
var Array_1 = require("../util/Array");
var Nil_1 = require("../util/Nil");
var SwrveLogger_1 = __importDefault(require("../util/SwrveLogger"));
exports.serviceWorkerEventTypes = {
    swrvePushNotificationClicked: "swrve.push_clicked",
    swrvePushNotificationClosed: "swrve.push_closed",
    swrvePushReceived: "swrve.push_received",
};
var SwrvePushManager = /** @class */ (function () {
    function SwrvePushManager(config, onPushReceived, onPushClicked, onPushClosed) {
        this._isInitialized = false;
        this._eventFlushFreqency = 30000;
        this._config = config;
        this.callBackPushReceived = onPushReceived || Nil_1.noOp;
        this.callBackPushClicked = onPushClicked || Nil_1.noOp;
        this.callBackPushClosed = onPushClosed || Nil_1.noOp;
    }
    Object.defineProperty(SwrvePushManager.prototype, "IsInitialized", {
        get: function () {
            return this._isInitialized;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SwrvePushManager.prototype, "WebPushApiKey", {
        get: function () {
            return this._webPushApiKey;
        },
        enumerable: false,
        configurable: true
    });
    SwrvePushManager.prototype.init = function (webPushApiKey, userId) {
        var _this = this;
        if (this.IsInitialized) {
            SwrveLogger_1.default.debug("SwrvePushManager :: Already Initialized");
            return;
        }
        if (!this.isPushSupported()) {
            SwrveLogger_1.default.debug("SwrvePushManager :: Push is not supported");
            return;
        }
        this._webPushApiKey = webPushApiKey;
        this._userId = userId;
        this._isInitialized = true;
        // On initialisation check that a service worker is registered; on app
        // launch this might not yet be registered unless register has been called.
        navigator.serviceWorker.getRegistration(this._config.serviceWorker)
            .then(function (existingRegistration) {
            // There is no subscription, user has likly unregistered or
            // never registered for push.
            if ((0, Nil_1.isNil)(existingRegistration)) {
                return;
            }
            _this.syncServiceWorkerThread();
            _this.registerPushListeners();
            existingRegistration.pushManager.getSubscription().then(function (existingSubscription) {
                if (existingSubscription) {
                    _this.sendPushRegistrationProperties(existingSubscription);
                }
                else {
                    _this.sendBrowserPermissions();
                }
            }).catch(function (error) {
                SwrveLogger_1.default.warn("Error sending in subscription properties.\n ".concat(error));
            });
        }).catch(function (error) {
            SwrveLogger_1.default.warn("Push registration not found; unable to sync with worker.\n ".concat(error));
        });
    };
    SwrvePushManager.prototype.registerPush = function (onSuccess, onFailure) {
        if (onSuccess === void 0) { onSuccess = Nil_1.noOp; }
        if (onFailure === void 0) { onFailure = Nil_1.noOp; }
        return __awaiter(this, void 0, void 0, function () {
            var registration, serviceWorkerRegistration, existingSubscription, keyArray, options, newSubscription, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isPushSupported()) {
                            /* Unsupported browser: exiting quietly */
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        SwrveLogger_1.default.debug("Registering service worker: ".concat(this._config.serviceWorker));
                        return [4 /*yield*/, navigator.serviceWorker.register(this._config.serviceWorker)];
                    case 2:
                        registration = _a.sent();
                        SwrveLogger_1.default.debug("Installing and registering...", registration);
                        return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 3:
                        serviceWorkerRegistration = _a.sent();
                        return [4 /*yield*/, serviceWorkerRegistration.pushManager.getSubscription()];
                    case 4:
                        existingSubscription = _a.sent();
                        if (!(0, Nil_1.isNil)(existingSubscription)) return [3 /*break*/, 6];
                        SwrveLogger_1.default.debug("Attempting to subscribe to push");
                        keyArray = (0, Array_1.base64UrlToUint8Array)(this.WebPushApiKey);
                        options = {
                            applicationServerKey: keyArray,
                            userVisibleOnly: this._config.userVisibleOnly,
                        };
                        return [4 /*yield*/, serviceWorkerRegistration.pushManager.subscribe(options)];
                    case 5:
                        newSubscription = _a.sent();
                        this.sendPushRegistrationProperties(newSubscription);
                        SwrveLogger_1.default.debug("Subscribed Successfully");
                        return [3 /*break*/, 7];
                    case 6:
                        SwrveLogger_1.default.debug("Already subscribed to push");
                        this.sendPushRegistrationProperties(existingSubscription);
                        _a.label = 7;
                    case 7:
                        this.syncServiceWorkerThread();
                        this.registerPushListeners();
                        onSuccess();
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        SwrveLogger_1.default.error("Error during registration and subscription", error_1);
                        onFailure(error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SwrvePushManager.prototype.unregisterPush = function (onSuccess, onFailure) {
        if (onSuccess === void 0) { onSuccess = Nil_1.noOp; }
        if (onFailure === void 0) { onFailure = Nil_1.noOp; }
        return __awaiter(this, void 0, void 0, function () {
            var serviceWorkerRegistration, existingSubscription, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isPushSupported()) {
                            // ** Unsupported browser: exiting quietly */
                            return [2 /*return*/];
                        }
                        this.check();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, navigator.serviceWorker.getRegistration(this._config.serviceWorker)];
                    case 2:
                        serviceWorkerRegistration = _a.sent();
                        return [4 /*yield*/, serviceWorkerRegistration.pushManager.getSubscription()];
                    case 3:
                        existingSubscription = _a.sent();
                        if ((0, Nil_1.isNil)(existingSubscription)) {
                            throw new Error("Could not unregister push. No subscription found");
                        }
                        return [4 /*yield*/, existingSubscription.unsubscribe()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, serviceWorkerRegistration.unregister()];
                    case 5:
                        _a.sent();
                        this.shutdown();
                        onSuccess();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        SwrveLogger_1.default.warn("Could not unregister push. ".concat(error_2));
                        onFailure(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SwrvePushManager.prototype.syncServiceWorkerThread = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        SwrveLogger_1.default.debug("Syncing with service worker.");
                        return [4 /*yield*/, this.setPushSession()];
                    case 1:
                        user = _a.sent();
                        SwrveLogger_1.default.debug("Push session started for user ".concat(user));
                        clearInterval(this._pushEventLoopTimer); // remove any previously set flush threads
                        SwrveLogger_1.default.debug("Setting background thread for push events flusher.");
                        this._pushEventLoopTimer = setInterval(function () {
                            _this.flushPushEventQueue();
                        }, this._eventFlushFreqency);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        SwrveLogger_1.default.error('Error setting push session:', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SwrvePushManager.prototype.isPushSupported = function () {
        return "serviceWorker" in navigator && "PushManager" in window;
    };
    SwrvePushManager.prototype.shutdown = function () {
        if (this._pushEventLoopTimer) {
            clearInterval(this._pushEventLoopTimer);
        }
    };
    SwrvePushManager.prototype.registerPushListeners = function () {
        var _this = this;
        navigator.serviceWorker.removeEventListener("message", this.pushHandler); // Remove any existing push listeners to avoid duplicates
        navigator.serviceWorker.addEventListener("message", (function (event) {
            _this.pushHandler(event);
        }).bind(this), false);
    };
    SwrvePushManager.prototype.pushHandler = function (event) {
        SwrveLogger_1.default.debug("PushManager received message event");
        SwrveLogger_1.default.debug(event);
        var data = event.data;
        if ((0, Nil_1.isNil)(data)) {
            SwrveLogger_1.default.error("Could not parse message from service worker");
            return;
        }
        switch (data.type) {
            case exports.serviceWorkerEventTypes.swrvePushReceived:
                this.callBackPushReceived(event);
                break;
            case exports.serviceWorkerEventTypes.swrvePushNotificationClicked:
                this.callBackPushClicked(event);
                break;
            case exports.serviceWorkerEventTypes.swrvePushNotificationClosed:
                this.callBackPushClosed(event);
                break;
        }
    };
    SwrvePushManager.prototype.check = function () {
        if (!this.IsInitialized) {
            throw new Error("SwrvePushManager Not Initialized!");
        }
    };
    SwrvePushManager.prototype.validatePushSubscription = function (pushSubscription) {
        if (!pushSubscription) {
            SwrveLogger_1.default.error("Invalid pushSubscription: pushSubscription is null or undefined");
            return false;
        }
        if (!pushSubscription.endpoint) {
            SwrveLogger_1.default.error("Invalid pushSubscription: endpoint is missing");
            return false;
        }
        var authKey = pushSubscription.getKey("auth");
        if (!authKey) {
            SwrveLogger_1.default.error("Invalid pushSubscription: auth key is missing");
            return false;
        }
        var p256dhKey = pushSubscription.getKey("p256dh");
        if (!p256dhKey) {
            SwrveLogger_1.default.error("Invalid pushSubscription: p256dh key are missing");
            return false;
        }
        return true;
    };
    SwrvePushManager.prototype.sendPushRegistrationProperties = function (pushSubscription) {
        if (!this.validatePushSubscription(pushSubscription)) {
            return;
        }
        var subscription = pushSubscription.toJSON();
        var auth = subscription.keys.auth;
        var p256dh = subscription.keys.p256dh;
        var endpoint = subscription.endpoint;
        this._webPushToken = "".concat(endpoint, "|").concat(p256dh, "|").concat(auth);
        SwrveLogger_1.default.debug("sending push registration properties : ".concat(this._webPushToken));
        SwrveLogger_1.default.debug("sending push subscription", subscription);
        SwrveSDK_1.SwrveSDK.checkCoreInstance().deviceUpdate({ "swrve.web_push_token": this._webPushToken });
        this.sendBrowserPermissions();
    };
    SwrvePushManager.prototype.sendBrowserPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.browserHasPermissionsAccess()) return [3 /*break*/, 2];
                        return [4 /*yield*/, navigator.permissions
                                .query({ name: "notifications" })
                                .then(function (permissionStatus) {
                                SwrveLogger_1.default.debug("notifications permission status is  ".concat(permissionStatus.state));
                                SwrvePushManager.sendPermissionsUpdate(permissionStatus.state);
                                permissionStatus.onchange = function () {
                                    SwrveLogger_1.default.debug("notifications permission status has changed to ".concat(this.state));
                                    SwrvePushManager.sendPermissionsUpdate(this.state);
                                };
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        SwrveLogger_1.default.warn("notifications permission status is unknown");
                        SwrvePushManager.sendPermissionsUpdate("unknown");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SwrvePushManager.prototype.flushPushEventQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var events, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchPushEvents()];
                    case 1:
                        events = _a.sent();
                        if (events.length > 0) {
                            SwrveLogger_1.default.debug("Flushing push events: ".concat(events));
                            SwrveSDK_1.SwrveSDK.checkCoreInstance().enqueuePushEvents(events);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        SwrveLogger_1.default.error('Error fetching or processing push events:', error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SwrvePushManager.prototype.fetchPushEvents = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var registration, messageChannel, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.isPushSupported()) {
                            throw new Error('Failed to fetch push data, push is not supported!');
                        }
                        this.check();
                        return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 1:
                        registration = _a.sent();
                        messageChannel = new MessageChannel();
                        messageChannel.port1.onmessage = function (event) {
                            if (event.data && event.data.type === 'pushData') {
                                resolve(event.data.data);
                            }
                        };
                        registration.active.postMessage({
                            type: 'fetchPushData',
                            user_id: this._userId,
                            port: messageChannel.port2,
                        }, [messageChannel.port2]);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        reject(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    SwrvePushManager.prototype.setPushSession = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var registration, messageChannel, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.isPushSupported()) {
                            throw new Error('Failed to fetch push data, push is not supported!');
                        }
                        this.check();
                        return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 1:
                        registration = _a.sent();
                        messageChannel = new MessageChannel();
                        messageChannel.port1.onmessage = function (event) {
                            if (event.data && event.data.type === 'userSession') {
                                resolve(event.data.data);
                            }
                        };
                        registration.active.postMessage({
                            type: 'setUserSession',
                            user_id: this._userId,
                        }, [messageChannel.port2]);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        reject(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    SwrvePushManager.prototype.browserHasPermissionsAccess = function () {
        return navigator.permissions !== undefined;
    };
    SwrvePushManager.sendPermissionsUpdate = function (state) {
        SwrveSDK_1.SwrveSDK.checkCoreInstance().deviceUpdate({ "swrve.permission.web.push_notifications": state });
    };
    return SwrvePushManager;
}());
exports.default = SwrvePushManager;
