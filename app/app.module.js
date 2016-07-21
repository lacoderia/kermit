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
    'todoList',
    'task'
]);

angular.module('dispatcher')
    .constant('AUTH_API_URL_BASE', 'http://lavader.herokuapp.com')
    .constant('API_URL_BASE', 'http://lavader.herokuapp.com')
    .constant('ORDER_STATUSES', {
        'HOLD': ['RECOL'],
        'RECOL': ['CO12']
    })
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
    });



angular.module('dispatcher')
    .run(['$rootScope', '$route', 'routingService', function($rootScope, $route, routingService) {
        $rootScope.$on('$routeChangeSuccess', function() {
            routingService.setView($route.current.view);
        });
    }]);