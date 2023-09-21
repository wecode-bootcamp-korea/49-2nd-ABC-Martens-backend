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

exports.throwError = (code, message) => {
  if (!code) return;
  const error = new Error();
  const errorMessage = new Map([
    [400, 'bad request'],
    [401, 'unAuthorized'],
    [500, 'internal server error'],
  ]);
  if (!errorMessage.get(code) || message) {
    errorMessage.set(code, message);
  }
  error.message = errorMessage.get(code);
  error.status = code;
  throw error;
};
