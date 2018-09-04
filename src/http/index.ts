import fs from 'fs';
import http from 'http2';
import Koa from 'koa';
import compress from 'koa-compress';
import mount from 'koa-mount';
import serve from 'koa-static';
import path from 'path';
import errorReporting from './middleware/errorReporting';
import render from './middleware/render';
import responseTime from './middleware/responseTime';

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

app.use(errorReporting());
app.use(responseTime());

if (__PROD__) {
  app.use(compress());
  app.use(mount('/dist', serve(path.join(cwd, 'dist/app'))));
}

app.use(render({ publicPath: PUBLIC_PATH }));

server.listen(PORT, () => {
  process.stdout.write(`💅 Listening on https://localhost:${PORT}`);
});
