import Knex from 'knex';
import { genSalt, hash } from 'bcryptjs';

export async function seed(knex: Knex) {
  await Promise.all([
    knex
      .withSchema('cmyk')
      .table('user')
      .del(),

    knex
      .withSchema('cmyk')
      .table('user_profile')
      .del(),
  ]);

  const salt = await genSalt();
  const hashedPassword = await hash('test', salt);

  const [id] = await knex
    .withSchema('cmyk')
    .table('user')
    .insert([
      {
        email: 'admin@cmyk.com',
        hashed_password: hashedPassword,
        role: 'ADMIN',
      },
    ])
    .returning('id');

  await knex
    .withSchema('cmyk')
    .table('user_profile')
    .insert([
      {
        user_id: id,
        first_name: 'Willem',
        last_name: 'Dafoe',
      },
    ]);
}
