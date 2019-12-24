export {}
const { MetricModel } = require('../../../models');
/**
 * Request structure
 * req = { 
 * body: { 
              timestamp : String,
              value : String,
              id: String          
          } 
 *      }
 * res = { json: { } }
 */

/**
 * SECURE : Params and Body
 */
const secure = async (req) => {
    const inputs = {
        timestamp : undefined,
        value : undefined,
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

    if (req.body.id === undefined || req.body.id === null || req.body.id === "") {
        throw new Error('Id undefined/null');
    }
    else if( await MetricModel.findById({_id: req.body.id}).exec() === null ){
        throw new Error('Metric not exist');
    }
    inputs.id = req.body.id;

    return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async (inputs) => {
      try{
        await MetricModel.updateOne({_id : inputs.id},inputs);
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
  
        await process(inputs);
        res.status(200).redirect("index/metrics");
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      res.status(400).redirect("api/index/metrics");
    }
  };
  module.exports = updateMetric;