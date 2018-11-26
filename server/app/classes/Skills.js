class Skills {

  constructor(data) {
    this._data = data || [];
  }

  /**
   *
   *
   * @returns {any}
   * @memberof Skills
   */
  getData() {
    return this._data;
  }

  /**
   * Получение "Возраст начала занятий на скрипке"
   *
   * @returns {number} number || 0
   * @memberof Skills
   */
  getAge() {
    return this._data[0].number || 0;
  }

  getAgeText() {
    return this._data[0].text || '';
  }

  /**
   * Кол-во Концертов отыграл
   *
   * @returns {number} number || 0
   * @memberof Skills
   */
  getConcertsCount() {
    return this._data[1].number || 0;
  }

  getConcertsText() {
    return this._data[1].text || '';
  }

  getCitiesCount() {
    return this._data[2].number || 0;
  }

  getCitiesText() {
    return this._data[2].text || '';
  }

  getYears() {
    return this._data[3].number || 0;
  }

  getYearsText() {
    return this._data[3].text || '';
  }

  setAge(age) {
    this._data[0].number = parseInt(age, 10);
    return this;
  }

  setConcertsCount(count) {
    this._data[1].number = parseInt(count, 10);
    return this;
  }

  setCitiesCount(count) {
    this._data[2].number = parseInt(count, 10);
    return this;
  }

  setYears(years) {
    this._data[3].number = parseInt(years, 10);
    return this;
  }
}

module.exports = Skills;
