import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    CREATE FUNCTION cmyk_private.set_updated_at() RETURNS TRIGGER AS $$
    BEGIN
      new.updated_at := current_timestamp;
      return new;
    END;
    $$ language 'plpgsql';
  `);

  await pool.end();
}

export async function down() {
  const pool = new Pool();

  await pool.query(`
    DROP FUNCTION cmyk_private.set_updated_at();
  `);

  await pool.end();
}
