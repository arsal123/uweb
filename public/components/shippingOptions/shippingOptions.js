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
            }else{
                ctrl.errMsg = "Please select a shipping option or call our customer service";
            }
        }

    }
    angular.module('jewel').component('shippingOptions', {
        templateUrl: 'components/shippingOptions/shippingOptions.html',
        controller: shippingOptionsController

    })
})(window.angular)