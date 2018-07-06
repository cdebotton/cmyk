import 'dotenv/config';

import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import http from 'http2';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import mount from 'koa-mount';
import Router from 'koa-router';
import staticFiles from 'koa-static';
import path from 'path';
import { Prisma } from 'prisma-binding';
import getCertificate from './utils/getCertificate';
import responseTime from './middleware/responseTime';
import render from './middleware/render';
import reportErrors from './middleware/reportErrors';
import schema from './schema';

const {
  PORT = '3000',
  NODE_ENV = 'development',
  PRISMA_SECRET,
  APP_KEY_1 = '',
  APP_KEY_2 = '',
} = process.env;

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
          typeDefs: 'src/http/schema/generated/prisma.graphql',
          endpoint: 'http://localhost:4466',
          secret: PRISMA_SECRET,
          debug: NODE_ENV === 'development',
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

  // Expose app on HTTP in development mode so we can internally
  // query the schema for introspection.
  // Otherwise, we run into SSL verification issues since we run
  // a self signed certificate locally.

  if (NODE_ENV === 'development') {
    app.listen(3030);
  }
};

run();
