'use strict';
app.controller('apiController', ['$scope', 'apiService', 'sistemasService', 'authService', function ($scope, apiService, sistemasService, authService) {
    $scope.alerts = [];
    $scope.alertsAcao = [];
    $scope.id = [];
    $scope.sistemas = [];
    $scope.sistema = [];
    $scope.assunto_id = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    function callbackGetSistemas(results, status) {
        if (status == null)
            $scope.sistemas = angular.fromJson(results._Lista);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de conexões no banco de dados. Tente novamente mais tarde.', 'danger');
    }


    sistemasService.getSistemas(authService.authentication.userName, callbackGetSistemas);

    $scope.changeSistema = function (sistema) {
        apiService.getAssuntosBySistema(sistema.id).then(function (results) {
            $scope.assuntos = angular.fromJson(results.data._Lista);

        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.confirmDelete = function (assunto) {
        $scope.assunto_id = assunto.id;
        $("#ConfirmacaoModal").modal('show');
    };

    $scope.delete = function () {
        apiService.deleteAssunto($scope.assunto_id).then(function (results) {
            apiService.getAssuntosBySistema($scope.sistema.id).then(function (results) {
                $scope.assuntos = angular.fromJson(results.data._Lista);

            }, function (error) {
                alert(error.data.message);
            });
        }, function (error) {
            alert(error.data.message);
        });

        $("#ConfirmacaoModal").modal('hide');
    };
}]);