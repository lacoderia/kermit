(function(angular) {
    'use strict';

    function todoListController(todoListService, $location) {

        /**
         *
         * @type {todoListController}
         */
        var ctrl = this;

        ctrl.loading = false;

        // Private variables

        var TASK_STATUS_STYLES = {
            completed: 'completed',
            deprecated: 'deprecated',
            expired: 'expired',
            warning: 'warning'
        };

        var tasks = [];

        /**
         *
         */
        var callTasks = function() {
            tasks = [];

            ctrl.loading = true;
            todoListService.callTasks()
                .then(function(data) {
                    if(data.bookings){
                        tasks = todoListService.getTasks();
                        ctrl.loading = false;
                    }
                }, function(error) {
                    console.log(error);
                    ctrl.loading = false;
                });
        };

        ctrl.refreshTasks = function() {
            callTasks();
        };

        /**
         *
         * @param date
         * @param format
         * @returns {number}
         */
        var getElapsedTime = function (date, format) {
            return moment().diff(date, format);
        };

        // Instance variables

        /**
         *
         * @returns {Array}
         */
        ctrl.getTasks = function () {
            return tasks;
        };

        ctrl.getTaskTime = function (task) {
            return (task)? task.getStartDate().format('MMMM DD,') + " de " + task.getStartDate().format('HH:mm') + " a " + task.getEndDate().format('HH:mm') : "";
        };

        /**
         * Gets the end date formatted of a task
         * @param task
         * @returns {string}
         */
        ctrl.getDueDate = function (task) {
            var dueDate = task.getEndDate();
            var elapsedTime = getElapsedTime(dueDate, 'hours');
            return (elapsedTime < 24 && elapsedTime > 0)? dueDate.format('HH:mm') : dueDate.format('D MMMM');
        };

        /**
         * Go to taks detail section
         * @param taskId
         */
        ctrl.viewDetail = function(task){
            $location.path('/task/' + task.getBooking().getId() + '/' + task.getId());
        };

        /**
         *
         */
        this.$onInit = function() {
            callTasks();
        }
    }

    angular.module('todoList').component('todoList', {
        templateUrl: 'components/todo-list/todo-list.template.html',
        controller: todoListController,
        bindings: {

        }
    });

})(window.angular);
