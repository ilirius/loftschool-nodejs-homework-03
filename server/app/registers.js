const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const optEnv = require('../config/env.json');

const registers = (express, server) => {
  server.use(express.static(path.join(process.cwd(), optEnv.paths.public)));

  server.set('views', path.join(process.cwd(), optEnv.paths.views));
  server.set('view engine', 'pug');


  server.use(bodyParser.urlencoded({
    extended: false
  }));
  server.use(bodyParser.json());

  server.use(cookieParser());
  server.use(session({
    cookie: {
      maxAge: 60 * 1000 * 6
    },
    resave: true,
    saveUninitialized: true,
    secret: 'login'
  }));

  server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'mail'
  }));

  server.use(flash());
};

module.exports = registers;
