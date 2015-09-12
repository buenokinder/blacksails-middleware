'use strict';
app.controller('conexoesShowController', ['$scope', 'conexoesService', 'authService', '$routeParams', function ($scope, conexoesService, authService, $routeParams) {
    $scope.conexaoSelected = { id: '', nome: '', stringconexao: '' };
    $scope.conexaoSelectedPost = { id: '', nome: '', stringconexao_cript: '' };
    $scope.message = '';
    $scope.bancos =[{ id:'1' , name: 'Sql Server'}, { id:'2' , name: 'Oracle'} , { id:'0' , name: 'SqLite'}];
    
    $scope.banco =[];
 
    
        conexoesService.getConexaoId($routeParams.id, callbackGetConexaoId);
        
    
    function callbackGetConexaoId(results, status) {
        if (status == null)
          {  $scope.conexaoSelected = angular.fromJson(results);
             $scope.banco.id = $scope.conexaoSelected.tipoconexao;
             console.log($scope.banco.id);
}
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de conexões no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    function CallBackAddConexoes(mensagem, status) {
        console.log(mensagem);
        console.log(status);

        if (status == null)
        
        {$scope.alertNotification('A Conexão foi alterada com sucesso.', 'success');
             $location.path('/conexoes');
        }
        else
            $scope.alertNotification('Ocorreu um erro ao tentar alterar a conexão.', 'danger');
    }

    $scope.addConexao = function () {
        $scope.conexaoSelectedPost.id = $scope.conexaoSelected.id
        $scope.conexaoSelectedPost.nome = $scope.conexaoSelected.nome;
        $scope.conexaoSelectedPost.stringconexao_cript = $scope.conexaoSelected.stringconexao;

        $scope.conexaoSelectedPost.tipoconexao = $scope.banco.id;

        conexoesService.postConexoesUpdate($scope.conexaoSelectedPost, authService.authentication.userName, CallBackAddConexoes);
    };

}]);
