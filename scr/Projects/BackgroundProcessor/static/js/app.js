var myApp = angular.module('myApp', ['ui.bootstrap']);
myApp.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);

        if (!input) { return; }
        return input.slice(start);
    };
});



myApp.controller('myController', function ($scope, $http, $modal, $log) {
    $scope.scheduler = "";
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.items = [];
    $scope.itemsBase = [];
    $scope.serviceBase = "http://localhost:8001/";
    // Alert messages
    $scope.alerts = [{
        msg: "Welcome !"
    }];

    $scope.filterOptions = {
        levels: [
          { id: 1, name: 'DEBUG' },
          { id: 2, name: 'ERROR' },

        ]
    };
    $scope.filterItem = {
        level: $scope.filterOptions.levels[0]
    }

    $scope.addAlert = function (message) {
        $scope.alerts.unshift({
            msg: message
        });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.reloadFile = function () {
        $scope.scheduler = "";

        $http.get($scope.serviceBase + '/api/scheduler').success(function (data) {
            $scope.scheduler = data;
        });
    };


    setInterval($scope.reloadFile, 20000);


    $scope.setSelected = function () {
        $('#IncluirModal').modal('show');
        $http.get($scope.serviceBase + '/api/scheduler/log/' + this.job.Name).success(function (data) {
            $scope.items =angular.fromJson( data);
            $scope.itemsBase = angular.fromJson(data);
            $('.modal-backdrop').remove();
            var table = $('#example').DataTable();
            table.destroy();
            $('#example').empty();
             $('#example').dataTable({
                "data": data,
                "columns": [
                    { "data": "Level" },
                    { "data": "TimeStamp", "type": "date", "dateFormat": "dd-mm-yyy" },
                    { "data": "Message" }

                ],"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                var Level = aData.Level; // ID is returned by the server as part of the data
                var $nRow = $(nRow);
                
                if ( Level == "ERROR" )
                {
                    console.log(Level);
                    $nRow.css({ "background-color": "red", "color": "white", "font-weigth": "bold" })
                }
            }
            });
            
             $('.modal-backdrop').remove();
        });


    };

    $scope.setPause = function () {
        
        $http.get($scope.serviceBase + '/api/scheduler/pause/' + this.job.Grupo + '/' + this.job.Name).success(function (data) {
            $http.get($scope.serviceBase + '/api/scheduler').success(function (data) {
                $scope.scheduler = data;
            });
        });


    };

    $scope.setPlay = function () {
        
        $http.get($scope.serviceBase + '/api/scheduler/resume/' + this.job.Grupo + '/' + this.job.Name).success(function (data) {
            $http.get($scope.serviceBase + '/api/scheduler').success(function (data) {
                $scope.scheduler = data;
            });
        });


    };

    // first load the file
    $scope.reloadFile();

    $scope.addCountry = function (country) {
        $log.info(JSON.stringify(country, null, 4));

        $scope.countries.push({
            "name": country.name,
            "city": country.city,
            "isoCountryCode": country.isoCountryCode,
            "phoneCountryCode": country.phoneCountryCode,
            "currency": country.currency,
            "readOnly": country.readOnly
        });

        $scope.addAlert("<strong>" + country.name + "</strong> has been added successfully !");
    };

    $scope.deleteCountry = function (countryName) {
        $log.info(countryName);

        for (var i = 0; i < $scope.countries.length; i++) {
            if ($scope.countries[i].name === countryName && !$scope.countries[i].readOnly) {
                $scope.countries.splice(i, 1);
                break;
            }
        }

        $scope.addAlert("<strong>" + countryName + "</strong> has been deleted successfully !");
    };

    $scope.searchFilter = function (country) {
        regexp = new RegExp($scope.searchValue, "i");
        if (country.name.search(regexp) !== -1 || country.city.search(regexp) !== -1) {
            return true;
        }
        return false;
    };

    $scope.openAddModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'addCountryModal.html',
            controller: 'addModalInstanceCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function (countryToAdd) {
            $scope.addCountry(countryToAdd);
        }, function () {
            $log.info('Add action canceled');
        });
    };

    $scope.openDeleteModal = function (countryName) {
        var modalInstance = $modal.open({
            templateUrl: 'deleteCountryModal.html',
            controller: 'deleteModalInstanceCtrl',
            resolve: {
                countryName: function () {
                    return countryName;
                }
            }
        });

        modalInstance.result.then(function (toDelete) {
            if (toDelete) {
                $scope.deleteCountry(countryName);
            }
        }, function () {
            $log.info('Delete action canceled');
        });
    };

   

    //for (var i = 0; i < 50; i++) {
    //    $scope.items.push({ id: i, name: "name " + i, description: "description " + i });
    //}

    $scope.range = function () {
        var rangeSize = 5;
        var ret = [];
        var start;

        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }

        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };

    
    $scope.isChecked = function (id) {
        if (_.contains($scope.selectedCompany, id)) {
            return 'icon-ok pull-right';
        }
        return false;
    };

   $scope.checkAll = function () {
        $scope.selectedCompany = _.pluck($scope.companyList, 'id');
   };

   $scope.customFilter = function (data) {
       console.log($scope.filterItem.level.name);
       if (data.Level == $scope.filterItem.level.name) {
           return true;
       
       } else {
           return false;
       }
   };
  


});



