import fs from 'fs';
import http from 'http2';
import Koa from 'koa';
import compress from 'koa-compress';
import serve from 'koa-static';
import path from 'path';
import errorReporting from './middleware/errorReporting';
import responseTime from './middleware/responseTime';

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

app.use(errorReporting());
app.use(responseTime());

app.use(compress());
app.use(serve(path.join(cwd, 'app/build')));

server.listen(PORT, () => {
  process.stdout.write(`💅 Listening on https://localhost:${PORT}`);
});
