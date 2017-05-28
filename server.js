var express = require("express");
var app     = express();
// var path    = require("path");
var colors = require("colors");
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

var apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3150';

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/prod-imgs'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  // console.log('TEST-PATH: '+__dirname+'/public/index.html')  
  // res.sendFile(path.join(__dirname + '/public/index.html'));
  res.sendFile('index.html');
  //__dirname : It will resolve to your project folder.
});

app.all('/db/*', function(req, res){
  // console.log(colors.bgMagenta('GOING TO DB SERVER with '+req.url));
// since /db is 3 char so truncating first 3 characters 
  req.url = req.url.substr(3);
  console.log(colors.bgMagenta('Final URL: '+req.url));
  
  apiProxy.web(req, res, {target: serverOne});
});

// app.get('/about',function(req,res){
//   res.sendFile(path.join(__dirname+'/about.html'));
// });

// app.get('/sitemap',function(req,res){
//   res.sendFile(path.join(__dirname+'/sitemap.html'));
// });

app.listen(3000);

console.log("Running at Port 3000".white);