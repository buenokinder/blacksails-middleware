'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    this.logOut = function () {
        console.log("SAIR");
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;
}]);