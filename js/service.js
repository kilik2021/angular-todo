angular.module('UserService', [])
    .factory('UserAIPService', function($http) {

        UserAIPService = {
            registerUser: function(url, data) {
                return $http.post(url, data);
            }
        };
        return UserAIPService;
    });