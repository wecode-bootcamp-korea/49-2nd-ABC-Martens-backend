-- migrate:up
CREATE TABLE `product_images` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` integer NOT NULL,
  `detail_image_url` varchar(100),
  `thumbnail_image_url` varchar(100),
  `is_thumbnail` tinyint,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE product_images
