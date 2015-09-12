'use strict';
app.factory('sistemasService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var sistemasServiceFactory = {};

    var _getSistemas = function (username, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/sistema?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };
    var _getAutenticacao = function (idSistem, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/autenticacaosistema/' + idSistem).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };
    var _getSistemaId = function (id, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/sistema/' + id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };


    var _postSistemas = function (Data,UserName, idFk, callback) {      
        $http.post(serviceBase + 'api/Matrix/repository/sistema/save/new', Data).success(function (response) {
            $http.post(serviceBase + 'api/Matrix/repository/usuariosistema/save/new', { id: idFk, username: UserName, sistemaid: Data.id }).success(function (result) { callback(response, null); });
            
        }).error(function (err, status) {            
            callback(err, status);
        });
    };


    var _postAutenticacao = function (Data, UserName, idFk, callback) {
        $http.post(serviceBase + 'api/Matrix/repository/autenticacaosistema/save/new', Data).success(function (response) {

        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _postSistemasUpdate = function (Data, UserName, callback) {

        $http.post(serviceBase + 'api/Matrix/repository/sistema/save/update', Data).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };
    var _postAutenticacaoUpdate = function (Data, UserName, callback) {

        $http.post(serviceBase + 'api/Matrix/repository/autenticacaosistema/save/update', Data).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };
    var _deleteSistemas = function (Id, callback) {
        $http.delete(serviceBase + 'api/Matrix/repository/sistema/' + Id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };


    
    
    sistemasServiceFactory.postAutenticacaoUpdate = _postAutenticacaoUpdate;
    sistemasServiceFactory.postAutenticacao = _postAutenticacao;
    sistemasServiceFactory.getAutenticacao = _getAutenticacao;
    sistemasServiceFactory.postSistemas = _postSistemas;
    sistemasServiceFactory.getSistemas = _getSistemas;
    sistemasServiceFactory.deleteSistemas = _deleteSistemas;
    sistemasServiceFactory.getSistemaId = _getSistemaId;
    sistemasServiceFactory.postSistemasUpdate = _postSistemasUpdate;    
    
    return sistemasServiceFactory;
}]);