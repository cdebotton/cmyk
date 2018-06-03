const serve = require('webpack-serve');
const fs = require('fs');
const path = require('path');
const config = require('./webpack.config');

const cert = fs.readFileSync(path.join(__dirname, 'ssl/localhost.crt'));
const key = fs.readFileSync(path.join(__dirname, 'ssl/localhost.key'));
const { PORT = '3001' } = process.env;

module.exports = {
  config,
  http2: true,
  port: PORT,
  https: {
    cert,
    key,
  },
  add: (app, middleware) => {
    app.use((ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      next();
    });
    middleware.webpack();
    middleware.content();
  },
};
