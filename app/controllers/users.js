'use strict';

const logger = require('../logger');
const userService = require('../services/users');
const { encryptPassword } = require('../utils/handleEncryptions');
const errors = require('../errors');

exports.create = (req, res) => {
  const user = req.body;

  userService.find({ email: user.email }).then(userExist => {
    if (userExist) {
      res.status(409).send(errors.userExist(user.email));
    } else {
      Object.assign(user, { password: encryptPassword(user.password) });

      userService.create(user).then(userCreated => {
        logger.info(`User ${userCreated.name} with email ${userCreated.email} created`);
        res
          .status(201)
          .send({ msg: `User ${userCreated.name} with email ${userCreated.email} created`, userCreated });
      });
    }
  });
};
