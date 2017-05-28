angular.module('components', [])

  .directive('first', ['$q', 'prFirstService', function ($q, firstSvc) {
    return {
      restrict: 'E',
      scope: {},
      controller: function ($scope, $element) {
        var panes = $scope.panes = [];
        $scope.testVar = 'hahaaha';
        console.log('Going to call service');
        firstSvc.getCategories().then(function(data){
          console.log('Recieved data'+data);
        });
      },
      template:
      '<div>' +
        '<div>Test1: {{testVar}}</div>' + 
      '</div>',
      replace: true
    };
  }])
