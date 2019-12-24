export {}
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const JWT_SECRET_TOKEN = require('../../../config');
const { MetricModel, UserModel } = require('../../../models');
/**
 * Request structure
 * req = { header: { "token" } }
 * res = { json: [{ 
 *                  "_id": "string",
 *                  "timestamp" : "string",
 *                  "value" : "string",
 *                  "userId" : "string"
 *               }] 
 * }
 */

/**
 * SECURE : Params and Body
 */
const secure = async req => {
    const inputs = {
      token : undefined
    };
    
    if(req.headers.cookie === undefined || req.headers.cookie === null){
      throw new Error("invalid cookie");
    }
    inputs.token =  req.headers.cookie.substring(6);


  return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async inputs => {
    try{
      const decodedToken = jwt.verify(inputs.token, JWT_SECRET_TOKEN);
      const userEmail = decodedToken.user.userEmail;
      
      const user = await UserModel.findOne({email : userEmail}).exec();
      return await MetricModel.find({userId : user._id}).exec();
    }catch(error){
      throw new Error('Error Read Metric'.concat(' > ', error.message));
    }
  };
  
  /**
   * LOGIC :
   */
  const readMetric = async (req, res) => {
    try {
      const inputs = await secure(req);
  
      const param = await process(inputs);
      
      res.status(200).json(param);
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      res.status(400).json({ message: error.message });
    }
  };
  module.exports = readMetric;