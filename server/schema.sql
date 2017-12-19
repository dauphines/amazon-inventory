--CREATE DATABASE amazon;

--USE amazon;

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  productName VARCHAR(100),
  productPrice MONEY,
  prime BOOLEAN,
  productDes VARCHAR(500),
  rating DECIMAL,
  inStock BOOLEAN,
  soldby VARCHAR(100),
  fulfilledBy VARCHAR(100)
);

CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  productId INTEGER references products(id),
  questionText VARCHAR(500),
  numOfVotes INTEGER
);

CREATE TABLE answers (
  id INTEGER PRIMARY KEY,
  questionId INTEGER references questions(id),
  answerText VARCHAR(1000)
);

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  userName VARCHAR(50),
  title VARCHAR(100),
  date timestamp,
  styleOfProduct VARCHAR(100),
  reviewText VARCHAR(1000),
  rating DECIMAL,
  helpfulCount INTEGER,
  productId INTEGER references products(id)
);

CREATE TABLE productCategory (
  id INTEGER PRIMARY KEY,
  productId INTEGER references products(id),
  categoryId INTEGER references category(id)
);

CREATE TABLE category (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50)
);
