var faker = require('faker');
var express = require('express');
var fs = require('file-system');
var axios = require('axios');

var app = express();

//bookshelf
//connect
app.get('/', function(req, res) {
  console.log('yay');
  res.send('done');
});
app.put('/update', function() {
  //FROM transactions
  console.log('testing');
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

app.post('/inv/vendor/update', function() {
  //FROM vendors
  axois.put('/inv/update', {
    //product
    //quantity
    //...
  });
});

app.listen(8010, function() {
  console.log('listening on port 8010');
});
