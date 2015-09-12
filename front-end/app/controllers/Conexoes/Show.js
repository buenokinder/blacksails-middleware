'use strict';
app.controller('conexoesShowController', ['$scope', 'conexoesService', 'authService', '$routeParams', function ($scope, conexoesService, authService, $routeParams) {
    $scope.conexaoSelected = { id: '', nome: '', stringconexao: '' };
    $scope.conexaoSelectedPost = { id: '', nome: '', stringconexao_cript: '' };
    $scope.message = '';

    conexoesService.getConexaoId($routeParams.id, callbackGetConexaoId);

    function callbackGetConexaoId(results, status) {
        if (status == null)
            $scope.conexaoSelected = angular.fromJson(results);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de conexões no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    function CallBackAddConexoes(mensagem, status) {
        console.log(mensagem);
        console.log(status);

        if (status == null)
            $scope.alertNotification('A Conexão foi alterada com sucesso.', 'success');
        else
            $scope.alertNotification('Ocorreu um erro ao tentar alterar a conexão.', 'danger');
    }

    $scope.addConexao = function () {
        $scope.conexaoSelectedPost.id = $scope.conexaoSelected.id
        $scope.conexaoSelectedPost.nome = $scope.conexaoSelected.nome;
        $scope.conexaoSelectedPost.stringconexao_cript = $scope.conexaoSelected.stringconexao;

        conexoesService.postConexoesUpdate($scope.conexaoSelectedPost, authService.authentication.userName, CallBackAddConexoes);
    };

}]);
