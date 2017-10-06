(function(){
    'use strict';
    var app = angular
        .module('app')
        .controller('ResponseController', ResponseController);

        ResponseController.$inject = ['$rootScope', '$scope', '$state', '$timeout', '$stateParams', 'FlashService'];

        function ResponseController($rootScope, $scope, $state, $timeout, $stateParams, FlashService)
        {
            var g = $state.params;
            var success = $state.params.success;
            if (success == 0)
                {
                    FlashService.Success("The form was succesfully submitted");
                }
            else
                FlashService.Error("Failed to submit the form");
        }
})();