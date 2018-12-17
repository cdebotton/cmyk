import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.withSchema('cmyk').alterTable('document', table => {
    table
      .uuid('layout_id')
      .references('id')
      .inTable('cmyk.layout')
      .notNullable();
  });
}

export async function down(knex: Knex) {
  await knex.schema.withSchema('cmyk').alterTable('document', table => {
    table.dropColumn('layout_id');
  });
}
