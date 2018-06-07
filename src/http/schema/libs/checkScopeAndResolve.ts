import { createError } from 'apollo-errors';
import jwt from 'jsonwebtoken';
import { IFieldResolver } from 'graphql-tools';
import { Context } from '..';
import getTokenFromAuthorization from './getTokenFromHeader';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('You did not provide a JWT_SECRET env variable');
}

const AuthorizationError = createError('AuthorizationError', {
  message: 'You are not authorized',
});

const checkScopeAndResolve = (
  context: Context,
  expectedScope: string,
  resolver: IFieldResolver<{}, Context>,
) => {
  const token = getTokenFromAuthorization(context.req.headers.authorization);

  if (!token) {
    throw new AuthorizationError();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError();
  }
};
