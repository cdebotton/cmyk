import { Pool } from 'pg';
import { loaders } from './loaders';
import { db } from './db';

interface Token {
  userId: string;
  iat: string;
}

class Context {
  token: Token | null;

  loaders: ReturnType<typeof loaders>;
  db: ReturnType<typeof db>;

  constructor(token: Token | null, pool: Pool) {
    this.token = token;
    this.loaders = loaders(pool);
    this.db = db(pool);
  }
}

export { Context };
