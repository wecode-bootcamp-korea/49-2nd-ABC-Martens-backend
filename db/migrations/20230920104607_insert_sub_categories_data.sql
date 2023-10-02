-- migrate:up
INSERT INTO sub_categories(`category_name`, `parent_id`)
VALUES("부츠", 1),
("슈즈", 1),
("샌들", 1),
("부츠", 2),
("슈즈", 2),
("샌들", 2),
("토들러", 3),
("주니어", 3),
("여성", 4),
("남성", 4),
("슈즈", 4),
("부츠", 4),
("샌들", 4),
("액세서리", 4);

-- migrate:down