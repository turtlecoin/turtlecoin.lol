(function () {
    'use strict';

    angular.module('trtlApp')
    .controller('trtlController', AppController);

    AppController.$inject = [];

    /**
    * @name trtlController
    * @param {Service} $mdDialog AngularJS Material dialog service.
    */
    function AppController () {

        let ctrl = {};

        ctrl.$onInit = function () {
            
        };

        return ctrl;
    };
})();
