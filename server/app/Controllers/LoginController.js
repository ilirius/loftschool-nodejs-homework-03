const UsersModel = require('../Model/UsersModel');
const clsUsers = require('../classes/Users');

class LoginController {
  constructor(express) {
    const router = express.Router();
    router.get('/', this.actionIndex);
    router.post('/', this.actionAuth);

    return router;
  }

  /**
   * Отображение страницы логина
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof IndexController
   */
  actionIndex(request, response) {
    if (request.session.auth) {
      return response.redirect('/admin');
    }

    response.render('pages/login', {
      msgslogin: request.flash('login')[0],
      title: 'Login page'
    });
  }

  /**
   * Обработчик формы авторизации
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof IndexController
   */
  actionAuth(request, response) {
    let redirectTo = '/login';
    const {
      email,
      password
    } = request.body;

    if (email && password) {
      const users = new UsersModel();
      const usersData = users.getByEmail(email);
      const Users = new clsUsers(usersData);

      if (usersData.login === void 0 || !Users.validPassword(password)) {
        request.flash('login', 'Неверный логин или пароль.');
      } else {
        request.session.auth = true;
        redirectTo = '/admin';
      }
    } else {
      request.flash('login', 'Пожалуйста заполните все поля');
    }
    response.redirect(redirectTo);
  }
}

module.exports = LoginController;
