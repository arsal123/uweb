'use strict'

var express = require('express');
var fs = require('fs');

var app = express();
// var path    = require("path");
var colors = require("colors");
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session');
const ShippingContr = require('./app/controllers/shippingController');

var apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://13.58.6.10:3150';
// const serverOne = 'http://localhost:3150';
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
  // var options = null;
  var options = setup(settings.ssl);
  return start(app, options).listen(settings.port, cb);
}


app.all('/ldb/*', function (req, res) {
  // console.log(colors.bgMagenta('GOING TO DB SERVER with '+req.url));
  // since /db is 3 char so truncating first 3 characters 
  // req.url = req.url.substr(4);
  console.log(colors.bgMagenta('DB URL: ' + req.url));

  apiProxy.web(req, res, { target: serverOne });
});

app.get('/item/', function (req, res) {
    //This is just a chrome fix for current version 65 which is eating /ldb/ from the path
    console.log('Agaya chrome murga in item');

    apiProxy.web(req, res, { target: serverOne });
})

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../shared-img/item'));

require('./public/js/userController')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require for passport 
app.use(session({ 
  secret: 'uwebdbappsession',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000}
})); // this should be hidden 
app.use(passport.initialize());
app.use(passport.session()); // creates a persistent login sessions

app.all('/auth', passport.authenticate('local-login'), function(req, res){
  console.log('Authentication at /auth successful');
  res.redirect('/index2.html');  
});

app.use(function (req, res, next) {
  console.log('Middleware Interrupt: ' + res.statusCode);
  if (req.isAuthenticated() || req.url.includes('/shipping-calc') ){
          
          console.log('reqeust is authenticated');
          next();

  } else {
      console.log('web visitor is NOT authenicated');
      if(req.hostname === 'localhost') {
        let finalUrl = 'http://' + req.headers.host + '/login.html';
        console.log('Going to Localhost login: ' + finalUrl);
        res.redirect(finalUrl);

      } else {
        let finalUrl = 'https://www.universalmerchandise.com' + '/login.html';
        console.log('Going to Localhost login: ' + finalUrl);
        res.redirect(finalUrl);
      }
  }
});


// For getting rates for the package from Canada Post
app.get('/shipping-calc', ShippingContr.getRates);

let settings = {
  ssl: {
    active: true,
    key: './public/sslcert/privkey.pem',
    certificate: './public/sslcert/fullchain.pem' 
  },
  port: 3002 //alt it can be port 443 for assl
}

create(settings, app, function(){
  console.log(("Running at Port " + settings.port).white);
})
