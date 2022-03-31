const { healthCheck } = require('./controllers/healthCheck');
const { create } = require('./controllers/users');
const { validateUserCreation } = require('./middlewares/validation');

exports.init = app => {
  app.get('/health', healthCheck);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
  app.post('/users', validateUserCreation, create);
};
