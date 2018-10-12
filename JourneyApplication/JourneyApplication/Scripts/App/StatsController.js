app.controller("StatsController",
    function ($scope, $http, $routeParams, $filter, $location, $window) {

        //Variables
        var medium = 0;
        var short = 0;
        var long = 0;
        var data;
        var date;
        var locationUrl = "/start";

        //Scopes and functions
        $scope.labels = ['0-20km', '21-50km', '50km +'];

        $scope.updateGraph = function () {
            $scope.data = [];
            angular.forEach($scope.errands, function (value, key) {
                date = value.Added;
                date = new Date(date);
                if (date <= $scope.toDate && date >= $scope.fromDate && value.Vehicle.Id == $scope.selectedVehicle) {
                    if ((value.ArrivalKm - value.StartKm) < 21) {
                        short++;
                    }
                    else if (value.ArrivalKm < 50) {
                        medium++;
                    }
                    else {
                        long++;
                    }

                    $scope.data = [short, medium, long];

                }
            });
        };

        $scope.GeneratePdf = function () {
            var data = {
                vehicleId: $scope.selectedVehicle,
                toDate: $scope.toDate,
                fromDate: $scope.fromDate
            };

            $http.post("/api/pdf/generate", data, { headers: { 'Content-Type': 'application/json' } })
                .then(function (data) {
                    $window.open(data.data);
            });
               
           
        }

        //Get All Errands
        $http.get("api/Errands").then(function (response) {
            $scope.errands = response.data;
        });

        //Get All Vehicles
        $http.get("api/Vehicles").then(function (response) {
            $scope.vehicles = response.data;
        });

    });