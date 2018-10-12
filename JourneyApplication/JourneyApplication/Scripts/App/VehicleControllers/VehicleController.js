app.controller("VehicleController", function ($scope, $routeParams, $location, $http) {
    var urlLocationPath = "/vehicles";

    //Get All Vehicles.
    $http.get("api/Vehicles").then(function (response) {
        $scope.vehicles = response.data;
    });

    $scope.postVehicle = function (vehicle) {
        $http.post("api/vehicles", vehicle).then(function (response) {
            $scope.vehicle.Id = response.data.Id;
            $location.path(urlLocationPath);
        });
    }

    //Delete Vehicle
    $scope.deleteVehicle = function (id) {
        $http.delete("api/vehicles/" + id).then(function (response) {
            location.reload();
        });
    }

});