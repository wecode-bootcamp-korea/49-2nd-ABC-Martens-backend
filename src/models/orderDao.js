const { throwError } = require('../utils');
const { dataSource } = require('./dataSource');

const getOrderAddressByUserId = async (id) => {
  const result = await dataSource.query(
    `SELECT 
    addresses.id AS addressId, 
    order_name AS orderName, 
    detail_address AS detailAddress, 
    street_address AS streetAddress, 
    zip_code AS zipcode, 
    users.phone_number AS phoneNumber
    FROM addresses 
    LEFT JOIN users ON addresses.user_id = users.id
    WHERE user_id = ?`,
    [id],
  );
  return result;
};

const addOrderAddress = async ({
  id,
  orderName,
  detailAddress,
  streetAddress,
  zipCode,
  phoneNumber,
}) => {
  await dataSource.query(
    `  INSERT INTO addresses (user_id, order_name, detail_address, street_address, zip_code, phone_number) VALUES (?, ?, ?, ?, ?, COALESCE(?, (SELECT phone_number FROM users WHERE id = ?)))`,
    [id, orderName, detailAddress, streetAddress, zipCode, phoneNumber, id],
  );
  return 'address created';
};

/**
 * @function productOrderTransaction - 주문 생성 트랜잭션 함수
 * @param {object} data - {id: number, productOptionId: number, quantity: number, addressId: number, orderNo: string}
 * @returns string
 */
const productOrderTransaction = async ({
  id,
  productOptionId,
  quantity,
  addressId,
  orderNo,
}) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `
        INSERT INTO orders (user_id, address_id, order_no, order_status) VALUES (?, ?, ?, ?)
    `,
      [id, addressId, orderNo, 'wait'],
    );
    const [orderId] = await queryRunner.query(
      `
      SELECT orders.id FROM orders WHERE order_no = ?
    `,
      [orderNo],
    );
    await queryRunner.query(
      `
        INSERT INTO product_orders (order_id, product_option_id, product_quantity) VALUES (?, ?, ?)
      `,
      [orderId.id, productOptionId, quantity],
    );
    await queryRunner.commitTransaction();
    return 'order created';
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    throwError(500, 'transaction failed');
  } finally {
    await queryRunner.release();
  }
};

/**
 * @function productOrdersTransaction - 여러 상품주문 생성 트랜잭션 함수
 * @param {object} data - {id: number, productOptionId: number, quantity: number, addressId: number, orderNo: string}
 * @returns string
 */
const productOrdersTransaction = async ({
  id,
  productList,
  addressId,
  orderNo,
}) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  const productOptionIds = productList.map((item) => item.productOptionId);
  const quantities = productList.map((item) => item.quantity);

  try {
    await queryRunner.query(
      `
        INSERT INTO orders (user_id, address_id, order_no, order_status) VALUES (?, ?, ?, ?)
    `,
      [id, addressId, orderNo, 'wait'],
    );
    const [orderId] = await queryRunner.query(
      `
      SELECT orders.id FROM orders WHERE order_no = ?
    `,
      [orderNo],
    );

    const values = productList
      .map((item) => {
        return `(${orderId.id}, ${productOptionIds.find(
          (pid) => item.productOptionId === pid,
        )}, ${quantities.find((q) => item.quantity === q)})`;
      })
      .join(', ');

    const sql = `
    INSERT INTO product_orders (order_id, product_option_id, product_quantity)
    VALUES ${values}
    `;

    await queryRunner.query(sql);
    await queryRunner.commitTransaction();
    return 'order created';
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    throwError(500, 'transaction failed');
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getOrderAddressByUserId,
  addOrderAddress,
  productOrderTransaction,
  productOrdersTransaction,
};
