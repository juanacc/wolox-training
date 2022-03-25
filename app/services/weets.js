const { numbersApiUrl } = require('../../config').common.services;
const { request } = require('../utils/axios');

exports.create = () => {
  const maxNumber = 50000000;
  const randomNumber = Math.floor(Math.random() * maxNumber);

  return request('get', `${numbersApiUrl}/${randomNumber}?notfound=floor`);
};
