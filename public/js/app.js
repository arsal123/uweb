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

  $stateProvider.state(mainState);
  $stateProvider.state(cartState);
});

jewelApp.controller('mainController', [
  '$scope',
  'prMainService',
  'cartService',
  function ($scope, mainSvc, cartService) {

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
      cartService.setItems([item]);
    }
  }]);