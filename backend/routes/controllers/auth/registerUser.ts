export {}
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
const secure = async (req) => {
    const inputs = {
        email : undefined,
        username : undefined,
        password : undefined
    };

    if (req.body.email === undefined || req.body.email === null) {
        throw new Error('Email undefined/null');
    } else if (!formatChecker.isEmail(req.body.email)) {
        throw new Error('Email don\'t follow rules');
    }
    try {
        const auth = await AuthModel.findOne({ email: req.body.email }).exec();

        if (!(auth === null)) {
            throw new Error('Email : Already exist');
        }
    } catch (error) {
        throw new Error('Email : error'.concat(' > ', error.message));
    }
    inputs.email = req.body.email;

    if (req.body.username === undefined || req.body.username === null) {
        throw new Error('Username undefined/null');
    }
    inputs.username = req.body.username;

    if (req.body.password === undefined || req.body.password === null) {
        throw new Error('Password undefined/null');
    } else if (!formatChecker.isPassword(req.body.password)) {
        throw new Error('Password don\'t follow rules');
    }
    inputs.password = await bcrypt.hash(req.body.password, 10);

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (param) => {

    try {
        const auth = await AuthModel.create(param);
        await UserModel.create(param);
        auth.password = undefined;

        const token = AuthServices.generateToken(auth);

        return token;
    } catch (error) {
        throw new Error('Auth can\'t be create'.concat(' > ', error.message));
    }
};

const registerUser = async (req, res) => {
    try {
        const inputs = await secure(req);

        const token = await process(inputs);
        res.status(200).json({ token });
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};

module.exports = registerUser;
