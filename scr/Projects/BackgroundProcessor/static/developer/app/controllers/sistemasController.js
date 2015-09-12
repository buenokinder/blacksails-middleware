'use strict';
app.controller('sistemasController', ['$scope', 'sistemasService', 'authService', function ($scope, sistemasService, authService) {

    $scope.sistemas = [];
 
    
  sistemasService.getSistemas(authService.authentication.userName).then(function (results) {
            $scope.sistemas = angular.fromJson(results.data.lista);
        
        }, function (error) {
            //alert(error.data.message);
        });

$scope.RefreshLista = function(){
        console.log("Aqui");
        sistemasService.getSistemas(authService.authentication.userName).then(function (results) {
           $scope.sistemas = angular.fromJson(results.data.lista);

        }, function (error) {
            alert(error.data.message);
        });
    };
    
    $scope.setSave = function () {
        sistemasService.postSistemas(this.sistemaSelected, authService.authentication.userName);
        $('#IncluirModal').modal('hide');
    }
    this.addSistema = function(value){
        sistemasService.postSistemas(value, authService.authentication.userName);
        $('#IncluirModal').modal('hide');
    };

    $scope.setSelected = function () {
        //console.log(this.sistema);
        $scope.sistemaSelected = this.sistema;
        console.log($scope.sistemaSelected.sistema_id);
        $scope.correctlySelected = this.sistemaSelected.id_perfil;
        $('#first').click();
        $('#IncluirModal').modal('show');
        
    };

    $scope.setNovo = function () {
        $scope.sistemaSelected = {id: '', nome: ''};
        $('#first').click();
        $('#IncluirModal').modal('show');
        
    };

    $scope.delete = function () {
        sistemasService.deleteSistemas(this.sistema.id).then(
            function( success ) {
                $scope.RefreshLista();
            },
            function( errorMessage ) {
                console.log(errorMessage);
            }
        );

    };

    
}]);