const { dataSource } = require('./dataSource');
const {
  getUserIdByEmailDao,
  createUserDao,
  setNewPasswordDao,
} = require('./userDao');

module.exports = {
  dataSource,
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
    setNewPasswordDao,
  },
};
