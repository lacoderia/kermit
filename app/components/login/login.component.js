(function(angular) {
    'use strict';

    function loginController($location, $mdToast, loginService) {

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

        ctrl.loading = false;

        // Function to authenticate a user
        ctrl.login = function() {
            document.activeElement.blur();

            if(ctrl.loginForm.$valid) {

                ctrl.loading = true;

                loginService.login(ctrl.credentials)
                    .then(function(data) {
                        if(data.user){
                            $location.path('/todo');
                        }
                        ctrl.loading = false;
                    }, function(error) {
                        var errorText = 'Ocurrió un error, por favor intenta más tarde.';
                        if(error && error.errors){
                            errorText = error.errors[0].title;
                        }

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(errorText)
                                .position('top right')
                        );

                        ctrl.loading = false;
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