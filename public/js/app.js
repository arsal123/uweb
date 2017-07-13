let jewelApp = angular.module('jewel', ['components', 'ui.router']);

jewelApp.config(function ($stateProvider) {
  let mainState = {
    name: 'main',
    url: '/',
    templateUrl: 'main.html'
  }

  let cartState = {
    name: 'cart',
    url: '/cart',
    component: 'cart'
  }

  let shippingState = {
    name: 'shipping',
    url: '/shipping',
    component: 'shipping'
  }

  let shippingOptions = {
    name: 'shippingOptions',
    url: '/shippingOptions',
    component: 'shippingOptions'
  }

  $stateProvider.state(mainState);
  $stateProvider.state(cartState);
  $stateProvider.state(shippingState);
  $stateProvider.state(shippingOptions);
});

jewelApp.controller('appController', [
  '$scope',
  'prMainCartService',
  function($scope, cartService){
    $scope.number = $scope.number ? $scope.number : 0;
    $scope.vm = {};
    $scope.updateNum = function(items){
      var total = 0;
      items.forEach(function(item) {
        total += parseInt(item.quantity, 10);
      });
      console.log('Updating number to ' + total);
      $scope.number = total;
    }
    $scope.vm.emptyCart = () => {
      cartService.emptyItems();
      $scope.number = 0;
    }
  }]);


jewelApp.controller('mainController', [
  '$scope',
  'prMainService',
  'prMainCartService',
  function ($scope, mainSvc, cartService) {
    let MAIN_CONTR = "MAIN-CONROLLER: ";

    $scope.data = {};
    (!$scope.checkout && ($scope.checkout = {}))

    let catPromise = mainSvc.getThirdItem();
    catPromise.then(function (data) {
      $scope.data.row1item3 = data;
      $scope.data.newArrivalItem2 = data;
    }).catch(function (err) {
      console.error(err);
    });

    let newArrivalPromise = mainSvc.getNewArrivalItems();
    newArrivalPromise.then(function (data) {
      $scope.data.newArrivalItem2 = data;
    }).catch(function (err) {
      console.error(err);
    });

    $scope.checkout.addToCart = function (item) {
      console.debug("Cart Item to Add: " + JSON.stringify(item));
      cartService.addItem(item);
      
      $scope.$parent.updateNum(cartService.getItems());
      console.debug(MAIN_CONTR + "Parent number: " + $scope.$parent.number);
    }
  }]);

