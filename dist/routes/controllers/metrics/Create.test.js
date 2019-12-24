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
const createMetric = require('./Create');
const { UserModel, AuthModel } = require('../../../models');
const AuthServices = require('../../../services/AuthServices');
const mockRequest = (timestampData = '', valueData = '', cookieData = '') => ({
    body: {
        timestamp: timestampData,
        value: valueData,
    },
    headers: {
        cookie: cookieData,
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
    yield mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
        useNewUrlParser: true
    });
    yield mongoose.connection.db.dropDatabase();
    yield AuthModel.create({
        "username": "Simeon",
        "password": "Azerty1&",
        "email": "alex1@gmail.com"
    });
    yield UserModel.create({
        "username": "Simeon",
        "password": "Azerty1&",
        "email": "alex1@gmail.com"
    });
}));
describe('[Controllers > Metrics] - Create', () => {
    describe('Call with a good body', () => {
        it('should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const timestamp = '1384686660000';
            const value = '666';
            const auth = yield AuthModel.findOne({ email: "alex1@gmail.com" });
            const token = AuthServices.generateToken(auth);
            const cookie = "token=" + token;
            // Act
            const req = mockRequest(timestamp, value, cookie);
            const res = mockResponse();
            // Act
            yield createMetric(req, res);
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
            yield createMetric(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
    describe('Call with bad email in body', () => {
        it('should return status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const email = 'email';
            const timestamp = '1384686660000';
            const value = '666';
            const req = mockRequest(timestamp, value, email);
            const res = mockResponse();
            // Act
            yield createMetric(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
    describe('Call with bad value in body', () => {
        it('should return status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const email = 'email';
            const timestamp = '1384686660000';
            const value = "";
            const req = mockRequest(timestamp, value, email);
            const res = mockResponse();
            // Act
            yield createMetric(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.db.dropDatabase();
    yield mongoose.connection.close();
}));
