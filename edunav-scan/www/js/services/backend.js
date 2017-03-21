angular.module("edunavscan.services").service("BackendService", backendService);

backendService.$inject = ["$http"];

function backendService($http) {
    this.getMaps = function() {
        return $http.get("https://edunav.eyskens.me/maps");
    }

    this.getMap = function(id) {
        return $http.get("https://edunav.eyskens.me/maps/" + id);
    }

    this.addRoom = function(mapID, x, y, name, comment) {
        var keysURL = "keys.json"
        if(ionic.Platform.isAndroid()){
            keysURL = "/android_asset/www/" + keysURL
        }
        return $http.get(keysURL).success(function(keys){
            $http.post("https://edunav.eyskens.me/rooms/" + keys.api + "/add", {
                mapID: mapID,
                x: parseFloat(x),
                y: parseFloat(y),
                name: name,
                comment: comment
            });
        });
        
    }

    return this
}