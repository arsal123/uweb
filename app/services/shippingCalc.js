'use strict'


// Dev
// const CanadaPost = require('node-canadapost-international')('cf19548c31f64ac5',
//  '603482c494731574515e86', '0008139387');
// Prod
process.env.NODE_ENV = 'production';

const CanadaPost = require('node-canadapost-international')('db34a8601e0c801c',
  'd13d793088c9363d54a676', '0008139387');

const SHIPPING_CALC_SERV = 'shippingCalcServ: ';
CanadaPost.setOriginPostalCode('H9B1L5');

/**
 * Although we have countryCode param, we are not doing anything with it right now
 */
exports.getRates = function (weight, destinationPostalCode, destinationCountryCode,
  processResp) {

  console.log(SHIPPING_CALC_SERV + parseFloat(weight) + ', ' + destinationPostalCode);

  let reqObj = {
    weight: parseFloat(weight), //kg
  }
  // Select US or Canada
  if (destinationPostalCode.length === 5) {
    // Its US
    reqObj.destinationZipCode = destinationPostalCode;

  } else if (destinationPostalCode.length === 6) {
    // Country Canada
    reqObj.destinationPostalCode = destinationPostalCode;
  }

  CanadaPost.getRates(reqObj, function (err, rates) {
    console.log(err, rates);
    processResp(err, rates);
  });
}
