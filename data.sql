INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("어린왕자들", "종이책", 0, "어리다..", "많이 어리다..", "김어림", 100, "목차입니다.", 20000, "2019-01-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("신데렐라들", "종이책", 1, "유리구두..", "투명한 유리구두..", "김구두", 100, "목차입니다.", 20000, "2023-12-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("백설공주들", "종이책", 2, "사과..", "빨간 사과..", "김사과", 100, "목차입니다.", 20000, "2023-11-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("흥부와 놀부들", "종이책", 3, "제비..", "까만 제비..", "김제비", 100, "목차입니다.", 20000, "2023-12-08");


SELECT * FROM books LEFT JOIN category ON books.category_id = category.id;

SELECT * FROM books 

INSERT INTO Bookshop.likes VALUES (1,1);
INSERT INTO Bookshop.likes VALUES (1,2);
INSERT INTO Bookshop.likes VALUES (1,3);
INSERT INTO Bookshop.likes VALUES (3,1);
INSERT INTO Bookshop.likes VALUES (4,4);
INSERT INTO Bookshop.likes VALUES (2,1);
INSERT INTO Bookshop.likes VALUES (2,3);
INSERT INTO Bookshop.likes VALUES (2,5);


DELETE FROM Bookshop.likes WHERE user_id = 1 AND liked_book_id = 3;

SELECT count(*) FROM 테이블명;
SELECT count(*) FROM Bookshop.likes WHERE liked_book_id = 2 ; 


INSERT INTO Bookshop.cartItems (book_id, quantity, user_id) VALUES (1, 1, 1);

SELECT cartItems.id, book_id, title, quantity, price FROM Bookshop.cartItems LEFT JOIN Bookshop.books ON books.id = cartItems.book_id WHERE cartItems.user_id = 1;


INSERT INTO Bookshop.delivery (address,receiver, contact) VALUE ('서울시 광진구', '홍지나', '010-1234-5678');

INSERT INTO Bookshop.orders (book_title, total_quantity, total_price, user_id, delivery_id) 
VALUES ("어린왕자들", 3, 60000, 1, 1);


INSERT INTO orderedBook (order_id, book_id, quantity) 
VALUES (1, 1, 1);

INSERT INTO orderedBook (order_id, book_id, quantity) 
VALUES (1, 3, 2);


SELECT max(id) FROM Bookshop.orderedBook;