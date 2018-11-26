const SkillsModel = require('../Model/SkillsModel');
const clsSkills = require('../classes/Skills');

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
  actionUpload(request, response) {
    request.flash('msgfile', 'Данные обновлены');
    response.redirect('/admin');
  }
}

module.exports = AdminController;
