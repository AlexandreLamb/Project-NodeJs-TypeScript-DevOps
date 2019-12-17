const {isEmail}  = require('./formatChecker')

describe('[CASE-4] - isEmail ', () => {
    it('should return true', () => {
        // Arrange
        const param = 'al@gmail.com';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(true);
    });
});

describe('[CASE-5] - isEmail ', () => {
    it('should return true', () => {
        // Arrange
        const param = 'al@edu.ece.fr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(true);
    });
});

describe('[CASE-6] - isEmail ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'aledu.fr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(false);
    });
});

describe('[CASE-7] - isEmail ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'al@edufr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(false);
    });
});
