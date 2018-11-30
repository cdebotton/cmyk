import { IResolverObject } from 'graphql-tools';
import Context from '../Context';
import { QuerySource } from '../models';

const Query: IResolverObject<QuerySource, Context> = {
  session: async (parent, args, { token, userById }) => {
    if (!token) {
      return null;
    }

    const user = await userById.load(token.userId);

    return {
      ...token,
      user,
    };
  },
  documents: async (parent, args, { pool }) => {
    const client = await pool.connect();
    const query = 'SELECT * FROM cmyk.document';
    const { rows } = await client.query(query);
    client.release();
    return rows;
  },
  files: async (parent, args, { pool }) => {
    const client = await pool.connect();

    const query = 'SELECT * FROM cmyk.file';
    const { rows } = await client.query(query);

    client.release();

    return rows;
  },
  users: async (parent, args, { pool }) => {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM cmyk.user ORDER BY created_at DESC');

    return rows;
  },
  user: async (parent, { id }, { userById }) => userById.load(id),
};

export { Query };
