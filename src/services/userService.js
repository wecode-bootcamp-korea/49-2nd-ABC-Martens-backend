const { userDao } = require('../models');
const { getUserIdByEmailDao, createUserDao } = userDao;

const getUserIdByEmailService = (email) => {
  return getUserIdByEmailDao(email);
};
const createUserService = (data, isUseOauth) => {
  let email,
    birth_date,
    gender,
    is_checked_marketing,
    password,
    nickname,
    phone_number,
    profile_image,
    provider;
  if (isUseOauth) {
    email = data.kakao_account.email;
    birth_date = '19900101';
    gender = 'female';
    is_checked_marketing = 0;
    password = '123123';
    nickname = data.kakao_account.profile.nickname;
    phone_number = '010-000-0000';
    profile_image = data.kakao_account.profile.profile_image_url;
    provider = isUseOauth ? 'kakao' : 'none';
    return createUserDao(
      email,
      birth_date,
      gender,
      is_checked_marketing,
      password,
      nickname,
      phone_number,
      profile_image,
      provider,
    );
  }
};
module.exports = {
  getUserIdByEmailService,
  createUserService,
};
