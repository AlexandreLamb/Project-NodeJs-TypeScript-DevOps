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
const JWT_SECRET_TOKEN = require('../../../config');
const { MetricModel, UserModel } = require('../../../models');
/**
 * Request structure
 * req = { header: { "token" } }
 * res = { json: [{
 *                  "_id": "string",
 *                  "timestamp" : "string",
 *                  "value" : "string",
 *                  "userId" : "string"
 *               }]
 * }
 */
/**
 * SECURE : Params and Body
 */
const secure = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = {
        token: undefined
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
        const decodedToken = jwt.verify(inputs.token, JWT_SECRET_TOKEN);
        const userEmail = decodedToken.user.userEmail;
        const user = yield UserModel.findOne({ email: userEmail }).exec();
        return yield MetricModel.find({ userId: user._id }).exec();
    }
    catch (error) {
        throw new Error('Error Read Metric'.concat(' > ', error.message));
    }
});
/**
 * LOGIC :
 */
const readMetric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputs = yield secure(req);
        const param = yield process(inputs);
        res.status(200).json(param);
    }
    catch (error) {
        console.log("ERROR MESSAGE :", error.message);
        console.log("ERROR :", error);
        res.status(400).json({ message: error.message });
    }
});
module.exports = readMetric;
