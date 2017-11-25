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