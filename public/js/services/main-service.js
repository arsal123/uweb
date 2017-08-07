(function (angular) {
    'use strict';

    angular.module('jewel')
        .factory('prMainService', [
            '$http',
            '$q',
            '$log',
            function ($http, $q, $log) {
                let _this = this;
                const BASE_URL = 'http://' + window.location.host;
                const DB_URL = BASE_URL + '/db/';
                const logPrefix = 'prMainService: ';

                _this.BASE_URL = BASE_URL;

                // Need to fix this method
                var doAuth = function () {
                    $http({
                        method: 'POST',
                        url: DB_URL + 'auth',
                        body: {
                            username: 'admin1',
                            password: 'siddiqui1'
                        }
                    })
                        .then(function (res) {
                            $log.debug(res.data);
                        });
                }

                _this.getCategories = function () {
                    return $http({
                        method: 'GET',
                        url: DB_URL + 'category'
                    })
                        .then(function (res) {
                            return res.data;
                        })
                }

                let getItems = function () {
                    return $http.get(DB_URL + 'item')
                        .then(function (res) {
                            return res.data;
                        })
                }

                _this.getThirdItem = function () {
                    let itemPromise = getItems();
                    return getItems().then(function (items) {
                        return items[0];
                    });
                }

                _this.getNewArrivalItems = function () {
                    let itemPromise = getItems();
                    return getItems().then(function (items) {
                        return items[1];
                    });
                }

                _this.saveThing = function (thing) {
                    // return $http.get(DB_URL + 'item')
                    //     .then(function (res) {
                    //         console.log(logPrefix + JSON.stringify(res.data));
                    //         return res.data;
                    //     })
                    $http.defaults.headers.post = {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                    
                    return $http({
                        method: 'POST',
                        url: DB_URL + 'thing',
                        data: thing
                    
                    }).then(function (res) {
                            console.log(logPrefix + JSON.stringify(res.data));
                            return res.data;
                    })

                }

                _this.getThing = function () {
                    return $http.get(DB_URL + 'thing')
                        .then(function (res) {
                            return res.data;
                        })
                }

                // doAuth();


                return _this;
            }]);

}(window.angular));
