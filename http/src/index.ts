import 'dotenv/config';

import http from 'http2';
import Koa from 'koa';
import compress from 'koa-compress';
import mount from 'koa-mount';
import Router from 'koa-router';
import staticFiles from 'koa-static';
import path from 'path';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import bodyParser from 'koa-bodyparser';
import getCertificate from './utils/getCertificate';
import responseTime from './middleware/responseTime';
import render from './middleware/render';
import reportErrors from './middleware/reportErrors';
import schema from './schema';
import { Prisma } from 'prisma-binding';

const {
  PORT = '3000',
  NODE_ENV = 'development',
  APP_KEY_1 = '',
  APP_KEY_2 = '',
  PRISMA_SECRET,
} = process.env;

if (NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const run = async () => {
  const app = new Koa();

  app.keys = [APP_KEY_1, APP_KEY_2];

  const router = new Router();
  const { cert, key } = await getCertificate();
  const server = http.createSecureServer({ cert, key }, app.callback());

  router.post(
    '/graphql',
    bodyParser(),
    graphqlKoa(ctx => ({
      schema,
      context: {
        ...ctx,
        db: new Prisma({
          typeDefs: 'http/generated/prisma.graphql',
          endpoint: 'http://localhost:4466',
          debug: NODE_ENV === 'development',
          secret: PRISMA_SECRET,
        }),
      },
    })),
  );

  if (NODE_ENV === 'development') {
    router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
  }

  app.use(responseTime());
  app.use(reportErrors({ devMode: NODE_ENV === 'development' }));
  app.use(compress());
  app.use(router.routes());
  app.use(router.allowedMethods());

  if (NODE_ENV === 'production') {
    app.use(
      mount('/dist', staticFiles(path.join(process.cwd(), 'dist/client'))),
    );
  }

  app.use(render());

  server.listen(PORT, () => {
    const info = server.address();
    if (typeof info === 'string') {
      process.stdout.write(info);
    } else {
      const { address, port } = info;
      process.stdout.write(`🚀 Listening at ${address}${port}`);
    }
  });
};

run();
