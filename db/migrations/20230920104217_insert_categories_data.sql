-- migrate:up
INSERT INTO categories(`category_name`)
VALUES("여성"),
("남성"),
("키즈"),
("SALE");

-- migrate:down