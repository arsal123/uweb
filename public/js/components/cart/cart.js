(function(angular){
    function cartController($scope, cartService) {
    const CART_CONTROLLER = 'CART_CONTROLLER';
    let cntrl = this;
    $scope.cart = {}
    $scope.cart.items = cartService.getItems();
    console.info(CART_CONTROLLER + 'Runing through it. Total items: ' + ($scope.cart.items ? $scope.cart.items.length : 0))
     

    cntrl.doStuff = function () {
        console.log(CART_CONTROLLER + 'from doStuff()')
    }
}

angular.module('jewel').component('cart', {
    templateUrl: 'cart.html',
    controller: cartController

})})(window.angular)