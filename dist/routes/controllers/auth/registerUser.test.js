"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const registerUser = require('./registerUser');
const mockRequest = (usernameData = '', passwordData = '', emailData = '') => ({
    body: {
        username: usernameData,
        password: passwordData,
        email: emailData
    }
});
const mockResponse = () => {
    const res = {
        status: jest.fn(),
        render: jest.fn(),
        redirect: jest.fn()
    };
    res.status = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDbUri = 'mongodb://localhost:27017';
    const mongoDbDatabase = 'test';
    // Act
    yield mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
        useNewUrlParser: true
    });
    yield mongoose.connection.db.dropDatabase();
}));
describe('[Controllers > Auth] - Register User', () => {
    describe('Call with a good body', () => {
        it('should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const email = 'alex5@gmail.com';
            const username = 'Simeon';
            const password = 'Password123&';
            const req = mockRequest(username, password, email);
            const res = mockResponse();
            // Act
            yield registerUser(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
        }));
    });
    describe('Call without body', () => {
        it('should return status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const req = mockRequest();
            const res = mockResponse();
            // Act
            yield registerUser(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
    describe('Call with bad email', () => {
        it('should return status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const email = 'alex5gmail.com';
            const username = 'Simeon';
            const password = 'Password123&';
            const req = mockRequest(username, password, email);
            const res = mockResponse();
            // Act
            yield registerUser(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
    describe('Call with bad password', () => {
        it('should return status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const email = 'alex5@gmail.com';
            const username = 'Simeon';
            const password = 'Password123';
            const req = mockRequest(username, password, email);
            const res = mockResponse();
            // Act
            yield registerUser(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
});
afterAll(() => {
    mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
});
