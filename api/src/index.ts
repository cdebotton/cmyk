import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { Context } from 'apollo-server-core';
import { importSchema } from 'graphql-import';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { parse, simplify, ResolveTree, FieldsByTypeName } from 'graphql-parse-resolve-info';
import { GraphQLResolveInfo } from 'graphql';

const { PORT = 3002, ENGINE_API_NAME, ENGINE_API_KEY } = process.env;

const typeDefs = importSchema('src/schema.graphql');

class User {
  alias = 'user';
  table = 'cmyk.user';
  profile() {
    return 'LEFT JOIN cmyk.user_profile as profile WHERE user.id = profile.user_id';
  }
}

class Profile {
  alias = 'profile';
  table = 'cmyk.user_profile';
  user() {
    return 'LEFT JOIN cmyk.user as user WHERE user.id = profile.user_id';
  }
}

const map = {
  User,
  Profile,
};

type QueryTree = ResolveTree | FieldsByTypeName;

function isResolveTree(x: QueryTree): x is ResolveTree {
  return x.name !== undefined;
}

const log = (x: any) => console.log(JSON.stringify(x, null, 2));

function renderQueryTree(node: QueryTree) {
  if (isResolveTree(node)) {
    log(node);
  }
  return 'SELECT * FROM cmyk.users';
}

const db = {
  users: {
    async findAll(args: any, info: GraphQLResolveInfo) {
      const parsedResolveInfoFragment = parse(info);

      if (!parsedResolveInfoFragment) {
        throw new Error('Unable to parse query info');
      }

      const query = renderQueryTree(parsedResolveInfoFragment);

      const pool = new Pool();
      const result = await pool.query(query);

      pool.end();

      return result;
    },
    async findById(args: { id: number }) {
      const pool = new Pool();
      const { rows } = await pool.query(
        `
        SELECT * FROM cmyk.user
        WHERE id = $1
        LIMIT 1
      `,
        [{ id: args.id }],
      );
      const [user] = rows;
      await pool.end;
      return user;
    },
  },
};

const schema = makeExecutableSchema({
  resolvers: {
    Query: {
      users: (paent, args, { db }, info) => {
        return db.users.findAll(args, info);
      },
      user: (parent, args, { db }, info) => {
        return db.users.findById(args, info);
      },
    },
    Mutation: {},
    User: {},
    Profile: {},
  },
  typeDefs,
});

interface IToken {
  iat: string;
  userId: string;
}

// async function getSession(db: Prisma, authorization?: string) {
//   if (!authorization) {
//     return null;
//   }

//   const token = authorization.split(' ')[1];
//   let decoded = jwt.verify(token, 'shh');

//   if (!decoded) {
//     return null;
//   }

//   if (typeof decoded === 'string') {
//     decoded = JSON.parse(decoded);
//   }

//   const t = decoded as IToken;

//   const user = await db.user({ id: t.userId });

//   return {
//     user,
//     iat: t.iat,
//   };
// }

const server = new ApolloServer({
  schema,
  context: (ctx: Context) => {
    return {
      ...ctx,
      db,
    };
  },
  engine: {
    apiKey: `service:${ENGINE_API_NAME}:${ENGINE_API_KEY}`,
  },
  uploads: true,
});

server.listen(PORT).then(info => {
  process.stdout.write(`Listening at ${info.url}`);
});
