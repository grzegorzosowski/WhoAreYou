import { UserGenderData } from '../types';
import { isValidGenderData } from './isValidGenderData';

describe('isValidGenderData', () => {
  test('should return true for valid genderData', () => {
    const validGenderData: UserGenderData = {
      count: 10,
      name: 'John',
      gender: 'male',
      probability: 0.9,
    };
    expect(isValidGenderData({ genderData: validGenderData })).toBe(true);
  });

  test('should return false if name is not valid', () => {
    const invalidGenderData: UserGenderData = {
      count: 5,
      name: '',
      gender: 'male',
      probability: 0.8,
    };
    expect(isValidGenderData({ genderData: invalidGenderData })).toBe(false);
  });

  test('should return false if count is zero', () => {
    const zeroCountGenderData: UserGenderData = {
      count: 0,
      name: 'Alice',
      gender: 'female',
      probability: 0.7,
    };
    expect(isValidGenderData({ genderData: zeroCountGenderData })).toBe(false);
  });

  test('should return false if gender is null', () => {
    const nullGenderGenderData: UserGenderData = {
      count: 3,
      name: 'Michael',
      gender: null,
      probability: 0.6,
    };
    expect(isValidGenderData({ genderData: nullGenderGenderData })).toBe(false);
  });
});
