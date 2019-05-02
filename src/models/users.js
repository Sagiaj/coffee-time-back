"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var database_1 = __importDefault(require("../../config/database"));
var Users = database_1.default.define('users', {
    id: {
        primaryKey: true,
        type: sequelize_1.default.INTEGER
    },
    username: {
        type: sequelize_1.default.STRING
    },
    email: {
        type: sequelize_1.default.STRING
    },
    password: {
        type: sequelize_1.default.STRING
    }
});
exports.default = Users;
