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