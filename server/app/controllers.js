const AdminController = require('./Controllers/AdminController');
const IndexController = require('./Controllers/IndexController');
const LoginController = require('./Controllers/LoginController');

module.exports = (router) => {
  new AdminController(router);
  new IndexController(router);
  new LoginController(router);
};
