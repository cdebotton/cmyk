import jwt from 'jsonwebtoken';

export function mapTo(keys: string[], keyFn: (predicate: any) => string) {
  return (rows: any[]) => {
    const initialEntries = keys.map<[string, any]>(key => [key, null]);
    const group = new Map(initialEntries);
    rows.forEach(row => group.set(keyFn(row), row));
    return Array.from(group.values());
  };
}

export function mapToMany(keys: string[], keyFn: (predicate: any) => string) {
  return (rows: any[]) => {
    const initialEntries = keys.map<[string, any]>(key => [key, null]);
    const group = new Map(initialEntries);
    rows.forEach(row => {
      const nextGroup = group.get(keyFn(row)) || [];
      nextGroup.push(row);
    });
    return Array.from(group.values());
  };
}

interface Token {
  iat: string;
  userId: string;
}

export function getToken(authorization?: string): Token | null {
  if (!authorization) {
    return null;
  }

  const token = authorization.split(' ')[1];
  let decoded = jwt.verify(token, 'shh');

  if (!decoded) {
    return null;
  }

  if (typeof decoded === 'string') {
    try {
      return JSON.parse(decoded) as Token;
    } catch {
      return null;
    }
  }

  return decoded as Token;
}
