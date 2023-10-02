const bcrypt = require('bcrypt');
const { generateToken, throwError, isValidData } = require('../utils');
const { userService } = require('../services');
const { getUserIdByEmailService, mailSendService, setNewPasswordService } =
  userService;

const socialLoginController = async (req, res, next) => {
  try {
    if (req.socialData) {
      const existUser = req.existUser;
      const access_token = generateToken(existUser);
      // res.cookie('access_token', access_token, {
      //   httpOnly: true,
      // });
      return res.redirect(process.env.CLIENT_URI + '?token=' + access_token);
    }
    throwError(500, 'integration server error');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getVerificationCodeController = async (req, res, next) => {
  try {
    const { email, redirect_uri } = req.body;
    const [id] = await getUserIdByEmailService(email);
    if (!id) throwError(401, "user doesn't exist");
    const message = mailSendService(email, redirect_uri, id);
    if (message === 'ok') {
      return res.status(201).json({
        message: 'mail sent successfully',
        email,
      });
    } else {
      throwError(500, message);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const setNewPasswordController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const { password } = req.body;
    if (!password) throwError(400, 'key error');
    const passwordRegExp = /[ !@#$%^&*(),.?":{}|<>]/g;
    if (isValidData(passwordRegExp, password)) {
      const hash = await bcrypt.hash(password, 12);
      return res
        .status(201)
        .json({ message: await setNewPasswordService(id, hash) });
    }
    throwError(400, 'invalid data');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  socialLoginController,
  getVerificationCodeController,
  setNewPasswordController,
};
