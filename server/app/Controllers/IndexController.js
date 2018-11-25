class IndexController {
  constructor(express) {
    const router = express.Router();
    router.get('/', this.actionIndex);
    router.post('/', this.actionSendMesseng);

    return router;
  }

  actionIndex(_req, res) {
    res.render('pages/index', {
      title: 'Main page',
      products: [],
      skills: []
    });
  }

  // eslint-disable-next-line no-unused-vars
  actionSendMesseng(_req, _res) {
    //
  }
}

module.exports = IndexController;
