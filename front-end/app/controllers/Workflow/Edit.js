'use strict';
app.controller('workflowEditController', ['$scope', 'workflowService', 'sistemasService', 'workflowParametrosService', 'authService', function ($scope, workflowService, sistemasService, workflowParametrosService, authService) {

    $scope.parametro = { id: '', parametro: '', valor_cript: '', workflowsistema_id: '' };
    $scope.parametro_slice = [];
    $scope.parametros = [];
    $scope.id = generateUUID();
    $scope.sistemas = [];
    $scope.sistema = [];
    $scope.workflowSelected = { id: '', nome: '', sistema_id: '' };

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    sistemasService.getSistemas(authService.authentication.userName, callbackGetSistemas);

    function callbackGetSistemas(result, status) {
        if (status == null)
            $scope.sistemas = angular.fromJson(result._Lista);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    $scope.setAdd = function () {
        $scope.parametros.push({
            id: generateUUID(),
            parametro: $scope.parametro.parametro,
            valor_cript: $scope.parametro.valor_cript,
            workflowsistema_id: $scope.id
        });

        $scope.parametro = { id: '', parametro: '', valor_cript: '', workflowsistema_id: '' };
    };

    $scope.changeSelectSistema = function (sistema) {
        $scope.workflowSelected.sistema_id = sistema.id;
    };

    $scope.deleteParametros = function (index) {
        $("#ConfirmacaoModalDeleteParam").modal('show');
        $scope.parametro_slice = index;
    };

    $scope.deleteParametrosConfirmed = function () {
        $scope.parametros.splice(parametro_slice, 1);
        $("#ConfirmacaoModalDeleteParam").modal('hide');
    };

    $scope.addWorkflow = function () {
      
        $scope.workflowSelected.id = $scope.id;
        console.log($scope.workflowSelected);
        workflowService.postWorkflows($scope.workflowSelected, CallBackSaveWorkflow);

    };

    function CallBackSaveWorkflow(mensagem, status) {
        for (var i = 0; i < $scope.parametros.length; i++) {
            console.log($scope.parametros[i]);
            workflowParametrosService.postParametros($scope.parametros[i], CallBackSaveConfig);
        }

        $scope.parametro = { id: '', parametro: '', valor_cript: '', workflowsistema_id: '' };
        $scope.parametros = [];
        $scope.id = generateUUID();
        $scope.sistemas = [];
        $scope.sistema = [];

        $scope.workflowSelected = { id: '', nome: '', sistema_id: '' };

        $scope.alertNotification('O Workflow foi salvo com sucesso.', 'success');
    }

    function CallBackSaveConfig(mensagem, status) {
        if (status == null)
            $scope.alertNotification('Os parâmetros de Workflow foram salvos com sucesso.', 'success');
        else
            $scope.alertNotification('Ocorreu um erro ao gra a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');        
    }
}]);