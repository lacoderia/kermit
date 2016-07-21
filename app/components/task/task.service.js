(function(angular) {
    'use strict';

    angular.module('task').factory('taskService', ['$http', '$q', 'API_URL_BASE', 'ORDER_STATUSES', function ($http, $q, API_URL_BASE, ORDER_STATUSES) {

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

        function validateStatusChange(task, status) {
            var futureStatusOptions = ORDER_STATUSES[task.getBooking().getStatus()];
            return futureStatusOptions.indexOf(status) != -1;
        }

        function updateTaskStatus(task, status) {

            var tasksServiceURL = API_URL_BASE + '/bookings/in_the_future_by_courier?name=Marco';
            return $http.get(tasksServiceURL)
                .then(function(response) {
                    var data = response.data;
                    if (typeof data === 'object') {
                        if(data.bookings){
                            _task = transformToObject(data.bookings[0], data.items[0]);
                            _task.getBooking().setStatus(status);
                        }
                        return data;
                    } else {
                        return $q.reject(data);
                    }

                }, function(error){
                    return $q.reject(error.data);
                });
        }
        
        function updateNotes() {
            _task.getBooking().setInfoNotas('Prueba');
        }
        
        var service = {
            callTask: callTask,
            getTask: getTask,
            validateStatusChange: validateStatusChange,
            updateTaskStatus: updateTaskStatus,
            updateNotes: updateNotes
        };

        return service;

    }]);
})(window.angular);
