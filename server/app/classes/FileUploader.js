const fs = require('fs');
const path = require('path');

const optEnv = require('../../config/env.json');

class FileUpLoader {
  constructor(files) {
    this._files = files;
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
    if (this._files.name === '' || this._files.size > 0) {
      result = true;
    } else {
      fs.unlinkSync(this._files.path);
    }
    return result;
  }

  save() {
    const fileName = path.join(this._uploadDir, this._files.name);
    fs.copyFile(this._files.path, fileName, (err) => {

      if (err) {
        console.error(err.message);
        return;
      }
      fs.unlink(this._files.path, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
      });
    });

    return path.join('/', optEnv.paths.upload, this._files.name);
  }
}

module.exports = FileUpLoader;
