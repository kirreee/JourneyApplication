app.controller("ErrandController", function ($scope, $routeParams, $location, $http) {
    var location = "";
    var locationUrl = "/home";
    //Get All ActiveVehicles
    $http.get("api/activeVehicles")
        .then(function (response) {
            console.log(response.data);
        $scope.vehicles = response.data;
        });

    //Geolocation
    function getLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, error);
        }
        else {
            console.log("Your browser does not support Geolocation!, Try antoher.");
        }

        //Error function
        function error(error) {
            console.log(error);
        }

        function showPosition(position) {
            var geocoder = new google.maps.Geocoder;
            var coords = position.coords;
            var latlng = { lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) };

            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        callback(results[0].formatted_address);
                    } else {
                        console.log("No match!");
                    }
                } else {
                    console.log("Error!");
                }
            });
        }

    }
    //Get current location
    getLocation(function (address) {
        location = address;
    });

    //Set current location
    $scope.GetCurrentPositionForUser = function () {
        $scope.errandStartAdress = location;
    }


    //POST errand
    $scope.postErrand = function () {
        var location = "";
        var errandStartAdress = $scope.errandStartAdress;
        var errandDestination = $scope.errandDestination;
        var errandMatter = $scope.errandMatter;
        var errandNote = $scope.errandNote;
        var errandStartKm = $scope.errandStartKm;
        var errandVehicle = $scope.errandVehicle;
        var errandArrivalKm = $scope.errandArrivalKm;
        var errandDriveDate = $scope.errandDriveDate.toISOString().substring(0, 10);

        var data = {
            "ErrandId": 0,
            "StartAdress": errandStartAdress,
            "Destination": errandDestination,
            "Matter": errandMatter,
            "Notes": errandNote,
            "StartKm": errandStartKm,
            "ArrivalKm": errandArrivalKm,
            "VehicleId": errandVehicle,
            "errandDriveDate": errandDriveDate,
            "Active": true
        };

        $http.post("/api/errands", data)
            .then(function success(response) {
                console.log("New errand created sucess!");
                $location.path(locationUrl);

            });
    };

    //Go Back Button
    $scope.goBack = function () {
        $location.path(locationUrl);
    }




    //Update errand with id:
    $scope.updateErrand = function (errand) {
        $scope.errand = Response.data;
        $location.path(locationUrl);
    }



});