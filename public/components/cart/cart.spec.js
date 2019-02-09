describe('Ucart component Testing', function() {

    var controller , $scope , $cart;
    beforeEach(angular.mock.module('jewel'));
     beforeEach(inject(function( _$rootScope_, _$componentController_, _prMainCartService_,_prMainService_ ){
      $scope = _$rootScope_.$new();
      $scope.$parent = _$rootScope_.$new();
      controller = _$componentController_;
   
      $cart = controller('cart' , {$scope:$scope, prMainCartService:_prMainCartService_ , prMainService:_prMainService_});
      spyOn($cart ,'updateQuantity').and.returnValue(5);
    }))

    it('has a dummy spec to test updateQuantity', function() {
     $cart.updateQuantity();
     expect($cart.updateQuantity).toHaveBeenCalled()

    });
    it('has a dummy spec to test updateQuantity return', function() {
     let k = $cart.updateQuantity();
     expect(k).toBe(5)

    });
  });
