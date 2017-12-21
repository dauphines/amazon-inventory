var faker = require('faker');
var express = require('express');
var fs = require('file-system');
var axios = require('axios');
var bodyParser = require('body-parser');
var db = require('./app.js');
var bs = require('./bookshelf.js');

var app = express();

//bookshelf
//connect
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  // bs.products.query().where({id: 1}).then(function(res) {
  //   console.log(res);
  // });
  
  // axios.put('http://127.0.0.1:8010/inv/vendor/update', {
  //   productid: 2,
  //   quantity: 6,
  // })
  //   .then(res => {
  //   })
  //   .catch(err => {
  //     console.log('PUT BAD');
  //   });
  // axios.get('http://127.0.0.1:8010/inv/2')
  //   .then(res => {
  //   })
  //   .catch(err => {
  //     console.log('GET itemid BAD');
  //   });
  // axios.get('http://127.0.0.1:8010/inv/2')
  //   .then(res => {
  //   })
  //   .catch(err => {
  //     console.log('PUT BAD');
  //   });
  axios.post('http://127.0.0.1:8010/inv/vendor/newItem', {
    productname: 'giraffe socks',
    productprice: '$15.00',
    prime: true,
    productdes: 'adding a new item',
    stock: true,
    soldby: 'me.inc',
    quantity: 500,
  })
    .then(res => {
      console.log('POST RES ', res);
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/update', function(req, res) {
  //FROM transactions
  if (!req.body) {
    return res.sendStatus(400);
  }
  let products = req.body.products;
  for (let j = 0; j < products.length; j++) {
    db.query(`UPDATE stock SET amount = amount - ${products[i].quantity} WHERE productid = ${products[i].productid}`);
  } 

});

app.put('/undo', function(req, res) {
  let products = req.body.products;
  for (let i = 0; i < products.length; i++) {
    db.query(`UPDATE stock SET amount = amount + ${products[i].quantity} WHERE productid = ${products[i].productid}`);
  }

});

app.get('/inv/:itemid', function(req, res) {
  //FROM client
  db.query(`SELECT * FROM products, questions, answers WHERE products.id = questions.productid AND questions.id = answers.questionid AND products.id = ${req.url.slice(5)}`)
    .then(res => {
      let prodDetails = res.rows;
      db.query(`SELECT * FROM reviews, stock, productcategory WHERE reviews.productid = ${req.url.slice(5)} 
        AND stock.productid = ${req.url.slice(5)} AND productcategory.productid = ${req.url.slice(5)}`)
        .then (res => {
          prodDetails = prodDetails.concat(res.rows);
          res.send(prodDetails);
        });
    })
    .catch(err => {
      console.log('err ', err);
    });
  res.send('');
});

app.post('/inv/vendor/newItem', function(req, res) {
  //FROM vendors
  //insert products to include the name, incremented id, product price, prime, productdes, rating, instock true, soldby, and fulfilled by
  //
  db.query(`INSERT INTO products VALUES (DEFAULT, '${req.body.productname}', '${req.body.productprice}', true, '${req.body.productdes}', 
    0, true, '${req.body.soldby}', 'Amazon.com')`)
    .then(res => {
      db.query(`SELECT id FROM products WHERE productname = '${req.body.productname}' AND productprice = '${req.body.productprice}'`)
        .then(res => {
          db.query(`INSERT INTO stock VALUES (DEFAULT, ${res.rows[0].id}, ${req.body.quantity})`)
            .then(res => {
              // console.log(res);
            })
            .catch(err => {
              console.log('ERR ', err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log('ERR ', err);
    });
});

app.put('/inv/vendor/update', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  db.query(`UPDATE stock SET amount = amount + ${req.body.quantity} WHERE productid = ${req.body.productid}`);

  res.send('DONE');
});

app.listen(8010, function() {
  console.log('listening on port 8010');
});
