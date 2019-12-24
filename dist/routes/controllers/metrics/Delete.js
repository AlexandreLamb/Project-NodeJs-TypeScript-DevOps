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
 * req = { params : { id : Number } }
 * res = { json: { } }
 */
/**
 * SECURE : Params and Body
 */
const secure = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = {
        id: undefined
    };
    if (req.params.id === undefined || req.params.id === null || req.params.id === "") {
        throw new Error('Id is null or undefined');
    }
    else if ((yield MetricModel.findById({ _id: req.params.id }).exec()) === null) {
        throw new Error('Metric already delete');
    }
    inputs.id = req.params.id;
    return inputs;
});
/**
 * PROCESS :
 */
const process = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(inputs);
        return MetricModel.findByIdAndRemove({ _id: inputs.id }).exec();
    }
    catch (error) {
        throw new Error('Error Delete Metrics'.concat(' > ', error.message));
    }
});
/**
 * LOGIC :
 */
const deleteMetric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputs = yield secure(req);
        const param = yield process(inputs);
        res.status(200).redirect('index/metrics');
    }
    catch (error) {
        console.log("ERROR MESSAGE :", error.message);
        console.log("ERROR :", error);
        res.status(400).redirect('index/metrics');
    }
});
module.exports = deleteMetric;
