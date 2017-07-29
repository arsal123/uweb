'use strict'
const shipping = require('../services/shippingCalc');
const SHIPPING_CONTR = 'ShippingController: ';

exports.getRates = function (req, res) {
    
    const weight = req.query.weight
    ,     postalCode = req.query.dcode,
          countryCode = req.query.country; //Country code is optional to pass

    console.log(SHIPPING_CONTR + 'Weight: ' + weight + ', PostalCode: ' + postalCode);
    
    if(!weight || !postalCode){
        res.status(400).send({
            error: 'Invalid query params'
        });
    }

    shipping.getRates(weight, postalCode, countryCode, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
    console.log(SHIPPING_CONTR + 'after call');
}