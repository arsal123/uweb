(function (angular) {
    'use strict'
    function contactUsController($log) {
        const logPrefix = 'THANKYOU_CONTROLLER: ';
        let ctrl = this;
    }

    angular.module('jewel').component('thankyou', {
        templateUrl: 'components/thankyou/thankyou.html',
        controller: contactUsController
    })
})(window.angular)
