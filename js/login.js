(function(){
    'use strict';
    var app = angular
        .module('app')
        .controller('LoginController', LoginController);

        LoginController.$inject = ['$rootScope', '$timeout', '$state', 'AuthenticationService', 'FlashService'];

        function LoginController($rootScope, $timeout, $state, AuthenticationService, FlashService)
        {
            var vm = this;
            vm.survey = null;
            var success = false;
            vm.login = login;
            
            function login()
            {
                vm.dataLoading = true;
                AuthenticationService.Login(vm.username, vm.password, function (response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials(vm.username, vm.password);
                        $state.go('admin');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
            }
        }
})();