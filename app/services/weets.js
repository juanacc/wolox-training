const axios = require('axios');

const api = axios.create({
  baseURL: 'http://numbersapi.com'
});

const create = () => {
  const maxNumber = 50000000;
  const randomNumber = Math.floor(Math.random() * maxNumber);

  return api
    .get(`/${randomNumber}?notfound=floor`)
    .then(({ data }) => data)
    .catch(err => `$${err}`);
};

module.exports = {
  create
};
