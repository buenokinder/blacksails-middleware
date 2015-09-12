'use strict';
app.factory('workflowParametrosService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var workflowParametrosServiceFactory = {};

    var _getParametrosPorWorkflow = function (workflow_id, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/WorkflowParametros?Page=1&PageSize=10&parameters={\'@workflowsistema_id\': \'' + workflow_id + '\' }').success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _deleteParametros = function (Id) {
        $http.delete(serviceBase + 'api/Matrix/repository/WorkflowParametros/' + Id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _postParametros = function (Data, callback) {
        $http.post(serviceBase + 'api/Matrix/repository/WorkflowParametros/save/new', Data).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);

        });
    };

    workflowParametrosServiceFactory.getParametrosPorWorkflow = _getParametrosPorWorkflow;
    workflowParametrosServiceFactory.deleteParametros = _deleteParametros;
    workflowParametrosServiceFactory.postParametros = _postParametros;

    return workflowParametrosServiceFactory;

}]);