app.controller("StopTripController", function ($scope, $routeParams, $location, $http, NavigationService) {
    var url = "/home";

    //Get errand with id:
    $http.get("api/errands/" + $routeParams.id).then(function (response) {
        $scope.errand = response.data;
        if ($scope.errand <= 0) {
            alert("Något gick fel!");
        }
        alert("Get errand with specific id: Succes!");

    });

    //Update Errand
    $scope.updateErrand = function (errand) {
        $http.put("api/errands/" + errand.Id, errand).then(function (response) {
            $scope.errand = response.data;
            alert("Update errand sucess!");
            $location.path(url);

        });
    }

    //Back button.
    $scope.abort = function (index) {
        NavigationService.goBackHistory(index);
    }

});