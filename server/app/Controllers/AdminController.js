const clsFileUpLoader = require('../classes/FileUploader');
const clsSkills = require('../classes/Skills');
const ProductsModel = require('../Model/ProductsModel');
const SkillsModel = require('../Model/SkillsModel');

class AdminController {
  constructor(router) {
    router.get('/admin', this.actionIndex);
    router.post('/admin/skills', this.actionUpDateSkills);
    router.post('/admin/upload', this.actionUpload);
  }

  /**
   *
   *
   * @memberof AdminController
   */

  actionIndex(ctx) {
    if (!ctx.session.auth) {
      return ctx.response.redirect('/login');
    }

    const skillsData = new SkillsModel();
    const skillsList = skillsData.getSkills();
    const skills = new clsSkills(skillsList);

    ctx.render('pages/admin', {
      msgfile: ctx.flash('msgfile')[0],
      msgskill: ctx.flash('msgskill')[0],
      skills: skills,
      title: 'Admin page'
    });
  }

  /**
   *
   * @memberof AdminController
   */
  actionUpDateSkills(ctx) {
    const skillsData = new SkillsModel();
    let skillsList = skillsData.getSkills();
    const skills = new clsSkills(skillsList);

    const {
      age,
      concerts,
      cities,
      years
    } = ctx.request.body;

    if (age && concerts && cities && years) {
      skillsList = skills
        .setAge(age)
        .setConcertsCount(concerts)
        .setCitiesCount(cities)
        .setYears(years)
        .getData();

      skillsData.writeSkills(skillsList);
      ctx.flash('msgskill', 'Данные обновлены');
    } else {
      ctx.flash('msgskill', 'Проверьте введенные поля');
    }
    ctx.response.redirect('/admin');
  }

  /**
   *
   *
   * @memberof AdminController
   */
  actionUpload(ctx, next) {
    try {
      let valid = false;

      const {
        name,
        price
      } = ctx.request.body;
      let photoPath = '';

      console.log(name,
        price);


      if (!price && !name) {
        ctx.flash('msgfile', 'Не указано название/цена товара!');
      } else {
        valid = true;
      }

      if (valid) {
        const FileUpLoader = new clsFileUpLoader(ctx.request.files.photo);
        if (!FileUpLoader.validate()) {
          ctx.flash('msgfile', 'Картинка не загружена');
        } else {
          photoPath = FileUpLoader.save();
          const products = new ProductsModel();
          products.addProduct(name, parseInt(price, 10), photoPath);
          ctx.flash('msgfile', 'Товар добавлен.');
        }
      } else {
        ctx.flash('msgfile', 'Товар не добавлен.');
      }

      ctx.response.redirect('/admin');
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = AdminController;
