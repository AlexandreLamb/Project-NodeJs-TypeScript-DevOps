export{}
const bcrypt = require('bcrypt');
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

const logoutUser = async (req, res) => {
    try {
        const inputs = await secure(req);
        
        const token = await process(inputs);
        
        res.cookie('token',token);
        res.status(200).json({token : token});
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};

module.exports = logoutUser;
