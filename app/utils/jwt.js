const jwt = require('jwt-simple');

exports.generateJWT = data =>
  new Promise((resolve, reject) => {
    const payload = { ...data };
    const token = jwt.encode(payload, process.env.JWT_SECRET, 'HS512');
    return token ? resolve(token) : reject(new Error('Error generating token'));
  });
