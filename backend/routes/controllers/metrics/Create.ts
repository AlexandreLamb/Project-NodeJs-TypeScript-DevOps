export{
}
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const { MetricModel, AuthModel, UserModel } = require('../../../models');
/**
 * Request structure
 * req = { body: { 
 *             timestamp : String,
 *             value : String,          
 *         } 
 *          cookie : {
 *              userEmail : string
 *            }
 * }
 * res = { json: { } }
 */

/**
 * SECURE : Params and Body
 */
const secure = async (req) => {
    const inputs = {
        timestamp : undefined,
        value : undefined,
        token : undefined
    };
    
    if (req.body.timestamp === undefined || req.body.timestamp === null) {
        throw new Error('Timestamp undefined/null');
    }
    inputs.timestamp = req.body.timestamp;

    if (req.body.value === undefined || req.body.value === null) {
        throw new Error('Value undefined/null');
    }
    inputs.value = req.body.value;
    if(req.headers.cookie === undefined || req.headers.cookie === null){
        throw new Error("invalid cookie");
      }
      inputs.token =  req.headers.cookie.substring(6);

    return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async (inputs) => {
      try{
        console.log("///////////////////////////////////////");
        console.log(dotenv);
        console.log("///////////////////////////////////////");

        const decodedToken = jwt.verify(inputs.token, process.env.JWT_SECRET_TOKEN);
        const userEmail = decodedToken.user.userEmail;

        const auth = await AuthModel.findOne({ email : userEmail });
        if (auth === null || auth === undefined) {
            throw new Error('Auth : Email not find');
        }
        const user = await UserModel.findOne({ email: userEmail });
        if (user === null || user === undefined) {
            throw new Error('User : Email not find');
        }
        inputs.UserId = user._id;

        const metric = {
            timestamp : inputs.timestamp,
            value : inputs.value,
            userId : inputs.UserId
        }
        const newMetric = await MetricModel.create(metric);
        return newMetric;
    }catch(error) {
          throw new Error('Metrics  can\'t be create'.concat(' > ', error.message));
      }
  };
  
  /**
   * LOGIC :
   */
  const createMetric = async (req, res) => {
    try {
      const inputs = await secure(req);
  
       await process(inputs);
      res.status(200).redirect("index/metrics")	
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      res.status(400).redirect('index/metrics');
    }
  };
  module.exports = createMetric;