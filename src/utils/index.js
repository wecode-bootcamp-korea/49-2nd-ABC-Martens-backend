const { default: Axios } = require('axios');
const jwt = require('jsonwebtoken');

exports.axios = Axios.create({
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

exports.generateToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
