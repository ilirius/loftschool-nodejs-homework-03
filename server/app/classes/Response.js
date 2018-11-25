class Response {
  constructor() {
    this._data = null;
    this._message = null;
    this._result = false;
  }

  /**
   * Получение результата
   *
   * @return bool
   */
  getResult() {
    return this._result;
  }

  /**
   * Установка результата
   *
   * @param {boolean} result
   * @return {Response}
   */
  setResult(result) {
    this._result = result;

    return this;
  }

  /**
   * Получение сообщения
   *
   * @return null
   */
  getMessage() {
    return this._message;
  }

  /**
   * Установка сообщения
   *
   * @param {string} message
   * @returns {Response}
   */
  setMessage(message) {
    this._message = message;

    return this;
  }

  /**
   * Получение информации
   *
   * @returns {any}
   */
  getData() {
    return this._data;
  }

  /**
   * Установка информации
   *
   * @param data
   * @returns {Response}
   */
  setData(data) {
    this._data = data;

    return this;
  }

  build() {
    return {
      'data': this.getData(),
      'message': this.getMessage(),
      'result': this.getResult(),
    };
  }
};

module.exports = Response;
