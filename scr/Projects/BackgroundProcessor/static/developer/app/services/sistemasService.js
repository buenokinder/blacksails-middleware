'use strict';
app.factory('sistemasService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var sistemasServiceFactory = {};

    var _getSistemas = function (username) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/sistema?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').then(function (results) {

            return results;
        });
    };



    var _postSistemas = function (Data,UserName) {       

        $http.post(serviceBase + 'api/Matrix/repository/sistema/save', Data).success(function (response) {
            $http.post(serviceBase + 'api/Matrix/repository/usuariosistema/save', { id: "", username: UserName, sistemaid: response.split("\"").join("") }).success(function (response) { });
            $('#SucessoModal').modal('show');
        }).error(function (err, status) {            
            return null;
        });
    };


    var _deleteSistemas = function (Id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Matrix/repository/sistema/' + Id,
            data: null
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

    sistemasServiceFactory.postSistemas = _postSistemas;

    sistemasServiceFactory.getSistemas = _getSistemas;

    sistemasServiceFactory.deleteSistemas = _deleteSistemas;

    return sistemasServiceFactory;

}]);