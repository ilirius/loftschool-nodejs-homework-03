// const express = require('express');
// const server = express();

const AdminController = require('./Controllers/AdminController');
const IndexController = require('./Controllers/IndexController');
const LoginController = require('./Controllers/LoginController');

module.exports = (express, server) => {
  server.use('/', new AdminController(express));
  server.use('/', new IndexController(express));
  server.use('/', new LoginController(express));
};
