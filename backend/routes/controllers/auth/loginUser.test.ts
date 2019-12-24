
export {}
const mongoose = require('mongoose');
const loginUser = require('./loginUser');
const {AuthModel,UserModel} = require('../../../models')
const bcrypt = require('bcryptjs')
const mockRequest = ( passwordData = '', emailData = '') => ({
    body: { 
        password : passwordData,
        email : emailData
        }
});

const mockResponse = () => {
    const res = {
        status : jest.fn(),
        render : jest.fn(),
        redirect : jest.fn(),
        cookie : jest.fn()
    };
    res.status = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
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
    
   const password = await bcrypt.hash("Password123&", 10);

   await AuthModel.create({
    "username" : "Simeon",
    "password" : password,
    "email" : "alex5@gmail.com"
    });
    await UserModel.create({
    "username" : "Simeon",
    "password" : password,
    "email" : "alex5@gmail.com"
    });

})
 describe('[Controllers > Auth] - Login User', () => {
    describe('Call with a good body', () => {
        it('should return status 200', async () => {
            // Arrange
            const email = 'alex5@gmail.com';
            const password = 'Password123&';            
            
            const req = mockRequest(password, email);
           
            const res = mockResponse();

            // Act
            await loginUser(req, res);

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
            await loginUser(req, res);

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
            
            const req = mockRequest(password, email);
            const res = mockResponse();

            // Act
            await loginUser(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
    describe('Call with bad password', () => {
        it('should return status 400', async () => {
            // Arrange
            
            const email = 'alex5@gmail.com';
            const password = 'Password123';
            
            const req = mockRequest(password, email);
            const res = mockResponse();

            // Act
            await loginUser(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});

afterAll( () => {
    mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
})
