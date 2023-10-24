-- migrate:up
CREATE TABLE `products` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_id` integer NOT NULL,
  `sub_category_id` integer NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `price` decimal NOT NULL,
  `original_price` decimal NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `products_description` text,
  FOREIGN KEY(`category_id`) REFERENCES `categories` (`id`),
  FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE products

