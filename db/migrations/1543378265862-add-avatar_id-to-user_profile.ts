import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    ALTER TABLE cmyk.user_profile
    ADD COLUMN avatar_id UUID REFERENCES cmyk.file(id) ON DELETE SET NULL
  `);

  await pool.end();
}

export async function down() {
  const pool = new Pool();

  await pool.query(`
    ALTER TABLE cmyk.user_profile
    DROP COLUMN avatar_id
  `);

  await pool.end();
}
