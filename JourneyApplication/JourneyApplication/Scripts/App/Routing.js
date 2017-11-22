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
                templateUrl: "../Partials/home.html",
                controller: "HomeController"
            }).
            when("/editerrand/:id", {
                templateUrl: "../Partials/editerrand.html",
                controller: "EditErrandController"
            }).
            when("/starterrand", {
                templateUrl: "../Partials/starterrand.html",
                controller: "ErrandController"
            }).
            when("/fordon", {
                templateUrl: "../Partials/fordon.html",
                controller: "VehicleController"
            }).
            when("/nyfordon", {
                templateUrl: "../Partials/nyfordon.html",
                controller: "VehicleController",
            }).
            when("/editfordon/:id", {
                templateUrl: "../Partials/editfordon.html",
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