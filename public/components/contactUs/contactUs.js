(function (angular) {
    'use strict'
    function contactUsController($http, $log, prMainService) {
        const logPrefix = 'CONTACTUS_CONTROLLER: ';

        let ctrl = this;

        ctrl.sendEmail = () => {
            return $http.post(prMainService.BASE_URL + '/sendEmail')
                .then(function (res) {
                        $log.info('Got success response from sendEmail');
                        return res;
                    },
                    function (err) {
                        $log.error(logPrefix + 'error in calling sendEmail REST call');
                    });

        }



    }

    angular.module('jewel').component('contactUs', {
        templateUrl: 'components/contactUs/contactUs.html',
        controller: contactUsController
    })
})(window.angular)
