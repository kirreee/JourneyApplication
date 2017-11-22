app.controller("HomeController", function ($scope, $routeParams, $location, $http) {

    var locationUrl = "/home";
    

    $http.get("api/Errands-ongoing")
        .then(function succes(response) {
            $scope.errands = response.data;
            console.log(response.data);
        }, function (error) {
            console.log("Något gick fel!");
        }
        );

    

    //Geolocation
    



});