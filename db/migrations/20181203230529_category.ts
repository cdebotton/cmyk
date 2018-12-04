import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.withSchema('cmyk').createTable('category', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.text('title').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  await knex.schema.withSchema('cmyk').dropTable('category');
}
