import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    -- Your up query
  `);

  await pool.end();
}

export async function down() {
  const pool = new Pool();

  await pool.query(`
    -- Your down query
  `);

  await pool.end();
}
