const { generateToken, throwError } = require('../utils');

const socialLoginController = async (req, res, next) => {
  try {
    if (req.socialData) {
      const existUser = req.existUser;
      const access_token = generateToken(existUser);
      res.cookie('access_token', access_token, {
        httpOnly: true,
      });
      return res.redirect(process.env.CLIENT_URI);
    }
    throwError(500, 'integration server error');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  socialLoginController,
};
