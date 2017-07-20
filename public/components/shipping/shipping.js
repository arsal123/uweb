(function (angular) {
    'use strict'

    function shippingController($scope, $http, $state, $log, prMainService, prMainCartService,
         prMainShippingOptionsService) {
        const logPrefix = 'SHIPPING_CONTROLLER: ';
        // const LOCAL_SERVICE = 'http://localhost:3000/';
        let ctrl = this;
        // ctrl.name = 'Musa';

        ctrl.calculateShipping = function () {
            console.info(logPrefix + 'Calculating shipping');              
            let isValid = true;            
            // Additional validation
            if(prMainCartService.getItems().length < 1){
                ctrl.errMsg = "Please add items to your cart. Pleaes go back to main page to select items.";
                isValid = false;
            }
            // Address Line 1 should contain atleast 1 number
            if(!(/\d/.test(ctrl.address1))){
                ctrl.errMsg = "";
                isValid = false;
            }

            // Postal code should be 5 or 6 letters after trimming
            if(ctrl.postalCode.length > 5){
                let POSTAL_CODE_ERR_MSG = "Please enter a valid postal / zip code"
                if(ctrl.postalCode.length === 5){
                    // It has to be a number
                    if(!parseInt(ctrl.postalCode)){
                        ctrl.errMsg = POSTAL_CODE_ERR_MSG;
                        isValid = false;
                    }
                }
                // If space is there, trim that space
                let spaceIndex = ctrl.postalCode.indexOf(' ');
                if(spaceIndex >= 0){
                    ctrl.postalCode = ctrl.postalCode.replace(/\s+/,'');
                }
                // Check length to make sure it is not less than 5
                if (ctrl.postalCode.length < 5 || ctrl.postalCode.length > 6) {
                    ctrl.errMsg = POSTAL_CODE_ERR_MSG;
                    isValid = false;
                } 
            }

            if(!isValid) return;

            // Calculate shipping options
            // Set the weight correct
            let totalWeightGrams = 0;
            prMainCartService.getItems().forEach(function(element) {
                totalWeightGrams += (element.weightInGrams * element.quantity);
            });

            let optionPromise = prMainShippingOptionsService.calculateShipping(totalWeightGrams, ctrl.postalCode, ctrl.country);
            optionPromise.then(function(res){
                // Goto next page on success 
               $log.info(logPrefix + ' Got Shipping Options: ' + JSON.stringify(res)) 
               $state.go('shippingOptions');
            }, function(err){
                ctrl.errMsg = "Error in calculating shipping option. Please contact customer support at 514 804 3726";
            });
        }
    }
        angular.module('jewel').component('shipping', {
            templateUrl: 'components/shipping/shipping.html',
            controller: shippingController

        })
    })(window.angular)