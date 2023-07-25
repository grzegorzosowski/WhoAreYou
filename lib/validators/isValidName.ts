import validator from 'validator';

export const isValidName = (name: string): boolean => {
  return validator.isAlpha(name, 'pl-PL');
};
