const countries = require('countries-list').countries;

export const getCountryNameFromCode = (code: string): string | null => {
  const country = countries[code.toUpperCase()];
  return country ? country.name : null;
};
