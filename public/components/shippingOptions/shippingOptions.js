(function (angular) {
    'use strict'

    function shippingOptionsController($scope, $http, $state, $log, prMainService, prMainCartService, prMainShippingOptionsService) {
        const SHIPPING_CONTROLLER = 'SHIPPING_CONTROLLER: ';
        // const LOCAL_SERVICE = 'http://localhost:3000/';
        let ctrl = this;

        ctrl.options = prMainShippingOptionsService.getShippingOptions();
        if (!ctrl.options || ctrl.options.length < 1) {
            ctrl.errMsg = "No Shipping Options found. Please contact our customer serice at 514 804 3726"
        }

        ctrl.addShipping = function () {
            console.info('Selected option: ' + ctrl.selOption);
            if (ctrl.selOption) {
                prMainCartService.setShippingOption(JSON.parse(ctrl.selOption));
                $state.go('cart');
            } else {
                ctrl.errMsg = "Please select a shipping option or call our customer service";
            }
        }

        // ctrl.testGetThing = function(){
        //     console.log(SHIPPING_CONTROLLER + 'inside get thing')
        //     prMainService.getThing();
        // }

        // ctrl.testPayment = function () {
            // const PAYMENT_TEST = 'PAYMENT-TEST: ';
            // console.debug(PAYMENT_TEST + 'inside');

            // const payObj = {
            //     "id": "PAY-78J98036GT946311YLGBVY4I",
            //     "intent": "sale",
            //     "state": "approved",
            //     "cart": "37N342791W405120Y",
            //     "create_time": "2017-08-03T17:26:38Z",
            //     "payer": {
            //         "payment_method": "paypal",
            //         "status": "VERIFIED",
            //         "payer_info": {
            //             "email": "robotics1@gmail.com",
            //             "first_name": "Muhammad",
            //             "middle_name": "Muhammad",
            //             "last_name": "Siddiqui",
            //             "payer_id": "SEZ523VRM5HT4",
            //             "country_code": "US",
            //             "shipping_address": {
            //                 "recipient_name": "Muhammad A Siddiqui",
            //                 "line1": "4205 Ivanhoe Dr",
            //                 "city": "Monroeville",
            //                 "state": "PA",
            //                 "postal_code": "15146-2680",
            //                 "country_code": "US"
            //             }
            //         }
            //     },
            //     "transactions": [
            //         {
            //             "amount": {
            //                 "total": "0.01",
            //                 "currency": "CAD",
            //                 "details": {}
            //             },
            //             "item_list": {},
            //             "related_resources": [
            //                 {
            //                     "sale": {
            //                         "id": "1EP27070DW912684L",
            //                         "state": "completed",
            //                         "payment_mode": "INSTANT_TRANSFER",
            //                         "protection_eligibility": "ELIGIBLE",
            //                         "parent_payment": "PAY-78J98036GT946311YLGBVY4I",
            //                         "amount": {
            //                             "total": "0.01",
            //                             "currency": "CAD",
            //                             "details": {}
            //                         }
            //                     }
            //                 }
            //             ]
            //         }
            //     ]
            // }
        //     prMainService.saveThing(payObj);
        // }

    }
    angular.module('jewel').component('shippingOptions', {
        templateUrl: 'components/shippingOptions/shippingOptions.html',
        controller: shippingOptionsController

    })
})(window.angular)