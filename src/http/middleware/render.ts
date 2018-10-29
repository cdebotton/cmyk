import { Middleware } from 'koa';

interface IOptions {
  publicPath: string;
}

function render({ publicPath }: IOptions): Middleware {
  return ctx => {
    ctx.body =
      '<!doctype html>' +
      '<html lang="en">' +
      '<head>' +
      '<title>CMYK</title>' +
      '<link href="https://fonts.googleapis.com/css?family=Raleway:100,300,400,600|Roboto:400,400i" rel="stylesheet">' +
      '</head>' +
      '<body>' +
      '<main id="app"></main>' +
      '<aside id="portal"></aside>' +
      `<script src="${publicPath}vendor.bundle.js"></script>` +
      `<script src="${publicPath}bundle.js"></script>` +
      '</body>' +
      '</html>';
  };
}

export default render;
