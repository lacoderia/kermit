(function(angular, sessionService) {
    'use strict';

    angular.module('login').factory('loginService', ['$http', '$q', 'sessionService', 'AUTH_API_URL_BASE', function ($http, $q, sessionService, AUTH_API_URL_BASE) {

        var login = function(user){
            var loginServiceURL = AUTH_API_URL_BASE + '/users/sign_in';
            return $http.post(loginServiceURL, { user: user })
                .then(function(response) {
                    var data = response.data;
                    if (typeof data === 'object') {

                        if(data.user){

                            var headers = {
                                'accessToken' : response.headers('access-token'),
                                'expiry': response.headers('expiry'),
                                'tokenType': response.headers('token-type'),
                                'uid': response.headers('uid'),
                                'client': response.headers('client')
                            };

                            sessionService.setHttpHeaders(headers);
                        }

                        return data;
                    } else {
                        return $q.reject(data);
                    }

                }, function(error){
                    return $q.reject(error.data);
                });
        };

        var getCurrentSession = function(){
            var sessionServiceURL = AUTH_API_URL_BASE + '/session';
            return $http.get(sessionServiceURL, {})
                .then(function(response){
                    var data = response.data;
                    if (typeof data === 'object') {

                        if(data.user){
                            var headers = {
                                'accessToken' : response.headers('access-token'),
                                'expiry': response.headers('expiry'),
                                'tokenType': response.headers('token-type'),
                                'uid': response.headers('uid'),
                                'client': response.headers('client')
                            };

                            sessionService.setHttpHeaders(headers);

                            var user = data.user;
                            sessionService.createSession(user);
                        }

                        return data;
                    } else {
                        return $q.reject(data);
                    }
                },
                function(error){
                    return $q.reject(error.data);
                });
        };

        var service = {
            login: login,
            getCurrentSession: getCurrentSession
        };

        return service;

    }]);
})(window.angular);
