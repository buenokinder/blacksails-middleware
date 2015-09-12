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

    workflowService.getWorkflowId($routeParams.id).then(function (results) {
        $scope.workflowSelected = angular.fromJson(results.data);

        console.log($scope.workflowSelected);

        sistemasService.getSistemas(authService.authentication.userName).then(function (results) {

            $scope.sistemas = angular.fromJson(results.data._Lista);
            $scope.sistemaSelect.id = $scope.workflowSelected.sistema_id;
        }, function (error) {
        });

        $scope.id = $scope.workflowSelected.id;

        workflowParametrosService.getParametrosPorWorkflow($scope.workflowSelected.id).then(function (results) {
            $scope.parametros = angular.fromJson(results.data._Lista);

        }, function (error) {
            console.log("erro");
            alert(error.data.message);
        });

    }, function (error) {
        //alert(error.data.message);
    });

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
        workflowParametrosService.deleteParametros($scope.parametro_slice).then(
       function (success) {
           console.log(success);
           $scope.RefreshListaParametros();
       },
       function (errorMessage) {
           console.log(errorMessage);
           $scope.RefreshListaParametros();
       }
   );

        $("#ConfirmacaoModalDeleteParam").modal('hide');
    };

    $scope.addWorkflow = function () {
        workflowService.postWorkflowsUpdate($scope.workflowSelected, CallBackSaveConfig);
    };

    function CallBackSaveConfig(mensagem, status) {
        workflowService.getWorkflowId($routeParams.id).then(function (results) {
            $scope.workflowSelected = angular.fromJson(results.data);

            $scope.sistema.id = $scope.workflowSelected.sistema_id;
            $scope.id = $scope.workflowSelected.id;
        });

        setTimeout(function () {
            $("div.alert").remove();
        }, 3000);
    }

    function CallBackSaveAcaoParametroConfig(mensagem, status) {
        $scope.parametro = { id: '', nome: '', valor: '', workflowsistema_id: '' };
        $scope.RefreshListaParametros();
        setTimeout(function () {
            $('#AddParameter').modal('hide');
            $("div.alert").remove();
        }, 3000);
    }

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.RefreshListaParametros = function () {

        workflowParametrosService.getParametrosPorWorkflow($scope.id).then(function (results) {
            $scope.parametros = angular.fromJson(results.data._Lista);
        }, function (error) {
            alert(error.data.message);
        });

    };
}]);