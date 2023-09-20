-- migrate:up
CREATE TABLE `categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `category_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE categories;