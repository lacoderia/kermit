(function(angular) {
    'use strict';

    function introController() {

        /**
         *
         * @type {taskListController}
         */
        var ctrl = this;

    }

    angular.module('intro').component('intro', {
        templateUrl: 'components/intro/intro.template.html',
        controller: introController,
        bindings: {

        }
    });

})(window.angular);
