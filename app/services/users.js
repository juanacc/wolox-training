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

exports.getUsers = ({ page = 0, limit = 10 }) =>
  User.findAndCountAll({
    attributes: ['name', 'lastName', 'email'],
    limit,
    offset: page * limit,
    order: [['lastName', 'ASC']]
  })
    .then(data => ({ ...{ page }, ...data }))
    .catch(err => {
      throw errors.databaseError(err.message);
    });

exports.update = (user, values) =>
  user
    .update(values)
    .then(userUpdated => userUpdated)
    .catch(err => {
      logger.error(err.message);
      errors.databaseError(err.message);
    });
