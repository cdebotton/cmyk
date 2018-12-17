import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.withSchema('cmyk').createTable('field_config', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('layout_id')
      .references('id')
      .inTable('cmyk.layout')
      .onDelete('CASCADE');
    table.text('field_type').notNullable();

    knex.raw('CHECK CONSTRAINT field_type IN ("PLAIN_TEXT", "ASSETS") UNIQUE(id, field_type)');
  });

  await knex.schema.withSchema('cmyk').createTable('field_config_plain_text', table => {
    table.uuid('id').primary();
    table
      .text('field_type')
      .notNullable()
      .defaultTo('PLAIN_TEXT');
    table.text('handle').notNullable();
    table
      .boolean('required')
      .notNullable()
      .defaultTo(false);
    table.text('instructions');
    knex.raw(
      'FOREIGN KEY (id, field_type) REFERENCES cmyk.field_config (id, field_type), CHECK CONSTRAINT field_type = "PLAIN_TEXT"',
    );
  });

  await knex.schema.withSchema('cmyk').createTable('field_config_assets', table => {
    table.uuid('id').primary();
    table
      .text('field_type')
      .notNullable()
      .defaultTo('ASSETS');
    table.text('handle').notNullable();
    table
      .boolean('required')
      .notNullable()
      .defaultTo(false);
    table.text('instructions');
    table.integer('minimum').defaultTo(1);
    table.integer('maximum');
    knex.raw(
      'FOREIGN KEY (id, field_type) REFERENCES cmyk.field_config (id, field_type), CHECK CONSTRAINT field_type = "ASSETS"',
    );
  });
}

export async function down(knex: Knex) {
  await knex.schema.withSchema('cmyk').dropTable('field_config_assets');
  await knex.schema.withSchema('cmyk').dropTable('field_config_plain_text');
  await knex.schema.withSchema('cmyk').dropTable('field_config');
}
