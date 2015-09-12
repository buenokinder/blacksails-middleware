'use strict';
app.filter('getById', function () {
    return function (input, id) {

        var i = 0, len = input.length;
        for (; i < len; i++) {

            if (input[i].id == id) {

                return input[i];
            }
        }
        return null;
    }
});
app.controller('workflowIndexController', ['$scope', 'workflowService', 'sistemasService', '$filter', 'authService', function ($scope, workflowService, sistemasService, $filter, authService) {

    $scope.editEnable = true;
    $scope.acaoworkflow = { "id": '', "tipoquery_id": '', "query": '', "assunto_id": '' };
    $scope.operacoes = { "id": '', "tipoquery_id": '', "query": '', "assunto_id": '' };
    $scope.parametro = { "id": '', "parametro": '', "tipodadoid": '', "assunto_query_id": '' };
    $scope.parametros = {};
    $scope.idquery = [];
    $scope.alerts = [];
    $scope.alertsAcao = [];
    $scope.Update = false;
    $scope.id = [];
    $scope.workflows = [];
    $scope.workflow = [];
    $scope.conexoes = [];
    $scope.tipos = [];
    $scope.parametrotipos = [];
    $scope.tipagens = [];
    $scope.queries = [];
    $scope.conexao = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    sistemasService.getSistemas(authService.authentication.userName, callbackGetSistemas);

    function callbackGetSistemas(result, status) {
        if (status == null)
            $scope.sistemas = angular.fromJson(result._Lista);
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de sistemas no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    $scope.changeSistema = function (sistema) {
        workflowService.getWorkflowBySistema(sistema.id).then(function (results) {
            $scope.workflows = angular.fromJson(results.data._Lista);
        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.delete = function (workflow) {
        $scope.workflow = workflow;
        $('#ConfirmacaoModal').modal('show');
    };

    $scope.deleteConfirmed = function () {
        workflowService.delete(workflow.id).then(
              function (success) {
                  workflowService.getWorkflowBySistema(sistema.id).then(function (results) {
                      $scope.workflows = angular.fromJson(results.data._Lista);
                  }, function (error) {
                      alert(error.data.message);
                  });
              },
              function (errorMessage) {
                  console.log(errorMessage);
              }
          );

        $('#ConfirmacaoModal').modal('hide');
    };
}]);