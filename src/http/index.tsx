require('dotenv').config();

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import fs from 'fs';
import http from 'http2';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import mount from 'koa-mount';
import Router from 'koa-router';
import staticFiles from 'koa-static';
import path from 'path';
import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';
import { Prisma } from 'prisma-binding';
import getCertificate from './utils/getCertificate';
import responseTime from './middleware/responseTime';
import render from './middleware/render';
import Root from '../app/Root';
import reportErrors from './middleware/reportErrors';
import schema from '../schema';
import getSessionUserFromContext from './utils/getSessionUserFromContext';

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
  const prisma = new Prisma({
    typeDefs: 'src/schema/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: PRISMA_SECRET,
    debug: NODE_ENV === 'development',
  });

  router.post(
    '/graphql',
    bodyParser(),
    graphqlKoa(ctx => ({
      schema,
      context: {
        session: getSessionUserFromContext(ctx),
        cookies: ctx.cookies,
        db: prisma,
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

  app.use(
    render(ctx => {
      const session = getSessionUserFromContext(ctx);
      return { session };
    }),
  );

  // Disabling because the Context Consumers don't work with legacy Context
  // in SSR
  //
  // app.use(
  //   render(async ctx => {
  //     const session = getSessionUserFromContext(ctx);
  //     const context = { statusCode: 200 };
  //     const client = new ApolloClient({
  //       ssrMode: true,
  //       cache: new InMemoryCache(),
  //       link: new SchemaLink({
  //         schema,
  //         context: {
  //           session,
  //           cookies: ctx.cookies,
  //           db: prisma,
  //         },
  //       }),
  //     });

  //     const Context = React.createContext(0);

  //     const element = (
  //       <Context.Provider value={0}>
  //         <ApolloProvider client={client}>
  //           <StaticRouter location={ctx.req.url} context={context}>
  //             <Context.Consumer>{() => <Root />}</Context.Consumer>
  //           </StaticRouter>
  //         </ApolloProvider>
  //       </Context.Provider>
  //     );

  //     await getDataFromTree(element);
  //     const data = client.extract();

  //     ctx.status = context.statusCode;

  //     return { element, data, bundles: [], session };
  //   }),
  // );

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
