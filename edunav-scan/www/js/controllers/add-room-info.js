angular.module('edunavscan.controllers').controller('AddRoomInfoCtrl', addRoomInfoController)

addRoomInfoController.$inject = ["$scope", "BackendService", "$ionicLoading", "$stateParams", "$state", "$ionicPopup", "$ionicHistory"];

function addRoomInfoController($scope, BackendService, $ionicLoading, $stateParams, $state, $ionicPopup, $ionicHistory) {
    $scope.roomInfo = { name: "", comment:"" }
	$scope.save = function() {
        if (!$scope.roomInfo.name) {
            console.log($scope.roomInfo.name)
            console.log($scope.roomInfo.comment)
            return $ionicPopup.alert({
                title: "Error",
                template: "You need to fill in a name"
            })
        }
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>',
            duration: 3000
        })
        BackendService.addRoom($stateParams.mapID, $stateParams.x, $stateParams.y, $scope.roomInfo.name, $scope.roomInfo.comment).then((response) => {
            $ionicLoading.hide()
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go("app.addRoom")
        })
    }
}