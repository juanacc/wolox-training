const { healthCheck } = require('./controllers/healthCheck');
const { create } = require('./controllers/users');
const { validateUserCreation } = require('./middlewares/validation');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUserCreation, create);
};
