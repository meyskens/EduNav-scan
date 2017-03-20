angular.module('edunavscan.controllers').controller('AddRoomMapCtrl', addRoomMapController)

addRoomMapController.$inject = ["$scope", "BackendService", "$ionicLoading", "$stateParams", "$state"];

function addRoomMapController($scope, BackendService, $ionicLoading, $stateParams, $state) {
    var canvas = document.getElementById("add-room-canvas")
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight - 50 // minus top bar + make unscrollable
    var ctx = canvas.getContext("2d")
    var image = new Image();

	// image starting points
	var xStart
	var yStart

	var showOnCanvas = function() {
		var imageAspectRatio = image.width / image.height
		var canvasAspectRatio = canvas.width / canvas.height

		var renderableHeight = canvas.height;
		var renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;

		if(imageAspectRatio < canvasAspectRatio) {
			// fit on height
			renderableHeight = canvas.height;
			renderableWidth = image.width * (renderableHeight / image.height);
			xStart = (canvas.width - renderableWidth) / 2;
			yStart = 0;
		}

		if(imageAspectRatio > canvasAspectRatio) {
			// fit on height
			renderableWidth = canvas.width
			renderableHeight = image.height * (renderableWidth / image.width);
			xStart = 0;
			yStart = (canvas.height - renderableHeight) / 2;
		}
		ctx.drawImage(image, xStart, yStart, renderableWidth, renderableHeight);
	}

	var drawCircle = function(x,y) {
		ctx.beginPath();
		ctx.arc(x + xStart, y + yStart, 10, 0, 2*Math.PI);
		ctx.stroke()
	}

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>',
      duration: 3000
    })
    $scope.$on( "$ionicView.loaded", function() {
        BackendService.getMap($stateParams.id).then((response) => {
            $scope.map = response.data;
            image.src = $scope.map.imageLocation
            image.onload = function() {
                showOnCanvas()
                $ionicLoading.hide()
            }
        })
    })

	canvas.addEventListener("click", function(event) {
		var coords = { x: event.clientX - xStart, y: event.clientY - yStart - 45 } // also minus the navbar
		console.log(coords)
		drawCircle(coords.x, coords.y)
		$state.go('app.addRoomInfo', { movieid: $stateParams.movieid + 1, mapID: $stateParams.id, x: coords.x, y: coords.y}); // TO DO: make those RELATIVE
	})
}