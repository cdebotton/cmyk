import { Context } from 'koa';
import jwt from 'jsonwebtoken';

export type Session = {
  userId: string;
  iat: number;
};

const getSessionUserFromContext = (context: Context): Session | null => {
  const token = context.cookies.get('jwt');

  if (!token) {
    return null;
  }

  const sessionUser = jwt.decode(token) as Session;

  if (!sessionUser) {
    return null;
  }

  return sessionUser;
};

export default getSessionUserFromContext;
