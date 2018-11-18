import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    CREATE TABLE cmyk.user (
      id                SERIAL PRIMARY KEY,
      email             TEXT UNIQUE NOT NULL,
      hashed_password   TEXT NOT NULL,
      created_at        TIMESTAMP DEFAULT now(),
      updated_at        TIMESTAMP DEFAULT now()
    );

    CREATE TRIGGER user_updated_at BEFORE UPDATE
    ON cmyk.user
    FOR EACH ROW
    EXECUTE PROCEDURE cmyk_private.set_updated_at();
  `);

  await pool.end();
}

export async function down() {
  const pool = new Pool();

  await pool.query(`
    DROP TRIGGER user_updated_at ON cmyk.user;
    DROP TABLE cmyk.user;
  `);

  await pool.end();
}
