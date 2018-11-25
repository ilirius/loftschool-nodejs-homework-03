const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const optEnv = require('../../config/env.json');

/**
 * Модель работы с продуктами
 *
 * @class ProductsModel
 */
class ProductsModel {
  constructor() {
    const pathsDB = path.normalize(
      path.join(
        process.cwd(),
        optEnv.paths.dbs,
        optEnv.db.files.product
      )
    );

    this._db = lowdb(new FileSync(pathsDB));
  }

  /**
   * Получение списка продуктов
   */
  getProducts() {
    return this._db.getState() || [];
  }
}

module.exports = ProductsModel;
