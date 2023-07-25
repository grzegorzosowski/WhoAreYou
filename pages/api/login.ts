import passport from 'passport';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { localStrategy } from '@/lib/auth/passport-local';
import { SessionData, setLoginSession } from '@/lib/auth/auth';

const authenticate = (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<SessionData> =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error: any, user: SessionData) => {
      if (error || !user) {
        reject(error as any);
      } else {
        resolve(user);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res);
      const session: SessionData = {
        userId: String(user.userId),
      };

      await setLoginSession(res, session);
      res.status(200).send({ done: true });
    } catch (error: any) {
      console.error(error);
      res.status(401).send('Unauthorized');
    }
  });
