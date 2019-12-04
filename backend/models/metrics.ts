export {}
const { Schema, model } = require('mongoose');

const name = 'Metrics';

const attributes = {
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
};

const options = {};

const MetricSchema = new Schema(attributes, options);

const MetricModel = model(name, MetricSchema);

module.exports = MetricModel;
