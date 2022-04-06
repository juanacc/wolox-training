const { healthCheck } = require('./controllers/healthCheck');
const { create, signIn } = require('./controllers/users');
const { validateUserCreation, validateUserSignIn } = require('./middlewares/validation');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUserCreation, create);
  app.post('/users/sessions', validateUserSignIn, signIn);
};
