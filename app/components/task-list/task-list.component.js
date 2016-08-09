(function(angular) {
    'use strict';

    function taskListController(taskListService, $location) {

        /**
         *
         * @type {taskListController}
         */
        var ctrl = this;

        var TASK_ICON = {
            'DEFAULT': 'keyboard_arrow_right',
            'DONE1': 'done',
            'ENPRO': 'directions_bike',
            'PROBL': 'sentiment_dissatisfied'
        }

        ctrl.loading = false;

        var tasks = [];

        /**
         *
         */
        var callTasks = function() {
            tasks = [];

            ctrl.loading = true;
            taskListService.callTasks()
                .then(function(data) {
                    if(data.bookings){
                        tasks = taskListService.getTasks();
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
         * @param task
         * @returns {boolean}
         */
        ctrl.getTaskClass = function(task) {
            var status = task.getBooking().getStatus();
            switch(status) {
                case 'DONE1':
                    return 'done';
                case 'ENPRO':
                    return 'in-progress';
                case 'PROBL':
                    return 'warning';
                default:
                    return '';
            }
        };

        ctrl.getTaskIcon = function (task) {
            var status = task.getBooking().getStatus();
            switch(status) {
                case 'DONE1':
                case 'ENPRO':
                case 'PROBL':
                    return TASK_ICON[status];
                default:
                    return TASK_ICON['DEFAULT'];
            }
        };

        /**
         *
         */
        this.$onInit = function() {
            callTasks();
        }
    }

    angular.module('taskList').component('taskList', {
        templateUrl: 'components/task-list/task-list.template.html',
        controller: taskListController,
        bindings: {

        }
    });

})(window.angular);
