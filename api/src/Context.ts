import DataLoader from 'dataloader';
import { Pool } from 'pg';

interface Token {
  userId: string;
  iat: string;
}

class Context {
  userId: string | null;
  pool: Pool;

  constructor(token: Token | null) {
    this.pool = new Pool();
    this.userId = token ? token.userId : null;
  }
}

export default Context;
