-- migrate:up
CREATE TABLE `sub_categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `category_name` varchar(30) NOT NULL,
  `parent_id` integer,
  FOREIGN KEY(parent_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE sub_categories;
