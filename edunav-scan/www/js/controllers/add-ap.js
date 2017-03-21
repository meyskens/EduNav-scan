angular.module('edunavscan.controllers').controller('AddAPCtrl', addAPController)

addAPController.$inject = ["$scope", "BackendService", "$ionicLoading", "$stateParams"];

function addAPController($scope, BackendService, $ionicLoading, $stateParams) {
    $scope.bssid = $stateParams.bssid
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    })
    BackendService.getMaps().then((response) => {
        $scope.maps = response.data;
        $ionicLoading.hide()
        $scope.$apply()
    })
    $scope.maps = []
}
