#!/usr/bin/env node

const express = require('express');
// const fs = require('fs');

const server = express();
require('./app/registers')(express, server);
require('./app/controllers')(express, server);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
server.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


server.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
});
