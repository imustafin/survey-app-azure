(function(){
    'use strict';
    var app = angular
        .module('app')
        .controller('IndexController', IndexController);

        IndexController.$inject = ['$window', '$rootScope', '$scope', '$localStorage'];

        function IndexController($window, $rootScope, $scope, $localStorage)
        {
            $rootScope.globals = $localStorage.get('globals') || {};
            $scope.t = true;
            var loggedIn = $rootScope.globals.currentUser;
            if (!loggedIn)
                {
                    $scope.t = false;
                }
        }
})();