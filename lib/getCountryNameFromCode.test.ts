import { getCountryNameFromCode } from './getCountryNameFromCode';

describe('getCountryNameFromCode', () => {
  test('should return country name for valid country code', () => {
    expect(getCountryNameFromCode('US')).toBe('United States');
  });

  test('should return null for invalid country code', () => {
    expect(getCountryNameFromCode('XYZ')).toBeNull();
  });

  test('should return country name for lowercase country code', () => {
    expect(getCountryNameFromCode('us')).toBe('United States');
  });

  test('should return null for empty country code', () => {
    expect(getCountryNameFromCode('')).toBeNull();
  });
});
