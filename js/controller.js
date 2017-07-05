angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('UserDisplay', function($scope, UserDetails) {
        UserDetails.getUserDetails();
    })
    .controller('LoginController', function($scope, $location, UserAIPService, store) {
        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.loginData = {};

        $scope.submitForm = function() {
            if ($scope.loginForm.$valid) {
                $scope.loginData.username = $scope.user.username;
                $scope.loginData.password = $scope.user.password;

                UserAIPService.callAPI(URL + "accounts/api-token-auth/", $scope.loginData).then(function(results) {
                    store.set('username', $scope.loginData.username);
                    store.set('authToken', results.data.token);
                    alert("You have successfully Logged In to AngularTodo!");
                    $location.path('/todo');
                }).catch(function(err) {
                    alert("Oops! Something went wrong!\n\n" + err.data.non_field_errors);
                    console.log(err);
                });
            }
        };
    })
    .controller('LogoutController', function($scope, store) {
        store.remove('authToken');
        store.remove('username');
    })
    .controller('RegisterController', function($scope, $location, UserAIPService, store) {
        $scope.registrationUser = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.login = function() {
            UserAIPService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                $scope.token = results.data.token;
                store.set('username', $scope.registrationUser.username);
                store.set('authToken', $scope.token);
                $location.path('/todo');
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
                    alert("Oops! Something went wrong!\n\n" + err.data.username);
                    console.log(err);
                });
            }
        };
    })
    .controller('TodoController', function($scope, $location, TodoAPIService, store) {
        if (!store.get('authToken')) {
            alert("You need to be logged on to use this feature");
            $location.path('/accounts/login');
        }

        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.authToken = store.get('authToken');
        $scope.username = store.get('username');

        $scope.todos = [];

        $scope.editTodo = function(id) {
            $location.path("/todo/edit/" + id);
        };

        function getTodoList() {
            TodoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results) {
                $scope.todos = results.data || [];
                console.log($scope.todos);
            }).catch(function(err) {
                console.log(err);
            });
        }

        getTodoList();

        $scope.deleteTodo = function(id) {
            TodoAPIService.deleteTodo(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
                console.log(results);
                getTodoList();
            }).catch(function(err) {
                console.log(err);
            });
        };

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
                $scope.todos.push($scope.todo);

                TodoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                    console.log(results);
                    $('#todo-modal').modal('hide');
                    getTodoList();
                }).catch(function(err) {
                    console.log(err);
                });
            }
        };
    })
    .controller('EditTodoController', function($scope, $location, $routeParams, TodoAPIService, store) {
        var URL = "https://morning-castle-91468.herokuapp.com/";
        var id = $routeParams.id;

        TodoAPIService.getTodos(URL + "todo/" + id, $scope.username, store.get('authToken')).then(function(results) {
            $scope.todo = results.data;
        }).catch(function(err) {
            console.log(err);
        });

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;

                TodoAPIService.editTodo(URL + "todo/" + id, $scope.todo, store.get('authToken')).then(function(results) {
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err);
                });
            }
        };
    });
