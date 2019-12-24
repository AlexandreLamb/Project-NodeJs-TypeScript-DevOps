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
const updateMetric = require('./Update');
const { UserModel, AuthModel, MetricModel } = require('../../../models');
const mockRequest = (timestampData = '', valueData = '', idData = '') => ({
    body: {
        timestamp: timestampData,
        value: valueData,
        id: idData
    },
});
const mockResponse = () => {
    const res = {
        json: jest.fn(),
        status: jest.fn(),
        render: jest.fn(),
        redirect: jest.fn()
    };
    res.json = jest.fn().mockReturnValue(res);
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
    yield MetricModel.create({
        timestamp: "test",
        value: "test",
        userId: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')
    });
}));
describe('[Controllers > Metrics] - Update', () => {
    describe('Call with a good body', () => {
        it('should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const timestamp = '1384686660000';
            const value = '666';
            const metric = yield MetricModel.findOne({ value: 'test' }).exec();
            // Act
            const req = mockRequest(timestamp, value, metric._id);
            const res = mockResponse();
            // Act
            yield updateMetric(req, res);
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
            yield updateMetric(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
    describe('Call with bad id in body', () => {
        it('should return status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const timestamp = '1384686660000';
            const value = '666';
            const id = mongoose.Types.ObjectId('5edd40c86762e0fb12000003');
            const req = mockRequest(timestamp, value, id);
            const res = mockResponse();
            // Act
            yield updateMetric(req, res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.db.dropDatabase();
    yield mongoose.connection.close();
}));
