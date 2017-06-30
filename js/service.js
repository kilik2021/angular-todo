angular.module('UserService', [])
    .factory('UserAIPService', function($http) {

        UserAIPService = {
            callAPI: function(url, data) {
                return $http.post(url, data);
            }
        };
        return UserAIPService;
    });
