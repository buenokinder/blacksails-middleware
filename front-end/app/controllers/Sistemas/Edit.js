'use strict';
app.controller('sistemasEditController', ['$scope', 'sistemasService', 'authService', function ($scope, sistemasService, authService) {
    $scope.sistemaPost = angular.fromJson({});
    $scope.message = '';
    $scope.sistemaSelected = { id: '', nome: '', connectionstring: '', databasetype: '' };

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function CallBackAddSistemas(result, status) {
        if (status == null) {
            $scope.alertNotification('O Sistema foi gravado com sucesso.', 'success');
            $scope.sistemaSelected = { id: '', nome: '', connectionstring: '', databasetype: '' };
        } else {
            console.log(status);
            $scope.alertNotification('Ocorreu um erro ao tentar incluir o sistema.', 'danger');
        }
    }

    $scope.addSistema = function (sistemaSelected) {
        sistemaSelected.id = generateUUID();
        sistemasService.postSistemas(sistemaSelected, authService.authentication.userName, generateUUID(), CallBackAddSistemas);
    };

}]);