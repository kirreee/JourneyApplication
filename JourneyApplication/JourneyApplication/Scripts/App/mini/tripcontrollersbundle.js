app.controller("TripController", function ($scope, $routeParams, $location, $http) {
    var location = "";
    var locationUrl = "/home";
    //Get All ActiveVehicles
    $http.get("api/activeVehicles")
        .then(function (response) {
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
        var errandDriveDate = $scope.errandDriveDate;

        var data = {
            "ErrandId": 0,
            "StartAdress": errandStartAdress,
            "Destination": errandDestination,
            "Matter": errandMatter,
            "Notes": errandNote,
            "StartKm": errandStartKm,
            "DriveDate": errandDriveDate,
            "VehicleId": errandVehicle,
        };

        $http.post("/api/errands", data, { headers: { 'Content-Type': 'application/json' } })
            .then(function success(response) {
                if (response.data === 'Error') {
                    return alert('Kördatum får inte ha paserat dagens datm, försök igen!');
                }
                if (response.data === 'Warning') {
                    return alert('Startkm kan inte vara högre än föregånde resa!');
                }
                if (response.data === "Warn") {
                    $location.path(locationUrl);
                }
                console.log("New errand created sucess!");
                $location.path(locationUrl);

            });
    };

    //Update errand with id:
    $scope.updateErrand = function (errand) {
        $scope.errand = Response.data;
        $location.path(locationUrl);
    }

    //Go Back Button
    $scope.goBack = function () {
        $location.path(locationUrl);
    }

});
app.controller("StopTripController", function ($scope, $routeParams, $location, $http, NavigationService) {
    var url = "/home";

    //Get errand with id:
    $http.get("api/errands/" + $routeParams.id).then(function (response) {
        $scope.errand = response.data;
        if ($scope.errand <= 0) {
            console.log("Något gick fel");
        }
        console.log("Get errand with specific id: Succes!");

    });

    //Update Errand
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