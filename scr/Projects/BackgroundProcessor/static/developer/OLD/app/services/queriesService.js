'use strict';
app.factory('queriesService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var queriesServiceFactory = {};

    var _getQueries = function () {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/AssuntoQuery?Page=1&PageSize=10&parameters={\'@assunto_id\': \'00000000-0000-0000-0000-000000000000\'}').then(function (results) {
            return results;
        });
    };

    var _getQueriesPorAssunto = function (assunto_id) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/AssuntoQuery?Page=1&PageSize=10&parameters={\'@assunto_id\': \'' + assunto_id + '\' }').then(function (results) {
            return results;
        });
    };



    var _getTipo = function () {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/TipoQuery?Page=1&PageSize=10&parameters=').then(function (results) {
            return results;
        });
    };

    var _deleteQueries = function (Id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Matrix/repository/AssuntoQuery/' + Id,
            data: null
        });

        return( request.then( handleSuccess, handleError ) );
    };


    var _postQueries = function (Data) {

        var request = $http({
            method: "post",
            url: serviceBase + 'api/Matrix/repository/AssuntoQuery/save',
            data: Data
        });

        return( request.then( handleSuccess, handleError ) );





    };
    function handleError( response ) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {

            return( $q.reject( "An unknown error occurred." ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {

        return( response.data );

    }


    queriesServiceFactory.getTipo = _getTipo;
    
    queriesServiceFactory.postQueries = _postQueries;

    queriesServiceFactory.getQueries = _getQueries;

    queriesServiceFactory.getQueriesPorAssunto = _getQueriesPorAssunto;
    queriesServiceFactory.deleteQueries = _deleteQueries;


    return queriesServiceFactory;

}]);