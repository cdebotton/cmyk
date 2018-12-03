import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.withSchema('cmyk').createTable('file', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.text('bucket').notNullable();
    table.text('encoding').notNullable();
    table.text('etag').notNullable();
    table.text('key').notNullable();
    table.text('mimetype').notNullable();
    table.integer('size').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.withSchema('cmyk').dropTable('file');
}
