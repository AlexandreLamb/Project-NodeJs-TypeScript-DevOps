
export {}
const mongoose = require('mongoose');
const updateMetric = require('./Update');
require('dotenv').config();

const {UserModel, AuthModel,MetricModel } = require('../../../models');

const mockRequest = (   timestampData = '', valueData = '', idData = '') => ({
    body: { 
            timestamp : timestampData,
            value  : valueData,
            id : idData
        },
        
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
    const port = process.env.PORT || 3030;
    const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const mongoDbDatabase = process.env.MONGODB_DATABASE || 'metrics';

    await mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
        useNewUrlParser: true
    });
    await mongoose.connection.db.dropDatabase();

    await MetricModel.create({
        timestamp : "test",
        value : "test",
        userId: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')
    })
  });
describe('[Controllers > Metrics] - Update', () => {
    describe('Call with a good body', () => {
        it('should return status 200', async () => {
            // Arrange
            const timestamp = '1384686660000';
            const value = '666';
            const metric = await MetricModel.findOne({value: 'test'}).exec()
            // Act
            const req = mockRequest(timestamp, value, metric._id);           
            const res = mockResponse();

            // Act
            await updateMetric(req, res);

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
            await updateMetric(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad id in body', () => {
        it('should return status 400', async () => {
           // Arrange
            const timestamp = '1384686660000';
            const value = '666';
            const id = mongoose.Types.ObjectId('5edd40c86762e0fb12000003')
           
           const req = mockRequest(timestamp, value, id);
          
          const res = mockResponse();

           // Act
           await updateMetric(req, res);

           // Assert
           expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});
afterAll( async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();

})