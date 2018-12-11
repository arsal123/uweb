(function (angular) {
    'use strict';

    angular.module('jewel')
        .factory('prMainService', [
            '$http',
            '$q',
            '$log',
            function ($http, $q, $log) {
                let _this = this;
                // Will be diff for local
                // const BASE_URL = 'http://' + window.location.host;
                const BASE_URL = 'https://' + window.location.host;
                const DB_URL = BASE_URL + '/ldb/';
                const logPrefix = 'prMainService: ';
                var paymentConfId;

                _this.BASE_URL = BASE_URL;

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
                    let dbUrl = DB_URL + 'item';
                    console.info("DB URL: " + dbUrl);
                    return $http.get(dbUrl)
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

                _this.getPaymentConfId = function () {
                    return paymentConfId;
                }
                
                _this.saveAuthorize = function (authorize) {

                    $http.defaults.headers.post = {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }

                    return $http({
                        method: 'POST',
                        url: DB_URL + 'onAuthorize',
                        data: authorize

                    }).then(function (res) {
                        console.log(logPrefix + ' saveAuthorize return: ' + JSON.stringify(res.data));
                        return res.data;
                    })

                }

                _this.saveThing = function (thing) {

                    $http.defaults.headers.post = {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }

                    return $http({
                        method: 'POST',
                        url: DB_URL + 'thing',
                        data: thing

                    }).then(function (res) {
                        console.log(logPrefix + ' saveThing return: ' + JSON.stringify(res.data));
                        paymentConfId = res.data;
                        return res.data;
                    })

                }

                _this.getThing = function () {
                    return $http.get(DB_URL + 'thing')
                        .then(function (res) {
                            return res.data;
                        });
                }

                _this.saveAuthorize = function (authorize) {

                    $http.defaults.headers.post = {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                    
                    return $http({
                        method: 'POST',
                        url: DB_URL + 'onAuthorize',
                        data: authorize
                    
                    }).then(function (res) {
                            console.log(logPrefix + ' saveAuthorize return: ' + JSON.stringify(res.data));
                            return res.data;
                    })

                }
 
                // doAuth();

                return _this;
            }]);

}(window.angular));
