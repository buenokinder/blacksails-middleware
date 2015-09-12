'use strict';
app.controller('sistemasController', ['$scope', 'sistemasService', 'authService', function ($scope, sistemasService, authService) {

    $scope.sistemas = [];
    $scope.sistema = [];

    sistemasService.getSistemas(authService.authentication.userName, callbackGetSistemas);

    function callbackGetSistemas(result, status) {
        if (status == null)
            $scope.sistemas = angular.fromJson(result._Lista);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    $scope.RefreshLista = function () {
        sistemasService.getSistemas(authService.authentication.userName, callbackGetSistemas);
    };

    $scope.setSelected = function () {
        console.log(this.sistema);
        $scope.sistemaSelected = this.sistema;
        
        $scope.correctlySelected = this.sistemaSelected.id_perfil;
        $('#first').click();
        //$('#IncluirModal').modal('show');
    };

    $scope.setNovo = function () {
        $scope.sistemaSelected = { id: '', nome: '' };
        $('#first').click();
    };

    $scope.delete = function (sistema) {        
        $scope.sistema = sistema;
        $('#ConfirmacaoModal').modal('show');
    };

    $scope.deleteConfirmed = function () {
        sistemasService.deleteSistemas($scope.sistema.id, callbackDeleteConfirmed);
    };

    function callbackDeleteConfirmed(result, status) {
        $('#ConfirmacaoModal').modal('hide');
        if (status == null){
            $scope.alertNotification('O sistema desejado foi deletado com sucesso.', 'success');
            $scope.RefreshLista();
        }
        else{
            $scope.alertNotification('Ocorreu um erro ao deletar o sistema desejado. Tente novamente mais tarde.', 'danger');
        }
    }
}]);