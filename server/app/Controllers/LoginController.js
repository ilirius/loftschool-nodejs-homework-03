const UsersModel = require('../Model/UsersModel');
const clsUsers = require('../classes/Users');

class LoginController {
  constructor(router) {
    router.get('/login', this.actionIndex);
    router.post('/login', this.actionAuth);
  }

  /**
   * Отображение страницы логина
   *
   * @memberof LoginController
   */
  actionIndex(ctx) {
    if (ctx.session.auth) {
      return ctx.response.redirect('/admin');
    }

    ctx.render('pages/login', {
      msgslogin: ctx.flash('login')[0],
      title: 'Login page'
    });
  }

  /**
   * Обработчик формы авторизации
   *
   * @memberof LoginController
   */
  actionAuth(ctx) {
    let redirectTo = '/login';
    const {
      email,
      password
    } = ctx.request.body;

    if (email && password) {
      const users = new UsersModel();
      const usersData = users.getByEmail(email);
      const Users = new clsUsers(usersData);

      if (usersData.login === void 0 || !Users.validPassword(password)) {
        ctx.flash('login', 'Неверный логин или пароль.');
      } else {
        ctx.session.auth = true;
        redirectTo = '/admin';
      }
    } else {
      ctx.flash('login', 'Пожалуйста заполните все поля');
    }
    ctx.response.redirect(redirectTo);
  }
}

module.exports = LoginController;
