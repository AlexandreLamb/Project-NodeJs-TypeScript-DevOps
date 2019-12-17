const {isEmail, isPassword}  = require('./formatChecker')

describe('[CASE-1] - isEmail ', () => {
    it('should return true', () => {
        // Arrange
        const param = 'al@gmail.com';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(true);
    });
});

describe('[CASE-2] - isEmail ', () => {
    it('should return true', () => {
        // Arrange
        const param = 'al@edu.ece.fr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(true);
    });
});

describe('[CASE-3] - isEmail ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'aledu.fr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(false);
    });
});

describe('[CASE-4] - isEmail ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'al@edufr';
        // Act
        const result = isEmail(param);
        // Assert
        expect(result).toBe(false);
    });
});
describe('[CASE-5] - isPassword ', () => {
    it('should return true', () => {
        // Arrange
        const param = 'Azerty1@';
        // Act
        const result = isPassword(param);
        // Assert
        expect(result).toBe(true);
    });
});
describe('[CASE-6] - isPassword ', () => {
    it('should return true', () => {
        // Arrange
        const param = '@1azertY';
        // Act
        const result = isPassword(param);
        // Assert
        expect(result).toBe(true);
    });
});
describe('[CASE-7] - isPassword ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'azerty1@';
        // Act
        const result = isPassword(param);
        // Assert
        expect(result).toBe(false);
    });
});
describe('[CASE-8] - isPassword ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'Azertyu@';
        // Act
        const result = isPassword(param);
        // Assert
        expect(result).toBe(false);
    });
});
describe('[CASE-9] - isPassword ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'Azerty12';
        // Act
        const result = isPassword(param);
        // Assert
        expect(result).toBe(false);
    });
});
describe('[CASE-10] - isPassword ', () => {
    it('should return false', () => {
        // Arrange
        const param = 'Azer1@';
        // Act
        const result = isPassword(param);
        // Assert
        expect(result).toBe(false);
    });
});
