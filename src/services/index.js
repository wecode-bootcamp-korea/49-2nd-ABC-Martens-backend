const { getUserIdByEmailService, createUserService } = require('./userService');

module.exports = {
  userService: {
    getUserIdByEmailService,
    createUserService,
  },
};
