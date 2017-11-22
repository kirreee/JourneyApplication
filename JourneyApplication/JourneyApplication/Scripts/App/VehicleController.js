app.controller("VehicleController", function ($scope, $routeParams, $location, $http) {
    var url = "/home";

    //Get All Vehicles.
    $http.get("api/Vehicles").then(function (response) {
        $scope.vehicles = response.data;
        console.log(response.data);
    });

    $scope.postVehicle = function (vehicle) {
        $http.post("api/vehicles", vehicle).then(function (response) {
            $scope.vehicle.Id = response.data.Id;
            console.log("Bilen blev skapad!");
            $location.path("/home");
        });
    }

    //Delete Vehicle
    $scope.deleteVehicle = function (id) {
        $http.delete("api/vehicles/" + id).then(function (response) {
            console.log("Deleted vehicle with id:" + id);
            $location.path(url);
        });
    }

});