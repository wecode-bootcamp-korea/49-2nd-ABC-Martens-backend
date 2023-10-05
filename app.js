const express = require('express');
const https = require('https');
const fs = require('fs');
const v4 = require('uuid4');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dataSource: myDataSource } = require('./src/models/dataSource');

require('dotenv').config();

const app = express();

const indexRouter = require('./src/routes');
app.set('port', process.env.PORT || 8000);
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('OK');
});
app.use('/', indexRouter);

// 회원가입
app.post('/users', async (req, res) => {
  try {
    console.log(1);
    const {
      nickname,
      password,
      email,
      birthDate,
      phoneNumber,
      gender,
      profileImage = '',
      provider,
    } = req.body;

    console.log(req.body);
    // key error (필수, 입력 정보 없을 경우)
    if (
      !nickname ||
      !password ||
      !birthDate ||
      !email ||
      !phoneNumber ||
      !gender
    ) {
      const error = new Error('KEY_ERROR');
      error.statusCode = 400;
      throw error;
    }

    // 이메일 중복 확인, 있으면 에러
    const existingUser = await myDataSource.query(`
    SELECT id, email FROM users WHERE email='${email}';
    `);

    console.log('existing user:', existingUser);
    if (existingUser.length > 0) {
      const error = new Error('이미 존재하는 사용자입니다'); //보안 위해, 이메일 중복임을 밝히지 않음
      error.statusCode = 400;
      throw error;
    }

    // email . @ 필수 포함 정규식
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      const error = new Error('유효하지 않은 이메일 주소 형식입니다.');
      error.statusCode = 400;
      throw error;
    }

    // 비밀번호 8자리 이상
    if (password.length < 8) {
      const error = new Error('패스워드는 8자리 이상이어야 합니다');
      error.statusCode = 400;
      throw error;
    }

    // DB 저장 전 비밀번호 해시화
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);

    // DB에 회원정보 저장
    await myDataSource.query(`
    INSERT INTO users (
      nickname,                   
      password, birth_date, 
      email, phone_number, gender, profile_image, provider, uid
      )
    VALUES (
      '${nickname}',
      '${hashedPw}',
      '${birthDate}',
      '${email}', 
      '${phoneNumber}',
      '${gender}',
      '${profileImage}',
      '${provider}',
      '${v4()}'
      )
    `);

    return res.status(201).json({
      message: '회원가입이 완료되었습니다',
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: '회원가입에 실패하였습니다',
    });
  }
});

//로그인
app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // key error
    if (!email || !password) {
      const error = new Error('필수 입력란을 모두 작성해 주세요');
      error.statusCode = 400;
      throw error;
    }
    // key error 할 수 있지만, 프론트엔드에게 백엔드의 의도를 '친절하게' 알려주기 위해

    // email 이 DB에 있는지 (existing user인지)
    const existingUser = await myDataSource.query(`
    SELECT id, email, password FROM users WHERE email='${email}';
    `);

    if (existingUser.length === 0) {
      const error = new Error('일치하는 회원정보가 없습니다');
      error.statusCode = 400;
      throw error;
    }

    // 해당 email의 해쉬된 패스워드가 DB에 있는가
    const hashPw = await bcrypt.compare(password, existingUser[0].password);
    console.log(hashPw);

    if (!hashPw) {
      const error = new Error('일치하는 회원정보가 없습니다');
      error.statusCode = 400;
      error.code = 'passwordError';
      throw error;
    } //보안을 위해 비밀번호, 패스워드 중 오류 알려주지 않기로

    // 로그인 성공 시 토큰 발급
    const token = jwt.sign({ id: existingUser[0].id }, process.env.JWT_SECRET);
    return res.status(200).json({
      message: '로그인 성공하였습니다',
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use((req, _, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ''} ${err.message}`,
  });
});

app.listen(
  app.get('port'),
  () => {
    console.log(`server is running`);
  },
);
