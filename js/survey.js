(function(){
    'use strict';
    var app = angular
        .module('app')
        .controller('SurveyController', SurveyController);

        SurveyController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'api', '$http'];

        function SurveyController($scope, $rootScope, $state, $stateParams, api, $http)
        {
            var vm = this;
            vm.d = "dfsdsd sdgfdsg dgdf sg fdgd";
            vm.survey = [];
            vm.save = save;
            vm.i = 0;
            vm.success = 0;
            vm.disabled = undefined;
            vm.searchEnabled = undefined;
            vm.clear = function() {
                vm.person.selected = undefined;
                vm.address.selected = undefined;
                vm.country.selected = undefined;
              };
            vm.object = [];
            if (api)
                    api.getAllQuestions()
                        .then(function(response) {
                            vm.response = response.data;
                            
                            for (var i = 0; i<vm.response.length; i++)
                                {
                                    vm.response[i].number = i;
                                }
                            
                        }).catch(function(err){});
                                     

            //the resulting object is in object array                
            function save()
            {
                vm.dataLoading = true;
                
                for (var i = 0, l = vm.survey.length; i < l; i++)
                    {
                        var item = {};
                        item.answers = vm.survey[i.toString()];
                        if (vm.response[i].kind == 'multi')
                            {
                                for (var j = 0; j<item.answers.length; j++)
                                    {
										var text = vm.survey[i.toString()][j];
										console.log('### ' + text);
                                        var answerIndex = vm.response[i].answers.findIndex((obj => obj.text == text));
                                        var id = vm.response[i].answers[answerIndex].id;
										item.answers[j] = {
											'text': text,
											'id': id
										};
                                    }
                            }
                            
						item.id = vm.response[i].id;
                        item.kind = vm.response[i].kind;
                        vm.object[i] = item;
                        console.log(vm.object[i]);
                    }
                var t = vm.success;
                //$state.go("response", {success: vm.success});

                           /*$http({
                            url: encodeURI('https://cc-survey-api.herokuapp.com/api/save'),
                            method: "POST",
                            data: vm.object,
                            headers: {
                                'Content-Type' : "text/plain"
                            }
                        })
                        .then(function(response) {
                            var t = vm.success;
                            $state.go("response", {success: vm.success});
                        }, 
                        function(response) { // optional
                                // failed
                                $state.go("response", {success: 1});
                        });*/
                        
                    api.save(vm.object)
                        .then(function() {
                            //#TODO handle the response 
                            //use the dely to display progress bar
                            var t = vm.success;
                            $state.go("response", {success: vm.success});
                        },
                        function(response) { // optional
                            // failed
                            $state.go("response", {success: 1});
                    }
                    );
        }
        }
})();
