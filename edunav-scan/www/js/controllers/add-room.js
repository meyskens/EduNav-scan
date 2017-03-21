angular.module('edunavscan.controllers').controller('AddRoomCtrl', addRoomController)

addRoomController.$inject = ["$scope", "BackendService", "$ionicLoading"];

function addRoomController($scope, BackendService, $ionicLoading) {
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