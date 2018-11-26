const AdminController = require('./Controllers/AdminController');
const IndexController = require('./Controllers/IndexController');
const LoginController = require('./Controllers/LoginController');

module.exports = (express, server) => {
  server.use('/admin', new AdminController(express));
  server.use('/', new IndexController(express));
  server.use('/login', new LoginController(express));
};
