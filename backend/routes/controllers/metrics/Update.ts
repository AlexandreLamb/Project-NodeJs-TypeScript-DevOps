export {}
const { MetricModel } = require('../../../models');
/**
 * Request structure
 * req = { 
 *      params : {id : Number}
 *      body: {text:string, proposal_a:string, proposal_b:string, userId: string, lifeTime : mm/dd/yyyy } }
 * res = { json: { } }
 */

/**
 * SECURE : Params and Body
 */
const secure = async (req) => {
    const inputs = {
        timestamp : undefined,
        value : undefined,
        userEmail : undefined,
        id : undefined
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
    if (req.params.id === undefined || req.params.id === null) {
        throw new Error('Id undefined/null');
    }
    inputs.id = req.params.id;

    return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async (inputs) => {
      try{
        await MetricModel.updateOne({_id : inputs.id},inputs);
        return MetricModel.findOne({_id: inputs.id}).exec();
    }catch(error) {
          throw new Error('Metric  can\'t be update'.concat(' > ', error.message));
      }
  };
  
  /**
   * LOGIC :
   */
  const updateMetric = async (req, res) => {
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
  module.exports = updateMetric;