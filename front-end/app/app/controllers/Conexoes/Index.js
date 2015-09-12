'use strict';
app.controller('conexoesController', ['$scope', 'conexoesService', 'authService', function ($scope, conexoesService, authService) {

    $scope.conexoes = [];
    $scope.conexao = [];

    conexoesService.getConexoes(authService.authentication.userName, callbackGetConexoes);

    function callbackGetConexoes(results, status) {
        if (status == null)
            $scope.conexoes = angular.fromJson(results._Lista);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de conexões no banco de dados. Tente novamente mais tarde.', 'danger');
    }


    $scope.RefreshLista = function () {
        conexoesService.getConexoes(authService.authentication.userName, callbackGetConexoes);
    };

    $scope.setSelected = function () {
        console.log(this.sistema);
        $scope.conexoeselected = this.sistema;

        $scope.correctlySelected = this.conexoeselected.id_perfil;
        $('#first').click();
        //$('#IncluirModal').modal('show');
    };

    $scope.setNovo = function () {
        $scope.conexoeselected = { id: '', nome: '' };
        $('#first').click();
        //$('#IncluirModal').modal('show');

    };

    $scope.delete = function (conexao) {
        $scope.conexao = conexao;
        $('#ConfirmacaoModal').modal('show');
    };
    
    $scope.deleteConfirmed = function () {
        sistemasService.deleteSistemas($scope.conexao.id, callbackDeleteConfirmed);
    };

    function callbackDeleteConfirmed(result, status) {
        $('#ConfirmacaoModal').modal('hide');
        if (status == null) {
            $scope.alertNotification('A conexão desejada foi deletada com sucesso.', 'success');
            $scope.RefreshLista();
        }
        else {
            $scope.alertNotification('Ocorreu um erro ao deletar a conexão desejada. Tente novamente mais tarde.', 'danger');
        }
    }
}]);