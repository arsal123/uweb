(function (angular) {
    function cartController($scope, $http, $log, $state, prMainCartService) {
        const logPrefix = 'CART_CONTROLLER: ';

        let ctrl = this;
        let paypalRender = function () {
            paypal.Button.render({

                env: 'sandbox', // Or 'sandbox' 'production',

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create
                client: {
                    sandbox: 'Ac0jN0nTDSLOrFp7L12FgcazcVLh4OJxdgg56kLuLu15imqwH_HivAoTJtGEC8S-SnXtuvbo3_A4Rk6a',
                    // sandbox: 'Ac0jN0nTDSLOrFp7L12FgcazcVLh4OJxdgg56kLuLu15imqwH_HivAoTJtGEC8S-SnXtuvbo3_A4Rk6a:EKJ-xIY--cpPnvlWLEkCOv1fWbBultorxsGuBIn9IQFQlievzGMCKGHvfXi8jbEErDArQ9flGkDFP-uS',
                    production: 'ASqd9sOZJLboO-kJW1d8oOjnaGB3s19LkfZoDRKOaVN91D8aCtFQGo5iw3m2MwDVA5J1Qhtl-tk6H3OY'
                },

                // Show the buyer a 'Pay Now' button in the checkout flow
                commit: true,

                // payment() is called when the button is clicked
                payment: function (data, actions) {

                    // Make a call to the REST api to create the payment
                    return actions.payment.create({
                        transactions: [
                            {
                                amount: { total: '0.01', currency: 'USD' }
                            }
                        ],

                        "redirect_urls": {
                            "return_url": "http://www.amazon.com",
                            "cancel_url": "http://www.hawaii.com"
                        }
                    });
                },

                // onAuthorize() is called when the buyer approves the payment
                onAuthorize: function (data, actions) {

                    // Make a call to the REST api to execute the payment
                    return actions.payment.execute().then(function () {
                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');
        }
        
        let calcTotalCost = (items, shippingOption) => {
            $log.debug(logPrefix + 'calcTotalCost START')
            let cost = 0,
                currItem;

            //    for (let i = 0; i < $scope.cart.items; i++) {
            for (currItem in items) {
                cost += (items[currItem].price * items[currItem].quantity);
            }
            cost += shippingOption.price.total;
            ctrl.totalCost = cost;
            $log.debug(logPrefix + 'Calc total cost: ' + ctrl.totalCost);
        }

        $scope.vm = {}
        $scope.cart = {}
        $scope.cart.items = prMainCartService.getItems();
        // $scope.cart.items = prMainCartService.items;
        ctrl.goShipping = () => {
            // Check if shopping cart not empty
            if (prMainCartService.getItems().length > 0) {
                // go to shipping page
                $state.go('shipping');
            }
        }

        ctrl.shippingOption = prMainCartService.getShippingOption();
        if (ctrl.shippingOption) {
            $log.debug(ctrl.shippingOption.price.total);
            // Calculate total cost
            calcTotalCost($scope.cart.items, ctrl.shippingOption);
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

            $http({
                method: 'POST',
                url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'en_US',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': 'Basic ' + btoa('Ac0jN0nTDSLOrFp7L12FgcazcVLh4OJxdgg56kLuLu15imqwH_HivAoTJtGEC8S-SnXtuvbo3_A4Rk6a:EKJ-xIY--cpPnvlWLEkCOv1fWbBultorxsGuBIn9IQFQlievzGMCKGHvfXi8jbEErDArQ9flGkDFP-uS'),
                },
                data: $.param({
                    grant_type: 'client_credentials'
                })
            }).then(function (data) {
                paypalRender();
            }, function () {
                console.error('error in getting token');
            });

        }
    }

    angular.module('jewel').component('cart', {
        templateUrl: 'components/cart/cart.html',
        controller: cartController

    })
})(window.angular)