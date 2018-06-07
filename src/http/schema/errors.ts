import { createError } from 'apollo-errors';

export const InvalidCredentialsError = createError('InvalidCredentialsError', {
  message: 'The credentials provided for authentication are incorrect',
});
