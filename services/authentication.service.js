(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService', '$localStorage'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService, $localStorage) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {
            $timeout(function () {
                var response;
                if (username=="admin" && password=="admin123")
                    {
                        response = { success: true };   
                    }
                else
                {
                    response = { success: false, message: 'Логин или пароль неверны' };
                }
                callback(response);
                /**UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password == password) {
                            response = { success: true };
                        }
                        else {
                            response = { success: false, message: 'Логин или пароль неверны' };
                        }
                        callback(response);
                    });**/
            }, 1000);
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
        }

        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic' + authdata;

            //store user details in global cookie that keeps user logged in for 2 weeks or until they logout
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 14);
            //$cookieStore.put('globals', $rootScope.globals);
            //var k = $cookieStore.get('globals').currentUser;
            $localStorage.put('globals', $rootScope.globals);
            //var k = $localStorage.get('globals');
            //var mmm = 8;
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            //$cookieStore.remove('globals');
            $localStorage.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

    var Base64 = {
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output += this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("there were invalid charecters in the input");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do{
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output += String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
})();