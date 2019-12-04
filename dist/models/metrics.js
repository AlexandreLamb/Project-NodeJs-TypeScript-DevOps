"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;
const name = 'Metrics';
const attributes = {
    timestamp: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    }
};
const options = {};
const MetricSchema = new Schema(attributes, options);
const MetricModel = model(name, MetricSchema);
module.exports = MetricModel;
