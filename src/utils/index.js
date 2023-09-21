const { default: Axios } = require('axios');

exports.axios = Axios.create({
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});
