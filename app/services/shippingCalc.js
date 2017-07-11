'use strict'

const CanadaPost = require('node-canadapost-international')('cf19548c31f64ac5', '603482c494731574515e86', '0008139387');
const SHIPPING_CALC_SERV = 'shippingCalcServ: ';
CanadaPost.setOriginPostalCode('H9B1L5');

exports.getRates = function (weight, destinationPostalCode, processResp) {
  
  console.log(SHIPPING_CALC_SERV + parseFloat(weight) + destinationPostalCode);

  CanadaPost.getRates({
    weight: parseFloat(weight), //kg
    destinationPostalCode: destinationPostalCode
  }, function (err, rates) {
    // console.log(err, rates);
    processResp(err, rates);
  });
}
