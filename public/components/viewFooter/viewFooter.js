(function (angular) {
    'use strict'

    function viewFooterController($scope, $element, $attrs) {
        const prefix = 'viewFooterController';
        let ctrl = this;
        ctrl.msg = $attrs.msg;

    }
    angular.module('jewel').component('viewFooter', {
        templateUrl: 'components/viewFooter/viewFooter.html',
        controller: viewFooterController,
        bindings: {
            msg: '@'
        }

    })
})(window.angular)