angular
    .module("edunavscan.controllers")
    .controller("AddRoomMapCtrl", addRoomMapController)

addRoomMapController.$inject = [
    "$scope",
    "BackendService",
    "$ionicLoading",
    "$stateParams",
    "$state",
    "CanvasService",
]

function addRoomMapController(
    $scope,
    BackendService,
    $ionicLoading,
    $stateParams,
    $state,
    CanvasService
) {
    var canvasInfo = null
    var image = new Image()

    var addListener = function() {
        canvasInfo.canvas.addEventListener("click", function(event) {
            var coords = {
                x: (event.clientX - canvasInfo.xStart) / canvasInfo.imageWidth,
                y: (event.clientY - canvasInfo.yStart - 45.0) /
                    canvasInfo.imageHeight, // also minus the navbar
            }
            CanvasService.drawCircle(canvasInfo, coords.x, coords.y)
            $state.go("app.addRoomInfo", {
                movieid: $stateParams.movieid + 1,
                mapID: $stateParams.id,
                x: coords.x,
                y: coords.y,
            })
        })
    }

    $scope.$on("$ionicView.enter", function() {
        $ionicLoading.show({
            template: "<ion-spinner></ion-spinner>",
        })
        BackendService.getMap($stateParams.id).then(response => {
            $scope.map = response.data
            image.src = $scope.map.imageLocation
            CanvasService.renderMap("add-room-canvas", image).then(info => {
                canvasInfo = info

                BackendService.getRoomsForMap(
                    $stateParams.id
                ).then(response => {
                    for (var room of response.data) {
                        // to do look up ES6 compatibility of for of
                        CanvasService.drawCircle(canvasInfo, room.x, room.y)
                    }
                    addListener()
                    $ionicLoading.hide()
                })
            })
        })
    })
}
