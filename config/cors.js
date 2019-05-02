"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var domainsWhiteList = ["http://localhost:8080"];
var corsConfig = {
    origin: function (origin, callback) {
        if (domainsWhiteList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Error on domain \"" + origin + "\": Not allowed b y CORS"));
        }
    }
};
exports.default = corsConfig;
