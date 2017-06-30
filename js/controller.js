angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('RegisterController', function($scope, UserAIPService, store) {
        $scope.registrationUser = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.login = function() {
            UserAIPService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                $scope.token = results.data.token;
                store.set('username', $scope.registrationUser.username);
                store.set('authToken', $scope.token);
            }).catch(function(err) {
                console.log(err.data);
            });
        };

        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                UserAIPService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("You have successfully registered to AngularTodo");
                    $scope.login();
                }).catch(function(err) {
                    alert("Oops! Something went wrong!");
                    console.log(err);
                });
            }
        };
    });
