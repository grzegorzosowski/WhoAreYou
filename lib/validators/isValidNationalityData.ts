import { UserNationalityData } from '../types';
import { isValidName } from './isValidName';

export const isValidNationalityData = ({
  nationalityData,
}: {
  nationalityData: UserNationalityData;
}) => {
  const isNameValid = isValidName(nationalityData.name);
  const isCountNotZero = nationalityData.count !== 0;
  const isCountryNotEmptyArray = nationalityData.country.length !== 0;
  return isNameValid && isCountNotZero && isCountryNotEmptyArray;
};
