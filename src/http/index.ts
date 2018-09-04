import Koa from 'koa';
import mount from 'koa-mount';
import compress from 'koa-compress';
import serve from 'koa-static';
import http from 'http2';
import fs from 'fs';
import path from 'path';
import render from './middleware/render';

const cwd = process.cwd();
const {
  NODE_ENV = 'development',
  PORT = '3000',
  PUBLIC_PATH = 'dist/',
} = process.env;

const __PROD__ = NODE_ENV === 'production';

const app = new Koa();
const server = http.createSecureServer(
  {
    cert: fs.readFileSync(path.join(cwd, 'ssl/localhost.crt')),
    key: fs.readFileSync(path.join(cwd, 'ssl/localhost.key')),
  },
  app.callback(),
);

if (__PROD__) {
  app.use(compress());
  app.use(mount('/dist', serve(path.join(cwd, 'dist/app'))));
}

app.use(render({ publicPath: PUBLIC_PATH }));

server.listen(PORT, () => {
  process.stdout.write(`💅 Listening on https://localhost:${PORT}`);
});
