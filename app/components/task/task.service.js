(function(angular) {
    'use strict';

    angular.module('task').factory('taskService', ['$http', '$q', 'API_URL_BASE', 'BOOKING_STATUSES', 'TASK_CATEGORIES', function ($http, $q, API_URL_BASE, BOOKING_STATUSES, TASK_CATEGORIES) {

        var _task = undefined;

        var transformToObject = function(booking, task){
            try{

                var interior = booking.fields.interior ? booking.fields.interior.val : '';
                var entrecalles = booking.fields.entrecalles ? booking.fields.entrecalles.val : '';
                var comentario = booking.fields.comentario ? booking.fields.comentario.val : '';
                var portero = booking.fields.portero ? booking.fields.portero.val : '';
                var prov = booking.fields.prov ? booking.fields.prov.val : '';
                var prov2 = booking.fields.prov2 ? booking.fields.prov2.val : '';
                var servicios = booking.fields.servicios ? booking.fields.servicios.val : '';
                var especificaciones = booking.fields.especificaciones ? booking.fields.especificaciones.val : '';
                var info_cli = booking.fields.info_cli ? booking.fields.info_cli.val : '';
                var info_notas = booking.fields.info_notas ? booking.fields.info_notas.val : '';
                var formapago = booking.fields.formapago ? booking.fields.formapago.val : '';
                var phone = booking.customer_phone ? booking.customer_phone.substr(3): '';

                var booking = new Booking(booking.booking_id, booking.id, booking.customer_name, booking.customer_address, interior, entrecalles, comentario, portero, phone, booking.customer_city, prov, prov2, servicios, especificaciones, info_cli, info_notas, booking.status_id, formapago, booking.total);
                var task = new Task(task.id, booking, task.name, new moment.unix(task.start_date), new moment.unix(task.end_date), task.category);

            } catch(error){
                console.log(error);
            }

            return task;
        };

        function callTask(bookingId, taskId) {
            var tasksServiceURL = API_URL_BASE + '/bookings/by_booking_and_item?booking_id=' + bookingId + '&item_id=' + taskId;
            return $http.get(tasksServiceURL)
                .then(function(response) {
                    var data = response.data;
                    if (typeof data === 'object') {
                        if(data.bookings){
                            _task = transformToObject(data.bookings[0], data.items[0]);
                        }
                        return data;
                    } else {
                        return $q.reject(data);
                    }

                }, function(error){
                    return $q.reject(error.data);
                });
        }

        function getTask() {
            return angular.copy(_task);
        }

        function getFutureStatus(task) {
            var category = task.getCategory();
            var currentStatus = task.getBooking().getStatus();
            var futureStatus = undefined;

            switch(category) {
                case TASK_CATEGORIES.PICKUP:
                    // HOLD, ASIGN -> RECOL
                    // RECOL -> ENPRO

                    if (currentStatus == BOOKING_STATUSES.HOLD || currentStatus == BOOKING_STATUSES.ASIGN) {
                        futureStatus = BOOKING_STATUSES.RECOL;
                    } else if(BOOKING_STATUSES.RECOL) {
                        futureStatus = BOOKING_STATUSES.ENPRO;
                    }
                    break;
                case TASK_CATEGORIES.INTERNAL:
                    // HOLD, ASIGN -> RECOL
                    // RECOL -> ENPRO

                    if (currentStatus == BOOKING_STATUSES.HOLD || currentStatus == BOOKING_STATUSES.ASIGN) {
                        futureStatus = BOOKING_STATUSES.RECOL;
                    } else if(BOOKING_STATUSES.RECOL) {
                        futureStatus = BOOKING_STATUSES.ENPRO;
                    }
                    break;
                case TASK_CATEGORIES.DELIVERY:
                    // HOLD, ASIGN -> CAMIN
                    // CAMIN -> DONE1

                    if (currentStatus == BOOKING_STATUSES.HOLD ||
                        currentStatus == BOOKING_STATUSES.ASIGN ||
                        currentStatus == BOOKING_STATUSES.CO12 ||
                        currentStatus == BOOKING_STATUSES.EFECT ||
                        currentStatus == BOOKING_STATUSES.ENTRE ||
                        currentStatus == BOOKING_STATUSES.PAID ||
                        currentStatus == BOOKING_STATUSES.QUEJA ||
                        currentStatus == BOOKING_STATUSES.FALTA ||
                        currentStatus == BOOKING_STATUSES.REPRO ||
                        currentStatus == BOOKING_STATUSES.PART
                    ) {
                        futureStatus = BOOKING_STATUSES.CAMIN;
                    } else if(BOOKING_STATUSES.CAMIN) {
                        futureStatus = BOOKING_STATUSES.DONE1;
                    }
                    break;
                default:
                    break;
            }

            return futureStatus;
        }

        function updateTaskStatus(task) {

            var tasksServiceURL = API_URL_BASE + '/bookings/change_status';
            return $http.post(tasksServiceURL, {
                booking_id: task.getBooking().getId(),
                old_status_id: task.getBooking().getStatus(),
                new_status_id: getFutureStatus(task)
            })
                .then(function(response) {
                    var data = response.data;
                    if (typeof data === 'object') {
                        return data;
                    } else {
                        return $q.reject(data);
                    }

                }, function(error){
                    return $q.reject(error.data);
                });
        }

        function reportProblem(task) {

            var tasksServiceURL = API_URL_BASE + '/bookings/change_status';
            return $http.post(tasksServiceURL, {
                booking_id: task.getBooking().getId(),
                old_status_id: task.getBooking().getStatus(),
                new_status_id: BOOKING_STATUSES.PROBL
            })
                .then(function(response) {
                    var data = response.data;
                    if (typeof data === 'object') {
                        return data;
                    } else {
                        return $q.reject(data);
                    }

                }, function(error){
                    return $q.reject(error.data);
                });
        }
        
        function updateNotes(bookingId, field, notes) {

            var tasksServiceURL = API_URL_BASE + '/bookings/change_param';
            return $http.post(tasksServiceURL, {
                booking_id: bookingId,
                name: field,
                value: notes
            })
                .then(function(response) {
                    var data = response.data;

                    if (typeof data === 'object') {
                        _task.getBooking().setInfoNotas(notes);

                        return data;
                    } else {
                        return $q.reject(data);
                    }

                }, function(error){
                    return $q.reject(error.data);
                });
        }
        
        var service = {
            callTask: callTask,
            getTask: getTask,
            updateTaskStatus: updateTaskStatus,
            reportProblem: reportProblem,
            updateNotes: updateNotes
        };

        return service;

    }]);
})(window.angular);
