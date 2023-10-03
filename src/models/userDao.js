const { dataSource } = require('./dataSource');
const getUserIdByEmailDao = (email) => {
  const existUser = dataSource.query(
    `
    SELECT id FROM users WHERE users.email = ?
    `,
    [email],
  );
  return existUser;
};

const createUserDao = (
  email,
  birth_date,
  gender,
  is_checked_marketing,
  password,
  nickname,
  phone_number,
  profile_image,
  provider,
) => {
  dataSource.query(
    `
  INSERT INTO users
  (email, birth_date, gender, is_checked_marketing, password, nickname, phone_number, profile_image, provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      email,
      birth_date,
      gender,
      is_checked_marketing,
      password,
      nickname,
      phone_number,
      profile_image,
      provider,
    ],
  );
};

const setNewPasswordDao = async (id, password) => {
  await dataSource.query(
    `
  UPDATE users SET password = ? WHERE id = ? 
  `,
    [password, id],
  );
};

const getUserUidByOrderNumberQuery = ` SELECT uid 
    FROM users 
    LEFT JOIN orders ON users.id = orders.user_id
    WHERE order_no = ?
  `;

module.exports = {
  getUserIdByEmailDao,
  createUserDao,
  setNewPasswordDao,
  getUserUidByOrderNumberQuery,
};
