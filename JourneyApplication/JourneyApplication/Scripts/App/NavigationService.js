app.service("NavigationService", function ($window, $location) {
    this.goToPage = function (url) {
        $location.path("/" + url);
    }

    this.goBackHistory = function (index) {
        if (typeof index == "number") {
            window.history.go(-index);
            return;
        }

        //One Step.
        window.history.back();
    };

    this.goToStart = function () {
        $location.path("/");
    }

});