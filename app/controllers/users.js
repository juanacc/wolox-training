'use strict';

const logger = require('../logger');
const userService = require('../services/users');
const { encryptPassword, isPasswordCorrect } = require('../utils/handleEncryptions');
const { generateJWT } = require('../utils/jwt');
const errors = require('../errors');

const createUser = (user, data) =>
  new Promise(resolve => {
    Object.assign(user, data);
    userService.create(user).then(userCreated => resolve(userCreated));
  });

const sendInfoCreation = (user, res, action = 'created', status = 201) => {
  logger.info(`User ${user.name} with email ${user.email} ${action}`);
  res.status(status).send({
    msg: `User ${action}`,
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    role: user.role
  });
};

exports.create = (req, res) => {
  const user = req.body;

  userService.find({ email: user.email.toLowerCase() }).then(userExist => {
    if (userExist) {
      res.status(409).send(errors.userExist(user.email));
    } else {
      createUser(user, { email: user.email.toLowerCase(), password: encryptPassword(user.password) }).then(
        userCreated => {
          sendInfoCreation(userCreated, res);
        }
      );
    }
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  userService
    .find({ email: email.toLowerCase() })
    .then(userExist => {
      if (userExist) {
        if (isPasswordCorrect(password, userExist.password)) {
          generateJWT({ email: userExist.email.toLowerCase() })
            .then(token => {
              logger.info(`User ${userExist.email} signid in correctly`);
              res.status(200).send({
                msg: `User ${userExist.email} signid in correctly`,
                token
              });
            })
            .catch(err => {
              logger.info(errors.jwtError(err));
            });
        } else res.status(400).send(errors.emailPasswordIncorrect());
      } else res.status(404).send(errors.userNotFound(email));
    })
    .catch(err => {
      logger.info(errors.databaseError(err));
    });
};

exports.getUsers = (req, res) => {
  const { page = 0, limit = 10 } = req.query;
  userService
    .getUsers({ page, limit })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      logger.info(errors.databaseError(err));
      res.status(500).send(errors.databaseError(err));
    });
};

exports.createRole = (req, res) => {
  const user = req.body;

  userService.find({ email: user.email.toLowerCase() }).then(userExist => {
    if (userExist) {
      userService
        .update(userExist, { role: 'ADMIN' })
        .then(userUpdated => sendInfoCreation(userUpdated, res, 'updated', 200));
    } else {
      createUser(user, { email: user.email.toLowerCase(), role: 'ADMIN' }).then(userCreated => {
        sendInfoCreation(userCreated, res);
      });
    }
  });
};
