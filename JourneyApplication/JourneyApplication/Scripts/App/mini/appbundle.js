var app = angular.module("app", ["ngRoute", "chart.js"])
    .run(function () {
        console.log("app.run");

    }
    );

// App Config
app.config(["$routeProvider",
    function ($routeProvider) {
        // Routing
        $routeProvider.
            when("/home", {
                templateUrl: "../Partials/Home.html",
                controller: "HomeController"
            }).
            when("/endtrip/:id", {
                templateUrl: "../Partials/EndTrip.html",
                controller: "StopTripController"
            }).
            when("/starttrip", {
                templateUrl: "../Partials/StartTrip.html",
                controller: "TripController"
            }).
            when("/vehicles", {
                templateUrl: "../Partials/vehicles.html",
                controller: "VehicleController"
            }).
            when("/newvehicle", {
                templateUrl: "../Partials/NewVehicle.html",
                controller: "VehicleController",
            }).
            when("/editvehicle/:id", {
                templateUrl: "../Partials/EditVehicle.html",
                controller: "EditVehicleController"
            }).
            when("/stats", {
                templateUrl: "../Partials/stats.html",
                controller: "StatsController"
            }).
            otherwise({
                redirectTo: "/home"
            });
    }
]);
app.controller("HomeController", function ($scope, $routeParams, $location, $http) {

    var locationUrl = "/home";
    $http.get("api/Errands-ongoing")
        .then(function succes(response) {
            $scope.errands = response.data;
        }, function (error) {
            console.log("Något gick fel!");
        }
        );



    



});
app.service("NavigationService", function ($window, $location) {
    this.goToPage = function (url) {
        $location.path("/" + url);
    }

    this.goBackHistory = function (index) {
        if (typeof index == "number") {
            window.history.go(-index);
            return;
        }

        //One Step.
        window.history.back();
    };

    this.goToStart = function () {
        $location.path("/");
    }

});
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
            console.log("Tjenare");
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


        //$scope.selectedVehicle = data.errands.vehicles.Id;
        $scope.GeneratePdf = function () {
            console.log("Tjenare");
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