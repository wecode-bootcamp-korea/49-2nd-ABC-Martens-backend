-- migrate:up
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(50) UNIQUE NOT NULL,
  `birth_date` varchar(8) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `is_checked_marketing` tinyint,
  `password` varchar(200) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `profile_image` varchar(100),
  `provider` varchar(20),
  `uid` varchar(100) NOT NULL UNIQUE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE users
