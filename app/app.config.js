angular.
    module('dispatcher').
    config(['$locationProvider', '$routeProvider', '$mdThemingProvider', 'localStorageServiceProvider',
        function config($locationProvider, $routeProvider, $mdThemingProvider, localStorageServiceProvider) {

            $mdThemingProvider.theme('default')
                .primaryPalette('light-blue')
                .accentPalette('orange');

            localStorageServiceProvider.setPrefix('');
            localStorageServiceProvider.setStorageCookie(45, '/');
            localStorageServiceProvider.setStorageCookieDomain('');

            var authenticate = ['$q', '$location', 'sessionService', 'loginService', function ($q, $location, sessionService, loginService) {
                var deferred = $q.defer();

                if(sessionService.isHttpHeaders()){
                    sessionService.configHttpHeaders();

                    loginService.getCurrentSession()
                        .then(function(data){

                            if(data.user){
                                deferred.resolve();
                                if($location.path() == '/login' || $location.path() == '/intro'){
                                    $location.path("/todo");
                                }
                            }else{
                                if($location.path() == '/login'){
                                    deferred.resolve();
                                } else {
                                    deferred.reject('Not logged in');
                                    $location.path("/login");
                                }
                            }
                        }, function(response){
                            if($location.path() == '/login'){
                                deferred.resolve();
                            } else {
                                deferred.reject('Not logged in');
                                $location.path("/login");
                            }
                        });

                } else {
                    if($location.path() == '/login'){
                        deferred.resolve();
                    } else {
                        deferred.reject('Not logged in');
                        $location.path("/login");
                    }
                }

                return deferred.promise;
            }];

            $locationProvider.hashPrefix('!');

            $routeProvider.
                    when('/login', {
                        template: '<login></login>',
                        resolve: authenticate,
                        view: 'login'
                    }).
                    when('/intro', {
                        template: '<intro></intro>',
                        resolve: authenticate,
                        view: 'login'
                    }).
                    when('/todo', {
                        template: '<task-list layout-fill layout="column" flex></task-list>',
                        resolve: authenticate,
                        view: 'todo'
                    }).
                    when('/task/:bookingId/:taskId', {
                        template: '<task layout-fill></task>',
                        resolve: authenticate,
                        view: 'task'
                    }).
                    otherwise('/intro');


        }
    ]);

