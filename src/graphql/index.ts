import { ApolloServer, IResolvers, makeExecutableSchema } from 'apollo-server';
import { Context } from 'apollo-server-core';
import bcrypt from 'bcryptjs';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import { Prisma } from 'prisma-binding';

const { PORT } = process.env;

interface IContext {
  db: Prisma;
  session: {
    iat: number;
    user: any;
  };
}

const BadCredentials = new Error('Bad credentials');

const typeDefs = importSchema('src/graphql/schema/typeDefs.graphql');
const resolvers: IResolvers<{}, IContext> = {
  Mutation: {
    createUser: async (parent, args, ctx, info) => {
      const { data } = args;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      return ctx.db.mutation.createUser(
        {
          data: {
            ...data,
            password: hashedPassword,
          },
        },
        info,
      );
    },
    deleteUser: async (parent, args, ctx, info) => {
      return ctx.db.mutation.deleteUser({ where: args.where }, info);
    },
    login: async (parent, args, ctx, info) => {
      const { email, password } = args.data;
      const user = await ctx.db.query.user({ where: { email } });

      if (!user) {
        throw BadCredentials;
      }

      const ok = await bcrypt.compare(password, user.password);

      if (!ok) {
        throw BadCredentials;
      }

      const token = jwt.sign({ userId: user.id }, 'shh');

      return token;
    },
    updateUser: async (parent, args, ctx, info) => {
      const user = await ctx.db.mutation.updateUser(args, info);

      return user;
    },
  },
  Query: {
    session: (parent, args, ctx, info) => ctx.session,
    user: (parent, args, ctx, info) => ctx.db.query.user(args, info),
    users: (parent, args, ctx, info) => ctx.db.query.users(args, info),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

interface IToken {
  iat: string;
  userId: string;
}

async function getSession(db: Prisma, authorization?: string) {
  if (!authorization) {
    return null;
  }

  const token = authorization.split(' ')[1];
  let decoded = jwt.verify(token, 'shh');

  if (!decoded) {
    return null;
  }

  if (typeof decoded === 'string') {
    decoded = JSON.parse(decoded);
  }

  const t = decoded as IToken;

  const user = await db.query.user({ where: { id: t.userId } });

  return {
    user,
    iat: t.iat,
  };
}

const server = new ApolloServer({
  schema,
  context: (ctx: Context) => {
    const db = new Prisma({
      endpoint: 'http://localhost:4466',
      typeDefs: 'src/graphql/schema/prisma.graphql',
    });

    const session = getSession(db, ctx.req.headers.authorization);

    return {
      ...ctx,
      db,
      session,
    };
  },
});

server.listen(PORT);
