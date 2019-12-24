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
const { MetricModel } = require('../../../models');
/**
 * Request structure
 * req = {
 *      }
 * res = { json: { } }
 */
/**
 * SECURE : Params and Body
 */
const secure = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = {
        timestamp: undefined,
        value: undefined,
        id: undefined
    };
    if (req.body.timestamp === undefined || req.body.timestamp === null) {
        throw new Error('Timestamp undefined/null');
    }
    inputs.timestamp = req.body.timestamp;
    if (req.body.value === undefined || req.body.value === null) {
        throw new Error('Value undefined/null');
    }
    inputs.value = req.body.value;
    if (req.body.id === undefined || req.body.id === null || req.body.id === "") {
        throw new Error('Id undefined/null');
    }
    else if ((yield MetricModel.findById({ _id: req.body.id }).exec()) === null) {
        throw new Error('Metric not exist');
    }
    inputs.id = req.body.id;
    return inputs;
});
/**
 * PROCESS :
 */
const process = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MetricModel.updateOne({ _id: inputs.id }, inputs);
    }
    catch (error) {
        throw new Error('Metric  can\'t be update'.concat(' > ', error.message));
    }
});
/**
 * LOGIC :
 */
const updateMetric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputs = yield secure(req);
        yield process(inputs);
        res.status(200).redirect("index/metrics");
    }
    catch (error) {
        console.log("ERROR MESSAGE :", error.message);
        console.log("ERROR :", error);
        res.status(400).redirect("api/index/metrics");
    }
});
module.exports = updateMetric;
