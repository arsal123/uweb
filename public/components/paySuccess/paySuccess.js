(function (angular) {
    'use strict'

    function paySuccessController($scope, $http, $state, $log, prMainService, prMainCartService, prMainShippingOptionsService) {
        const logPrefix = 'PAYSUCCESS_CONTR: ';
        // const LOCAL_SERVICE = 'http://localhost:3000/';
        let ctrl = this;
        $log.debug(logPrefix + 'inside')

        // Get confirmation number from paypal

        // Get other details from diff places

    }
    angular.module('jewel').component('paySuccess', {
        templateUrl: 'components/paySuccess/paySuccess.html',
        controller: paySuccessController

    })
})(window.angular)