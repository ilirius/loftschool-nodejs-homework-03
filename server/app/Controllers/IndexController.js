const ProductsModel = require('../Model/ProductsModel');
const SkillsModel = require('../Model/SkillsModel');
const SM = require('../classes/SendMailer');
/**
 *Контроллер главной страницы
 *
 * @class IndexController
 */
class IndexController {
  constructor(router) {
    router.get('/', this.actionIndex);
    router.post('/', this.actionSendMessage);
  }
  /**
   *
   *
   * @memberof IndexController
   */
  actionIndex(ctx) {
    const products = new ProductsModel();
    const skills = new SkillsModel();

    ctx.render('pages/index', {
      msgemail: ctx.flash('info')[0],
      products: products.getProductList(),
      skills: skills.getSkills(),
      title: 'Home page',
    });
  }

  /**
   * Отправка сообщения
   *
   * @memberof IndexController
   */
  actionSendMessage(ctx) {
    const {
      name,
      email,
      message
    } = ctx.request.body;

    if (name && email && message) {
      const SendMailer = new SM();
      SendMailer
        .setUser('ivan.isnodejs@gmail.com')
        .setPass('isnodejs201811')
        .setFrom(name, email)
        .setTest(message)
        .build()
        .send(data => {
          ctx.flash('info', data.message);
        });
    } else {
      ctx.flash('info', 'Заполните все поля');
    }
    ctx.response.redirect('/#status');
  }
}

module.exports = IndexController;
