const {
  getUserIdByEmailService,
  createUserService,
  mailSendService,
  setNewPasswordService,
} = require('./userService');

module.exports = {
  userService: {
    getUserIdByEmailService,
    createUserService,
    mailSendService,
    setNewPasswordService,
  },
};
