(function (angular) {
    function cartController($scope, $http, $log, $state, $filter, prMainCartService, prMainService) {
        const logPrefix = 'CART_CONTROLLER: ';

        let ctrl = this;
        let paypalRender = function () {
            paypal.Button.render({

                // env: 'sandbox', // Or 'sandbox' 'production',
                env: 'production', // Or 'sandbox' 'production',

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create
                client: {
                    sandbox: 'Ac0jN0nTDSLOrFp7L12FgcazcVLh4OJxdgg56kLuLu15imqwH_HivAoTJtGEC8S-SnXtuvbo3_A4Rk6a',
                    production: 'ASqd9sOZJLboO-kJW1d8oOjnaGB3s19LkfZoDRKOaVN91D8aCtFQGo5iw3m2MwDVA5J1Qhtl-tk6H3OY'
                },

                // Show the buyer a 'Pay Now' button in the checkout flow
                commit: true,

                // payment() is called when the button is clicked
                payment: function (data, actions) {

                    const cancelUrl = window.location.href;
                    // This url is needed for paypal account after having successful payments
                    const successUrl = window.location.origin + '/#!/paySuccess';

                    console.log(logPrefix + 'paypal payment function: ' + ctrl.totalCost);
                    console.log(logPrefix + 'paypal payment function: cancel URL: ' + cancelUrl + ', SuccessUrl: ' + successUrl);

                    // Make a call to the REST api to create the payment
                    return actions.payment.create({
                        transactions: [
                            {
                                amount: { total: ctrl.totalCost, currency: 'CAD' }
                                // amount: { total: '0.01', currency: 'CAD' }
                            }
                        ],
                        "redirect_urls": {
                            "return_url": successUrl,
                            "cancel_url": cancelUrl
                        }
                    });
                },

                // onAuthorize() is called when the buyer approves the payment
                onAuthorize: function (data, actions) {

                    console.log(logPrefix + 'OnAuthorize: ' + JSON.stringify(data));
                    console.info(logPrefix + 'authorizeSave Confirmation: ' + prMainService.saveAuthorize(data));

                    // Make a call to the REST api to execute the payment
                    return actions.payment.execute().then(function (finalThing) {
                        console.log(logPrefix + 'Payment: ' + JSON.stringify(finalThing));
                        // window.alert('Payment Complete!');

                        // Save the response
                        prMainService.saveThing(finalThing).then(function (id) {
                            console.log(logPrefix + 'Payment Confirmation ID: ' + id);

                            // Empty cart
                            $scope.$parent.vm.emptyCart();

                            $state.go('paySuccess');
                        });

                        // Add confirmation number to output

                    }, function (err) {
                        console.log(logPrefix + 'Payment execute err: ' + err);
                    });
                }

            }, '#paypal-button-container');
        }

        /** 
         * calcTottalCost function
         * It is using $filter to filter the numbers
         * */
        let calcTotalCost = (items, shippingOption) => {
            $log.debug(logPrefix + 'calcTotalCost START')
            let cost = 0,
                currItem;

            //    for (let i = 0; i < $scope.cart.items; i++) {
            for (currItem in items) {
                cost += (items[currItem].price * items[currItem].quantity);
            }

            if(shippingOption){
                // Calculate sales tax
                totalSalesTax = 13/100 * cost;

                cost += (shippingOption.price.total + totalSalesTax);

                ctrl.totalSalesTax = $filter('number')(totalSalesTax, 2);
                ctrl.totalCost = $filter('number')(cost, 2);
                $log.debug(logPrefix + 'Calc total cost: ' + ctrl.totalCost);
    
            }
        }

        $scope.vm = {}
        $scope.cart = {}
        $scope.cart.items = prMainCartService.getItems();
        ctrl.goShipping = () => {
            // Check if shopping cart not empty
            if (prMainCartService.getItems().length > 0) {
                // go to shipping page
                $state.go('shipping');
            }
        }
        ctrl.updateQuantity = () => {
            $log.debug(logPrefix + 'updateQuantity(): ');
            $scope.$parent.updateNum(prMainCartService.getItems());
            if (prMainCartService.getShippingOption()) {
                calcTotalCost($scope.cart.items, prMainCartService.getShippingOption());
            }
        }

        ctrl.removeItem = (item) => {
            $log.debug(logPrefix + 'removeItem(): ' + item);
            prMainCartService.removeItem(item);
            $scope.$parent.updateNum(prMainCartService.getItems());
        }

        $scope.vm.checkout = function () {
            $log.debug(logPrefix + 'Starting of checkout method. Making an acccess token call');

            //Commenting below request as it is no longer needed. I have tried with prod url

            // $http({
            //     method: 'POST',
            //     url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Accept-Language': 'en_US',
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //         'authorization': 'Basic ' + btoa('Ac0jN0nTDSLOrFp7L12FgcazcVLh4OJxdgg56kLuLu15imqwH_HivAoTJtGEC8S-SnXtuvbo3_A4Rk6a:EKJ-xIY--cpPnvlWLEkCOv1fWbBultorxsGuBIn9IQFQlievzGMCKGHvfXi8jbEErDArQ9flGkDFP-uS'),
            //     },
            //     data: $.param({
            //         grant_type: 'client_credentials'
            //     })
            // }).then(function (data) {
            paypalRender();
            // }, function () {
            //     console.error('error in getting token');
            // });

        }

        ctrl.shippingOption = prMainCartService.getShippingOption();
        // if (ctrl.shippingOption) {
        //     $log.debug(ctrl.shippingOption.price.total);
            // Calculate total cost
            calcTotalCost($scope.cart.items, ctrl.shippingOption);
        // }

    }

    angular.module('jewel').component('cart', {
        templateUrl: 'components/cart/cart.html',
        controller: cartController
    })
})(window.angular)