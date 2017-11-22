var app = angular.module("app", ["ngRoute", "chart.js"])
    .run(function () {
        console.log("app.run | Mission: DO YOUR BEST!");

    }
    );

// App Config
app.config(["$routeProvider",
    function ($routeProvider) {
        // Routing
        $routeProvider.
            when("/home", {
                templateUrl: "../Partials/home.html",
                controller: "ErrandController"
            }).
            otherwise({
                redirectTo: "/home"
            });
    }
]);