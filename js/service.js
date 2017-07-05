angular.module('UserService', [])
    .factory('UserAIPService', function($http) {
        UserAIPService = {
            callAPI: function(url, data) {
                return $http.post(url, data);
            }
        };
        return UserAIPService;
    })
    .factory('UserDetails', function($scope, store) {
        UserDetails = {
            getUserDetails: function() {
                if (!store.get('authToken')) {
                    $scope.userDetails.loginStatus = "Login";
                    $scope.userDetails.loginUrl = "/accounts/login";
                } else {
                    $scope.userDetails.loginStatus = "Welcome, " + store.get('username');
                    $scope.userDetails.loginStatus = "/accounts/logout";
                }
            }
        };
        return UserDetails;
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
            },
            editTodo: function(url, data, token) {
                var header = "Authorization: JWT " + token;
                return $http.put(url, data, header);
            },
            deleteTodo: function(url, data, token) {
                var header = "Authorization: JWT " + token;
                return $http.delete(url, token);
            }
        };
        return TodoAPIService;
    });
