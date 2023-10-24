-- migrate:up
CREATE TABLE `payments` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `order_id` integer NOT NULL,
  `amount` float NOT NULL,
  `method_id` integer,
  `status` varchar(10) NOT NULL,
  `created_at` datetime,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  FOREIGN KEY (`method_id`) REFERENCES `payment_method` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE payments
