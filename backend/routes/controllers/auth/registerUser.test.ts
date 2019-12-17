
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
        json : jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

 describe('[Controllers > Auth] - Register User', () => {
    describe('Call with a good body', () => {
        it('should return status 200', async () => {
            // Arrange
            const email = 'alex5@gmail.com';
            const username = 'Simeon';
            const password = 'Password123&';
            
            const mongoDbUri =  'mongodb://localhost:27017';
            const mongoDbDatabase = 'test';

            // Act
            await mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
                useNewUrlParser: true
            });
            const req = mockRequest(username, password, email);
           
           const res = mockResponse();

            // Act
            await registerUser(req, res);
            mongoose.connection.close();

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
