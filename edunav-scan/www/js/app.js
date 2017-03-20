angular.module('edunavscan', ['ionic', 'ngCordova', 'edunavscan.controllers', 'edunavscan.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.scan', {
    url: '/scan',
    views: {
      'menuContent': {
        templateUrl: 'templates/scan.html',
        controller:"ScanCtrl"
      }
    },
  })

  .state('app.addRoom', {
    url: '/add-room',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-room.html',
        controller:"AddRoomCtrl"
      }
    },
  })

  .state('app.addRoomMap', {
    url: '/add-room-map/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-room-map.html',
        controller:"AddRoomMapCtrl"
      }
    },
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/scan');
});
