'use strict'

var express = require('express');
var fs = require('fs');

var app = express();
// var path    = require("path");
var colors = require("colors");
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
const ShippingContr = require('./app/controllers/shippingController');

var apiProxy = httpProxy.createProxyServer();
// const serverOne = 'http://13.58.6.10:3150';
const serverOne = 'http://localhost:3150';
let setup = function (ssl) {
  if (ssl && ssl.active) {
    return {
      key: fs.readFileSync(ssl.key),
      cert: fs.readFileSync(ssl.certificate)
    };
  }
}
let start = function start(app, options) {
  if (options)
    return require('https').createServer(options, app);

  return require('http').createServer(app);
}

let create = function (settings, app, cb) {
  var options = setup(settings.ssl);
  return start(app, options).listen(settings.port, cb);
}

app.all('/db/*', function (req, res) {
  // console.log(colors.bgMagenta('GOING TO DB SERVER with '+req.url));
  // since /db is 3 char so truncating first 3 characters 
  req.url = req.url.substr(3);
  console.log(colors.bgMagenta('DB URL: ' + req.url));

  apiProxy.web(req, res, { target: serverOne });
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/prod-imgs'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  // console.log('TEST-PATH: '+__dirname+'/public/index.html')  
  // res.sendFile(path.join(__dirname + '/public/index.html'));
  res.sendFile('index.html');
  //__dirname : It will resolve to your project folder.
});

app.get('/shipping-calc', ShippingContr.getRates);

// app.listen(3000);
let settings = {
  ssl: {
    active: false,
    key: '',
    certificate: '' 
  },
  port: 3000 //alt it can be port 443 for assl
}

create(settings, app, function(){
  console.log(("Running at Port " + settings.port).white);
})
