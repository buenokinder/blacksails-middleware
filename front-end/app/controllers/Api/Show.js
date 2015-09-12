'use strict';
app.controller('apiShowController', ['$scope', 'apiService', 'sistemasService', 'queriesService', 'authService', '$routeParams', 'conexoesService', function ($scope, apiService, sistemasService, queriesService, authService, $routeParams, conexoesService) {
    var ScreenEnum = Object.freeze({ "list": 1, "create": 2, "update": 3 });
    $scope.editEnable = false;
    $scope.acaoApi = { "id": '', "tipoquery_id": '', "query": '', "assunto_id": '' , "auth": false};
    $scope.operacoes = { "id": '', "tipoquery_id": '', "query": '', "assunto_id": '' };
    $scope.parametro = { "id": '', "parametro": '', "tipodadoid": '', "assunto_query_id": '' };
    $scope.parametros = {};
    $scope.idquery = [];
    $scope.alerts = [];
    $scope.alertsAcao = [];
    $scope.Update = true;
    $scope.id = [];
    $scope.assuntos = [];
    $scope.sistemas = [];
    $scope.sistema = [];
    $scope.conexoes = [];
    $scope.screenDataEnum = ScreenEnum;
    $scope.screenData = ScreenEnum.list;
    $scope.tipos = [];
    $scope.tipoSelect = [];
    $scope.parametrotipos = [];
    $scope.tipagens = [];
    $scope.queries = [];
    $scope.queryDelete = [];
    $scope.conexao = [];
    $scope.assuntoSelected = { id: '', nome: '', sistema_id: '', conexao_id: '' };

    String.prototype.bool = function () {
        return (/^true$/i).test(this);
    };

    $scope.status = {
        open: true,
        open2: true,
        isFirstOpen: true,
        isFirstDisabled: true
    };

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function callbackGetSistemas(results, status) {
        if (status == null){
            $scope.sistemas = angular.fromJson(results._Lista);
            $scope.sistema.id = $scope.assuntoSelected.sistema_id;
        }
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de conexões no banco de dados. Tente novamente mais tarde.', 'danger');
    }

    function callbackGetConexao(results, status) {
        if (status == null) {
            $scope.conexoes = angular.fromJson(results._Lista);
            console.log($scope.conexoes);
            console.log($scope.assuntoSelected.conexao_id);
            $scope.conexao.id = $scope.assuntoSelected.conexao_id;
            
        }
        else
            $scope.alertNotification('Ocorreu um erro ao buscar a listagem de conexões no banco de dados. Tente novamente mais tarde.', 'danger');
    }


    apiService.getAssuntoId($routeParams.id).then(function (results) {
        $scope.assuntoSelected = angular.fromJson(results.data);

        sistemasService.getSistemas(authService.authentication.userName, callbackGetSistemas);

        conexoesService.getConexoes(authService.authentication.userName, callbackGetConexao);

        $scope.id = $scope.assuntoSelected.id;

        queriesService.getQueriesPorAssunto($scope.assuntoSelected.id).then(function (results) {
            $scope.queries = angular.fromJson(results.data._Lista);

        }, function (error) {
            console.log("erro");
            alert(error.data.message);
        });

        queriesService.getTipo().then(function (results) {
            $scope.tipos = angular.fromJson(results.data._Lista);

        }, function (error) {
            //alert(error.data.message);
        });

        apiService.getTipoDados().then(function (results) {
            $scope.parametrotipos = angular.fromJson(results.data._Lista);

        }, function (error) {
            //alert(error.data.message);
        });

    }, function (error) {
        //alert(error.data.message);
    });

    $scope.change = function (conexao) {
        console.log(conexao.id);
        $scope.assuntoSelected.conexao_id = conexao.id;
    };

    $scope.changeSistema = function (sistema) {
        console.log(sistema.id);
        $scope.assuntoSelected.sistema_id = sistema.id;
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.changeTipo = function (tipo) {
        console.log(tipo);
        $scope.tipoSelect = tipo;
        $scope.acaoApi.tipoquery_id = tipo.id;
    };

    $scope.changeTipoParametro = function (TipoParametro) {
        $scope.parametro.tipodadoid = TipoParametro.id;
    };

    $scope.setAcao = function () {
        $('#AddAction').modal('show');
        
        $scope.acaoApi = { id: '', query: '', auth: false };
    };

    $scope.editAcao = function (data) {
        console.log(data);
        $scope.acaoApi = angular.fromJson(data);
        console.log($scope.acaoApi);
        $scope.tipoSelect = { 'id': $scope.acaoApi.tipoquery_id, 'nome': $scope.acaoApi.tipo };
        console.log($scope.tipoSelect);
        $('#AddAction').modal('show');
    };

    $scope.deleteAcao = function (query) {
        $scope.queryDelete = query.id;
        $('#ConfirmacaoExclusaoModal').modal('show');
    };

    $scope.deleteQuery = function () {
        queriesService.deleteQueries($scope.queryDelete).then(
         function (success) {
             console.log(success);
             $scope.RefreshListaAcao();
         },
         function (errorMessage) {
             console.log(errorMessage);
         }
     );
        $('#ConfirmacaoExclusaoModal').modal('hide');
        $scope.queryDelete = [];
    }

    $scope.plusAcao = function () {

        $scope.parametro.assunto_query_id = this.query.id;
        $('#PlusAction').modal('show');
        $scope.RefreshListaValidacao();
    };

    $scope.RefreshListaAcao = function () {
        queriesService.getQueriesPorAssunto($scope.id).then(function (results) {
            console.log(results.data._Lista);
            $scope.queries = angular.fromJson(results.data._Lista);

        }, function (error) {
            console.log("erro");
            alert(error.data.message);
        });
    };

    $scope.RefreshListaParametros = function () {

        queriesService.getParametrosPorAssuntoQuery($scope.idAssuntoQuery.split("\"").join("")).then(function (results) {

            $scope.queries = angular.fromJson(results.data.lista);

        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.RefreshListaValidacao = function () {
        apiService.getParametroByQuery(this.parametro.assunto_query_id).then(function (results) {
            console.log(JSON.stringify(results.data._Lista));
            $scope.tipagens = angular.fromJson(results.data._Lista);

        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.addParametro = function () {
        apiService.postParamentro($scope.parametro).then(
            function (success) {
                $scope.id = success;
                console.log($scope.id);
            },
            function (errorMessage) {
                console.log(errorMessage);

            }
        );


        $scope.alerts.push({ type: 'success', msg: 'Parametro Incluida com sucesso!' });
        $scope.editEnable = false;
        $scope.status.open = false;
        $scope.status.open2 = true;
        setTimeout(function () {
            $("div.alert").remove();
        }, 3000);
        $scope.RefreshListaValidacao();
    };

    function CallBackSaveAcaoApiConfig(mensagem, status) {
        $scope.alertsAcao.push({ type: status, msg: mensagem });
        $scope.RefreshListaAcao();
        $('#AddAction').modal('hide');

        setTimeout(function () {
            $("div.alert").remove();
        }, 3000);
    }

    $scope.setSaveAcaoApi = function () {
        $scope.acaoApi.assunto_id = $scope.id;
        if ($scope.acaoApi.id == "" || $scope.acaoApi.id == null) {
            $scope.acaoApi.id = generateUUID();
            queriesService.postQueries($scope.acaoApi, CallBackSaveAcaoApiConfig);
        } else {
            console.log($scope.acaoApi);
            queriesService.updateQueries($scope.acaoApi, CallBackSaveAcaoApiConfig);
        }
    };
}]);
