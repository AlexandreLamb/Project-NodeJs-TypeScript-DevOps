export {}
const { MetricModel } = require('../../../models');
/**
 * Request structure
 * req = { body: { } }
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
    const inputs = {};
  
    return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async inputs => {
    try{
      return MetricModel.find().exec();
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