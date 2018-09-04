import { Middleware } from 'koa';

interface Options {
  publicPath: string;
}

function render({ publicPath }: Options): Middleware {
  return ctx => {
    ctx.body =
      '<!doctype html>' +
      '<html lang="en">' +
      '<head>' +
      '<title>CMYK</title>' +
      '</head>' +
      '<body>' +
      '<main id="app"></main>' +
      `<script src="${publicPath}vendor.bundle.js"></script>` +
      `<script src="${publicPath}bundle.js"></script>` +
      '</body>' +
      '</html>';
  };
}

export default render;
