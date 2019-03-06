describe('Ucart component Testing', function() {

    var controller , $scope , $cart;
    beforeEach(angular.mock.module('jewel'));
     beforeEach(inject(function( _$rootScope_, _$componentController_, _prMainCartService_,_prMainService_, $filter ){
      $scope = _$rootScope_.$new();
      controller = _$componentController_;
      $filter = $filter;
     
      let items = [{price:20, quantity:3}];
      let shippingOption = {price:{total:20}}

      $scope.$parent = {
        updateNum : function(items) {
          var total = 0;
          items.forEach(function(item) {
            total += parseInt(item.quantity, 10);
          });
          $scope.number = total;
        }
      }
    
      $cart = controller('cart' , {$scope:$scope, prMainCartService:_prMainCartService_ , prMainService:_prMainService_, $filter:$filter});
      spyOn(_prMainCartService_ , 'getItems').and.returnValue(items)
      spyOn(_prMainCartService_, 'getShippingOption').and.returnValue(shippingOption)
      $scope.cart = {items : items }
    }))
    it('calcTotalCost testing', function() {
      let items = [{price:20, quantity:3}];
      let shippingOption = {price:{total:20}}
      $cart.calcTotalCost(items,shippingOption);
      expect($cart.totalCost).toBe('87.80')

    });
    it('updateQuantity testing', function() {
      $cart.updateQuantity()
      expect($scope.number).toBe(3)
      expect($cart.totalCost).toBe('87.80')
    })
  });
