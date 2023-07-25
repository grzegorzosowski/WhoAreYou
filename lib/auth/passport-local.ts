import Local from 'passport-local';
import { findUserByUsername, validatePassword } from './user';

export const localStrategy = new Local.Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  function (username, password, done) {
    findUserByUsername(username)
      .then((user) => {
        if (user && validatePassword(user, password)) {
          done(null, user);
        } else {
          done('Invalid username and password combination');
        }
      })
      .catch((error) => {
        done(error);
      });
  }
);
