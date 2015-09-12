'use strict';
app.controller('sistemasShowController', ['$scope', 'sistemasService', 'authService', '$routeParams', function ($scope, sistemasService, authService, $routeParams) {
    $scope.sistemaSelected = { id: '', nome: '', connectionstring: '', databasetype: '' };
    sistemasService.getSistemaId($routeParams.id, callbackGetSistemasId);

    function callbackGetSistemasId(result, status) {
        if (status == null)            
            $scope.sistemaSelected = angular.fromJson(result);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    function CallBackAddSistemas(mensagem, status) {
        if (status == null) {
            $scope.alertNotification('O Sistema foi alterado com sucesso.', 'success');
        }
        else
        $scope.alertNotification('Ocorreu um erro ao tentar alterar o sistema.', 'danger');

    }

    $scope.addSistema = function (sistemaSelected) {
        sistemasService.postSistemasUpdate($scope.sistemaSelected, authService.authentication.userName, CallBackAddSistemas);
    };
}]);
