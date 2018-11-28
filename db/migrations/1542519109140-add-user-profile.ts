import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    CREATE TABLE cmyk.user_profile (
      user_id       UUID PRIMARY KEY REFERENCES cmyk.user(id) ON DELETE CASCADE,
      first_name    TEXT NOT NULL,
      last_name     TEXT NOT NULL,
      last_login    TIMESTAMP,
      date_of_birth TIMESTAMP
    );
  `);

  await pool.end();
}

export async function down() {
  const pool = new Pool();

  await pool.query(`
    DROP TABLE cmyk.user_profile;
  `);

  await pool.end();
}
