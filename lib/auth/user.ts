import { RequestWithCookies, UserValidation } from '../types';
import { isValidPassword } from '../validators/isValidPassword';
import { Session, getLoginSession } from './auth';

const users: Array<UserValidation> = [
  {
    userId: 1,
    username: process.env.ADMIN_USERNAME ?? 'admin',
    password: process.env.ADMIN_PASSWORD ?? 'qw12QW!@',
  },
];

export async function findUserByUsername(username: string) {
  return users.find((user) => user.username === username);
}

export function validatePassword(user: UserValidation, inputPassword: string) {
  const validatorResult = isValidPassword(inputPassword);
  if (validatorResult === false) {
    return false;
  }
  return user.password === inputPassword;
}

export async function getUserFromSession(req: RequestWithCookies) {
  try {
    const session: Session = await getLoginSession(req);
    const user = (session && session.userId) ?? null;
    if (user == null) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
}
