import { Middleware } from 'koa';

function render(): Middleware {
  return ctx => {
    ctx.body =
      '<!doctype html>' +
      '<html lang="en">' +
      '<head>' +
      '<title>CMYK</title>' +
      '</head>' +
      '<body>' +
      '<main id="app"></main>' +
      '<script src="https://localhost:3001/bundle.js"></script>' +
      '</body>' +
      '</html>';
  };
}

export default render;
