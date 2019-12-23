export{}
const { MetricModel } = require('../../../models');
/**
 * Request structure
 * req = { params : { id : Number } }
 * res = { json: { } }
 */

/**
 * SECURE : Params and Body
 */
const secure = async (req) => {
    const inputs = {
      id: undefined
    };
    if(req.params.id === undefined || req.params.id === null){
        throw new Error('Id is null or undefined');
    } else if( MetricModel.findById({_id: inputs.id})===null ){
        throw new Error('Metric already delete');
    }
    inputs.id = req.params.id;

    return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async (inputs) => {
    try{
      return MetricModel.findByIdAndRemove({_id: inputs.id}).exec();
    }
    catch(error){
      throw new Error('Error Delete Metrics'.concat(' > ', error.message));    }
    
  };
  
  /**
   * LOGIC :
   */
  const deleteMetric = async (req, res) => {
    try {
      const inputs = await secure(req);
      const param = await process(inputs);
      res.status(200).redirect('index/metrics');
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      res.status(400).redirect('index/metrics');
    }
  };
  module.exports = deleteMetric;