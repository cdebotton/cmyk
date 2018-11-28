import { Pool } from 'pg';
import { genSalt, hash } from 'bcryptjs';

export async function up() {
  const pool = new Pool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const salt = await genSalt(10);
    const hashedPassword = await hash('test', salt);

    const {
      rows: [{ id }],
    } = await client.query(
      'INSERT INTO cmyk.user(role, email, hashed_password) VALUES($1, $2, $3) RETURNING id',
      ['ADMIN', 'admin@cmyk.com', hashedPassword],
    );

    await client.query(
      'INSERT INTO cmyk.user_profile(user_id, first_name, last_name) VALUES($1, $2, $3)',
      [id, 'Admin', 'Account'],
    );

    await await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  }

  await client.release();
  await pool.end();
}

export async function down() {}
