(function(angular) {
    'use strict';

    function taskController($scope, $mdDialog, $mdToast, $sce, $routeParams, $location, taskService, TASK_VIEW_DEFINITION) {

        /**
         *
         * @type {taskController}
         */
        var ctrl = this;

        ctrl.loading = false;

        /**
         * 
         * @type {undefined}
         * @private
         */
        var _task = undefined;

        /**
         *
         * @type {{notes: string}}
         */
        ctrl.edit = {
            notes : ''
        };

        ctrl.getTaskTitle = function () {
            return (_task)?  $sce.trustAsHtml(_task.getName() + "<br> De " + _task.getStartDate().format('HH:mm') + " a " + _task.getEndDate().format('HH:mm')) : "";
        };

        /**
         *
         */
        var callTask = function() {
            ctrl.loading = true;

            taskService.callTask($routeParams.bookingId, $routeParams.taskId)
                .then(function(data) {
                    if(data.bookings){
                        _task = taskService.getTask();
                        ctrl.loading = false;
                    }
                }, function(error) {
                    console.log(error);
                    ctrl.loading = false;
                });
        };

        /**
         *
         */
        ctrl.getTask = function() {
            return _task;
        };

        /**
         *
         */
        ctrl.startTask = function() {
            var futureStatus = 'RECOL';
            if(taskService.validateStatusChange(_task, futureStatus)){
                taskService.updateTaskStatus(_task, futureStatus)
                    .then(function(data){
                        if(data.bookings){
                            _task = taskService.getTask();

                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('¡Buen viaje!')
                                    .position('top right')
                            );

                        }
                    }, function(error) {
                        console.log(error);
                    });
            }

        };

        /**
         *
         */
        ctrl.endTask = function() {
            var futureStatus = 'CO12';
            if(taskService.validateStatusChange(_task, futureStatus)){
                taskService.updateTaskStatus(_task, futureStatus)
                    .then(function(data){
                        if(data.bookings){
                            _task = taskService.getTask();

                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('¡Buen trabajo!')
                                    .position('top right')
                            );

                            $location.path('/todo');
                        }
                    }, function(error) {
                        console.log(error);
                    });
            }

        };

        /**
         *
         */
        ctrl.getTaskView = function() {

            var taskView = "";
            if(_task){
                var viewElements = TASK_VIEW_DEFINITION[_task.getCategory()];

                taskView += '<caption>Datos de la orden</caption>';

                if ( viewElements.indexOf('order_number') != -1 ){
                    taskView += '<tr><td class="order-number">' + _task.getBooking().getOrderNumber() + '</td></tr>';
                }

                if ( viewElements.indexOf('customer_name') != -1 ){
                    taskView += '<tr><td>' + _task.getBooking().getCustomerName() + '</td></tr>';
                    taskView += '<tr><td>&nbsp;</td></tr>';
                }

                if ( viewElements.indexOf('customer_address') != -1 ){
                    taskView += '<tr><td class="label">Información del cliente: </td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getCustomerAddress() + '</td></tr>';

                    if(_task.getBooking().getCustomerInterior()) {
                        taskView += '<tr><td>Interior: ' + _task.getBooking().getCustomerInterior() + '</td></tr>';
                    }

                    if(_task.getBooking().getCustomerEntreCalles()) {
                        taskView += '<tr><td>Entre calles: ' + _task.getBooking().getCustomerEntreCalles() + '</td></tr>';
                    }

                    taskView += '<tr><td>Colonia: ' + _task.getBooking().getCustomerCity() + '</td></tr>';
                    taskView += '<tr><td><a href="tel:' + _task.getBooking().getCustomerPhone() + '">' + _task.getBooking().getCustomerPhone() + '</a></td></tr>';
                    taskView += '<tr><td>&nbsp;</td></tr>'
                    taskView += '<tr><td class="label">Comentarios: </td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getCustomerComentario() + '</td></tr>';


                    if(_task.getBooking().getCustomerPortero()) {
                        var portero = _task.getBooking().getCustomerPortero();
                        if (portero.substr(0, 2).toLowerCase() == 'sí') {
                            taskView += '<tr><td>' + _task.getBooking().getCustomerPortero() + '</td></tr>';
                            taskView += '<tr><td>&nbsp;</td></tr>'
                        }
                    }
                }

                taskView += '<tr><td class="label">Estatus: </td></tr>';
                taskView += '<tr><td>' + _task.getBooking().getStatus() + '</td></tr>';
                taskView += '<tr><td>&nbsp;</td></tr>';

                if ( viewElements.indexOf('proveedores') != -1 ){
                    taskView += '<tr><td class="label">Proveedores: </td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getProv() + '</td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getProv2() + '</td></tr>';
                    taskView += '<tr><td>&nbsp;</td></tr>';
                }

                if ( viewElements.indexOf('servicios') != -1 ){
                    taskView += '<tr><td class="label">Servicios: </td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getServicios() + '</td></tr>';
                    taskView += '<tr><td>&nbsp;</td></tr>';
                }

                if ( viewElements.indexOf('especificaciones') != -1 ){
                    taskView += '<tr><td class="label">Especificaciones: </td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getEspecificaciones() + '</td></tr>';
                    taskView += '<tr><td>&nbsp;</td></tr>';
                }

                if ( viewElements.indexOf('payment_info') != -1 ){
                    if(_task.getBooking().getCustomerPortero()) {
                        var formaPago = _task.getBooking().getFormaPago();
                        if (formaPago.toLowerCase() == 'efectivo') {
                            taskView += '<tr><td class="label">Pago: </td></tr>';
                            taskView += '<tr><td>' + _task.getBooking().getFormaPago() + '</td></tr>';
                            taskView += '<tr><td>$ ' + _task.getBooking().getTotal() + '</td></tr>';
                            taskView += '<tr><td>&nbsp;</td></tr>';
                        }
                    }
                }

                if ( viewElements.indexOf('info') != -1 ){
                    taskView += '<tr><td class="label">Información del cliente: </td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getInfoCliente() + '</td></tr>';
                    taskView += '<tr><td>&nbsp;</td></tr>';
                    taskView += '<tr><td class="label">Notas: </td></tr>';
                    taskView += '<tr><td>' + _task.getBooking().getInfoNotas() + '</td></tr>';
                }

                taskView += '<tr><td><md-button class="md-raised" ng-click="$ctrl.promptNotes()">Editar</md-button></td></tr>';

            }

            return $sce.trustAsHtml(taskView);
        };

        ctrl.promptNotes = function(ev) {

            ctrl.edit.notes = angular.copy(_task.getBooking().getInfoNotas());

            $mdDialog.show({
                controller: taskController,
                template: '' +
                '<md-dialog aria-label="Edit notes" flex="80" ng-cloak>' +
                '   <form>' +
                '       <md-toolbar>' +
                '           <div class="md-toolbar-tools">' +
                '               <h2>Editar</h2>' +
                '               <span flex></span>' +
                '               <md-button class="md-icon-button" ng-click="$ctrl.cancel()">' +
                '                   <md-icon md-font-library="material-icons">&#xE5CD;</md-icon>'+
                '               </md-button>' +
                '           </div>' +
                '       </md-toolbar>' +
                '       <md-dialog-content>' +
                '           <div class="md-dialog-content">' +
                '               <md-input-container>' +
                '                   <label>Notas</label>' +
                '                   <textarea ng-model="$ctrl.edit.notes" placeholder="Las notas van aquí"></textarea>' +
                '               </md-input-container>' +
                '           </div>' +
                '       </md-dialog-content>' +
                '       <md-dialog-actions layout="row">' +
                '           <md-button ng-click="$ctrl.cancel()">' +
                '               Cancelar' +
                '           </md-button>' +
                '           <md-button ng-click="$ctrl.editNotes()">' +
                '               Guardar' +
                '           </md-button>' +
                '       </md-dialog-actions>' +
                '   </form>' +
                '</md-dialog>',
                parent: angular.element(document.body),
                scope: $scope,
                preserveScope: true,
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        /**
         *
         */
        ctrl.cancel = function() {
            $mdDialog.cancel();
        };

        /**
         *
         */
        ctrl.editNotes = function() {
            taskService.updateNotes();
            _task = taskService.getTask();
            $mdDialog.hide();
        };

        /**
         *
         * @param ev
         */
        ctrl.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('¿Ya terminaste el viaje?')
                .textContent('')
                .ariaLabel('End task')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');
            $mdDialog.show(confirm).then(function () {
                ctrl.endTask();
            }, function () {

            });
        };

        /**
         *
         */
        this.$onInit = function() {
            callTask();
        }
    }

    angular
        .module('task')
        .component('task', {
            templateUrl: 'components/task/task.template.html',
            controller: taskController,
            bindings: {

            }
        });

})(window.angular);
