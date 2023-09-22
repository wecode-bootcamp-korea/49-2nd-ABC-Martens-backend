const { throwError, verifyToken } = require('../utils');

exports.tokenVerification = (req, res, next) => {
  const token = req.header('Authorization');
  try {
    if (!token) throwError(401);
    const { data } = verifyToken(token);
    req.userData = data;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
