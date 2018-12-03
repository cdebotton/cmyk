import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.withSchema('cmyk').createTable('user', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.enum('role', ['ADMIN', 'EDITOR', 'VIEWER', 'USER', 'DEMO', 'UNAUTHORIZED'], {
      useNative: true,
      enumName: 'role_t',
    });
    table
      .text('email')
      .unique()
      .notNullable();
    table.text('hashed_password').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  await knex.schema.withSchema('cmyk').dropTable('user');
  await knex.raw('DROP TYPE role_t');
}
