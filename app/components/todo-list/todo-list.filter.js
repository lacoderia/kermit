(function(angular) {
    'use strict';

    angular
        .module('todoList')
        .filter('orderByDate', function(){
        /**
         * Order tasks list by date
         * @return _spinningClasses
         */
        return function(tasks, reverse) {

            var filtered = [];

            angular.forEach(tasks, function(item) {
                if(item.getEndDate().diff(moment(), 'days') >= 0){
                    filtered.push(item);
                }
            });

            filtered.sort(function (a, b) {
                return (a.getEndDate() > b.getEndDate() ? 1 : -1);
            });

            if(reverse) filtered.reverse();

            return filtered;
        }
    }).filter('searchOrder', function(){

        return function(tasks, query) {

            var filtered = [];
            if(query) {
                angular.forEach(tasks, function(item) {
                    if(item.getBooking() || item.getBooking().getOrderNumber()){
                        var taskOrderNumber = item.getBooking().getOrderNumber().toLowerCase();
                        var queryOrderNumber = query.toLowerCase();
                        if(taskOrderNumber.indexOf(queryOrderNumber)>=0){
                            filtered.push(item);
                        }
                    }
                });
                return filtered;
            }
            return tasks;
        }

    });

})(window.angular);