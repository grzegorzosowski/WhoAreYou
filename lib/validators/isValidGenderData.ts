import { UserGenderData } from '../types';
import { isValidName } from './isValidName';

export const isValidGenderData = ({ genderData }: { genderData: UserGenderData }) => {
  const isNameValid = isValidName(genderData.name);
  const isCountNotZero = genderData.count !== 0;
  const isGenderNotNull = genderData.gender !== null;
  return isNameValid && isCountNotZero && isGenderNotNull;
};
