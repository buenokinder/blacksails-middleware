
var app = angular.module('AngularAuthApp', ['ui.bootstrap','ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/views/home"
    });
    
      $routeProvider.when("/workflow", {
        controller: "workflowController",
        templateUrl: "/views/workflow"
    });
    
    
    $routeProvider.when("/scheduler", {
        controller: "schedulerController",
        templateUrl: "/views/scheduler"
    });
    
    
 
    $routeProvider.when("/conexoes", {
        controller: "conexoesController",
        templateUrl: "/views/conexoes"
    });

    $routeProvider.when("/queries", {
        controller: "queriesController",
        templateUrl: "/views/queries"
    });

    $routeProvider.when("/dashboard", {
        controller: "dashboardController",
        templateUrl: "/views/dashboard"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/views/login"
    });




    $routeProvider.when("/sistemas", {
        controller: "sistemasController",
        templateUrl: "/views/sistemas"
    });

    $routeProvider.when("/assuntos", {
        controller: "assuntosController",
        templateUrl: "/views/apilista"
    });




   

    $routeProvider.otherwise({ redirectTo: "/home" });

});

//var serviceBase = 'http://localhost:25100/';
var serviceBase = 'http://localhost:8001/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');

    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
        // Avoid following the href location when clicking
        event.preventDefault();
        // Avoid having the menu to close when clicking
        event.stopPropagation();
        // If a menu is already open we close it
        $('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
        // opening the one you clicked on
        $(this).parent().addClass('open');

        var menu = $(this).parent().find("ul");
        var menupos = menu.offset();

        if ((menupos.left + menu.width()) + 30 > $(window).width()) {
            var newpos = -menu.width();
        } else {
            var newpos = $(this).parent().width();
        }
        menu.css({ left: newpos });
    });

});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


