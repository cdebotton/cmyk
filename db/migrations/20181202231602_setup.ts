import Knex from 'knex';

export async function up(knex: Knex) {
  return await Promise.all([
    knex.raw('CREATE EXTENSION pgcrypto'),
    knex.raw('CREATE EXTENSION "uuid-ossp"'),
    knex.raw('CREATE SCHEMA cmyk'),
    knex.raw('CREATE SCHEMA cmyk_private'),
  ]);
}

export async function down(knex: Knex) {
  return await Promise.all([
    knex.raw('DROP SCHEMA cmyk'),
    knex.raw('DROP SCHEMA cmyk_private'),
    knex.raw('DROP EXTENSION pgcrypto'),
    knex.raw('DROP EXTENSION "uuid-ossp"'),
  ]);
}
