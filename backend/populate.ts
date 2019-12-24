
const mongoose = require('mongoose');
const  {AuthModel, UserModel, MetricModel}  = require('./models')
/**
 * Get environment variables from .env file.
 */

const port = process.env.PORT || 3030;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const mongoDbDatabase = process.env.MONGODB_DATABASE || 'metrics';



const populate = async  () => {
    await mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
        if (err) {
            console.log(`Error trying to connect to db: ${mongoDbDatabase}`);
            console.log(err);
        } else {
            console.log(`Connected to db: ${mongoDbDatabase}`);
        }
    });
    
    try{
            await AuthModel.create({
                "username" : "Username",
                "password" : "Password",
                "email" : Math.random().toString(36).substring(2, 15)+Date.now()+"@gmail.com"
            });
           const user =  await UserModel.create({
                "username" : "Username",
                "password" : "Password",
                "email" : Math.random().toString(36).substring(2, 15)+Date.now()+"@gmail.com"
            });
            console.log("[User] create")
            for (let indexM = 0; indexM < 5; indexM++) {
                await MetricModel.create({
                    timestamp : Date.now().toString(),
                    value : Math.random()*100,
                    userId : user._id
                });         
                console.log("[Metric for user "+ user._id +"] create")
   
            }
            
            await mongoose.connection.close();   

    } catch( error ){
        console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      
    }
    


}
const populates = async () =>{
    for (let index = 0; index < 3; index++) {
        await populate()    
     }
}
populates()
