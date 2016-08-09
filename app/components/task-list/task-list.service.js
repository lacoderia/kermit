(function(angular) {
    'use strict';

    angular.module('taskList').factory('taskListService', ['$http', '$q', 'API_URL_BASE', function ($http, $q, API_URL_BASE) {

        var tasks = [];

        var transformToObject = function(bookings, tasks){
            var list = [];

            try{
                for(var i=0; i<tasks.length; i++) {
                    var task = tasks[i];

                    var booking = undefined;
                    for(var j=0; j<bookings.length; j++){
                        if(task.booking_uid == bookings[j].id){

                            var interior = bookings[i].fields.interior ? bookings[i].fields.interior.val : '';
                            var entrecalles = bookings[i].fields.entrecalles ? bookings[i].fields.entrecalles.val : '';
                            var comentario = bookings[i].fields.comentario ? bookings[i].fields.comentario.val : '';
                            var portero = bookings[i].fields.portero ? bookings[i].fields.portero.val : '';
                            var prov = bookings[i].fields.prov ? bookings[i].fields.prov.val : '';
                            var prov2 = bookings[i].fields.prov2 ? bookings[i].fields.prov2.val : '';
                            var servicios = bookings[i].fields.servicios ? bookings[i].fields.servicios.val : '';
                            var especificaciones = bookings[i].fields.especificaciones ? bookings[i].fields.especificaciones.val : '';
                            var info_cli = bookings[i].fields.info_cli ? bookings[i].fields.info_cli.val : '';
                            var info_notas = bookings[i].fields.info_notas ? bookings[i].fields.info_notas.val : '';
                            var formapago = bookings[i].fields.formapago ? bookings[i].fields.formapago.val : '';

                            booking = new Booking(bookings[i].booking_id, bookings[i].id, bookings[i].customer_name, bookings[i].customer_address, interior, entrecalles, comentario, portero, bookings[i].customer_phone, bookings[i].customer_city, prov, prov2, servicios, especificaciones, info_cli, info_notas, bookings[i].status_id, formapago, bookings[i].total);
                            break;
                        }
                    }

                    list.push(new Task(task.id, booking, task.name, new moment.unix(task.start_date), new moment.unix(task.end_date)));

                }
            } catch(error){
                console.log(error);
            }

            return list;
        };

        function callTasks() {
            var tasksServiceURL = API_URL_BASE + '/bookings/in_the_future_by_courier?name=Marco';
            return $http.get(tasksServiceURL)
                .then(function(response) {
                    var data = response.data;
                    if (typeof data === 'object') {
                        if(data.bookings){
                            tasks = transformToObject(data.bookings, data.items);
                        }
                        return data;
                    } else {
                        return $q.reject(data);
                    }

                }, function(error){
                    return $q.reject(error.data);
                });
        }

        function getTasks() {
            return angular.copy(tasks);
        }

        var service = {
            getTasks: getTasks,
            callTasks: callTasks
        };

        return service;

    }]);
})(window.angular);
