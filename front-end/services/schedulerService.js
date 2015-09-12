'use strict';
app.factory('schedulerService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var schedulerServiceFactory = {};

    var _getSistemas = function (username) {
        $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
        return $http.get(serviceBase + 'api/Matrix/repository/sistema?Page=1&PageSize=10&parameters={\'@UserName\': \'' + username + '\' }').then(function (results) {

            return results;
        });
    };



    var _postSistemas = function (Data,UserName, callback) {       

        $http.post(serviceBase + 'api/Matrix/repository/sistema/save', Data).success(function (response) {
            $http.post(serviceBase + 'api/Matrix/repository/usuariosistema/save', { id: "", username: UserName, sistemaid: response.split("\"").join("") }).success(function (response) { });
            callback(response, null);
        }).error(function (err, status) {            
            callback(err, status);

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

    schedulerServiceFactory.postSistemas = _postSistemas;

    schedulerServiceFactory.getSistemas = _getSistemas;

    schedulerServiceFactory.deleteSistemas = _deleteSistemas;

    return schedulerServiceFactory;

}]);