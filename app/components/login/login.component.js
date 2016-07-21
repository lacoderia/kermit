(function(angular) {
    'use strict';

    function loginController($location, loginService) {

        /**
         *
         * @type {loginController}
         */
        var ctrl = this;

        // Object that holds the username and password values
        ctrl.credentials = {
            nickname: '',
            password: undefined
        };

        ctrl.formErrorMessage = '';

        // Function to authenticate a user
        ctrl.login = function() {

            ctrl.formErrorMessage = '';

            if(ctrl.loginForm.$valid) {

                loginService.login(ctrl.credentials)
                    .then(function(data) {
                        if(data.user){
                            $location.path('/todo');
                        }
                    }, function(error) {
                        if(error && error.errors){
                            ctrl.formErrorMessage = error.errors[0].title;
                        }
                    });
            }

        };

        /**
         * Inits the controller
         */
        var init = function () {

        };

        init();
    }

    angular
        .module('login')
        .component('login', {
            templateUrl: 'components/login/login.template.html',
            controller: loginController,
            bindings: {

            }
        });

})(window.angular);