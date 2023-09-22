const { dataSource } = require('./dataSource');
const { getUserIdByEmailDao, createUserDao } = require('./userDao');

module.exports = {
  dataSource,
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
  },
};
