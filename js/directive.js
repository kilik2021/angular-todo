angular.module('TodoDirective', []).directive('todoTable', function() {
    return {
        restrict: 'A',      // A -> attribute
        templateUrl: 'templates/directives/todo-table.html'
    };
});

angular.module('UserStatusDirective', []).directive('userStatus', function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/directives/user-status.html'
    };
});
