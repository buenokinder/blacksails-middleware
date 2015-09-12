'use strict';
app.factory('workflowService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var workflowsServiceFactory = {};

    var _getWorkflows = function (username, callback) {

        $http.get(serviceBase + 'api/Matrix/repository/workflowsistema?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _getWorkflowBySistema = function (sistema, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/workflowsistema?Page=1&PageSize=20&parameters={\'@sistema\': \'' + sistema + '\'}').success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _getWorkflowId = function (id, callback) {

        $http.get(serviceBase + 'api/Matrix/repository/workflowsistema/' + id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
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

    var _deleteWorkflows = function (Id, callback) {
        $http.delete(serviceBase + 'api/Matrix/repository/workflow/' + Id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    workflowsServiceFactory.postWorkflows = _postWorkflows;

    workflowsServiceFactory.getWorkflows = _getWorkflows;

    workflowsServiceFactory.deleteWorkflows = _deleteWorkflows;

    workflowsServiceFactory.getWorkflowBySistema = _getWorkflowBySistema;

    workflowsServiceFactory.getWorkflowId = _getWorkflowId;

    workflowsServiceFactory.postWorkflowsUpdate = _postWorkflowsUpdate;


    return workflowsServiceFactory;

}]);