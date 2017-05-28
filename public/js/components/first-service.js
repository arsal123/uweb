(function (angular) {
    'use strict';
    angular.module('components')
        .factory('prFirstService', [
            '$http',
            '$q',
            '$log',
            function($http, $q, $log) {
                var _this = this;

                _this.getCategories = function(){
                    return $http({
                        method: 'GET',
                        url: 'http://localhost:3000/db/category'
                    });
                    // .then(function(res){
                    //     return res.data;    
                    // })
                }

                return _this;
            }]);

}(window.angular));