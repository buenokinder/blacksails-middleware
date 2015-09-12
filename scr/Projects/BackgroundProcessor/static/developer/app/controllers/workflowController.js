'use strict';
app.controller('workflowController','sistemasService', ['$scope','$sistemasService', function ($scope,$sistemasService) {
   
    lista = true;
   
   
    
}]);

app.controller('workflowGridController', ['$scope', function ($scope) {
   
}]);


app.controller('workflowFormController', ['$scope', function ($scope) {
   
}]);

app.directive('workflowForm', function() {
              return {
              restrict: 'E',
              templateUrl: '/app/views/partials/workflow-form.html'
                  
              };
});


app.directive('workflowList', function() {
              return {
              restrict: 'E',
              templateUrl: '/app/views/partials/workflow-list.html'
                  
              };
});