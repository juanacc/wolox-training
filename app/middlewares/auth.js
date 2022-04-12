const errors = require('../errors');
const logger = require('../logger');
const { verifyToken } = require('../../app/utils/jwt');
const userService = require('../services/users');

exports.authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    logger.error('Authorization header not found');
    res.status(401).send(errors.unauthorizedUserError('Authorization header not found'));
    return;
  }

  const token = req.headers.authorization;
  if (!token) {
    logger.error('Token error');
    res.status(401).send(errors.unauthorizedUserError('Token error'));
    return;
  }

  verifyToken(token)
    .then(payload => {
      const { email } = payload;
      userService
        .find({ email })
        .then(user => {
          if (user) {
            req.user = user;
            next();
          } else {
            logger.error(`Unauthorized access to ${email}`);
            res.status(404).send(errors.unauthorizedUserError(`Unauthorized access to ${email}`));
          }
        })
        .catch(err => {
          logger.error(errors.databaseError(err));
          res.status(500).send(errors.databaseError(err));
        });
    })
    .catch(err => {
      res.status(401).send(errors.jwtError(err));
    });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role.toUpperCase() !== 'ADMIN') {
    logger.error(`User ${req.user.email} without administrator privilege`);
    res.status(401).send(errors.userNotAdmin(`User ${req.user.email} without administrator privilege`));
    return;
  }
  next();
};
