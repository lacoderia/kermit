(function(angular) {
    'use strict';

    angular.module('dispatcher').directive("compileHtml", function($parse, $sce, $compile) {
        return {
            restrict: "A",
            link: function (scope, element, attributes) {

                var expression = $sce.parseAsHtml(attributes.compileHtml);

                var getResult = function () {
                    return expression(scope);
                };

                scope.$watch(getResult, function (newValue) {
                    var linker = $compile(newValue);
                    element.empty();
                    element.append(linker(scope));
                });
            }
        }
    });

})(window.angular);