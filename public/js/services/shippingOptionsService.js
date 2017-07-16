(function (angular) {
    'use strict'

    angular.module('jewel')
    .service('prMainShippingOptionsService', ['$http', '$log', 'prMainService', function ($http, $log, prMainService) {
            let logPrefix = 'prMainShippingOptionsService: ';
            var shippingOptions;
            console.log(logPrefix + 'Coming In')

            return {
                calculateShipping: function (weightInGrams, postalCode) {
                    console.info(logPrefix + 'Calculating shipping weightInGrams: '+weightInGrams
                    +'postalCode: '+postalCode);

                    // Convert weight to kg
                    let weightInKg = weightInGrams / 1000;

                    // Put call here
                    return $http.get(prMainService.BASE_URL + '/shipping-calc?weight=' + weightInKg + '&dcode=' + postalCode)
                        .then(function (res) {
                            // $log.info(JSON.stringify(res.data));
                            shippingOptions = res.data;
                            return shippingOptions;
                        },
                        function (err) {
                            $log.error(logPrefix + 'error in calling Shipping backend service');
                        });

                },
                getShippingOptions: () => {
                    return shippingOptions;
                }

            }

            // ctrl.addShipping = function () {
            //     console.info('Selected option: ' + ctrl.selOption);
            //     if (ctrl.selOption) {
            //         prMainCartService.setShippingOption(JSON.parse(ctrl.selOption));
            //         $state.go('cart');
            //     }
            // }


        }])
})(window.angular)