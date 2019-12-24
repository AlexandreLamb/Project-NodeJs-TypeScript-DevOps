
export {}
const mongoose = require('mongoose');
const readMetric = require('./Read');
const {UserModel, AuthModel } = require('../../../models');
const AuthServices = require('../../../services/AuthServices');

const mockRequest = ( cookieData = '') => ({
        headers : {
            cookie : cookieData,
        }
});

const mockResponse = () => {
    const res = {
        json : jest.fn(),
        status : jest.fn(),
        render : jest.fn(),
        redirect : jest.fn()
    
    };
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    res.redirect  = jest.fn().mockReturnValue(res);
    return res;
};
beforeAll(async () => {
    const mongoDbUri =  'mongodb://localhost:27017';
    const mongoDbDatabase = 'test';

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
describe('[Controllers > Metrics] - Read', () => {
    describe('Call with a good body', () => {
        it('should return status 200', async () => {
            // Arrange
            const auth =  await AuthModel.findOne({ email : "alex1@gmail.com" });
            const token = AuthServices.generateToken(auth);
            const cookie  = "token="+token;
            // Act
           
            const req = mockRequest( cookie);           
            const res = mockResponse();

            // Act
            await readMetric(req, res);

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
            await readMetric(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad cookie in headers', () => {
        it('should return status 400', async () => {
           // Arrange
            
            const cookie = "cookie";
           
            const req = mockRequest(cookie);
          
            const res = mockResponse();

           // Act
           await readMetric(req, res);

           // Assert
           expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});
afterAll( async () => {
    await  mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();

})