const expect = require('chai').expect;
const isEmail = (email) => {
    const regex = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;

    return regex.test(email);
};
describe('[CASE-4] - isEmail ', () => {
    it('should return true', () => {
        // Arrange
        const param = 'gui@gmail.com';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(true);
    });
});

describe('[CASE-5] - isEmail ', () => {
    it('should return true', () => {
        // Arrange
        const param = 'gui@edu.ece.fr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(true);
    });
});

describe('[CASE-6] - isEmail ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'guiedu.fr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(false);
    });
});

describe('[CASE-7] - isEmail ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'gui@edufr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(false);
    });
});
