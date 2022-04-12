const { healthCheck } = require('./controllers/healthCheck');
const { create, signIn, getUsers } = require('./controllers/users');
const { validateUserCreation, validateUserSignIn } = require('./middlewares/validation');
const { authenticate } = require('./middlewares/auth');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUserCreation, create);
  app.post('/users/sessions', validateUserSignIn, signIn);
  app.get('/users', authenticate, getUsers);
};
