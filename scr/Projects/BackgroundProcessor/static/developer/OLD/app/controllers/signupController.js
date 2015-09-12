'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {
            
                $scope.savedSuccessfully = true;
                $scope.message = "Usuário cadastrado com sucesso, você será regirecionado em 2 segundos.";
                startTimer();
           
            
            

        },
         function (response) {
            console.log(response);
             
             $scope.message = "Falha ao registrar usuario: " + response.data.message;
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

}]);