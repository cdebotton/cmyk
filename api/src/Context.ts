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

  userById = new DataLoader(async keys => {
    const client = await this.pool.connect();
    const params = keys.map((_, i) => `$${i + 1}`);
    const query = `SELECT * FROM cmyk.user u WHERE u.id IN ${params}`;
    const { rows } = await client.query(query, keys);
    return rows;
  });

  profileByUserId = new DataLoader(async keys => {
    const client = await this.pool.connect();
    const params = keys.map((_, i) => `$${i + 1}`);
    const query = `SELECT * FROM cmyk.user_profile p WHERE p.user_id IN ${params}`;
    const { rows } = await client.query(query, keys);
    return rows;
  });
}

export default Context;
