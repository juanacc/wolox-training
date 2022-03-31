'use strict';

const User = require('../models').user;
const errors = require('../errors');
const logger = require('../logger');

exports.find = where =>
  User.findOne({ where })
    .then(user => user)
    .catch(err => {
      logger.error(err.message);
      errors.databaseError(err.message);
    });

exports.create = user =>
  User.create(user)
    .then(userCreated => userCreated)
    .catch(err => {
      logger.error(err.message);
      errors.databaseError(err.message);
    });
