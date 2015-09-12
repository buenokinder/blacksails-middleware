'use strict';
app.controller('conexoesController', ['$scope', 'assuntosService', 'authService', function ($scope, assuntosService,authService) {

    $scope.conexoes = [];








    assuntosService.getConexoes(authService.authentication.userName).then(function (results) {
        $scope.conexoes = angular.fromJson(results.data.lista);

    }, function (error) {
        alert(error.data.message);
    });



    $scope.setSaveConexao = function () {
        
        assuntosService.postConexoes(this.conexaoSelected, authService.authentication.userName);
        $('#IncluirModal').modal('hide');
    }
    this.addSistema = function(value){
        sistemasService.postSistemas(value);
        $('#IncluirModal').modal('hide');
    };

    $scope.setSelected = function () {

        $scope.conexaoSelected = this.conexao;
        console.log($scope.conexaoSelected.sistema_id);
        $scope.correctlySelected = this.conexaoSelected.id_perfil;
        $('#first').click();
        $('#IncluirModal').modal('show');

    };

    $scope.setNovo = function () {
        $scope.conexaoSelected = {id: '', nome: ''};
        $('#first').click();
        $('#IncluirModal').modal('show');

    };

    $scope.delete = function () {
        assuntosService.deleteConexao(this.conexao.id).then(
            function( success ) {
                console.log(success);
            },
            function( errorMessage ) {
                console.log(errorMessage);
            }
        );

    };


}]);