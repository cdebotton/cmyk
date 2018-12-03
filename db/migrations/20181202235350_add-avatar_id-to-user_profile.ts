import * as Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.withSchema('cmyk').alterTable('user_profile', table => {
    table
      .uuid('avatar_id')
      .references('id')
      .inTable('cmyk.file')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex) {
  return await knex.schema.withSchema('cmyk').alterTable('user_profile', table => {
    table.dropColumn('avatar_id');
  });
}
