
export {}
const mongoose = require('mongoose');
const deleteMetric = require('./Delete');
const {MetricModel } = require('../../../models');

const mockRequest = (  idData = "") => ({
    params: { 
            id : idData
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

    await MetricModel.create({
        timestamp : "test",
        value : "test",
        userId: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')

    })
  });
describe('[Controllers > Metrics] - Delete', () => {
    describe('Call with a good body', () => {
        it('should return status 200', async () => {
            // Arrange
            const metric = await MetricModel.findOne({value : "test"});
            // Act
           
            const req = mockRequest(metric._id);           
            const res = mockResponse();

            // Act
            await deleteMetric(req, res);

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
            await deleteMetric(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad id in params', () => {
        it('should return status 400', async () => {
           // Arrange
           
            const id = mongoose.Types.ObjectId('5edd40c86762e0fb12000003')
           
            const req = mockRequest(id);
          
            const res = mockResponse();

           // Act
           await deleteMetric(req, res);

           // Assert
           expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});
afterAll( async () => {
    await  mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();

})