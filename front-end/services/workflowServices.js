'use strict';
app.factory('workflowService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var workflowsServiceFactory = {};

    var _getWorkflows = function (username) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/workflowsistema?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').then(function (results) {

            return results;
        });
    };

    var _getWorkflowBySistema = function (sistema) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/workflowsistema?Page=1&PageSize=20&parameters={\'@sistema\': \'' + sistema + '\'}').then(function (results) {
            return results;
        });
    };

    var _getWorkflowId = function (id) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/workflowsistema/' + id).then(function (results) {

            return results;
        });
    };

    var _postWorkflows = function (Data, callback) {

        $http.post(serviceBase + 'api/Matrix/repository/workflowsistema/save/new', Data).success(function (response) {
            
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);

        });
    };

    var _postWorkflowsUpdate = function (Data, UserName, callback) {

        $http.post(serviceBase + 'api/Matrix/repository/workflowsistema/save/update', Data).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);

        });
    };

    var _deleteWorkflows = function (Id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Matrix/repository/workflow/' + Id,
            data: null
        });

        return (request.then(handleSuccess, handleError));
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

    workflowsServiceFactory.postWorkflows = _postWorkflows;

    workflowsServiceFactory.getWorkflows = _getWorkflows;

    workflowsServiceFactory.deleteWorkflows = _deleteWorkflows;

    workflowsServiceFactory.getWorkflowBySistema = _getWorkflowBySistema;

    workflowsServiceFactory.getWorkflowId = _getWorkflowId;

    workflowsServiceFactory.postWorkflowsUpdate = _postWorkflowsUpdate;


    return workflowsServiceFactory;

}]);