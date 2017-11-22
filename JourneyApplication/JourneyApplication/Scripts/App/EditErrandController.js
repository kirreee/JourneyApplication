app.controller("EditErrandController", function ($scope, $routeParams, $location, $http, NavigationService) {
    var url = "/home";
    $http.get("api/errands/" + $routeParams.id).then(function (response) {
        $scope.errand = response.data;
        if ($scope.errand <= 0) {
            console.log("Något gick fel");
        }
        console.log("Get errand with specific id: Succes!");

    });

    $scope.updateErrand = function (errand) {
        $http.put("api/errands/" + errand.Id, errand).then(function (response) {
            $scope.errand = response.data;
            console.log("Update errand success!");
            $location.path(url);
            
        });
    }

    //Back button.
    $scope.abort = function (index) {
        NavigationService.goBackHistory(index);
    }

});