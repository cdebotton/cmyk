import { Middleware, Context } from 'koa';
import { renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import flushChunks from 'webpack-flush-chunks';

const stats = require('../../generated/stats.json');

const head = () => {
  return (
    '<html lang="en">' +
    '<head>' +
    '<title>CMYK</title>' +
    '</head>' +
    '<main id="app">'
  );
};

const tail = <T>(data: T, scripts: string[], session: Session | null) => {
  const { NODE_ENV = 'development' } = process.env;
  const publicPath =
    NODE_ENV === 'development' ? 'https://localhost:3001' : '/dist';
  const stateString = JSON.stringify(data).replace(/</g, '\\u003c');
  const sessionString = JSON.stringify(session).replace(/</g, '\\u003c');

  return (
    '</main>' +
    `<script>window.__SESSION__ = ${sessionString};</script>` +
    `<script>window.__APOLLO_STATE__ = ${stateString};</script>` +
    scripts
      .map(script => `<script src="${publicPath}/${script}"></script>`)
      .join('') +
    `<script src="${publicPath}/bundle.js"></script>` +
    '</body>' +
    '</html>'
  );
};

type Session = {
  userId: string;
  iat: number;
};

type CallbackResponse = {
  element: JSX.Element;
  data: {};
  chunkNames: string[];
  session: Session | null;
};

type Callback = (
  ctx: Context,
  next: () => Promise<any>,
) => Promise<CallbackResponse>;

const render = (callback: Callback): Middleware => async (ctx, next) => {
  const sheet = new ServerStyleSheet();
  const { data, element, chunkNames, session } = await callback(ctx, next);
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(element));

  const { scripts } = flushChunks(stats, { chunkNames });

  ctx.respond = false;
  ctx.res.write(head());

  stream.on('end', () => {
    ctx.res.end(tail(data, scripts, session));
  });

  stream.pipe(
    ctx.res,
    { end: false },
  );
};

export default render;
