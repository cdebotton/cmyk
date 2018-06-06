import { Middleware, Context } from 'koa';

const head = () => {
  return (
    '<!doctype html>' +
    '<html lang="en">' +
    '<head>' +
    '<title>CMYK</title>' +
    '</head>' +
    '<main id="app">'
  );
};

const tail = (session: Session | null) => {
  const { NODE_ENV = 'development' } = process.env;
  const publicPath =
    NODE_ENV === 'development' ? 'https://localhost:3001' : '/dist';
  const sessionString = JSON.stringify(session).replace(/</g, '\\u003c');

  return (
    '</main>' +
    `<script>window.__SESSION__ = ${sessionString};</script>` +
    `<script src="${publicPath}/vendor.js"></script>` +
    `<script src="${publicPath}/bootstrap.js"></script>` +
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
  session: Session | null;
};

type Callback = (ctx: Context, next: () => Promise<any>) => CallbackResponse;

const render = (callback: Callback): Middleware => async (ctx, next) => {
  const { session } = callback(ctx, next);

  ctx.body = head() + tail(session);
};

export default render;
