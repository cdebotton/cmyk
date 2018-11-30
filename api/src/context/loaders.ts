import DataLoader from 'dataloader';
import { Pool } from 'pg';
import { mapTo } from '../utils';

function loaders(pool: Pool) {
  return {
    userById: new DataLoader<string, any>(async keys => {
      const client = await pool.connect();
      const params = keys.map((_, i) => `$${i + 1}`).join(',');
      const query = `SELECT * FROM cmyk.user u WHERE u.id IN (${params})`;
      const { rows } = await client.query(query, keys);
      client.release();
      return mapTo(keys, x => x.id)(rows);
    }),

    profileByUserId: new DataLoader<string, any>(async keys => {
      const client = await pool.connect();
      const params = keys.map((_, i) => `$${i + 1}`).join(',');
      const query = `SELECT * FROM cmyk.user_profile p WHERE p.user_id IN (${params})`;
      const { rows } = await client.query(query, keys);
      client.release();

      return mapTo(keys, x => x.user_id)(rows);
    }),

    fileById: new DataLoader<string, any>(async keys => {
      const client = await pool.connect();
      const params = keys.map((_, i) => `$${i + 1}`).join(',');
      const query = `SELECT * FROM cmyk.file f WHERE f.id IN (${params})`;
      const { rows } = await client.query(query, keys);
      client.release();
      return mapTo(keys, x => x.id)(rows);
    }),
  };
}

export { loaders };
