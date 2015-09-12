'use strict';
app.factory('conexoesService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var conexoesServiceFactory = {};

    var _getConexoes = function (username, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/conexao?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _getConexaoId = function (id, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/conexao/' + id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };


    var _postConexoes = function (Data, UserName, idFk, callback) {

        $http.post(serviceBase + 'api/Matrix/repository/conexao/save/new', Data).success(function (response) {
            $http.post(serviceBase + 'api/Matrix/repository/usuarioconexao/save/new', { id: idFk, username: UserName, conexaoid: Data.id }).success(function (response) {
                callback(response, null);
            });
        }).error(function (err, status) {
            callback(err, status);

        });
    };

    var _postConexoesUpdate = function (Data, UserName, callback) {
        $http.post(serviceBase + 'api/Matrix/repository/conexao/save/update', Data).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _deleteConexoes = function (Id, callback) {
        $http.delete(serviceBase + 'api/Matrix/repository/conexao/' + Id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    conexoesServiceFactory.postConexoes = _postConexoes;
    conexoesServiceFactory.postConexoesUpdate = _postConexoesUpdate;
    conexoesServiceFactory.getConexoes = _getConexoes;
    conexoesServiceFactory.deleteConexoes = _deleteConexoes;
    conexoesServiceFactory.getConexaoId = _getConexaoId;

    return conexoesServiceFactory;
}]);