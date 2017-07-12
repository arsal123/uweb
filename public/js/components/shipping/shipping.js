(function (angular) {
    'use strict'

    function shippingController($scope, $http, $state, $log, cartService) {
        const SHIPPING_CONTROLLER = 'SHIPPING_CONTROLLER: ';
        const LOCAL_SERVICE = 'http://localhost:3000/';
        let cntrl = this;

        cntrl.calculateShipping = function () {
            console.info(SHIPPING_CONTROLLER + 'Calculating shipping');
            // Put logic here for now
            // Weight will be entered in grams - need to convert to Kg at backend later
            $http.get(LOCAL_SERVICE + 'shipping-calc?weight=1&dcode=H9B1L5')
                .then(function (res) {
                    $log.info(JSON.stringify(res.data));       
                },
                function (err) {
                    $log.error(SHIPPING_CONTROLLER + 'error in calling Shipping backend service');
                });

            console.info(SHIPPING_CONTROLLER + 'End of shipping calc ');
            $state.go('shippingOptions');
        }
    }
        angular.module('jewel').component('shipping', {
            templateUrl: 'shipping.html',
            controller: shippingController

        })
    })(window.angular)