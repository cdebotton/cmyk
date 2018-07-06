const getTokenFromAuthorization = (authorization?: string) => {
  if (!authorization) {
    return null;
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return null;
  }

  return token;
};

export default getTokenFromAuthorization;
