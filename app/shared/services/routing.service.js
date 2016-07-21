(function(angular) {
    'use strict';

    angular.module('dispatcher').factory('routingService', [function () {

        var _view = undefined;

        var getView = function() {
            return _view;
        };

        var setView = function(view){
            _view = view;
        };

        var service = {
            getView: getView,
            setView: setView
        };

        return service;
    }]);

})(window.angular);
