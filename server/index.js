var faker = require('faker');
var express = require('express');
var fs = require('file-system');
var axios = require('axios');
var bodyParser = require('body-parser');
var db = require('client');

var app = express();

//bookshelf
//connect
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log('yay');
  res.send('done');
});
app.put('/update', function(req, res) {
  //FROM transactions
  if (!req.body) {
    return res.sendStatus(400);
  } 

});

app.get('/inv/:itemid', function() {
  //FROM client
});

app.put('/inv/vendor/newItem', function() {
  //FROM vendors
  axios.post('/inv/newItem', {
    //product:
    //quantity
    //price
    //...
  });
});

app.post('/inv/vendor/update', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  db.query(`UPDATE stock SET amount = amount + ${req.quantity} WHERE productid = ${req.productid}`, (err, res) => {
    if (res) {
      axois.put('/inv/update', {
        productid: req.productid,
        quantity: req.quantity,
      });
    }
  });
});

app.listen(8010, function() {
  console.log('listening on port 8010');
});
