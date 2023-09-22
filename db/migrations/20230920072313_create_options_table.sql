-- migrate:up
CREATE TABLE `options` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` integer NOT NULL,
  `color_id` integer,
  `quantity` integer,
  `size` float,
  FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE options
