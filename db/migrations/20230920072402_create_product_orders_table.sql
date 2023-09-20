-- migrate:up
CREATE TABLE `product_orders` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `product_option_id` integer NOT NULL,
  `product_quantity` integer NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  FOREIGN KEY (`product_option_id`) REFERENCES `products` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE product_orders
