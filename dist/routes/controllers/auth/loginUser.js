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
const bcrypt = require('bcrypt');
const { AuthModel, UserModel } = require('../../../models');
const { formatChecker } = require('../../../core');
const { AuthServices } = require('../../../services');
/**
 * Request structure
 */
// req = { body: { email: 'xxx', password: 'xxxxxxxxx' } }
// res = { json: { token: 'xxxx' } }
/**
 * SECURE : Params and Body
 */
const secure = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = {
        email: undefined,
        password: undefined
    };
    if (req.body.email === undefined || req.body.email === null) {
        throw new Error('Email undefined/null');
    }
    else if (!formatChecker.isEmail(req.body.email)) {
        throw new Error('Email don\'t follow rules');
    }
    inputs.email = req.body.email;
    if (req.body.password === undefined || req.body.password === null) {
        throw new Error('Password undefined/null');
    }
    else if (!formatChecker.isPassword(req.body.password)) {
        throw new Error('Password don\'t follow rules');
    }
    inputs.password = req.body.password;
    return inputs;
});
/**
 * PROCESS :
 */
const process = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = yield AuthModel.findOne({ email: inputs.email });
        if (auth === null || auth === undefined) {
            throw new Error('Auth : Email not find');
        }
        const user = yield UserModel.findOne({ email: inputs.email });
        if (user === null || user === undefined) {
            throw new Error('User : Email not find');
        }
        const isGoodPassword = yield bcrypt.compare(inputs.password, auth.password);
        if (!isGoodPassword) {
            throw new Error('Wrong Password');
        }
        auth.password = undefined;
        const token = AuthServices.generateToken(auth);
        return token;
    }
    catch (error) {
        throw new Error('Error login'.concat(' > ', error.message));
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputs = yield secure(req);
        const token = yield process(inputs);
        res.cookie('token', token, { expires: new Date(Date.now() + 9000000000000), httpOnly: true });
        res.status(200).json({ token: token });
    }
    catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
});
module.exports = loginUser;
