(function(angular){
    function cartController($scope, $http, $log, cartService) {
    const logPrefix = 'CART_CONTROLLER: ';

    let ctrl = this;
    let paypalRender = function(){
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
    $scope.vm={}
    $scope.cart = {}
    $scope.cart.items = cartService.getItems();
    ctrl.shippingOption = cartService.getShippingOption();
    
    ctrl.shippingOption && $log.debug(ctrl.shippingOption.price.total);


    $scope.vm.checkout=function(){
        $log.debug(logPrefix+'Starting of checkout method. Making an acccess token call');

        $http({
            method: 'POST',
            url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
            headers:{
                'Accept': 'application/json',
                'Accept-Language': 'en_US',
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': 'Basic '+ btoa('Ac0jN0nTDSLOrFp7L12FgcazcVLh4OJxdgg56kLuLu15imqwH_HivAoTJtGEC8S-SnXtuvbo3_A4Rk6a:EKJ-xIY--cpPnvlWLEkCOv1fWbBultorxsGuBIn9IQFQlievzGMCKGHvfXi8jbEErDArQ9flGkDFP-uS'),
            },
            data: $.param({
                grant_type: 'client_credentials'
            })
        }).then(function(data){
            paypalRender();
        }, function(){
            console.error('error in getting token');
        });
        
    }
    // ctrl.cartService = cartService;
    // console.info(CART_CONTROLLER + 'Runing through it. Total items: ' + ($scope.cart.items ? $scope.cart.items.length : 0))
    // $scope.$root.cart = {
    //     items: $scope.cart.items
    // };
    // $scope.vm.checkout();
]}

angular.module('jewel').component('cart', {
    templateUrl: 'cart.html',
    controller: cartController

})})(window.angular)