const jwt = require('jsonwebtoken');

/**
 * generateToken
 * @param {string} data - 토큰을 만들 키 - 값
 * @returns token
 */
exports.generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * verifyToken
 * @param {*} token - jwt 토큰
 * @returns decode 된 토큰
 */
exports.verifyToken = (token) => {
  return jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
};

/**
 * isValidData
 * @param {string | RegExp} reg - 정규 표현식
 * @param {string} validationTarget - 검증할 문자열
 * @returns
 */
exports.isValidData = (reg, validationTarget) => {
  return reg.test(validationTarget);
};

/**
 * throwError
 * @param {number} code - 에러 상태 코드
 * @param {string} message - 커스텀 하고 싶은 메시지
 * @returns new Error
 */
exports.throwError = (code, message) => {
  if (!code) return;
  const error = new Error();
  let errorMessage = new Map([
    [400, 'bad request'],
    [401, 'unAuthorized'],
    [500, 'internal server error'],
  ]);
  if (!errorMessage.get(code) || message) {
    errorMessage.set(code, message);
  }
  error.message = errorMessage.get(code);
  error.status = code;
  throw error;
};
