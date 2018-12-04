import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.withSchema('cmyk').alterTable('document', table => {
    table
      .uuid('category_id')
      .references('id')
      .inTable('cmyk.category')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex) {
  await knex.schema.withSchema('cmyk').alterTable('document', table => {
    table.dropColumn('category_id');
  });
}
