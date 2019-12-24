
export {}
const mongoose = require('mongoose');
const createMetric = require('./Create');
const {UserModel, AuthModel } = require('../../../models');
const AuthServices = require('../../../services/AuthServices');
const mockRequest = (   timestampData = '', valueData = '', cookieData = '') => ({
    body: { 
            timestamp : timestampData,
            value  : valueData,
        },
        headers : {
            cookie : cookieData,
        }
});

const mockResponse = () => {
    const res = {
        status : jest.fn(),
        render : jest.fn(),
        redirect : jest.fn()
    
    };
    res.status = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    res.redirect  = jest.fn().mockReturnValue(res);
    return res;
};
beforeAll(async () => {
    const port = process.env.PORT || 3030;
    const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const mongoDbDatabase = process.env.MONGODB_DATABASE || 'metrics';

    await mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
        useNewUrlParser: true
    });
    await mongoose.connection.db.dropDatabase();

    await AuthModel.create({
        "username" : "Simeon",
        "password" : "Azerty1&",
        "email" : "alex1@gmail.com"
    });
    await UserModel.create({
        "username" : "Simeon",
        "password" : "Azerty1&",
        "email" : "alex1@gmail.com"
    });
  });
describe('[Controllers > Metrics] - Create', () => {
    describe('Call with a good body', () => {
        it('should return status 200', async () => {
            // Arrange
            const timestamp = '1384686660000';
            const value = '666';
            const auth =  await AuthModel.findOne({ email : "alex1@gmail.com" });
            const token = AuthServices.generateToken(auth);
            const cookie  = "token="+token;
            // Act
           
            const req = mockRequest(timestamp, value, cookie);           
            const res = mockResponse();

            // Act
            await createMetric(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe('Call without body', () => {
        it('should return status 400', async () => {
            // Arrange
            const req = mockRequest();
            const res = mockResponse();
           
            // Act
            await createMetric(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad email in body', () => {
        it('should return status 400', async () => {
           // Arrange
           const email = 'email';
            const timestamp = '1384686660000';
            const value = '666';
           
           
           const req = mockRequest(timestamp, value, email);
          
          const res = mockResponse();

           // Act
           await createMetric(req, res);

           // Assert
           expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad value in body', () => {
        it('should return status 400', async () => {
           // Arrange
           const email = 'email';
            const timestamp = '1384686660000';
            const value = "";
           
           const req = mockRequest(timestamp, value, email);
          
          const res = mockResponse();

           // Act
           await createMetric(req, res);

           // Assert
           expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});
afterAll( async () => {
   await mongoose.connection.db.dropDatabase();
   await mongoose.connection.close();

})