const {
  hashPassword
} = require('../../lib/password');


class Users {
  constructor(data) {
    this._data = data;
  }

  getEmail() {
    return this.__getDataValue('email', '');
  }

  getSalt() {
    return this.__getDataValue('salt', '');
  }

  getHash() {
    return this.__getDataValue('hash', '');
  }

  validPassword(psswd) {
    return this.getHash() === hashPassword(psswd, this.getSalt());
  }

  __getDataValue(key, defValue) {
    defValue = defValue !== void 0 ? defValue : null;
    return this._data[key] !== void 0 ? this._data[key] : defValue;
  }
}

module.exports = Users;
