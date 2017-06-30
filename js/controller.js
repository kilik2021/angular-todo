angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('RegisterController', function($scope, UserAIPService) {

        $scope.registrationUser = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                UserAIPService.registerUser(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("You have successfully registered to AngularTodo");
                }).catch(function(err) {
                    alert("Oops! Something went wrong!");
                    console.log(err);
                });
            }
        };
    });
