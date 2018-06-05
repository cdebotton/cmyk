import '@babel/polyfill';
import 'reflect-metadata';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
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
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router';
import getCertificate from './utils/getCertificate';
import responseTime from './middleware/responseTime';
import render from './middleware/render';
import Root from '../app/Root';
import reportErrors from './middleware/reportErrors';
import schema from '../schema';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';

const { PORT = '3000', NODE_ENV = 'development' } = process.env;

const run = async () => {
  await Loadable.preloadAll();
  const statsFile = await fs.promises.readFile(
    path.join(process.cwd(), 'dist/react-loadable.json'),
  );
  const stats = JSON.parse(statsFile.toString());

  const app = new Koa();
  const router = new Router();
  const { cert, key } = await getCertificate();
  const server = http.createSecureServer({ cert, key }, app.callback());

  const connection = await createConnection();
  const userRepository = connection.getRepository(User);

  router.post(
    '/graphql',
    bodyParser(),
    graphqlKoa(ctx => ({
      schema,
      debug: NODE_ENV === 'development',
      context: {
        userRepository,
        cookies: ctx.cookies,
      },
    })),
  );

  if (NODE_ENV === 'development') {
    router.get(
      '/graphiql',
      graphiqlKoa({
        endpointURL: '/graphql',
      }),
    );
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
    render(async ctx => {
      const context = { statusCode: 200 };
      const modules: string[] = [];
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new SchemaLink({
          schema,
        }),
      });

      const element = (
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <ApolloProvider client={client}>
            <StaticRouter location={ctx.req.url} context={context}>
              <Root />
            </StaticRouter>
          </ApolloProvider>
        </Loadable.Capture>
      );

      await getDataFromTree(element);
      const data = client.extract();
      const bundles = getBundles(stats, modules);

      ctx.status = context.statusCode;

      return { element, data, bundles };
    }),
  );

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
