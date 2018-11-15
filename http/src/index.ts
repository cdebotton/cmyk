import fs from 'fs';
import http from 'http2';
import Koa from 'koa';
import compress from 'koa-compress';
import serve from 'koa-static';
import path from 'path';
import errorReporting from './middleware/errorReporting';
import responseTime from './middleware/responseTime';

const { PORT = '3000' } = process.env;

const app = new Koa();
const server = http.createSecureServer(
  {
    cert: fs.readFileSync(path.join(__dirname, '../../ssl/localhost.crt')),
    key: fs.readFileSync(path.join(__dirname, '../../ssl/localhost.key')),
  },
  app.callback(),
);

app.use(errorReporting());
app.use(responseTime());

app.use(compress());
app.use(serve(path.join(__dirname, '../../app/build'), { gzip: true }));
app.use(ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.join(__dirname, '../../app/build/index.html'));
});

server.listen(PORT, () => {
  process.stdout.write(`💅 Listening on https://localhost:${PORT}`);
});
