'use strict';

app.filter('getById', function() {
    return function(input, id) {

        var i=0, len=input.length;
        for (; i<len; i++) {

            if (input[i].id == id) {

                return input[i];
            }
        }
        return null;
    }
});

app.controller('assuntosController', ['$scope', 'assuntosService','queriesService', 'sistemasService','$filter','authService', function ($scope, assuntosService,queriesService, sistemasService,$filter,authService) {

    var ScreenEnum = Object.freeze({ "list": 1, "create": 2, "update": 3 });
    $scope.editEnable = true;
    $scope.acaoApi =  {"id": '', "tipoquery_id": '', "query": '', "assunto_id": ''};
    $scope.operacoes ={"id": '', "tipoquery_id": '', "query": '', "assunto_id": ''};
    $scope.parametro =  {"id": '', "parametro": '', "tipodadoid": '', "assunto_query_id": ''};
    $scope.parametros = {};
    $scope.idquery = [];
    $scope.alerts = [];
    $scope.alertsAcao = [];
    $scope.Update = false;
    $scope.id = [];
    $scope.assuntos = [];
    $scope.sistemas = [];
    $scope.sistema = [];
    $scope.conexoes = [];
    $scope.screenDataEnum = ScreenEnum;
    $scope.screenData = ScreenEnum.list;
    $scope.tipos = [];
    $scope.parametrotipos = [];
    $scope.tipagens = [];
    $scope.queries = [];
    $scope.conexao =[];

    
    
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.changeTipo = function (tipo) {
        console.log(tipo);
        $scope.acaoApi.tipoquery_id = tipo.id;
        console.log($scope.acaoApi.tipoquery_id );
    };


    queriesService.getTipo().then(function (results) {
        console.log(results);
        $scope.tipos = angular.fromJson(results.data.lista);

    }, function (error) {
        //alert(error.data.message);
    });

    sistemasService.getSistemas(authService.authentication.userName).then(function (results) {
        $scope.sistemas = angular.fromJson(results.data.lista);
    }, function (error) {
    });

    assuntosService.getConexoes(authService.authentication.userName).then(function (results) {
        $scope.conexoes = angular.fromJson(results.data.lista);

    }, function (error) {
        //alert(error.data.message);
    });
    
      assuntosService.getTipoDados().then(function (results) {
        $scope.parametrotipos = angular.fromJson(results.data.lista);

    }, function (error) {
        //alert(error.data.message);
    });

     $scope.change = function (conexao) {
        console.log(conexao);
        $scope.assuntoSelected.conexao_id = conexao.id;
    };
    $scope.changeTipoParametro = function (TipoParametro) {
        
        $scope.parametro.tipodadoid = TipoParametro.id;
    };

    $scope.changeSistema = function (sistema) {
        console.log(sistema);
        assuntosService.getAssuntosBySistema(sistema.id).then(function (results) {
            console.log(JSON.stringify(results.data.lista));
            $scope.assuntos = angular.fromJson(results.data.lista);

        }, function (error) {
            alert(error.data.message);
        });
        $scope.assuntoSelected.sistema_id = sistema.id;
    };


    $scope.setAcao = function(){
        $('#AddAction').modal('show');
$scope.acaoApi = { id: '', query: ''};
    };

    $scope.editAcao = function(){
        $('#AddAction').modal('show');

    };

    $scope.deleteAcao = function(){
        queriesService.deleteQueries(this.query.id).then(
            function( success ) {
                console.log(success);
                $scope.RefreshListaAcao();
            },
            function( errorMessage ) {
                console.log(errorMessage);
            }
        );

    };

    $scope.plusAcao = function(){
        
        $scope.parametro.assunto_query_id = this.query.id;
        $('#PlusAction').modal('show');
        $scope.RefreshListaValidacao();
    };

    $scope.status = {
        open: true,
        open2:false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $scope.RefreshListaAcao = function(){
        queriesService.getQueriesPorAssunto($scope.id.split("\"").join("")).then(function (results) {
            console.log(JSON.stringify(results.data.lista));
            $scope.queries = angular.fromJson(results.data.lista);

        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.setSaveAcaoApi = function () {
        console.log($scope.acaoApi);
        $scope.acaoApi.assunto_id = $scope.id.split("\"").join("");
        queriesService.postQueries($scope.acaoApi).then(
            function( success ) {


                $scope.alertsAcao.push(  { type: 'success', msg: 'Ação Incluida com sucesso!' });
                $scope.RefreshListaAcao();
                setTimeout(function() {

                    $('#AddAction').modal('hide');
                    $("div.alert").remove();
                }, 3000);

            },
            function( errorMessage ) {
                console.log( errorMessage );
                $scope.alertsAcao.push(  { type: 'warning', msg: 'Erro ao incluir!' });
                setTimeout(function() {

                    $("div.alert").remove();
                }, 3000);
            }
        );



        $scope.editEnable = false;
        $scope.status.open = false;
        $scope.status.open2 = true;


    };
    
    
    $scope.RefreshListaParametros = function(){
        
        queriesService.getParametrosPorAssuntoQuery($scope.idAssuntoQuery.split("\"").join("")).then(function (results) {
            
            $scope.queries = angular.fromJson(results.data.lista);

        }, function (error) {
            alert(error.data.message);
        });
    };
    
    $scope.RefreshListaValidacao = function(){
        console.log("Aqui");
        assuntosService.getParametroByQuery(this.parametro.assunto_query_id).then(function (results) {
            console.log(JSON.stringify(results.data.lista));
            $scope.tipagens = angular.fromJson(results.data.lista);

        }, function (error) {
            alert(error.data.message);
        });
    };
    
  $scope.addParametro = function () {
        console.log(this.assuntoSelected);
        assuntosService.postParamentro(this.parametro).then(
            function( success ) {
                $scope.id =   success;
                console.log( $scope.id );
            },
            function( errorMessage ) {
                console.log( errorMessage );

            }
        );


        $scope.alerts.push(  { type: 'success', msg: 'Parametro Incluida com sucesso!' });
        $scope.editEnable = false;
        $scope.status.open = false;
        $scope.status.open2 = true;
        setTimeout(function() {
            $("div.alert").remove();
        }, 3000);
        $scope.RefreshListaValidacao();
        

    };

    $scope.setSave = function () {
        console.log(this.assuntoSelected);
        assuntosService.postAssuntos(this.assuntoSelected).then(
            function( success ) {
                $scope.id =   success;
                console.log( $scope.id );
            },
            function( errorMessage ) {
                console.log( errorMessage );

            }
        );


        $scope.alerts.push(  { type: 'success', msg: 'Api Incluida com sucesso!' });
        $scope.editEnable = false;
        $scope.status.open = false;
        $scope.status.open2 = true;
        setTimeout(function() {
            $("div.alert").remove();
        }, 3000);

    };
    this.addassunto = function(value){
        assuntosService.postAssuntos(value);
    };

    $scope.setSelected = function () {
        console.log(this.assunto);
        $scope.assuntoSelected = this.assunto;
        console.log("Id Scope" + $scope.assuntoSelected.sistema_id);
        $scope.id = $scope.assuntoSelected.id;
        $scope.RefreshListaAcao();
        $scope.sistema = $filter('getById')($scope.sistemas, $scope.assuntoSelected.sistema_id);
        $scope.conexao = $filter('getById')($scope.conexoes, $scope.assuntoSelected.conexao_id);
        $scope.screenData = ScreenEnum.create;
        $scope.editEnable = false;
        $scope.status.open2 = true;
    };

    $scope.setNovo = function () {
        $scope.assuntoSelected = { id: '', nome: '' };

        $scope.screenData = ScreenEnum.create;
    };
    $scope.setCancelar = function () {
        $scope.screenData = ScreenEnum.list;

    };



    
}]);