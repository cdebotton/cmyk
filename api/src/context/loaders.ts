import DataLoader from 'dataloader';
import knex from 'knex';
import { mapTo } from '../utils';
import { UserSource, ProfileSource, FileSource } from '../models';

function loaders(db: knex) {
  return {
    userById: new DataLoader<string, UserSource>(async keys => {
      const user = await db
        .withSchema('cmyk')
        .table('user')
        .whereIn('id', keys)
        .select()
        .then(mapTo(keys, x => x.id));

      return user;
    }),

    profileByUserId: new DataLoader<string, ProfileSource>(async keys => {
      const profile = await db
        .withSchema('cmyk')
        .table('user_profile')
        .whereIn('user_id', keys)
        .select()
        .then(mapTo(keys, x => x.user_id));

      return profile;
    }),

    fileById: new DataLoader<string, FileSource>(async keys => {
      const file = await db
        .withSchema('cmyk')
        .table('file')
        .whereIn('id', keys)
        .select()
        .then(mapTo(keys, x => x.id));

      return file;
    }),
  };
}

export { loaders };
