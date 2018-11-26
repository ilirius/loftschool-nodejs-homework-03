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
  getData() {
    return this._db.getState() || [];
  }

  getByLogin(login) {
    let result = [];

    const data = this._db.get('users').filter({
      login: login
    }).value();

    if (data.length === 1) {
      result = data[0];
    }

    return result;
  }

  getByEmail(email) {
    let result = [];

    const data = this._db.get('users').filter({
      email: email
    }).value();

    if (data.length === 1) {
      result = data[0];
    }

    return result;
  }

  setData(data) {
    this._db.setState(data).write();
  }
}

module.exports = UsersModel;
