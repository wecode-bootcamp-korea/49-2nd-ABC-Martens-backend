-- migrate:up
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(50) UNIQUE NOT NULL,
  `password` varchar(50) NOT NULL,
  `nickname` varchar(20),
  `phone_number` varchar(20),
  `profile_image` varchar(100),
  `provider` varchar(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE users
