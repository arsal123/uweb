(function (angular) {
    'use strict';

    angular.module('jewel')
        .factory('prMainService', [
            '$http',
            '$q',
            '$log',
            function($http, $q, $log) {
                let _this = this;
                const BASE_URL = 'http://' + window.location.host + '/db/';

                _this.getCategories = function(){
                    return $http({
                        method: 'GET',
                        url: BASE_URL+'category'
                    })
                    .then(function(res){
                        return res.data;    
                    })
                }

                let getItems = function(){
                    return $http.get(BASE_URL+'item')
                    .then(function(res){
                        return res.data;                        
                    })
                }

                _this.getThirdItem = function(){
                    let itemPromise = getItems();
                    return getItems().then(function(items){
                        return items[0];
                    });
                }

                _this.getNewArrivalItems = function(){
                    let itemPromise = getItems();
                    return getItems().then(function(items){
                        return items[1];
                    });
                }

                return _this;
            }]);

}(window.angular));
