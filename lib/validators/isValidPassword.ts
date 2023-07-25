export const isValidPassword = (password: string): boolean => {
  if (
    password.length < 8 ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ||
    /\s/.test(password)
  ) {
    return false;
  }
  return true;
};
