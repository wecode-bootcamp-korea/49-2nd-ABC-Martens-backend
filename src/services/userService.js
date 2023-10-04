const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { userDao } = require('../models');
const { getUserIdByEmailDao, createUserDao, setNewPasswordDao } = userDao;

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

const mailSendService = (email, redirect_uri, id) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });
  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: email,
    subject: `ABC-Martens 비밀번호 초기화 링크입니다.`,
    html: `
    <div
    style="
      background: black;
      max-width: 600px;
      margin: 0 auto;
      padding: 32px 24px;
      text-align: center;
      color: white;
    "
  >
    <h1 style="font-size: 48px; color: #ffe512">ABCMartens</h1>
    <div style="padding-bottom: 24px">
      <div style="margin-bottom: 8px">
        <div style="margin-bottom: 24px">
          <a
            style="
              font-weight: bold;
              text-decoration: none;
              font-size: 20px;
              color: black;
              padding: 16px 24px;
              background: #ffe512;
              border-radius: 14px;
              display: inline-block;
            "
            href="${redirect_uri}?token=${jwt.sign(id, process.env.JWT_SECRET, {
              expiresIn: '5m',
            })}"
            target="_blank"
          >
            ABC-Martens 비밀번호 재설정하기 🛼
          </a>
        </div>
        <div style="margin-bottom: 8px">
          인증 링크로 5분 내에 미이동시 링크가 만료됩니다.
        </div>
        만약 본인이 요청한 것이 아닌 경우, 본 메일은 무시하셔도 됩니다.
        <div style="font-size: 12px; color: #a4a4a4; margin-top: 16px">
          copyright ABCMartens ALL Rights Reserved.
        </div>
      </div>
    </div>
  </div>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return error;
    }
    console.log('Message sent: %s', info.messageId);
  });
  return 'ok';
};

const setNewPasswordService = (id, password) => {
  setNewPasswordDao(id, password);
  return 'password updated';
};

module.exports = {
  getUserIdByEmailService,
  createUserService,
  mailSendService,
  setNewPasswordService,
};