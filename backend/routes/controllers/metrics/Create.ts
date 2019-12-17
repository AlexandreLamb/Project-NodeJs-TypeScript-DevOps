export{
}
const { MetricModel, AuthModel, UserModel } = require('../../../models');
/**
 * Request structure
 * req = { body: { 
 *             timestamp : String,
 *             value : String,
 *             userEmail : String             
 *         } 
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
        userEmail : undefined
    };
    
    if (req.body.timestamp === undefined || req.body.timestamp === null) {
        throw new Error('Timestamp undefined/null');
    }
    inputs.timestamp = req.body.timestamp;

    if (req.body.value === undefined || req.body.value === null) {
        throw new Error('Value undefined/null');
    }
    inputs.value = req.body.value;

    if (req.body.userEmail === undefined || req.body.userEmail === null) {
        throw new Error('Email undefined/null');
    }
    inputs.userEmail = req.body.userEmail;

    return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async (inputs) => {
      try{
        const auth = await AuthModel.findOne({ email : inputs.userEmail });
        if (auth === null || auth === undefined) {
            throw new Error('Auth : Email not find');
        }
        const user = await UserModel.findOne({ email: inputs.userEmail });
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
  
      const param = await process(inputs);

  
      res.status(200).json(param);
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      res.status(400).json({ message: error.message });
    }
  };
  module.exports = createMetric;