(function(){
    'use strict';
    var app = angular
        .module('app')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['$window', '$rootscope', '$log', '$timeout', '$stateProvider'];

        function HomeController($window, $rootscope, $log, $timeout, $stateProvider)
        {

        }
})();