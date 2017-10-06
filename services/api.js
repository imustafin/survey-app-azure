(function (angular) {

	var app = angular.module("app");

	function api($http, $sce) {
		//host = 'http://localhost:3000';
		host = 'https://cc-survey-api.herokuapp.com';
		return {
			getAllResponses: function(){
				return $http.get(host + '/api/responses');
			},
			getAllQuestions: function(){
				return $http.get(host + '/api/questions');

			},
			/*save: function(ancet){
			return $http.post('https://cc-survey-api.herokuapp.com/api/save', ancet);
		  },*/
			save: function(obj) {
				s = 'array=' + encodeURI(JSON.stringify(obj));
				console.log(s);
				return $http.get(host + '/api/save?' + s);
			}
		}

	};

	api.$inject = ["$http", "$sce"];
	app.factory("api", api);
})(angular);
