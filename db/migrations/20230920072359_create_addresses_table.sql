-- migrate:up
CREATE TABLE `addresses` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `order_name` varchar(20) NOT NULL,
  `detail_address` varchar(100) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `order_name2` varchar(20),
  `detail_address2` varchar(100),
  `street_address2` varchar(100),
  `zip_code2` varchar(20),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE addresses
