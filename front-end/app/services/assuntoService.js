'use strict';
app.factory('assuntosService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var assuntosServiceFactory = {};

    var _getAssuntos = function () {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/assunto?Page=1&PageSize=20&parameters={\'@sistema\': \'00000000-0000-0000-0000-000000000000\'}').then(function (results) {
            return results;
        });
    };

    var _getOperadores = function () {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/operador?Page=1&PageSize=20&parameters={}').then(function (results) {
            return results;
        });
    };


    var _getParametroByQuery = function (query) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/ValidaParametro?Page=1&PageSize=10&parameters={\'@AssuntoQueryId\': \'' + query + '\'}').then(function (results) {
            return results;
        });
    };



    var _getAssuntosBySistema = function (sistema) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/assunto?Page=1&PageSize=20&parameters={\'@sistema\': \'' + sistema + '\'}').then(function (results) {
            return results;
        });
    };

    var _getConexoes = function (username) {

        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/Conexao?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').then(function (results) {
            return results;
        });
    };

    var _getTipoDados = function () {

        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/TipoDado?Page=1&PageSize=20&parameters={}').then(function (results) {
            return results;
        });
    };


    var _deleteConexao = function (Id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Matrix/repository/conexao/' + Id,
            data: null
        });

        return (request.then(handleSuccess, handleError));
    };

    var _deleteAssunto = function (Id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Matrix/repository/assunto/' + Id,
            data: null
        });

        return (request.then(handleSuccess, handleError));
    };

    var _postAssuntos = function (Data) {

        var request = $http({
            method: "post",
            url: serviceBase + 'api/Matrix/repository/assunto/save',
            data: Data
        });

        return (request.then(handleSuccess, handleError));





    };

    var _postParamentro = function (Data) {

        var request = $http({
            method: "post",
            url: serviceBase + 'api/Matrix/repository/ValidaParametro/save',
            data: Data
        });

        return (request.then(handleSuccess, handleError));





    };

    var _postConexoes = function (Data, UserName) {


        $http.post(serviceBase + 'api/Matrix/repository/conexao/save', Data).success(function (response) {
            $http.post(serviceBase + 'api/Matrix/repository/usuarioconexao/save', { id: "", username: UserName, conexaoid: response.split("\"").join("") }).success(function (response) {

            });



        }).error(function (err, status) {

            return null;
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

    assuntosServiceFactory.deleteAssunto == _deleteAssunto;

    assuntosServiceFactory.getOperadores = _getOperadores;

    assuntosServiceFactory.getConexoes = _getConexoes;

    assuntosServiceFactory.postConexoes = _postConexoes;
    assuntosServiceFactory.postAssuntos = _postAssuntos;

    assuntosServiceFactory.getAssuntos = _getAssuntos;
    assuntosServiceFactory.getAssuntosBySistema = _getAssuntosBySistema;

    assuntosServiceFactory.getTipoDados = _getTipoDados;
    assuntosServiceFactory.postParamentro = _postParamentro;

    assuntosServiceFactory.getParametroByQuery = _getParametroByQuery;


    assuntosServiceFactory.deleteConexao = _deleteConexao;


    return assuntosServiceFactory;

}]);