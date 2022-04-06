const bcrypt = require('bcryptjs');

exports.encryptPassword = password => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

exports.isPasswordCorrect = (password, passwordDB) => bcrypt.compareSync(password, passwordDB);
