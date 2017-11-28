app.controller("VehicleController", function ($scope, $routeParams, $location, $http) {
    var urlLocationPath = "/vehicles";

    //Get All Vehicles.
    $http.get("api/Vehicles").then(function (response) {
        $scope.vehicles = response.data;
        console.log("Get Vehicles Sucess!");
    });

    $scope.postVehicle = function (vehicle) {
        $http.post("api/vehicles", vehicle).then(function (response) {
            $scope.vehicle.Id = response.data.Id;
            console.log("Bilen blev skapad!");
            $location.path(urlLocationPath);
        });
    }

    //Delete Vehicle
    $scope.deleteVehicle = function (id) {
        $http.delete("api/vehicles/" + id).then(function (response) {
            location.reload();
            console.log("Deleted vehicle with id:" + id);
            
        });
    }

});