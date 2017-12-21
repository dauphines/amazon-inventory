var fs = require('file-system');
var faker = require('faker');

var i = 1;
var productCount = 1000000;
var questionCount = 1500000;

//PRODUCTS
var products = function() {
  var num = Math.round(Math.random() * 5, -1);
  var post = '' + faker.commerce.productName() + ',' + faker.commerce.price() + ',' +
    faker.random.boolean() + ',' + faker.lorem.sentences() + ',' + num + ',' + faker.random.boolean() + ',' +
    faker.lorem.word() + ',' + 'Amazon.com';
  return post;
};

var stream = fs.createWriteStream('products.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
stream.once('open', (fd) => {
  for (var j = 0; j < productCount; j++) {
    stream.write(products() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    // i++;
  }
  stream.end();
  console.log('done');
});
// // COPY products(productName, productPrice, prime, productDes, rating, inStock, soldby, fulfilledBy) FROM '/Users/katherinefickel/hrsf84-thesis/server/generate/products.csv' DELIMITER ',' CSV;

//QUESTIONS

var questions = function() {
  var question = '' + (Math.round(Math.random() * (productCount-1)) + 1) + ',' + faker.lorem.sentence() + ',' + Math.floor(Math.random() * 500);
  return question;
};

var qStream = fs.createWriteStream('questions.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
qStream.once('open', (fd) => {
  for (var j = 0; j < questionCount; j++) {
    qStream.write(questions() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    // i++;
  }
  qStream.end();
  console.log('done');
});

// // COPY questions(productId, questionText, numOfVotes) FROM '/Users/katherinefickel/hrsf84-thesis/server/generate/questions.csv' DELIMITER ',' CSV;

//ANSWERS

var answers = function() {
  var answer = '' + Math.round(Math.random() * (questionCount - 1)) + ',' + faker.lorem.sentence();
  return answer;
};

var aStream = fs.createWriteStream('answers.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
aStream.once('open', (fd) => {
  for (var j = 0; j < 3000000; j++) {
    aStream.write(answers() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    // i++;
  }
  aStream.end();
  console.log('done');
});

// // COPY answers(questionId, answerText) FROM '/Users/katherinefickel/hrsf84-thesis/server/generate/answers.csv' DELIMITER ',' CSV;

// REVIEWS
var reviews = function() {
  var review = '' + faker.name.findName() + ',' + faker.lorem.words() + ',' + faker.date.past().toISOString() 
  + ',' + faker.commerce.product() + ',' + faker.lorem.sentences() + ',' + Math.round(Math.random() * 5, -1) + ',' +
  Math.floor(Math.random() * 500) + ',' + (Math.round(Math.random() * (productCount - 1)) + 1);
  return review;
};

var rStream = fs.createWriteStream('reviews.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
rStream.once('open', (fd) => {
  for (var j = 0; j < 2500000; j++) {
    rStream.write(reviews() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    // i++;
  }
  rStream.end();
  console.log('done');
// });
// // COPY reviews(userName, title, date, styleOfProduct, reviewText, rating, helpfulCount, productId) FROM '/Users/katherinefickel/hrsf84-thesis/server/generate/reviews.csv' DELIMITER ',' CSV;

// PRODUCTCATEGORY JOIN
var prodcate = function() {
  var pc = '' + (Math.round(Math.random() * productCount) + 1) + ',' + (Math.round(Math.random() * 49) + 1);
  return pc;
};

var pcStream = fs.createWriteStream('prodcate.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
pcStream.once('open', (fd) => {
  for (var j = 0; j < 1999950; j++) {
    pcStream.write(prodcate() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    // i++;
  }
  pcStream.end();
  console.log('done');
});
// // COPY productcategory(productId, categoryId) FROM '/Users/katherinefickel/hrsf84-thesis/server/generate/prodcate.csv' DELIMITER ',' CSV;

// // CATEGORY
var categories = function() {
  var category = '' + faker.lorem.word();
  return category;
};

var cStream = fs.createWriteStream('categories.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
cStream.once('open', (fd) => {
  for (var j = 0; j < 50; j++) {
    cStream.write(categories() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    // i++;
  }
  cStream.end();
  console.log('done');
});
// //COPY category(name) FROM '/Users/katherinefickel/hrsf84-thesis/server/generate/categories.csv' DELIMITER ',' CSV;

// STOCK
var stock = function() {
  var stock = '' + i + ',' + (Math.round(Math.random() * (productCount - 1)) + 1);
  return stock;
};

var sStream = fs.createWriteStream('stock.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
sStream.once('open', (fd) => {
  for (var j = 0; j < productCount; j++) {
    sStream.write(stock() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    i++;
  }
  sStream.end();
  console.log('done');
});
// COPY stock(productid, amount) FROM '/Users/katherinefickel/hrsf84-thesis/server/generate/stock.csv' DELIMITER ',' CSV;
