import { isValidUsername } from './isValidUsername';

describe('isValidUsername', () => {
  test('should return true for a valid username', () => {
    const validUsername = 'user_123';
    expect(isValidUsername(validUsername)).toBe(true);
  });

  test('should return error message for username with less than 3 characters', () => {
    const invalidUsername = 'ab';
    const errorMessage = 'Invalid username';
    expect(isValidUsername(invalidUsername)).toBe(errorMessage);
  });

  test('should return error message for username with invalid characters', () => {
    const invalidUsername = 'user$#name';
    const errorMessage = 'Invalid username';
    expect(isValidUsername(invalidUsername)).toBe(errorMessage);
  });
});
