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
const JWT_SECRET_TOKEN = require('../../../config');
const jwt = require('jsonwebtoken');
const { MetricModel, AuthModel, UserModel } = require('../../../models');
/**
 * Request structure
 * req = { body: {
 *             timestamp : String,
 *             value : String,
 *         }
 *          cookie : {
 *              userEmail : string
 *            }
 * }
 * res = { json: { } }
 */
/**
 * SECURE : Params and Body
 */
const secure = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = {
        timestamp: undefined,
        value: undefined,
        token: undefined
    };
    if (req.body.timestamp === undefined || req.body.timestamp === null) {
        throw new Error('Timestamp undefined/null');
    }
    inputs.timestamp = req.body.timestamp;
    if (req.body.value === undefined || req.body.value === null) {
        throw new Error('Value undefined/null');
    }
    inputs.value = req.body.value;
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
        const auth = yield AuthModel.findOne({ email: userEmail });
        if (auth === null || auth === undefined) {
            throw new Error('Auth : Email not find');
        }
        const user = yield UserModel.findOne({ email: userEmail });
        if (user === null || user === undefined) {
            throw new Error('User : Email not find');
        }
        inputs.UserId = user._id;
        const metric = {
            timestamp: inputs.timestamp,
            value: inputs.value,
            userId: inputs.UserId
        };
        const newMetric = yield MetricModel.create(metric);
        return newMetric;
    }
    catch (error) {
        throw new Error('Metrics  can\'t be create'.concat(' > ', error.message));
    }
});
/**
 * LOGIC :
 */
const createMetric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputs = yield secure(req);
        yield process(inputs);
        res.status(200).redirect("index/metrics");
    }
    catch (error) {
        console.log("ERROR MESSAGE :", error.message);
        console.log("ERROR :", error);
        res.status(400).redirect('index/metrics');
    }
});
module.exports = createMetric;
