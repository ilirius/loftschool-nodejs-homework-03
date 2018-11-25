class LoginController {
  constructor(express) {
    const router = express.Router();
    router.get('/login', this.actionIndex);

    return router;
  }

  actionIndex(req, res) {

    res.render('pages/login', {
      title: 'login page'
    });
  }
}

module.exports = LoginController;
