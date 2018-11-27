#!/usr/bin/env node

const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

const server = new Koa();

require('./app/registers')(server, router);
require('./app/controllers')(router);

const errorHandler = require('./lib/error');
server.use(errorHandler);
server.on('error', (err, ctx) => {
  ctx.render('error', {
    status: ctx.response.status,
    error: ctx.response.message,
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000!');
});
