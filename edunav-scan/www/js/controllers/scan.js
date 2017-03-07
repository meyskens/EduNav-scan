angular.module('edunavscan.controllers').controller('ScanCtrl', scanController)

scanController.$inject = ["$scope", "$ionicPlatform"];

function scanController($scope, $ionicPlatform) {
    console.log("Scan Control")
    $scope.baseStations = [];

    var scanWifi = function () {
        WifiWizard.startScan(function () { })
        WifiWizard.getScanResults(handleResults, function(error) { 
            console.log("error" + error)
        })
    }

    var handleResults = function (data) {
        console.log(data)
        data = data.filter(function (a) {
            return a.SSID === "eduroam" // This is why the name is EduNav
        })
        data.sort(function (a, b) {
            return Math.abs(parseInt(a.level, 10)) - Math.abs(parseInt(b.level, 10))
        })
        $scope.baseStations = angular.copy(data)
        $scope.$apply()
    }

    $ionicPlatform.ready(function () {
        if (typeof WifiWizard === "undefined") {
            return $scope.error = "Platform not compatible"
        }
        scanWifi()
        setInterval(scanWifi, 1000)
    })
}