'use strict';
app.controller('sistemasShowController', ['$scope', 'sistemasService', 'authService', '$routeParams', 'conexoesService', function ($scope, sistemasService, authService, $routeParams, conexoesService) {
    $scope.sistemaSelected = { id: '', nome: '', connectionstring: '', databasetype: '' };
    $scope.autenticacao = { id: '', query: '', sistema_id: '', conexao_id: '' };
    sistemasService.getSistemaId($routeParams.id, callbackGetSistemasId);
    sistemasService.getAutenticacao($routeParams.id, callbackGetAutenticacaoId);

    $scope.conexoes = [];
    
    $scope.conexao = [];
    function callbackGetSistemasId(result, status) {
        if (status == null)            {
            $scope.sistemaSelected = angular.fromJson(result);
            
            
        }
            
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');
    }


    function callbackGetAutenticacaoId(result, status) {
        if (status == null)
            $scope.autenticacao = angular.fromJson(result);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');

        conexoesService.getConexoes(authService.authentication.userName, callbackGetConexao);
    }



    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };


    function callbackGetConexao(results, status) {
        if (status == null) {
            $scope.conexoes = angular.fromJson(results._Lista);
            console.log($scope.conexoes);
            console.log($scope.autenticacao.conexao_id);
            $scope.conexao.id = $scope.autenticacao.conexao_id;

        }
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de conexões no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    function CallBackAddSistemas(mensagem, status) {
        if (status == null) {
            $scope.alertNotification('O Sistema foi alterado com sucesso.', 'success');
        }
        else
        $scope.alertNotification('Ocorreu um erro ao tentar alterar o sistema.', 'danger');

    }

    function CallBackAddAtenticacao(mensagem, status) {
        if (status == null) {
            $scope.alertNotification('O Sistema foi alterado com sucesso.', 'success');
        }
        else
            $scope.alertNotification('Ocorreu um erro ao tentar alterar o sistema.', 'danger');

    }


    $scope.change = function (conexao) {
        console.log(conexao.id);
        $scope.autenticacao.conexao_id = conexao.id;
    };


    

    
    $scope.addAutenticacao = function (autenticacaoSelected) {
        console.log(autenticacaoSelected);
        autenticacaoSelected.sistema_id = $scope.sistemaSelected.id;
        $scope.autenticacao = autenticacaoSelected;

        //$scope.autenticacao.id = autenticacaoSelected.id;
        if (autenticacaoSelected.id == '') {
            autenticacaoSelected.id = generateUUID();
            sistemasService.postAutenticacao (autenticacaoSelected, authService.authentication.userName, CallBackAddAtenticacao);
        } else {
            sistemasService.postAutenticacaoUpdate(autenticacaoSelected, authService.authentication.userName, CallBackAddAtenticacao);
        }
        
    };

    $scope.addSistema = function (sistemaSelected) {
        sistemasService.postSistemasUpdate($scope.sistemaSelected, authService.authentication.userName, CallBackAddSistemas);
    };
}]);
