const formidable = require('formidable');

const clsFileUpLoader = require('../classes/FileUploader');
const clsSkills = require('../classes/Skills');
const ProductsModel = require('../Model/ProductsModel');
const SkillsModel = require('../Model/SkillsModel');

class AdminController {
  constructor(express) {
    const router = express.Router();

    router.get('/', this.actionIndex);
    router.post('/skills', this.actionUpDateSkills);
    router.post('/upload', this.actionUpload);

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
    if (!request.session.auth) {
      return response.redirect('/login');
    }

    const skillsData = new SkillsModel();
    const skillsList = skillsData.getSkills();
    const skills = new clsSkills(skillsList);

    response.render('pages/admin', {
      msgfile: request.flash('msgfile')[0],
      msgskill: request.flash('msgskill')[0],
      skills: skills,
      title: 'Admin page'
    });
  }

  /**
   *
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof IndexController
   */
  actionUpDateSkills(request, response) {
    const skillsData = new SkillsModel();
    let skillsList = skillsData.getSkills();
    const skills = new clsSkills(skillsList);

    const {
      age,
      concerts,
      cities,
      years
    } = request.body;

    if (age && concerts && cities && years) {
      skillsList = skills
        .setAge(age)
        .setConcertsCount(concerts)
        .setCitiesCount(cities)
        .setYears(years)
        .getData();

      skillsData.writeSkills(skillsList);
      request.flash('msgskill', 'Данные обновлены');
    } else {
      request.flash('msgskill', 'Проверьте введенные поля');
    }
    response.redirect('/admin');
  }

  /**
   *
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @memberof IndexController
   */
  // eslint-disable-next-line no-unused-vars
  actionUpload(request, response, next) {
    let form = new formidable.IncomingForm();
    form.parse(request, (err, fields, files) => {
      if (err) {
        return next(err);
      }

      let valid = false;
      let photoPath = '';
      const FileUpLoader = new clsFileUpLoader(files, 'photo');

      if (!fields.name) {
        request.flash('msgfile', 'Не указано описание товара!');
      } else {
        valid = true;
      }

      if (!fields.price) {
        request.flash('msgfile', 'Не указано цена товара!');
        valid = false;
      } else {
        valid = true;
      }

      if (!FileUpLoader.validate()) {
        request.flash('msgfile', 'Не загружена картинка!');
        valid = false;
      } else if (valid) {
        photoPath = FileUpLoader.save();
        valid = true;
      }

      if (valid) {
        const products = new ProductsModel();
        products.addProduct(fields.name, parseInt(fields.price, 10), photoPath);
        request.flash('msgfile', 'Товар добавлен.');
      } else {
        request.flash('msgfile', 'Товар не добавлен.');
      }
      response.redirect('/admin');
    });
  }
}

module.exports = AdminController;
