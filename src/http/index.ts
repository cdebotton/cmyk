import Koa from 'koa';
import http from 'http2';
import fs from 'fs';
import path from 'path';
import render from './middleware/render';

const cwd = process.cwd();
const { PORT = '3000' } = process.env;

const app = new Koa();
const server = http.createSecureServer(
  {
    cert: fs.readFileSync(path.join(cwd, 'ssl/localhost.crt')),
    key: fs.readFileSync(path.join(cwd, 'ssl/localhost.key')),
  },
  app.callback(),
);

app.use(render());

server.listen(PORT, () => {
  process.stdout.write(`💅 Listening on https://localhost:${PORT}`);
});
