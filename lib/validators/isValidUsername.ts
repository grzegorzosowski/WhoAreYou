export const isValidUsername = (username: string): string | boolean => {
  if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Invalid username';
  }
  return true;
};
