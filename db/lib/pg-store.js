const { Pool } = require('pg');

function Store() {}

Store.prototype.load = async function(fn) {
  const pool = new Pool();
  await pool.connect();

  const { rows } = await pool.query(`
    SELECT data
    FROM cmyk_private.migrations
  `);

  if (rows.length !== 1) {
    console.log(
      "Cannot read migrations from database. If this is the first time you've run migraitons, this is normal.",
    );

    return fn(null, {});
  }

  await pool.end();

  fn(null, rows[0].data);
};

Store.prototype.save = async function(set, fn) {
  const pool = new Pool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cmyk_private.migrations (
      id integer PRIMARY KEY,
      data jsonb NOT NULL
    )
  `);

  await pool.query(
    `
    INSERT INTO cmyk_private.migrations (id, data)
    VALUES (1, $1)
    ON CONFLICT (id) DO UPDATE SET data = $1
  `,
    [
      {
        lastRun: set.lastRun,
        migrations: set.migrations,
      },
    ],
  );

  await pool.end();
  fn();
};

module.exports = Store;
