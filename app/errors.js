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
