"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePPI = exports.detectScreenDiagonal = void 0;
var web_core_1 = require("@swrve/web-core");
var ClientInfoConstants_1 = require("../helpers/ClientInfoConstants");
var ClientInfoHelper_1 = __importDefault(require("../helpers/ClientInfoHelper"));
// First numeric part of Samsung and LG model names indicates screen size in inches
function detectScreenDiagonal(modelName) {
    var size;
    var match = modelName.match(/\d+/);
    if (match) {
        size = parseInt(match[0], 10);
    }
    // fallback to median screen size on the market
    return size || 27;
}
exports.detectScreenDiagonal = detectScreenDiagonal;
function calculatePPI(pixelWidth, pixelHeight, inchDiagonal) {
    var pixelDiagonal = Math.sqrt(pixelWidth * pixelWidth + pixelHeight * pixelHeight);
    return Math.round(pixelDiagonal / inchDiagonal);
}
exports.calculatePPI = calculatePPI;
var defaultMapping = {
    36: "Return",
    38: "Up",
    40: "Down",
    37: "Left",
    39: "Right",
    13: "Enter",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    8: "Back",
    179: "Play",
    227: "FastForward",
    228: "Rewind",
    112: "F1",
};
var WebPlatformBridge = /** @class */ (function () {
    function WebPlatformBridge() {
        /** True if the platform needs a proxy. */
        this.needsProxy = true;
        /** True if this platform supports the magic wand. */
        this.supportsMagicWandNatively = false;
        /** Number of history entries on start. */
        this.startHistoryLength = 0;
        this.networkListeners = [];
        var info = ClientInfoHelper_1.default.getClientInfo();
        this._region = info[ClientInfoConstants_1.SWRVE_DEVICE_REGION];
        this._language = info[ClientInfoConstants_1.SWRVE_LANGUAGE];
        this._countryCode = info[ClientInfoConstants_1.SWRVE_COUNTRY_CODE];
        this._deviceName = info[ClientInfoConstants_1.SWRVE_DEVICE_NAME];
        this._deviceID = this.findOrCreateDeviceId();
        this._deviceType = info[ClientInfoConstants_1.SWRVE_DEVICE_TYPE];
        this._timezone = info[ClientInfoConstants_1.SWRVE_TIMEZONE_NAME];
        this._osVersion = info[ClientInfoConstants_1.SWRVE_OS_VERSION] || "Unknown";
        this._browserVersion = info[ClientInfoConstants_1.SWRVE_BROWSER_VERSION];
        this._utcOffSetSeconds = ClientInfoHelper_1.default.getUTCOffsetSeconds(new Date());
        this._os = info[ClientInfoConstants_1.SWRVE_OS] || "Unknown";
        this._model = info[ClientInfoConstants_1.SWRVE_BROWSER_NAME];
        this._firmware = "";
        this._screenHeight = ClientInfoHelper_1.default.getAvailableScreenHeight();
        this._screenWidth = ClientInfoHelper_1.default.getAvailableScreenWidth();
        this._screenDPI =
            calculatePPI(this._screenWidth, this._screenHeight, detectScreenDiagonal("replace")) || 1000;
        this._deviceName = ClientInfoHelper_1.default.getDeviceName();
    }
    WebPlatformBridge.prototype.init = function (deviceProperties) {
        this.startHistoryLength = window.history.length;
        var cache = document.createElement("div");
        cache.id = "PALImageCache";
        cache.style.overflow = "hidden";
        cache.style.position = "absolute";
        cache.style.left = "-10000px";
        cache.style.width = "1px";
        cache.style.height = "1px";
        if (document.getElementById("PALImageCache") === null) {
            document.body.appendChild(cache);
        }
        return Promise.resolve();
    };
    WebPlatformBridge.prototype.name = function () {
        return {
            name: "Browser",
            variation: "Web",
        };
    };
    Object.defineProperty(WebPlatformBridge.prototype, "deviceName", {
        get: function () {
            return ClientInfoHelper_1.default.getDeviceName();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "synchronousStorage", {
        get: function () {
            return window.localStorage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "appStore", {
        get: function () {
            return "web";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "firmware", {
        get: function () {
            return this._firmware || "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "deviceID", {
        get: function () {
            return this._deviceID;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "model", {
        get: function () {
            return this._model || "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "os", {
        get: function () {
            return ClientInfoHelper_1.default.getOS().name || "unknown";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "osVersion", {
        get: function () {
            return ClientInfoHelper_1.default.getOS().version || "unknown";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "deviceType", {
        get: function () {
            return ClientInfoHelper_1.default.getDeviceType();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "timezone", {
        get: function () {
            return this._timezone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "region", {
        get: function () {
            return this._region;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "language", {
        get: function () {
            return this._language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "countryCode", {
        get: function () {
            return this._countryCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "screenDPI", {
        get: function () {
            return this._screenDPI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "screenHeight", {
        get: function () {
            return this._screenHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlatformBridge.prototype, "screenWidth", {
        get: function () {
            return this._screenWidth;
        },
        enumerable: false,
        configurable: true
    });
    WebPlatformBridge.prototype.getNeedsProxy = function () {
        return this.needsProxy;
    };
    WebPlatformBridge.prototype.getSupportsMagicWandNatively = function () {
        return this.supportsMagicWandNatively;
    };
    WebPlatformBridge.prototype.disableScreenSaver = function () {
        console.error("platform does not know how to disable screensaver");
    };
    WebPlatformBridge.prototype.enableScreenSaver = function () {
        console.error("platform does not know how to enable screensaver");
    };
    WebPlatformBridge.prototype.exit = function (toMenu) {
        var backlength = window.history.length - this.startHistoryLength - 1;
        window.history.go(-backlength);
    };
    WebPlatformBridge.prototype.getDeviceBrowserVersion = function () {
        return ClientInfoHelper_1.default.getBrowserInfo().version;
    };
    WebPlatformBridge.prototype.getDeviceProperties = function () {
        var clientInfo = ClientInfoHelper_1.default.getClientInfo();
        clientInfo[ClientInfoConstants_1.SWRVE_DEVICE_ID] = this._deviceID;
        return clientInfo;
    };
    WebPlatformBridge.prototype.supportsHDR = function () {
        return false;
    };
    WebPlatformBridge.prototype.getKeymapping = function () {
        return defaultMapping;
    };
    WebPlatformBridge.prototype.downloadAssets = function (assets) {
        var downloading = assets.map(function (asset) {
            var img = document.createElement("img");
            img.src = asset.path;
            console.log("PAL download " + asset.path);
            var imageCache = document.getElementById("PALImageCache");
            if (imageCache) {
                imageCache.appendChild(img);
            }
            else {
                console.log(" PAL: Image cache does not exist");
            }
            return new Promise(function (resolve, reject) {
                img.addEventListener("load", function () {
                    resolve();
                });
                img.addEventListener("error", function () {
                    reject();
                });
            });
        });
        return Promise.all(downloading).then(function () { return void 0; });
    };
    WebPlatformBridge.prototype.checkStorageForAsset = function (asset) {
        var loadedImage = document.createElement("img");
        loadedImage.src = asset.getAssetPath().toString();
        var element = document.getElementById("PALImageCache");
        if (element) {
            element.appendChild(loadedImage);
        }
        else {
            console.log("PALImage Cache does not exist");
        }
        return loadedImage.complete || loadedImage.width + loadedImage.height > 0;
    };
    WebPlatformBridge.prototype.openLink = function (link) {
        window.open(link);
    };
    WebPlatformBridge.prototype.monitorNetwork = function (networkListener) {
        if (this.networkMonitorHandle === undefined) {
            this.networkMonitorHandle = this.initNetworkListener();
        }
        this.networkListeners.push(networkListener);
        return networkListener;
    };
    WebPlatformBridge.prototype.stopMonitoringNetwork = function (networkListener) {
        throw new Error("Method not implemented.");
    };
    WebPlatformBridge.prototype.triggerNetworkChange = function (status) {
        this.networkListeners.forEach(function (listener) { return listener(status); });
    };
    WebPlatformBridge.prototype.initNetworkListener = function () {
        var _this = this;
        var onOnline = function () { return _this.triggerNetworkChange(web_core_1.NETWORK_CONNECTED); };
        var onOffline = function () { return _this.triggerNetworkChange(web_core_1.NETWORK_DISCONNECTED); };
        window.addEventListener("offline", onOffline);
        window.addEventListener("online", onOnline);
        return [onOnline, onOffline];
    };
    WebPlatformBridge.prototype.removeNetworkListener = function (handle) {
        var _a = handle, onOnline = _a[0], onOffline = _a[1];
        window.removeEventListener("offline", onOffline);
        window.removeEventListener("online", onOnline);
    };
    WebPlatformBridge.prototype.findOrCreateDeviceId = function () {
        var currentDeviceId = this.synchronousStorage.getItem(ClientInfoConstants_1.SWRVE_DEVICE_ID);
        if (currentDeviceId)
            return currentDeviceId;
        currentDeviceId = (0, web_core_1.generateUuid)().toString();
        this.synchronousStorage.setItem(ClientInfoConstants_1.SWRVE_DEVICE_ID, currentDeviceId);
        return currentDeviceId;
    };
    return WebPlatformBridge;
}());
exports.default = WebPlatformBridge;
