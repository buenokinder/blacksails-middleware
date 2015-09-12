'use strict';
app.factory('usuarioService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var usuarioServiceFactory = {};

    var _getUsuarios = function (username, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/usuario?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _getUsuarioId = function (id, callback) {
        $http.get(serviceBase + 'api/Matrix/repository/usuario/' + id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };


    var _postUsuarios = function (Data, UserName, idFk, callback) {
        $http.post(serviceBase + 'api/Matrix/repository/usuario/save/new', Data).success(function (response) {
            $http.post(serviceBase + 'api/Matrix/repository/usuariosistema/save/new', { id: idFk, username: UserName, sistemaid: Data.id }).success(function (result) { callback(response, null); });

        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _postUsuariosUpdate = function (Data, UserName, callback) {

        $http.post(serviceBase + 'api/Matrix/repository/usuario/save/update', Data).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    var _deleteUsuarioss = function (Id, callback) {
        $http.delete(serviceBase + 'api/Matrix/repository/usuario/' + Id).success(function (response) {
            callback(response, null);
        }).error(function (err, status) {
            callback(err, status);
        });
    };

    sistemasServiceFactory.postUsuarios = _postUsuarios;
    sistemasServiceFactory.getUsuarios = _getUsuarios;
    sistemasServiceFactory.deleteUsuarios = _deleteUsuarios;
    sistemasServiceFactory.getUsuarioId = _getUsuarioId;
    sistemasServiceFactory.postUsuariosUpdate = _postUsuariosUpdate;

    return sistemasServiceFactory;
}]);