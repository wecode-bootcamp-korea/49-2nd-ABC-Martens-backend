const {
  socialLoginController,
  getVerificationCodeController,
  setNewPasswordController,
} = require('./userController');

module.exports = {
  userController: {
    socialLoginController,
    getVerificationCodeController,
    setNewPasswordController,
  },
};
