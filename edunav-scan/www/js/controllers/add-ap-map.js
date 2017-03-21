angular.module('edunavscan.controllers').controller('AddAPMapCtrl', addAPMapController)

addAPMapController.$inject = ["$scope", "BackendService", "$ionicLoading", "$stateParams", "$state", "$ionicHistory"];

function addAPMapController($scope, BackendService, $ionicLoading, $stateParams, $state, $ionicHistory) {
    var canvas = document.getElementById("add-ap-canvas")
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight - 50 // minus top bar + make unscrollable
    var ctx = canvas.getContext("2d")
    var image = new Image();

	// image starting points
	var xStart
	var yStart
	var imageWidth
	var imageHeight

	var showOnCanvas = function() {
		var imageAspectRatio = image.width / image.height
		var canvasAspectRatio = canvas.width / canvas.height

		imageWidth = canvas.height;
		imageHeight = canvas.width;
		xStart = 0;
		yStart = 0;

		if(imageAspectRatio < canvasAspectRatio) {
			// fit on height
			imageHeight = canvas.height;
			imageWidth = image.width * (imageHeight / image.height);
			xStart = (canvas.width - imageWidth) / 2;
			yStart = 0;
		}

		if(imageAspectRatio > canvasAspectRatio) {
			// fit on height
			imageWidth = canvas.width
			imageHeight = image.height * (imageWidth / image.width);
			xStart = 0;
			yStart = (canvas.height - imageHeight) / 2;
		}
		ctx.drawImage(image, xStart, yStart, imageWidth, imageHeight);
	}

	var drawCircle = function(x,y) {
		ctx.beginPath();
		ctx.arc(x * imageWidth + xStart, y * imageHeight + yStart, 10, 0, 2*Math.PI);
		ctx.stroke()
	}

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    })
    $scope.$on( "$ionicView.loaded", function() {
        BackendService.getMap($stateParams.id).then((response) => {
            $scope.map = response.data;
            image.src = $scope.map.imageLocation
            image.onload = function() {
                showOnCanvas()
                BackendService.getAPsForMap($stateParams.id).then((response) => {
            		for (room of response.data) { // to do look up ES6 compatibility of for of
						drawCircle(room.x, room.y)
					}
					$ionicLoading.hide()
            	})
            }
        })
    })

	canvas.addEventListener("click", function(event) {
		var coords = { x: (event.clientX - xStart) / imageWidth, y: (event.clientY - yStart - 45.0) / imageHeight } // also minus the navbar
		console.log(coords)
		drawCircle(coords.x, coords.y)
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        })
        BackendService.addAPToMap($stateParams.bssid, $stateParams.id, coords.x, coords.y).then((response) => {
			$ionicLoading.hide()
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.scan')
        })
	})
}