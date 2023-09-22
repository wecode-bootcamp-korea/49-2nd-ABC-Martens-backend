-- migrate:up
CREATE TABLE `orders` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `address_id` integer NOT NULL,
  `order_no` varchar(20) NOT NULL,
  `order_status` varchar(10) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
   FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE orders
