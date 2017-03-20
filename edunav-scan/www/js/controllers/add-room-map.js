angular.module('edunavscan.controllers').controller('AddRoomMapCtrl', addRoomMapController)

addRoomMapController.$inject = ["$scope", "BackendService", "$ionicLoading", "$stateParams"];

function addRoomMapController($scope, BackendService, $ionicLoading, $stateParams) {
    var canvas = document.getElementById("add-room-canvas")
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight
    var ctx = canvas.getContext("2d")
    var image = new Image();

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>',
      duration: 3000
    })
    $scope.$on( "$ionicView.loaded", function() {
        BackendService.getMap($stateParams.id).then((response) => {
            $scope.map = response.data;
            image.src = $scope.map.imageLocation
            image.onload = function() {
                fitImageOn(ctx, canvas, image)
                $ionicLoading.hide()
            }
        })
    });
}

// TO DO: improve and rewrite
var fitImageOn = function(context, canvas, imageObj) {
	var imageAspectRatio = imageObj.width / imageObj.height;
	var canvasAspectRatio = canvas.width / canvas.height;
	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if(imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}

	// If image's aspect ratio is greater than canvas's we fit on width
	// and place the image centrally along height
	else if(imageAspectRatio > canvasAspectRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	}

	// Happy path - keep aspect ratio
	else {
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	}
	context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};