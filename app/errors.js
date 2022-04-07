const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.USER_EXIST = 'user_exist';
exports.userExist = userEmail =>
  internalError(`The user with email: ${userEmail} is already registered`, exports.USER_EXIST);

exports.REQUEST_ERROR = 'request_error';
exports.requestError = errorsArr => internalError(errorsArr, exports.REQUEST_ERROR);

exports.REQUEST_NAME_ERROR = 'Name is required';
exports.REQUEST_EMAIL_ERROR = 'The email is required and must belong to the Wolox domains';
exports.REQUEST_PASSWORD_ERROR =
  'The password is required, it must be alphanumeric with a minimum of 8 characters';

exports.REQUEST_LAST_NAME_ERROR = 'Last name is required';

exports.INVALID_USER = 'invalid_user';
exports.userNotFound = email =>
  internalError(`The user with email ${email} does not exist`, exports.INVALID_USER);

exports.JWT_ERROR = 'jwt_error';
exports.jwtError = message => internalError(message, exports.JWT_ERROR);

exports.EMAIL_PASSWORD_INCORRECT = 'email_password_incorrect';
exports.emailPasswordIncorrect = () =>
  internalError('Email or password is incorrect', exports.EMAIL_PASSWORD_INCORRECT);

exports.UNAUTHORIZED_USER_ERROR = 'unauthorized_user_error';
exports.unauthorizedUserError = message => internalError(message, exports.UNAUTHORIZED_USER_ERROR);
