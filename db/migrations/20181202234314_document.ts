import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.withSchema('cmyk').createTable('document', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.text('title').notNullable();
    table
      .timestamp('published_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    table
      .uuid('author_id')
      .references('id')
      .inTable('cmyk.user');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.withSchema('cmyk').dropTable('document');
}
