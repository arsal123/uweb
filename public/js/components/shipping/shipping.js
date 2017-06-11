(function(angular){
    function shippingController($scope, cartService) {
    const SHIPPING_CONTROLLER = 'SHIPPING_CONTROLLER';
    let cntrl = this;
    
    cntrl.calculateShipping = function(){
        console.info(SHIPPING_CONTROLLER + 'Calculating shipping');
    }

    console.info(SHIPPING_CONTROLLER + 'Runing through it. ');
     

}

angular.module('jewel').component('shipping', {
    templateUrl: 'shipping.html',
    controller: shippingController

})})(window.angular)