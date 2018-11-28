import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    CREATE TABLE cmyk.document (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title         TEXT NOT NULL,
      published_at  TIMESTAMP DEFAULT now(),
      created_at    TIMESTAMP DEFAULT now(),
      updated_at    TIMESTAMP DEFAULT now(),
      author_id     UUID REFERENCES cmyk.user(id) ON DELETE SET NULL,
    );

    CREATE TRIGGER file_updated_at BEFORE UPDATE
    ON cmyk.file
    FOR EACH ROW
    EXECUTE PROCEDURE cmyk_private.set_updated_at();
  `);

  await pool.end();
}

export async function down() {
  const pool = new Pool();

  await pool.query(`
    DROP TRIGGER file_updated_at ON cmyk.file;
    DROP TABLE cmyk.document;
  `);

  await pool.end();
}
