var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var path = require('path');

require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT;
var conString = process.env.DB_CONSTRING;

app.get('/launches', function (req, res) {

  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM launches', function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.json(result.rows)
      //output: 1
    });
  });

});

app.post('/launches', function (req, res) {

  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO launches (launch_date, ship) VALUES (NOW(), $1)', [req.body.ship],function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.json(result.rows)
      //output: 1
    });
  });

});

//boot up the server
app.listen(port);
console.log('The server is listening to ' + port);
