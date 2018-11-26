// const UsersModel = require('../Model/UsersModel');

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
    if (!request.session.auth) {
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
    if (request.session.auth) {
      return response.redirect('/admin');
    }

    // const users = new UsersModel();

    // const login = {
    //   email: request.body.email,
    //   password: request.body.password
    // };

    request.flash('login', 'привет');
    response.redirect('/login');
  }
}

module.exports = LoginController;
