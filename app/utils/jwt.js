const jwt = require('jwt-simple');

exports.generateJWT = data =>
  new Promise((resolve, reject) => {
    const payload = { ...data };
    const token = jwt.encode(payload, process.env.JWT_SECRET, 'HS512');
    return token ? resolve(token) : reject(new Error('Error generating token'));
  });

exports.verifyToken = token =>
  new Promise((resolve, reject) => {
    const payload = jwt.decode(token, process.env.JWT_SECRET, 'HS512');
    return payload ? resolve(payload) : reject(new Error('Error verifying token'));
  });
