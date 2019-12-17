
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//const describe  = require('mocha').describe();
//const it = require('mocha').it();
const expect = require('chai').expect;
dotenv.config();

describe('[Server]', () => {
    describe('MongoDb uri', () => {
        it('should be defined in env', () => {
            // Arrange

            // Act

            // Assert
            expect(process.env.MONGODB_URI).to.not.be.an('undefined');
        });
    });

    describe('MongoDb database', () => {
        it('should be defined in env', () => {
            // Arrange

            // Act

            // Assert
            expect(process.env.MONGODB_DATABASE).to.not.be.an('undefined');
        });
    });

    describe('MongoDb', () => {
        it('should be connected', async () => {
            // Arrange
            const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
            const mongoDbDatabase = process.env.MONGODB_DATABASE || 'todolist';

            // Act
            await mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, {
                useNewUrlParser: true
            });
            const connectionState = await mongoose.connection.readyState;
            mongoose.connection.close();

            // Assert
            expect(connectionState).to.equal(1);
        });
    });
});
