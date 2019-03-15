(function (angular) {
    'use strict'

    function contactUsController() {
        const logPrefix = 'CONTACTUS_CONTROLLER: ';

        let ctrl = this;
    }

    angular.module('jewel').component('contactUs', {
        templateUrl: 'components/contactUs/contactUs.html',
        controller: contactUsController
    })
})(window.angular)
