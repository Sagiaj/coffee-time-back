"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET_KEY = process.env.SECRET_KEY;
var verifyToken = function (req, res, next) {
    var bearerHeader = req.headers['authorization'] || '';
    if (!bearerHeader) {
        return res.sendStatus(401);
    }
    var bearerToken = bearerHeader.split(' ')[1] || '';
    if (!bearerToken) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(bearerToken, SECRET_KEY, function (err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            req.headers.jwtToken = bearerToken;
            next();
        }
    });
};
exports.default = { verifyToken: verifyToken };
