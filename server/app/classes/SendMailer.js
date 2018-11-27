const nodemailer = require('nodemailer');

const Response = new(require('./Response'))();
const {
  mail
} = require('../../config/env.json');

/**
 * Прослойка класс отправки сообщения с сайта
 *
 * @class SendMailer
 */
class SendMailer {
  constructor() {
    this._from = null;
    this._host = mail.host;
    this._mailOptions = null;
    this._pass = mail.auth.pass;
    this._port = mail.port;
    this._protocol = mail.protocol;
    this._secure = mail.secure;
    this._subject = mail.subject;
    this._text = null;
    this._transporter = null;
    this._user = mail.auth.user;

    return this;
  }

  getFrom() {
    return this._from;
  }

  /**
   *
   *
   * @param {string} name
   * @param {string} email
   * @returns {SendMailer}
   * @memberof SendMailer
   */
  setFrom(name, email) {
    this._from = {
      name,
      email
    };
    return this;
  }

  /**
   * Получение имя почтового хоста
   *
   * @returns {string} string
   * @memberof SendMailer
   */
  getHost() {
    return this._host;
  }

  /**
   * Устанавливает имя почтового хоста
   *
   * @param {string} host
   * @returns {SendMailer}
   * @memberof SendMailer
   */
  setHost(host) {
    this._host = host;
    return this;
  }

  getPass() {
    return this._pass;
  }

  setPass(pass) {
    this._pass = pass;
    return this;
  }

  getPort() {
    return this._port;
  }

  /**
   * Установка порта почтового сервера
   *
   * @param {number} port
   * @memberof SendMailer
   */
  setPort(port) {
    this._port = port;
    return this;
  }

  getText() {
    return this._text;
  }

  setTest(text) {
    this._text = text.slice(0, 500); // + `\n Отправлено с: <${req.body.email}>`
    return this;
  }

  getUser() {
    return this._user;
  }

  setUser(user) {
    this._user = user;
    return this;
  }

  /**
   * Подготовка протокола и тела письма
   *
   * @returns {SendMailer}
   * @memberof SendMailer
   */
  build() {
    this._transporter = nodemailer.createTransport({
      'host': this.getHost(),
      'port': this.getPort(),
      'secure': this._secure,
      'auth': {
        'user': this.getUser(),
        'pass': this.getPass()
      }
    });

    this._mailOptions = {
      from: `"${this._from.name}" <${this._from.email}>`,
      to: this._user,
      subject: this._subject,
      text: this._text
    };
    return this;
  }

  /**
   * Отправка сообщения
   *
   * @returns
   * @memberof SendMailer
   */
  send(cb) {
    // eslint-disable-next-line no-unused-vars
    this._transporter.sendMail(this._mailOptions, (error, _info) => {
      if (error) {
        // console.log(error);
        Response.setResult(false).setMessage('При отправке письма произошла ошибка!');
      } else {
        Response.setResult(true).setMessage('Письмо успешно отправлено!');
      }
      cb(Response.build());
    });
  }
}

module.exports = SendMailer;
