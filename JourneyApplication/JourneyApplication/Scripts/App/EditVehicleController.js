app.controller("EditVehicleController", function ($scope, $routeParams, $location, $http, NavigationService) {
    var url = "/home";
    $http.get("api/vehicles/" + $routeParams.id).then(function (response) {
        $scope.vehicle = response.data;
        if ($scope.vehicle <= 0) {
            console.log("Något gick fel");
        }
        console.log("Get errand with specific id: Succes!");

    });

    //Update Vehicle
    $scope.updateVehicle = function (vehicle) {
        $http.put("api/vehicles/" + vehicle.Id, vehicle).then(function (response) {
            $scope.vehicle = response.data;
            console.log("Update vehicle success!");
            $location.path(url);

        });
    }

    


    //Back button.
    $scope.abort = function (index) {
        NavigationService.goBackHistory(index);
    }

});