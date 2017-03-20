angular.module("edunavscan.services").service("BackendService", backendService);

backendService.$inject = ["$http"];

function backendService($http) {
    this.getMaps = function() {
        return $http.get("https://edunav.eyskens.me/maps");
    }

    this.getMap = function(id) {
        return $http.get("https://edunav.eyskens.me/maps/" + id);
    }

    return this
}