class LoginController {
  constructor(express) {
    const router = express.Router();
    router.get('/login', this.actionIndex);
    router.post('/login', this.actionAuth);

    return router;
  }

  actionIndex(req, res) {
    if (req.session.auth) {
      return res.redirect('/admin');
    }

    res.render('pages/login', {
      msgslogin: req.flash('login')[0]
    });
  }

  actionAuth(req, res) {
    if (req.session.auth) {
      return res.redirect('/admin');
    }

    const login = {
      email: req.body.email,
      password: req.body.password
    };
    console.log(login);

    res.exd();
  }
}

module.exports = LoginController;
