const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const optEnv = require('../../config/env.json');

/**
 * Модель работы с данными умения пользователя
 *
 * @class SkillsModel
 */
class SkillsModel {
  constructor() {
    const pathsDB = path.normalize(
      path.join(
        process.cwd(),
        optEnv.paths.dbs,
        optEnv.db.files.skills
      )
    );

    this._db = lowdb(new FileSync(pathsDB));
  }

  /**
   * Получение списка скиллов пользователя
   *
   * @returns {Array}
   * @memberof SkillsModel
   */
  getSkills() {
    return this._db.getState() || [];
  }

  /**
   * Запись данных в БД
   *
   * @param {*} slillList
   * @memberof SkillsModel
   */
  writeSkills(slillList) {
    this._db.setState(slillList).write();
  }
}

module.exports = SkillsModel;
