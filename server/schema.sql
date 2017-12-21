--CREATE DATABASE amazon;

--USE amazon;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
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
  id SERIAL PRIMARY KEY,
  productId INTEGER references products(id),
  questionText VARCHAR(500),
  numOfVotes INTEGER
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  questionId INTEGER references questions(id),
  answerText VARCHAR(1000)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
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
  id SERIAL PRIMARY KEY,
  productId INTEGER references products(id),
  categoryId INTEGER references category(id)
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE stock (
  id SERIAL PRIMARY KEY,
  productId INTEGER references products(id),
  amount INTEGER
);
