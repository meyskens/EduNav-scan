angular
    .module("edunavscan", [
        "ionic",
        "ngCordova",
        "edunavscan.controllers",
        "edunavscan.services",
    ])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
                cordova.plugins.Keyboard.disableScroll(true)
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault()
            }
        })
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: "AppCtrl",
            })
            .state("app.scan", {
                url: "/scan",
                views: {
                    menuContent: {
                        templateUrl: "templates/scan.html",
                        controller: "ScanCtrl",
                    },
                },
            })
            .state("app.addRoom", {
                url: "/add-room",
                views: {
                    menuContent: {
                        templateUrl: "templates/add-room.html",
                        controller: "AddRoomCtrl",
                    },
                },
            })
            .state("app.addRoomMap", {
                url: "/add-room-map/:id",
                views: {
                    menuContent: {
                        templateUrl: "templates/add-room-map.html",
                        controller: "AddRoomMapCtrl",
                    },
                },
            })
            .state("app.addRoomInfo", {
                url: "/add-room-info/:mapID/:x/:y",
                views: {
                    menuContent: {
                        templateUrl: "templates/add-room-info.html",
                        controller: "AddRoomInfoCtrl",
                    },
                },
            })
            .state("app.addAP", {
                url: "/add-ap/:bssid",
                views: {
                    menuContent: {
                        templateUrl: "templates/add-ap.html",
                        controller: "AddAPCtrl",
                    },
                },
            })
            .state("app.addAPMap", {
                url: "/add-ap-map/:id/:bssid",
                views: {
                    menuContent: {
                        templateUrl: "templates/add-ap-map.html",
                        controller: "AddAPMapCtrl",
                    },
                },
            })
            .state("app.debug", {
                url: "/debug",
                views: {
                    menuContent: {
                        templateUrl: "templates/debug.html",
                        controller: "DebugCtrl",
                    },
                },
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("/app/scan")
    })
