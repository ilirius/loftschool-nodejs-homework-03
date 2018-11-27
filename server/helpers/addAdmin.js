#!/usr/bin/env node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const Users = require('../app/Model/UsersModel');
const psw = require('../lib/password');

let login = '';
let hash = '';
let salt = '';
let password = {};
let email = '';

rl.question('Login: ', answer => {
  login = answer;
  rl.question('E-mail: ', answer => {
    email = answer;
    rl.question('Password: ', answer => {
      password = psw.setPassword(answer);
      hash = password.hash;
      salt = password.salt;
      rl.close();
    });
  });
});

rl.on('close', () => {
  (new Users()).setData({
    users: [{
      login,
      email,
      hash,
      salt
    }]
  });
});
