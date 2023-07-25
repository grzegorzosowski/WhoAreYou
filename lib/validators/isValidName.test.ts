import { isValidName } from './isValidName';

describe('isValidName', () => {
  test('should return false for invalid name', () => {
    expect(isValidName('John Doe')).toBe(false);
    expect(isValidName('John123')).toBe(false);
    expect(isValidName('John@')).toBe(false);
    expect(isValidName('John!')).toBe(false);
    expect(isValidName('John#')).toBe(false);
    expect(isValidName('John$')).toBe(false);
    expect(isValidName('John%')).toBe(false);
    expect(isValidName('John^')).toBe(false);
    expect(isValidName('John&')).toBe(false);
    expect(isValidName('John*')).toBe(false);
    expect(isValidName('John(')).toBe(false);
    expect(isValidName('')).toBe(false);
  });
  test('should return true for valid name', () => {
    expect(isValidName('John')).toBe(true);
    expect(isValidName('john')).toBe(true);
  });
});
