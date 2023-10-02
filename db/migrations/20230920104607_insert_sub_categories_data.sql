-- migrate:up
INSERT INTO sub_categories(`category_name`, `parent_id`)
VALUES("여성_부츠", 1),
("여성_슈즈", 1),
("여성_샌들", 1),
("남성_부츠", 2),
("남성_슈즈", 2),
("남성_샌들", 2),
("키즈_토들러", 3),
("키즈_주니어", 3),
("SALE_여성", 4),
("SALE_남성", 4),
("SALE_슈즈", 4),
("SALE_부츠", 4),
("SALE_샌들", 4),
("SALE_액세서리", 4);

-- migrate:down