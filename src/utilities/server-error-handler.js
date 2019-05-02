"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrap = function (fn) { return function (req, res, next) { return fn(req, res, next).catch(function (err) {
    var errObject = {
        responseCode: 500,
        responseMessage: err
    };
    res.status(500).send(errObject);
}); }; };
exports.default = wrap;
