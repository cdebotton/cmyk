import { Middleware, Context } from 'koa';
import { renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

const head = () => {
  return (
    '<html lang="en">' +
    '<head>' +
    '<title>CMYK</title>' +
    '</head>' +
    '<main id="app">'
  );
};

const tail = <T>(data: T, bundles: Bundle[], session: Session | null) => {
  const { NODE_ENV = 'development' } = process.env;
  const publicPath =
    NODE_ENV === 'development' ? 'https://localhost:3001' : '/dist';
  const stateString = JSON.stringify(data).replace(/</g, '\\u003c');
  const sessionString = JSON.stringify(session).replace(/</g, '\\u003c');

  return (
    '</main>' +
    `<script>window.__SESSION__ = ${sessionString};</script>` +
    `<script>window.__APOLLO_STATE__ = ${stateString};</script>` +
    `<script src="${publicPath}/vendors~bundle.js"></script>` +
    `<script src="${publicPath}/runtime~bundle.js"></script>` +
    bundles
      .map(bundle => `<script src="${publicPath}/${bundle.file}"></script>`)
      .join('') +
    `<script src="${publicPath}/bundle.js"></script>` +
    '</body>' +
    '</html>'
  );
};

type Bundle = {
  id: number;
  name: string;
  file: string;
};

type Session = {
  userId: string;
  iat: number;
};

type CallbackResponse = {
  element: JSX.Element;
  data: {};
  bundles: Bundle[];
  session: Session | null;
};

type Callback = (
  ctx: Context,
  next: () => Promise<any>,
) => Promise<CallbackResponse>;

const render = (callback: Callback): Middleware => async (ctx, next) => {
  const sheet = new ServerStyleSheet();
  const { data, element, bundles, session } = await callback(ctx, next);
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(element));

  ctx.respond = false;
  ctx.res.write(head());

  stream.on('end', () => {
    ctx.res.end(tail(data, bundles, session));
  });

  stream.pipe(
    ctx.res,
    { end: false },
  );
};

export default render;
