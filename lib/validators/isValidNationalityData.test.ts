import { isValidNationalityData } from './isValidNationalityData';
import { UserNationalityData } from '../types';

describe('isValidNationalityData', () => {
  test('should return true for valid nationalityData', () => {
    const validNationalityData: UserNationalityData = {
      count: 10,
      name: 'John',
      country: [
        { country_id: 'US', probability: 0.9 },
        { country_id: 'CA', probability: 0.8 },
      ],
    };
    expect(isValidNationalityData({ nationalityData: validNationalityData })).toBe(true);
  });
  test('should return false if name is not valid', () => {
    const invalidNationalityData: UserNationalityData = {
      count: 5,
      name: '',
      country: [{ country_id: 'DE', probability: 0.7 }],
    };
    expect(isValidNationalityData({ nationalityData: invalidNationalityData })).toBe(false);
  });
  test('should return false if count is zero', () => {
    const zeroCountNationalityData: UserNationalityData = {
      count: 0,
      name: 'Alice',
      country: [{ country_id: 'FR', probability: 0.6 }],
    };
    expect(isValidNationalityData({ nationalityData: zeroCountNationalityData })).toBe(false);
  });
  test('should return false if country array is empty', () => {
    const emptyCountryNationalityData: UserNationalityData = {
      count: 3,
      name: 'Michael',
      country: [],
    };
    expect(isValidNationalityData({ nationalityData: emptyCountryNationalityData })).toBe(false);
  });
});
