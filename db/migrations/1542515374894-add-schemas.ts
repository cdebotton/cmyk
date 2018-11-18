import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    CREATE SCHEMA cmyk;
    CREATE SCHEMA cmyk_private;
  `);

  await pool.end();
}

export async function down() {
  const pool = new Pool();

  await pool.query(`
    DROP SCHEMA cmyk;
    DROP SCHEMA cmyk_private;
  `);

  await pool.end();
}
