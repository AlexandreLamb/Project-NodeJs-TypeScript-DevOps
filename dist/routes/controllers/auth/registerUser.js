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
const bcrypt = require('bcryptjs');
const { AuthModel, UserModel } = require('../../../models');
const { formatChecker } = require('../../../core');
const { AuthServices } = require('../../../services/');
/**
 * Request/Response structure
 *  req = { body: {
 *  email:string,
 *  username:string,
 *  password:string
 * } }
// res = { json: { token: 'xxxx' } }

/**
 * SECURE : Params and Body
 */
const secure = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = {
        email: undefined,
        username: undefined,
        password: undefined
    };
    if (req.body.email === undefined || req.body.email === null) {
        throw new Error('Email undefined/null');
    }
    else if (!formatChecker.isEmail(req.body.email)) {
        throw new Error('Email don\'t follow rules');
    }
    try {
        const auth = yield AuthModel.findOne({ email: req.body.email }).exec();
        if (!(auth === null)) {
            throw new Error('Email : Already exist');
        }
    }
    catch (error) {
        throw new Error('Email : error'.concat(' > ', error.message));
    }
    inputs.email = req.body.email;
    if (req.body.username === undefined || req.body.username === null) {
        throw new Error('Username undefined/null');
    }
    inputs.username = req.body.username;
    if (req.body.password === undefined || req.body.password === null) {
        throw new Error('Password undefined/null');
    }
    else if (!formatChecker.isPassword(req.body.password)) {
        throw new Error('Password don\'t follow rules');
    }
    inputs.password = yield bcrypt.hash(req.body.password, 10);
    return inputs;
});
/**
 * PROCESS :
 */
const process = (param) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = yield AuthModel.create(param);
        yield UserModel.create(param);
        auth.password = undefined;
        const token = AuthServices.generateToken(auth);
        return token;
    }
    catch (error) {
        throw new Error('Auth can\'t be create'.concat(' > ', error.message));
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputs = yield secure(req);
        const token = yield process(inputs);
        res.status(200).redirect("api/login");
    }
    catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).render("register.ejs");
    }
});
module.exports = registerUser;
