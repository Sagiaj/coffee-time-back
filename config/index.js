"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var corsConfig_1 = __importDefault(require("../config/corsConfig"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var initAppConfig = function (app) {
    app.use(cors_1.default(corsConfig_1.default));
    app.use(compression_1.default({ filter: "shouldCompress" }));
};
exports.default = initAppConfig;
