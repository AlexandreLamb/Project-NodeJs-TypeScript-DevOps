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
const mongoose = require('mongoose');
const { AuthModel, UserModel, MetricModel } = require('./models');
/**
 * Get environment variables from .env file.
 */
const port = process.env.PORT || 3030;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const mongoDbDatabase = process.env.MONGODB_DATABASE || 'metrics';
const populate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
        if (err) {
            console.log(`Error trying to connect to db: ${mongoDbDatabase}`);
            console.log(err);
        }
        else {
            console.log(`Connected to db: ${mongoDbDatabase}`);
        }
    });
    try {
        yield AuthModel.create({
            "username": "Username",
            "password": "Password",
            "email": Math.random().toString(36).substring(2, 15) + Date.now() + "@gmail.com"
        });
        const user = yield UserModel.create({
            "username": "Username",
            "password": "Password",
            "email": Math.random().toString(36).substring(2, 15) + Date.now() + "@gmail.com"
        });
        console.log("[User] create");
        for (let indexM = 0; indexM < 5; indexM++) {
            yield MetricModel.create({
                timestamp: Date.now().toString(),
                value: Math.random() * 100,
                userId: user._id
            });
            console.log("[Metric for user " + user._id + "] create");
        }
        yield mongoose.connection.close();
    }
    catch (error) {
        console.log("ERROR MESSAGE :", error.message);
        console.log("ERROR :", error);
    }
});
const populates = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < 3; index++) {
        yield populate();
    }
});
populates();
