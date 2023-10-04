const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const {
  socialLoginController,
  getVerificationCodeController,
  setNewPasswordController,
} = userController;
const {
  getAccessToken,
  getUserData,
  isSocialSignedUp,
  tokenVerification,
} = require('../middlewares');

router.get(
  '/oauth',
  getAccessToken,
  getUserData,
  isSocialSignedUp,
  socialLoginController,
);
router.post('/reset-password', getVerificationCodeController);
router.post('/new-password', tokenVerification, setNewPasswordController);

module.exports = router;