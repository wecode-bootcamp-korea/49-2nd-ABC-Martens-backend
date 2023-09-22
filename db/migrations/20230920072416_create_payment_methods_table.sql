-- migrate:up
CREATE TABLE `payment_method` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `method` varchar(30)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE payment_method