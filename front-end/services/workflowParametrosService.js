'use strict';
app.factory('workflowParametrosService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var workflowParametrosServiceFactory = {};

    var _getParametrosPorWorkflow = function (workflow_id) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/WorkflowParametros?Page=1&PageSize=10&parameters={\'@workflowsistema_id\': \'' + workflow_id + '\' }').then(function (results) {
            return results;
        });
    };

    var _deleteParametros = function (Id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Matrix/repository/WorkflowParametros/' + Id,
            data: null
        });

        return (request.then(handleSuccess, handleError));
    };

    var _postParametros = function (Data, callback) {
        $http.post(serviceBase + 'api/Matrix/repository/WorkflowParametros/save/new', Data).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);

        });
    };

    function handleError(response) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            !angular.isObject(response.data) ||
            !response.data.message
        ) {

            return ($q.reject("An unknown error occurred."));

        }

        // Otherwise, use expected error message.
        return ($q.reject(response.data.message));

    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {

        return (response.data);

    }

    workflowParametrosServiceFactory.getParametrosPorWorkflow = _getParametrosPorWorkflow;
    workflowParametrosServiceFactory.deleteParametros = _deleteParametros;
    workflowParametrosServiceFactory.postParametros = _postParametros;

    return workflowParametrosServiceFactory;

}]);