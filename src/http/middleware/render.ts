import { Middleware } from 'koa';

const head = () => {
  return (
    '<!doctype html>' +
    '<html lang="en">' +
    '<head>' +
    '<title>CMYK</title>' +
    '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600|Roboto+Slab:200,400" rel="stylesheet">' +
    '</head>' +
    '<main id="app">'
  );
};

const tail = () => {
  const { NODE_ENV = 'development' } = process.env;
  const publicPath =
    NODE_ENV === 'development' ? 'https://localhost:3001' : '/dist';

  return (
    '</main>' +
    `<script src="${publicPath}/vendors~bundle.js" defer></script>` +
    `<script src="${publicPath}/runtime~bundle.js" defer></script>` +
    `<script src="${publicPath}/bundle.js" defer></script>` +
    '</body>' +
    '</html>'
  );
};

const render = (): Middleware => async ctx => {
  ctx.body = head() + tail();
};

export default render;
