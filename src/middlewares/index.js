const { userService } = require('../services');
const { getUserIdByEmailService, createUserService } = userService;
const { axios } = require('../utils');
const { throwError, verifyToken } = require('../utils');

exports.tokenVerification = (req, res, next) => {
  const token = req.header('Authorization');
  try {
    if (!token) throwError(401);
    const { data } = verifyToken(token);
    req.userData = data;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getAccessToken = (req, _, next) => {
  const { code } = req.query;
  try {
    axios
      .post('https://kauth.kakao.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
      })
      .then((resData) => {
        const { data } = resData;
        req.accessToken = data.access_token;
        next();
      })
      .catch((err) => {
        console.error(err);
        throwError(500, 'integration server error');
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getUserData = (req, res, next) => {
  const token = req.accessToken;
  try {
    axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((resData) => {
        const { data } = resData;
        req.socialData = data;
        next();
      })
      .catch((err) => {
        console.error(err);
        throwError(500, 'integration server error');
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.isSocialSignedUp = async (req, res, next) => {
  try {
    if (req.socialData) {
      const email = req.socialData.kakao_account.email;
      const [existUser] = await getUserIdByEmailService(email);
      if (!existUser) {
        await createUserService(req.socialData, true);
      } else {
        req.existUser = existUser;
      }
      next();
    } else {
      throwError(500, 'integration server error');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
