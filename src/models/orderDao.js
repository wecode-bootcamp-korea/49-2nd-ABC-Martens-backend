const { throwError } = require('../utils');
const { dataSource } = require('./dataSource');
const { getUserUidByOrderNumberQuery } = require('./userDao');

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
    const [userUid] = await queryRunner.query(
      getUserUidByOrderNumberQuery,
      orderNo,
    );

    await queryRunner.commitTransaction();

    return {
      message: 'order created',
      orderNo,
      userUid: userUid.uid,
    };
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

    const orderValues = productList
      .map((item) => {
        return `(${orderId.id}, ${productOptionIds.find(
          (pid) => item.productOptionId === pid,
        )}, ${quantities.find((q) => item.quantity === q)})`;
      })
      .join(', ');

    const insertOrder = `
    INSERT INTO product_orders (order_id, product_option_id, product_quantity)
    VALUES ${orderValues}
    `;

    const deleteValues = productList.map((item) => {
      return `(${id}, ${productOptionIds.find(
        (pid) => item.productOptionId === pid,
      )}, ${quantities.find((q) => item.quantity === q)}, 1)`;
    });

    const deleteCart = `
    INSERT INTO product_carts (user_id, product_option_id, quantity, is_deleted)
    VALUES ${deleteValues}
    ON DUPLICATE KEY UPDATE quantity = product_carts.quantity - VALUES(quantity),
    is_deleted = VALUES(is_deleted), 
    deleted_at = CASE WHEN VALUES(is_deleted) = 1 THEN CURRENT_TIMESTAMP ELSE product_carts.deleted_at END
    `;

    await queryRunner.query(insertOrder);
    await queryRunner.query(deleteCart);
    const [userUid] = await queryRunner.query(
      getUserUidByOrderNumberQuery,
      orderNo,
    );
    await queryRunner.commitTransaction();

    return {
      message: 'order created',
      orderNo,
      userUid: userUid.uid,
    };
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    throwError(500, 'transaction failed');
  } finally {
    await queryRunner.release();
  }
};

const orderCheckoutDao = async ({ orderNo, amount, method }) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [result] = await queryRunner.query(
      `
      SELECT 
      users.id, 
      orders.id AS orderId
      FROM users
      LEFT JOIN orders ON users.id = orders.user_id
      WHERE order_no = ?
    `,
      [orderNo],
    );
    const [methodId] = await queryRunner.query(
      `SELECT id FROM payment_method WHERE method = ?`,
      [method],
    );
    const productOrdersList = await queryRunner.query(
      `
        SELECT 
        product_option_id AS productOptionId, 
        product_quantity AS productQuantity
        FROM product_orders WHERE order_id = ?
      `,
      [result.orderId],
    );
    await queryRunner.query(
      `
      INSERT INTO payments (user_id, order_id, amount, method_id, status) VALUES (?, ?, ?, ?, ?)
    `,
      [result.id, result.orderId, amount, methodId.id, 'success'],
    );
    await queryRunner.query(
      `
      UPDATE orders SET order_status = 'success' WHERE order_no = ?
      `,
      [orderNo],
    );
    const caseMap = productOrdersList
      .map((item) => {
        return `WHEN id = ${item.productOptionId} THEN quantity - ${item.productQuantity}`;
      })
      .join(' ');
    const optionIds = productOrdersList
      .map((item) => item.productOptionId)
      .join(', ');
    const optionQuantityUpdateQuery = `
      UPDATE options
      SET quantity = CASE ${caseMap} ELSE quantity
      END 
      WHERE id IN (${optionIds})
    `;

    await queryRunner.query(optionQuantityUpdateQuery);
    await queryRunner.commitTransaction();

    return 'ok';
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
  orderCheckoutDao,
};
