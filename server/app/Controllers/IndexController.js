const ProductsModel = require('../Model/ProductsModel');
const SkillsModel = require('../Model/SkillsModel');
const SM = require('../classes/SendMailer');
/**
 *Контроллер главной страницы
 *
 * @class IndexController
 */
class IndexController {
  constructor(express) {
    const router = express.Router();
    router.get('/', this.actionIndex);
    router.post('/', this.actionSendMessage);

    return router;
  }
  /**
   *
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof IndexController
   */
  actionIndex(request, response) {
    const products = new ProductsModel();
    const skills = new SkillsModel();

    response.render('pages/index', {
      msgemail: request.flash('info')[0],
      products: products.getProductList(),
      skills: skills.getSkills(),
      title: 'Home page',
    });
  }

  /**
   * Отправка сообщения
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof IndexController
   */
  actionSendMessage(request, response) {
    const name = request.body.name.trim() || null;
    const email = request.body.email.trim() || null;
    const message = request.body.message.trim() || null;

    if (name && email && message) {
      const SendMailer = new SM();
      SendMailer
        .setUser('ivan.isnodejs@gmail.com')
        .setPass('isnodejs201811')
        .setFrom(name, email)
        .setTest(message)
        .build()
        .send(data => {
          request.flash('info', data.message);
          response.redirect('/#status');
        });
    } else {
      request.flash('info', 'Заполните все поля');
      response.redirect('/#status');
    }
  }
}

module.exports = IndexController;
