'use strict';

// Moment configuration
moment.locale("es");
moment.tz.setDefault('America/Mexico_City');

// Declare app level module which depends on views, and components
angular.module('dispatcher', [
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'LocalStorageModule',
    'navigation',
    'intro',
    'login',
    'taskList',
    'task'
]);

angular.module('dispatcher')
    .constant('AUTH_API_URL_BASE', 'http://lavader.herokuapp.com')
    .constant('API_URL_BASE', 'http://lavader.herokuapp.com')
    .constant('TASK_VIEW_DEFINITION', {
        'Servicio de Lavanderia, Tintoreria y/o Planchado': [
            'order_number',
            'customer_name',
            'customer_address',
            'proveedores',
            'order_details',
            'servicios',
            'especificaciones',
            'info'
        ],
        'Viaje Interno': [
            'order_number',
            'customer_name',
            'order_details',
            'especificaciones',
            'info'
        ],
        'Entrega a domicilio': [
            'order_number',
            'customer_name',
            'customer_address',
            'proveedores',
            'order_details',
            'info',
            'payment_info'
        ]
    })
    .constant('TASK_CATEGORIES', {
        'PICKUP': 'Servicio de Lavanderia, Tintoreria y/o Planchado',
        'INTERNAL': 'Viaje Interno',
        'DELIVERY': 'Entrega a domicilio'
    })
    .constant('BOOKING_STATUSES', {
        'HOLD': 'HOLD',
        'ASIGN': 'ASIGN',
        'RECOL': 'RECOL',
        'ENPRO': 'ENPRO',
        'CAMIN': 'CAMIN',
        'DONE1': 'DONE1',
        'CO12': 'CO12',
        'EFECT': 'EFECT',
        'ENTRE': 'ENTRE',
        'PAID': 'PAID',
        'QUEJA': 'QUEJA',
        'FALTA': 'FALTA',
        'REPRO': 'REPRO',
        'PART': 'PART'
    });



angular.module('dispatcher')
    .run(['$rootScope', '$route', 'routingService', function($rootScope, $route, routingService) {
        $rootScope.$on('$routeChangeSuccess', function() {
            routingService.setView($route.current.view);
        });
    }]);