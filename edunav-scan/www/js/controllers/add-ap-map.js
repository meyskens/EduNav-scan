angular
    .module("edunavscan.controllers")
    .controller("AddAPMapCtrl", addAPMapController)

addAPMapController.$inject = [
    "$scope",
    "BackendService",
    "$ionicLoading",
    "$stateParams",
    "$state",
    "$ionicHistory",
    "CanvasService",
]

function addAPMapController(
    $scope,
    BackendService,
    $ionicLoading,
    $stateParams,
    $state,
    $ionicHistory,
    CanvasService
) {
    var canvasInfo = null
    var image = new Image()

    var addListener = function() {
        var coords = {
            x: (event.clientX - canvasInfo.xStart) / canvasInfo.imageWidth,
            y: (event.clientY - canvasInfo.yStart - 45.0) /
                canvasInfo.imageHeight, // also minus the navbar
        }
        CanvasService.drawCircle(canvasInfo, coords.x, coords.y)
        $ionicLoading.show({
            template: "<ion-spinner></ion-spinner>",
        })
        BackendService.addAPToMap(
            $stateParams.bssid,
            $stateParams.id,
            coords.x,
            coords.y
        ).then(response => {
            $ionicLoading.hide()
            $ionicHistory.nextViewOptions({
                disableBack: true,
            })
            $state.go("app.scan")
        })
    }

    $scope.$on("$ionicView.enter", function() {
        $ionicLoading.show({
            template: "<ion-spinner></ion-spinner>",
        })
        BackendService.getMap($stateParams.id).then(response => {
            $scope.map = response.data
            image.src = $scope.map.imageLocation
            CanvasService.renderMap("add-ap-canvas", image).then(info => {
                canvasInfo = info
                BackendService.getAPsForMap($stateParams.id).then(response => {
                    for (var room of response.data) {
                        CanvasService.drawCircle(canvasInfo, room.x, room.y)
                    }
                    addListener()
                    $ionicLoading.hide()
                })
            })
        })
    })
}
