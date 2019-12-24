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
const { AuthServices } = require('../../../services');
/**
 * Request structure
 */
// req = { body: { email: 'xxx'} }
// res = { json: { token: '' } }
/**
 * SECURE : Params and Body
 */
/*
const secure = async (req) => {

    const inputs = {
        email : undefined,
    };
    
    if (req.body.email === undefined || req.body.email === null) {
        throw new Error('Email undefined/null');
    } else if (!formatChecker.isEmail(req.body.email)) {
        throw new Error('Email don\'t follow rules');
    }
    inputs.email = req.body.email;

    return inputs;
};

/**
 * PROCESS :
 */
/*
const process = async (inputs) => {
    try {
        const auth = await AuthModel.findOne({ email: inputs.email });
        if (auth === null || auth === undefined) {
            throw new Error('Auth : Email not find');
        }

        const user = await UserModel.findOne({ email: inputs.email });
        if (user === null || user === undefined) {
            throw new Error('User : Email not find');
        }
        const token = undefined;

        return token;
    } catch (error) {
        throw new Error('Error login'.concat(' > ', error.message));
    }
};
*/
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const inputs = await secure(req);
        // const token = await process(inputs);
        res.cookie('token', null);
        res.status(200).redirect('/api/login');
    }
    catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
});
module.exports = logoutUser;
