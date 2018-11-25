class AdminController {
  constructor(express) {
    const router = express.Router();
    router.get('/admin', this.actionIndex);

    return router;
  }

  actionIndex(req, res) {
    if (!req.session.auth) {
      return res.redirect('/login');
    }

    res.render('pages/admin', {
      title: 'Admin page'
    });
  }
}

module.exports = AdminController;
