(function (angular) {
    'use strict'

    function shippingOptionsController($scope, $http, $state, $log, prMainCartService) {
        const SHIPPING_CONTROLLER = 'SHIPPING_CONTROLLER: ';
        const LOCAL_SERVICE = 'http://localhost:3000/';
        let ctrl = this;

        ctrl.calculateShipping = function () {
            console.info(SHIPPING_CONTROLLER + 'Calculating shipping');

            // Put logic here for now
            $http.get(LOCAL_SERVICE + 'shipping-calc?weight=1&dcode=H9B1L5')
                .then(function (res) {
                    $log.info(JSON.stringify(res.data));  
                    ctrl.options = res.data;     
                },
                function (err) {
                    $log.error(SHIPPING_CONTROLLER + 'error in calling Shipping backend service');
                });

            console.info(SHIPPING_CONTROLLER + 'Runing through it. ');
            
        }

        ctrl.addShipping = function(){
            console.info('Selected option: '+ctrl.selOption);
            if(ctrl.selOption){
                prMainCartService.setShippingOption(JSON.parse(ctrl.selOption));
                $state.go('cart');
            }
            }

        ctrl.calculateShipping();

    }
        angular.module('jewel').component('shippingOptions', {
            templateUrl: 'components/shippingOptions/shippingOptions.html',
            controller: shippingOptionsController

        })
    })(window.angular)