'use strict';
app.controller('workflowShowController', ['$scope', 'workflowService', 'sistemasService', 'workflowParametrosService', 'authService', '$routeParams', function ($scope, workflowService, sistemasService, workflowParametrosService, authService, $routeParams) {

    $scope.parametro = { id: '', parametro: '', valor: '', workflowsistema_id: '' };
    $scope.parametroPost = { id: '', parametro: '', valor_cript: '', workflowsistema_id: '' };
    $scope.parametros = [];
    $scope.parametro_slice = [];
    $scope.id = [];
    $scope.sistemas = [];
    $scope.sistemaSelect = [];
    $scope.workflowSelected = { id: '', nome: '', sistema_id: '' };

    workflowService.getWorkflowId($routeParams.id, callbackGetWorkflow);

    function callbackGetWorkflow(result, status) {
        if (status == null){
            $scope.workflowSelected = angular.fromJson(result.data);
            $scope.id = $scope.workflowSelected.id;

            sistemasService.getSistemas(authService.authentication.userName, callbackGetSistemas);
            workflowParametrosService.getParametrosPorWorkflow($scope.workflowSelected.id, callbackGetParametro);
        }
        else
            $scope.alertNotification('Ocorreu um erro ao buscar o Workflow desejado. Tente novamente mais tarde.', 'danger');
    }

    function callbackGetParametro(result, status) {
        if (status == null) {
            $scope.parametros = angular.fromJson(results.data._Lista);
        }
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de parâmetros de Workflow no banco de dados. Tente novamente mais tarde.', 'danger');
    } 

    function callbackGetSistemas(result, status) {
        if (status == null){
            $scope.sistemas = angular.fromJson(results.data._Lista);
            $scope.sistemaSelect.id = $scope.workflowSelected.sistema_id;
        }
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');
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

    $scope.setAdd = function () {
        $scope.parametroPost.id = generateUUID();
        $scope.parametroPost.workflowsistema_id = $scope.id;
        $scope.parametroPost.valor_cript = $scope.parametro.valor;
        $scope.parametroPost.parametro = $scope.parametro.parametro;        
        
        workflowParametrosService.postParametros($scope.parametro, CallBackSaveAcaoParametroConfig);
    };

    $scope.changeSelectSistema = function (sistema) {
        $scope.workflowSelected.sistema_id = sistema.id;
    };

    $scope.deleteParametros = function (index) {
        $("#ConfirmacaoModalDeleteParam").modal('show');
        $scope.parametro_slice = index;
    };

    $scope.deleteParametrosConfirmed = function () {
        workflowParametrosService.deleteParametros($scope.parametro_slice, callbackDeleteParametro);

        $("#ConfirmacaoModalDeleteParam").modal('hide');
    };

    function callbackDeleteParametro(mensagem, status) {
        if (status == null) {
            $scope.alertNotification('Parâmetro de Workflow deletado com sucesso.', 'success');
        }
        else
            $scope.alertNotification('Ocorreu um erro ao deletar o parâmetro de Workflow desejado. Tente novamente mais tarde.', 'danger');

        $scope.RefreshListaParametros();
    }

    $scope.addWorkflow = function () {
        workflowService.postWorkflowsUpdate($scope.workflowSelected, CallBackSaveConfig);
    };

    function CallBackSaveConfig(mensagem, status) {
        if (status == null) {
            $scope.alertNotification('O Workflow foi alterado com sucesso.', 'success');
            workflowService.getWorkflowId($routeParams.id, callbackGetWorkflow);
        }
        else
            $scope.alertNotification('Ocorreu um erro ao tentar alterar o Workflow. Tente novamente mais tarde.', 'danger');        
    }

    function CallBackSaveAcaoParametroConfig(mensagem, status) {
        if (status == null) {
            $scope.alertNotification('O Parâmetro foi gravado com sucesso.', 'success');
            $scope.parametro = { id: '', nome: '', valor: '', workflowsistema_id: '' };
            $scope.RefreshListaParametros();
        }
        else
            $scope.alertNotification('Ocorreu um erro ao incluir o parâmetro no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.RefreshListaParametros = function () {
        
        workflowParametrosService.getParametrosPorWorkflow($scope.id, callbackGetParametro);

    };
}]);