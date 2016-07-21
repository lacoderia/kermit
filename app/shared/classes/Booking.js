'use strict';

function Booking(id, orderNumber, customerName, customerAddress, customerInterior, customerEntreCalles, customerComentario, customerPortero, customerPhone, customerCity, prov, prov2, servicios, especificaciones, infoCliente, infoNotas, status, formaPago, total) {

    // Private attributes
    var _id = undefined;
    var _orderNumber = undefined;
    var _customerName = undefined;
    var _customerAddress = undefined;
    var _customerInterior = undefined;
    var _customerEntreCalles = undefined;
    var _customerComentario = undefined;
    var _customerPortero = undefined;
    var _customerPhone = undefined;
    var _customerCity = undefined;
    var _prov = undefined;
    var _prov2 = undefined;
    var _servicios = undefined;
    var _especificaciones = undefined;
    var _infoCliente = undefined;
    var _infoNotas = undefined;
    var _status = undefined;
    var _formaPago = undefined;
    var _total = undefined;

    /**
     *
     * @param id
     * @param orderNumber
     * @param customerName
     * @param customerAddress
     * @param customerInterior
     * @param customerEntreCalles
     * @param customerComentario
     * @param customerPortero
     * @param customerPhone
     * @param customerCity
     * @param prov
     * @param prov2
     * @param servicios
     * @param especificaciones
     * @param infoCliente
     * @param infoNotas
     * @param status
     * @param formaPago
     * @param total
     */

    this.constructor = function(id, orderNumber, customerName, customerAddress, customerInterior, customerEntreCalles, customerComentario, customerPortero, customerPhone, customerCity, prov, prov2, servicios, especificaciones, infoCliente, infoNotas, status, formaPago, total) {
        this.setId(id);
        this.setOrderNumber(orderNumber);
        this.setCustomerName(customerName);
        this.setCustomerAddress(customerAddress);
        this.setCustomerInterior(customerInterior);
        this.setCustomerEntreCalles(customerEntreCalles);
        this.setCustomerComentario(customerComentario);
        this.setCustomerPortero(customerPortero);
        this.setCustomerPhone(customerPhone);
        this.setCustomerCity(customerCity);
        this.setProv(prov);
        this.setProv2(prov2);
        this.setServicios(servicios);
        this.setEspecificaciones(especificaciones);
        this.setInfoCliente(infoCliente);
        this.setInfoNotas(infoNotas);
        this.setStatus(status);
        this.setFormaPago(formaPago);
        this.setTotal(total);
    };

    /**
     *
     * @returns {undefined}
     */
    this.getId = function(){
        return _id;
    };

    /**
     *
     * @param id
     */
    this.setId = function(id){
        _id = id;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getOrderNumber = function(){
        return _orderNumber;
    };

    /**
     *
     * @param orderNumber
     */
    this.setOrderNumber = function(orderNumber){
        _orderNumber = orderNumber;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerName = function(){
        return _customerName;
    };

    /**
     *
     * @param customerName
     */
    this.setCustomerName = function(customerName){
        _customerName = customerName;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerAddress = function(){
        return _customerAddress;
    };

    /**
     *
     * @param customerAddress
     */
    this.setCustomerAddress = function(customerAddress){
        _customerAddress = customerAddress;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerInterior = function(){
        return _customerInterior;
    };

    /**
     *
     * @param customerEntreCalles
     */
    this.setCustomerInterior = function(customerInterior){
        _customerInterior = customerInterior;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerEntreCalles = function(){
        return _customerEntreCalles;
    };

    /**
     *
     * @param customerEntreCalles
     */
    this.setCustomerEntreCalles = function(customerEntreCalles){
        _customerEntreCalles = customerEntreCalles;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerComentario = function(){
        return _customerComentario;
    };

    /**
     *
     * @param customerComentario
     */
    this.setCustomerComentario = function(customerComentario){
        _customerComentario = customerComentario;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerPortero = function(){
        return _customerPortero;
    };

    /**
     *
     * @param customerPortero
     */
    this.setCustomerPortero = function(customerPortero){
        _customerPortero = customerPortero;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerPhone = function(){
        return _customerPhone;
    };

    /**
     *
     * @param customerPhone
     */
    this.setCustomerPhone = function(customerPhone){
        _customerPhone = customerPhone;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCustomerCity = function(){
        return _customerCity;
    };

    /**
     *
     * @param customerCity
     */
    this.setCustomerCity = function(customerCity){
        _customerCity = customerCity;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getProv = function(){
        return _prov;
    };

    /**
     *
     * @param prov
     */
    this.setProv = function(prov){
        _prov = prov;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getProv2 = function(){
        return _prov2;
    };

    /**
     *
     * @param prov2
     */
    this.setProv2 = function(prov2){
        _prov2 = prov2;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getServicios = function(){
        return _servicios;
    };

    /**
     *
     * @param servicios
     */
    this.setServicios = function(servicios){
        _servicios = servicios;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getEspecificaciones = function(){
        return _especificaciones;
    };

    /**
     *
     * @param especificaciones
     */
    this.setEspecificaciones = function(especificaciones){
        _especificaciones = especificaciones;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getInfoCliente = function(){
        return _infoCliente;
    };

    /**
     *
     * @param infoCliente
     */
    this.setInfoCliente = function(infoCliente){
        _infoCliente = infoCliente;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getInfoNotas = function(){
        return _infoNotas;
    };

    /**
     *
     * @param infoNotas
     */
    this.setInfoNotas = function(infoNotas){
        _infoNotas = infoNotas;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getStatus = function(){
        return _status;
    };

    /**
     *
     * @param status
     */
    this.setStatus = function(status){
        _status = status;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getFormaPago = function(){
        return _formaPago;
    };

    /**
     *
     * @param formaPago
     */
    this.setFormaPago = function(formaPago){
        _formaPago = formaPago;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getTotal = function(){
        return _total;
    };

    /**
     *
     * @param total
     */
    this.setTotal = function(total){
        _total = total;
    };

    /**
     *
     * @returns {string}
     */
    this.toString = function() {
        return 'Booking[' +
                'id: ' + _id +
                ', orderNumber: ' + _orderNumber +
                ', customerName: ' + _customerName +
                ', customerAddress: ' + _customerAddress +
                ', customerInterior: ' + _customerInterior +
                ', customerEntreCalles: ' + _customerEntreCalles +
                ', customerComentario: ' + _customerComentario +
                ', customerPortero: ' + _customerPortero +
                ', customerPhone: ' + _customerPhone +
                ', customerCity: ' + _customerCity +
                ', prov: ' + _prov +
                ', prov2: ' + _prov2 +
                ', servicios: ' + _servicios +
                ', especificaciones: ' + _especificaciones +
                ', infoCliente: ' + _infoCliente +
                ', infoNotas: ' + _infoNotas +
                ', status: ' + _status +
                ', formaPago: ' + _formaPago +
                ', total: ' + _total +
            ']'
    }

    this.constructor(id, orderNumber, customerName, customerAddress, customerInterior, customerEntreCalles, customerComentario, customerPortero, customerPhone, customerCity, prov, prov2, servicios, especificaciones, infoCliente, infoNotas, status, formaPago, total);

};