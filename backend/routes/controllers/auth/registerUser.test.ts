
export {}
const mongoose = require('mongoose');
const registerUser = require('./registerUser');

const mockRequest = (   usernameData = '', passwordData = '', emailData = '') => ({
    body: { 
        username : usernameData,
        password : passwordData,
        email : emailData
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
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
};
beforeAll( async ()=>{
    const mongoDbUri =  'mongodb://localhost:27017';
    const mongoDbDatabase = 'test';

    // Act
    await mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
        useNewUrlParser: true
    });
   await mongoose.connection.db.dropDatabase();

})
 describe('[Controllers > Auth] - Register User', () => {
    describe('Call with a good body', () => {
        it('should return status 200', async () => {
            // Arrange
            const email = 'alex5@gmail.com';
            const username = 'Simeon';
            const password = 'Password123&';
            
            
            const req = mockRequest(username, password, email);
           
           const res = mockResponse();

            // Act
            await registerUser(req, res);

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
            await registerUser(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad email', () => {
        it('should return status 400', async () => {
            // Arrange
            
            const email = 'alex5gmail.com';
            const username = 'Simeon';
            const password = 'Password123&';
            
            const req = mockRequest(username, password, email);
            const res = mockResponse();

            // Act
            await registerUser(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad password', () => {
        it('should return status 400', async () => {
            // Arrange
            
            const email = 'alex5@gmail.com';
            const username = 'Simeon';
            const password = 'Password123';
            
            const req = mockRequest(username, password, email);
            const res = mockResponse();

            // Act
            await registerUser(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});

afterAll( () => {
    mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
})
