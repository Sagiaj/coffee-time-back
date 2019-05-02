"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compression_1 = __importDefault(require("compression"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var cors_2 = __importDefault(require("./cors"));
var bindAppConfig = function (app) {
    app.use(cors_1.default(cors_2.default));
    app.use(compression_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
};
exports.default = bindAppConfig;
