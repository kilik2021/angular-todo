angular.module('UserService', [])
    .factory('UserAIPService', function($http) {
        UserAIPService = {
            callAPI: function(url, data) {
                return $http.post(url, data);
            }
        };
        return UserAIPService;
    });

angular.module('TodoService', [])
    .factory('TodoAPIService', function($http) {
        TodoAPIService = {
            getTodos: function(url, data, token) {
                var header = "Authorization: JWT " + token;
                return $http.get(url, {params:{"username": data}}, header);
            },
            createTodo: function(url, data, token) {
                var header = "Authorization: JWT " + token;
                return $http.post(url, data, header);
            }
        };
        return TodoAPIService;
    });
