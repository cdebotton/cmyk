import { Pool } from 'pg';

export async function up() {
  const pool = new Pool();

  await pool.query(`
    CREATE TABLE cmyk.file (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      bucket      TEXT NOT NULL,
      encoding    TEXT NOT NULL,
      etag        TEXT NOT NULL,
      key         TEXT NOT NULL,
      mimetype    TEXT NOT NULL,
      size        INTEGER NOT NULL,
      created_at  TIMESTAMP DEFAULT now(),
      updated_at  TIMESTAMP DEFAULT now()
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
    DROP TABLE cmyk.file;
  `);

  await pool.end();
}
