'use strict';
app.controller('conexoesEditController', ['$scope', 'conexoesService', 'authService', function ($scope, conexoesService, authService) {
    $scope.conexaoPost = angular.fromJson({});
    $scope.message = '';
    $scope.conexaoSelected = { id: '', nome: '', stringconexao_cript: '' };

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
            $scope.conexaoSelected = { id: '', nome: '', stringconexao_cript: '' };
        } else
            $scope.alertNotification('Ocorreu um erro ao tentar incluir a conexão.', 'danger');
    }

    $scope.addConexao = function () {
        $scope.conexaoSelected.id = generateUUID();
        conexoesService.postConexoes($scope.conexaoSelected, authService.authentication.userName, generateUUID(), CallBackAddConexoes);
    };
}]);