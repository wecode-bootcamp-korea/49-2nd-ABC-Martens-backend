-- migrate:up
CREATE TABLE `product_carts` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `product_option_id` integer,
  `quantity` integer NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `is_deleted` tinyint,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`product_option_id`) REFERENCES `options` (`id`),
  UNIQUE KEY `user_product_option` (`user_id`, `product_option_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE product_carts