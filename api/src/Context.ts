import DataLoader from 'dataloader';
import { Pool } from 'pg';

interface Token {
  userId: string;
  iat: string;
}

class Context {
  token: Token | null;
  pool: Pool;

  constructor(token: Token | null, pool: Pool) {
    this.pool = pool;
    this.token = token;
  }

  userById = new DataLoader(async keys => {
    const client = await this.pool.connect();
    const params = keys.map((_, i) => `$${i + 1}`).join(',');
    const query = `SELECT * FROM cmyk.user u WHERE u.id IN (${params})`;
    const { rows } = await client.query(query, keys);
    client.release();
    return rows;
  });

  profileByUserId = new DataLoader(async keys => {
    const client = await this.pool.connect();
    const params = keys.map((_, i) => `$${i + 1}`).join(',');
    const query = `SELECT * FROM cmyk.user_profile p WHERE p.user_id IN (${params})`;
    const { rows } = await client.query(query, keys);

    client.release();
    return rows;
  });

  fileById = new DataLoader(async keys => {
    const client = await this.pool.connect();
    const params = keys.map((_, i) => `$${i + 1}`).join(',');
    const query = `SELECT * FROM cmyk.file f WHERE f.id IN (${params})`;
    const { rows } = await client.query(query, keys);
    client.release();
    return rows;
  });
}

export default Context;
