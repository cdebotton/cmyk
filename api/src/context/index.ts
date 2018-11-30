import { loaders } from './loaders';
import knex from 'knex';

interface Token {
  userId: string;
  iat: string;
}

class Context {
  token: Token | null;

  loaders: ReturnType<typeof loaders>;
  db: knex;

  constructor(token: Token | null, db: knex) {
    this.token = token;
    this.loaders = loaders(db);
    this.db = db;
  }
}

export { Context };
