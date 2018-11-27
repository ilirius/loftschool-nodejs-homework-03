// const cookieParser = require('cookie-parser');
const flash = require('koa-better-flash');
const koaBody = require('koa-body');
const session = require('koa-session');
const koaStatic = require('koa-static');
const Pug = require('koa-pug');
const path = require('path');
const optEnv = require('../config/env.json');

const registers = (server, router) => {
  const views = path.join(process.cwd(), optEnv.paths.views);

  server.keys = ['keys', 'keykeys'];

  new Pug({
    viewPath: views,
    pretty: false,
    basedir: views,
    noCache: true,
    app: server, // equals to pug.use(app) and app.use(pug.middleware)
  });

  server.use(koaStatic(path.join(process.cwd(), optEnv.paths.public)));

  // server.use(cookieParser());

  server.use(session({
    'key': 'koa:sess',
    'maxAge': 'session',
    'overwrite': true,
    'httpOnly': true,
    'signed': false,
    'rolling': false,
    'renew': false
  }, server));

  server.use(koaBody({
    formLimit: 1000000,
    multipart: true
  }));
  server.use(flash());

  server.use(router.routes())
    .use(router.allowedMethods());
};

module.exports = registers;
