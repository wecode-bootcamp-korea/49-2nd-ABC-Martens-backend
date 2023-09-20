-- migrate:up
CREATE TABLE `colors` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `color` varchar(10)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP colors
