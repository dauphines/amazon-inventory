var faker = require('faker');
var fs = require('fs');

var i = 1;
var productCount = 10000;

var products = function() {
  return `${i}, ${Math.round(Math.random() * 200000)}, ${faker.commerce.productName()}, ${faker.commerce.price()}, ${faker.lorem.sentences()}, ${faker.lorem.word()}`;
};

var stream = fs.createWriteStream('artproducts.csv', {'flags': 'a', 'encoding': null, 'mode': 0o666});
console.log('start');
stream.once('open', (fd) => {
  for (var j = 0; j < productCount; j++) {
    stream.write(products() + '\n');
    if (j % 100000 === 0) {
      console.log(j);
    }
    i++;
  }
  stream.end();
  console.log('done');
});