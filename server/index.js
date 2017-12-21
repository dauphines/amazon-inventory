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
    categories: [2, 5, 10],
  })
  //   .then(res => {
  //     console.log('POST RES ', res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
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
  let prodInfo = {};
  db.query(`SELECT * FROM products LEFT OUTER JOIN questions ON products.id = questions.productid LEFT OUTER JOIN 
    answers ON questions.id = answers.questionid WHERE products.id = ${req.url.slice(5)}`)
    //IF THERE ARE NO QUESTIONS/ANSWERS potential problem
    .then(res => {
      prodInfo['prodDetailsQA'] = res.rows;
      db.query(`SELECT * FROM reviews, stock, productcategory, category WHERE reviews.productid = ${req.url.slice(5)} 
        AND stock.productid = ${req.url.slice(5)} AND productcategory.productid = ${req.url.slice(5)} AND category.id = productcategory.categoryid`)
        .then (res => {
          prodInfo['reviews'] = res.rows;
          console.log(prodInfo);
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
  db.query(`INSERT INTO products VALUES (DEFAULT, '${req.body.productname}', '${req.body.productprice}', true, '${req.body.productdes}', 
    0, true, '${req.body.soldby}', 'Amazon.com')`)
    .then(res => {
      db.query(`SELECT id FROM products WHERE productname = '${req.body.productname}' AND productprice = '${req.body.productprice}'`)
        .then(res => {
          let id = res.rows[0].id;
          db.query(`INSERT INTO stock VALUES (DEFAULT, ${id}, ${req.body.quantity})`)
            .then(res => {
              let categories = req.body.categories;
              for (let c = 0; c < categories.length; c++) {
                db.query(`INSERT INTO productcategory VALUES (DEFAULT, ${id}, ${categories[c]})`)
                  .then(res => {
                    // console.log(res);
                  })
                  .catch(err => {
                    console.log('ERR PC ', err);
                  });
              }
            })
            .catch(err => {
              console.log('ERR STOCK ', err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log('ERR PRODs ', err);
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
