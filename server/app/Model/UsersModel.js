const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const optEnv = require('../../config/env.json');

/**
 * Модель работы с данными о пользователе
 *
 * @class UsersModel
 */
class UsersModel {
  constructor() {
    const pathsDB = path.normalize(
      path.join(
        process.cwd(),
        optEnv.paths.dbs,
        optEnv.db.files.users
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
}

module.exports = UsersModel;
