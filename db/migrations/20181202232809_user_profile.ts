import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.withSchema('cmyk').createTable('user_profile', table => {
    table
      .uuid('user_id')
      .primary()
      .references('id')
      .inTable('cmyk.user')
      .onDelete('CASCADE');
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.date('date_of_birth');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.withSchema('cmyk').dropTable('user_profile');
}
