import { isValidPassword } from './isValidPassword';

describe('isValidPassword', () => {
  test('should return true for a valid password', () => {
    expect(isValidPassword('SecurePassword123!')).toBe(true);
  });
  test('should return "Password is invalid" for passwords with less than 8 characters', () => {
    expect(isValidPassword('weak')).toBe(false);
  });
  test('should return "Password is invalid" for passwords without lowercase letters', () => {
    expect(isValidPassword('UPPERCASE123!')).toBe(false);
  });
  test('should return "Password is invalid" for passwords without uppercase letters', () => {
    expect(isValidPassword('lowercase123!')).toBe(false);
  });
  test('should return "Password is invalid" for passwords without digits', () => {
    expect(isValidPassword('UpperCaseLowercase!')).toBe(false);
  });
  test('should return "Password is invalid" for passwords without special characters', () => {
    expect(isValidPassword('UpperCaseLowercase123')).toBe(false);
  });
  test('should return "Password is invalid" for passwords containing whitespace', () => {
    expect(isValidPassword('WhiteSpace123 !')).toBe(false);
  });
});
