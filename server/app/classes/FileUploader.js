const fs = require('fs');
const path = require('path');

const optEnv = require('../../config/env.json');

class FileUpLoader {
  constructor(files, fieldName) {
    this._files = files;
    this._fieldName = fieldName;
    this._uploadDir = path.normalize(path.join(process.cwd(), optEnv.paths.public, optEnv.paths.upload));
    this._upLoadedFilePath = '';

    if (!fs.existsSync(this._uploadDir)) {
      fs.mkdirSync(this._uploadDir);
    }
  }

  /**
   *
   *
   * @returns {boolean} boolean
   * @memberof FileUpLoader
   */
  validate() {
    let result = false;
    if (
      this._fieldName &&
      (this._files[this._fieldName].name === '' || this._files[this._fieldName].size > 0)
    ) {
      result = true;
    } else {
      fs.unlinkSync(this._files[this._fieldName].path);
    }
    return result;
  }

  save() {
    const fileName = path.join(this._uploadDir, this._files[this._fieldName].name);
    fs.copyFile(this._files[this._fieldName].path, fileName, (err) => {

      if (err) {
        console.error(err.message);
        return;
      }
      fs.unlink(this._files[this._fieldName].path, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
      });
    });

    return path.join('/', optEnv.paths.upload, this._files[this._fieldName].name);
  }
}

module.exports = FileUpLoader;
