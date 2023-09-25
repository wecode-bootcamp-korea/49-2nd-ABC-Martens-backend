const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { socialLoginController } = userController;
const {
  getAccessToken,
  getUserData,
  isSocialSignedUp,
} = require('../middlewares');

router.get(
  '/oauth',
  getAccessToken,
  getUserData,
  isSocialSignedUp,
  socialLoginController,
);

module.exports = router;
