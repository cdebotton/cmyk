import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    CREATE TYPE role_t as enum('ADMIN', 'EDITOR', 'VIEWER', 'DEMO', 'UNAUTHORIZED');

    CREATE TABLE cmyk.user (
      id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      role              role_t NOT NULL DEFAULT 'UNAUTHORIZED',
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
    DROP TYPE role_t;
  `);

  await pool.end();
}
