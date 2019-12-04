"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require('mongoose');
const name = 'User';
const attributes = {
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    }
};
const options = {};
const UserSchema = new Schema(attributes, options);
const UserModel = model(name, UserSchema);
module.exports = UserModel;
