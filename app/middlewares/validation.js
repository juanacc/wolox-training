const { check, validationResult } = require('express-validator');
const errors = require('../errors');
const logger = require('../logger');

const validateFields = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    logger.error(err.mapped());
    res.status(400).send(errors.requestError(err.mapped()));
    return;
  }
  next();
};

exports.validateUserCreation = [
  check('name', errors.REQUEST_NAME_ERROR)
    .not()
    .isEmpty(),
  check('lastName', errors.REQUEST_LAST_NAME_ERROR)
    .not()
    .isEmpty(),
  check('email', errors.REQUEST_EMAIL_ERROR)
    .isEmail()
    .matches(/@wolox.(co|com|cl|com.ar)$/),
  check('password', errors.REQUEST_PASSWORD_ERROR)
    .isLength({ min: 8 })
    .matches(/^[a-zA-Z0-9]+$/),
  validateFields
];
