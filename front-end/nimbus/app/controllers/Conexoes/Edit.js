'use strict';
app.controller('conexoesEditController', ['$scope', 'conexoesService', 'authService', '$location', function ($scope, conexoesService, authService, $location ) {
    $scope.conexaoPost = angular.fromJson({});
    $scope.message = '';
    $scope.conexaoSelected = { id: '', nome: '', stringconexao_cript: '', tipoconexao:'' };
    $scope.bancos =[{ id:'1' , name: 'Sql Server'}, { id:'2' , name: 'Oracle'} , { id:'0' , name: 'SqLite'}];
     $scope.banco = [];
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function CallBackAddConexoes(mensagem, status) {
        if (status == null) {
            $scope.alertNotification('A Conexão foi gravada com sucesso.', 'success');
             $location.path('/conexoes');
            $scope.conexaoSelected = { id: '', nome: '', stringconexao_cript: '' };
        } else
            $scope.alertNotification('Ocorreu um erro ao tentar incluir a conexão.', 'danger');
    }

    $scope.addConexao = function () {
        $scope.conexaoSelected.id = generateUUID();
        $scope.conexaoSelected.tipoconexao= $scope.banco.id;
        conexoesService.postConexoes($scope.conexaoSelected, authService.authentication.userName, generateUUID(), CallBackAddConexoes);
    };
}]);