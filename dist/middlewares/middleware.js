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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
/**
 * Request structure
 * req = { body: { },
 *         cookie: { token : String }
 *       }
 * res = { json: { } }
 */
/**
 * SECURE : Params and Body
 */
const secure = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = {
        token: undefined,
    };
    if (req.headers.cookie === undefined || req.headers.cookie === null) {
        throw new Error("invalid cookie");
    }
    inputs.token = req.headers.cookie.substring(6);
    return inputs;
});
/**
 * PROCESS :
 */
const process = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt.verify(inputs.token, dotenv.parsed.JWT_SECRET_TOKEN);
        return decodedToken;
    }
    catch (error) {
        throw new Error('invalid token'.concat(' > ', error.message));
    }
});
/**
 * LOGIC :
 */
const middlewares = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputs = yield secure(req);
        const param = yield process(inputs);
        if (param === null || param === null) {
            throw new Error('Wrong token');
        }
        next();
    }
    catch (error) {
        console.log("ERROR MESSAGE :", error.message);
        console.log("ERROR :", error);
        res.status(401).redirect('/api/login');
    }
});
module.exports = middlewares;
