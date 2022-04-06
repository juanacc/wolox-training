'use strict';

const logger = require('../logger');
const userService = require('../services/users');
const { encryptPassword, isPasswordCorrect } = require('../utils/handleEncryptions');
const { generateJWT } = require('../utils/jwt');
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

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  userService
    .find({ email })
    .then(userExist => {
      if (userExist) {
        if (isPasswordCorrect(password, userExist.password)) {
          generateJWT({ email: userExist.email })
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
