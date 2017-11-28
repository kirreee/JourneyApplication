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
app.controller("EditVehicleController", function ($scope, $routeParams, $location, $http, NavigationService) {
    var locationUrl = "/vehicles";

    //GET Vehicle with Id:
    $http.get("api/vehicles/" + $routeParams.id).then(function (response) {
        $scope.vehicle = response.data;
        if ($scope.vehicle <= 0) {
            console.log("Något gick fel");
        }
        console.log("Get vehicle with specific id: Succes!");

    });

    //Update Vehicle
    $scope.updateVehicle = function (vehicle) {
        $http.put("api/vehicles/" + vehicle.Id, vehicle).then(function (response) {
            $scope.vehicle = response.data;
            console.log("Update vehicle success!");
            $location.path(locationUrl);

        });
    }

    //Go Back Button
    $scope.goBack = function () {
        $location.path(locationUrl);
    }



   

});