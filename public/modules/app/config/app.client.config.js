/**
 * Created by chirag on 14/07/15.
 */
'use strict';

// Config the app

angular.module("app", [
  /* Angular modules */
  "ngRoute",
  "ngAnimate",
  "ngSanitize",
  "ngAria",
  "ngMaterial",

  /* 3rd party modules */
  "oc.lazyLoad",
  "ui.bootstrap",
  "angular-loading-bar",
  "FBAngular",

  /* custom modules */
  "app.ctrls",
  "app.directives",
  "app.ui.ctrls",
  "app.ui.directives",
  "app.form.ctrls",
  "app.table.ctrls",
  "app.email.ctrls",
  "app.todo"

])
  // disable spinner in loading-bar
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
    }])

    // lazy loading scripts refernces of angular modules only
    .config(["$ocLazyLoadProvider", function($oc) {
      $oc.config({
        debug: true,
        event: false,
        modules: [{
          name: "angularBootstrapNavTree",
          files: ["/modules/app/controllers/lazyload/abn_tree_directive.js", "/modules/app/styles/lazyload/abn_tree.css"]
        },
          {
            name: "ui.calendar",
            serie: true,	// load files in series
            files: [
              "/modules/app/controllers/lazyload/moment.min.js",
              "/modules/app/controllers/lazyload/fullcalendar.min.js",
              "/modules/app/styles/lazyload/fullcalendar.css",
              "/modules/app/controllers/lazyload/calendar.js"
            ]
          },
          {
            name: "ui.select",
            files: ["/modules/app/controllers/lazyload/select.min.js", "/modules/app/styles/lazyload/select.css"]
          },
          {
            name: "xlsx",
            files: ["/lib/js-xlsx/xlsx.js"]
          },
          {
            name: "ngTagsInput",
            files: ["/modules/app/controllers/lazyload/ng-tags-input.min.js", "/modules/app/styles/lazyload/ng-tags-input.css"]
          },
          {
            name: "colorpicker.module",
            files: ["/modules/app/controllers/lazyload/bootstrap-colorpicker-module.min.js", "/modules/app/styles/lazyload/colorpicker.css"]
          },
          {
            name: "ui.slider",
            serie: true,
            files: ["/modules/app/controllers/lazyload/bootstrap-slider.min.js", "/modules/app/controllers/lazyload/directives/bootstrap-slider.directive.js", "/modules/app/styles/lazyload/bootstrap-slider.css"]
          },
          {
            name: "textAngular",
            serie: true,
            files: ["/modules/app/controllers/lazyload/textAngular-rangy.min.js",  "/modules/app/controllers/lazyload/textAngular.min.js", "/modules/app/controllers/lazyload/textAngularSetup.js", "/modules/app/styles/lazyload/textAngular.css"]
          },
          {
            name: "flow",
            files: ["/modules/app/controllers/lazyload/ng-flow-standalone.min.js"]
          },
          {
            name: "ngImgCrop",
            files: ["/modules/app/controllers/lazyload/ng-img-crop.js", "/modules/app/styles/lazyload/ng-img-crop.css"]
          },
          {
            name: "ngMask",
            files: ["/modules/app/controllers/lazyload/ngMask.min.js"]
          },
          {
            name: "angular-c3",
            files: ["/modules/app/controllers/lazyload/directives/c3.directive.js"]
          },
          {
            name: "easypiechart",
            files: ["/modules/app/controllers/lazyload/angular.easypiechart.min.js"]
          },
          {
            name: "ngMap",
            files: ["/modules/app/controllers/lazyload/ng-map.min.js"]
          }
        ]
      })
    }])


  // jquery/javascript and css for plugins via lazy load
    .constant("JQ_LOAD", {
      fullcalendar: [],
      moment: ["/modules/app/controllers/lazyload/moment.min.js"],
      sparkline: ["/modules/app/controllers/lazyload/jquery.sparkline.min.js"],
      c3: ["/modules/app/controllers/lazyload/d3.min.js", "/modules/app/controllers/lazyload/c3.min.js", "/modules/app/styles/lazyload/c3.css"],
      gmaps: ["https://maps.google.com/maps/api/js"]
    })

  // route provider

//.config(['$stateProvider','JQ_LOAD',
//  function($stateProvider,jqload) {
//    // Users state routing
//    $stateProvider.
//        state('app', {
//          url: '/app',
//          templateUrl: 'modules/app/views/base.html'
//        }).
//        state('calendar', {
//          url: '/calendar',
//          templateUrl: 'modules/app/views/calendar.html',
//          controller: "CalendarDemoCtrl",
//          resolve: {
//            deps: ["$ocLazyLoad", function(a) {
//              return a.load("ui.calendar")
//                  .then(function() {
//                    return a.load({
//                      name: "app.ctrls",
//                      files: ["/modules/app/controllers/lazyload/controllers/calendarCtrl.js"]
//                    })
//                  });
//            }]
//          }
//        }).
//        state('dashboard', {
//          url: '/dashboard',
//          templateUrl: 'modules/app/views/dashboard.html',
//          resolve: {
//            deps: ["$ocLazyLoad", function(a) {
//              return a.load([jqload.c3, jqload.sparkline])
//                  .then(function() {
//                    return a.load({
//                      name: "app.directives",
//                      files: ["/modules/app/controllers/lazyload/directives/sparkline.directive.js"]
//                    })
//                  })
//                  .then(function() {
//                    return a.load("angular-c3");
//                  })
//                  .then(function() {
//                    return a.load("easypiechart");
//                  })
//            }]
//          }
//
//        });
//
//  }
//    ])

      .config(["$routeProvider", "$locationProvider", "JQ_LOAD", function($routeProvider, $locationProvider, jqload) {


      var routes = [
        "ui/buttons", "ui/typography", "ui/grids", "ui/panels", "ui/tabs", "ui/modals", "ui/progress-bars", "ui/extras",
        "icons/font-awesome", "icons/ionicons",
        "forms/wizard",
        "tables/tables",
        "pages/signin", "pages/signup", "pages/404", "pages/forget-pass", "pages/lock-screen", "pages/invoice", "pages/search", "pages/timeline"
      ];

      function setRoutes(route) {
        var url = '/' + route,
            config = {
              templateUrl: "views/" + route + ".html"
            };

        $routeProvider.when(url, config);
        return $routeProvider;
      }

      routes.forEach(function(route) {
        setRoutes(route);
      });

      $routeProvider
          .when("/", {redirectTo: "/dashboard"})
          .when("/404", {templateUrl: "views/pages/404.html"})
          .otherwise({redirectTo: "/404"});



      $routeProvider.when("/dashboard", {
        templateUrl: "views/dashboard.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load([jqload.c3, jqload.sparkline])
                .then(function() {
                  return a.load({
                    name: "app.directives",
                    files: ["/modules/app/controllers/lazyload/directives/sparkline.directive.js"]
                  })
                })
                .then(function() {
                  return a.load("angular-c3");
                })
                .then(function() {
                  return a.load("easypiechart");
                })

          }]
        }
      });

      // text angular loaded in email/inbox
      $routeProvider.when("/email/inbox", {
        templateUrl: "views/email/inbox.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("textAngular");
          }]
        }
      });


      // calendar plugin
      // "/modules/app/controllers/lazyload/apps/calendarDemo.js"
      $routeProvider.when("/calendar", {
        templateUrl: "views/calendar.html",
        controller: "CalendarDemoCtrl",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("ui.calendar")
                .then(function() {
                  return a.load({
                    name: "app.ctrls",
                    files: ["/modules/app/controllers/lazyload/controllers/calendarCtrl.js"]
                  })
                });
          }]
        }
      });


      // Material Controller (For demo)
      $routeProvider.when("/material", {
        templateUrl: "views/material.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load({
              name: "app.ctrls",
              files: ["/modules/app/controllers/lazyload/controllers/materialCtrl.js"]
            })
          }]
        }
      });

      // tree view plugin
      $routeProvider.when("/ui/treeview", {
        templateUrl: "views/ui/treeview.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("angularBootstrapNavTree")
                .then(function() {
                  return a.load({
                    name: "app.ctrls",
                    files: ["/modules/app/controllers/lazyload/controllers/treeviewCtrl.js"]
                  })
                })
          }]
        }
      });

      // load ui-select when notification page load.
      $routeProvider.when("/ui/notifications", {
        templateUrl: "views/ui/notifications.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("ui.select");
          }]
        }
      });

      // load ui-select in form-elements
      $routeProvider.when("/forms/elements", {
        templateUrl: "views/forms/elements.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load(["ui.select", "ngTagsInput", "colorpicker.module", "ui.slider"])
                .then(function() {
                  return a.load({
                    name: "app.ctrls",
                    files: ["/modules/app/controllers/lazyload/controllers/selectCtrl.js", "/modules/app/controllers/lazyload/controllers/tagsInputCtrl.js"]
                  })
                })
                .then(function() {
                  return a.load("textAngular");
                })

          }]
        }
      });


      // file uploader in form-elements
      $routeProvider.when("/forms/uploader", {
        templateUrl: "views/forms/uploader.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("flow");
          }]
        }
      });

      // Image Crop in form-elements
      $routeProvider.when("/forms/imagecrop", {
        templateUrl: "views/forms/imagecrop.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("ngImgCrop")
                .then(function() {
                  return a.load({
                    name: "app.ctrls",
                    files: ["/modules/app/controllers/lazyload/controllers/imageCropCtrl.js"]
                  })
                })
          }]
        }
      });

      // Form validation
      $routeProvider.when("/forms/validation", {
        templateUrl: "views/forms/validation.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("ngMask");
          }]
        }
      });

      /// charts - sparklines
      $routeProvider.when("/charts/sparklines", {
        templateUrl: "views/charts/sparklines.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load(jqload.sparkline)
                .then(function() {
                  return a.load({
                    name: "app.directives",
                    files: ["/modules/app/controllers/lazyload/directives/sparkline.directive.js"]
                  })
                })
          }]
        }
      });

      /// charts - c3
      $routeProvider.when("/charts/c3", {
        templateUrl: "views/charts/c3.html",
        resolve: {
          deps: ["$ocLazyLoad", "$rootScope", "$timeout", function(a, $rootScope, $timeout) {
            return a.load(jqload.c3)
                .then(function() {
                  return a.load("angular-c3");
                })
                .then(function() {
                  return a.load({
                    name: "app.ctrls",
                    files: ["/modules/app/controllers/lazyload/controllers/c3ChartCtrl.js"]
                  })
                })
                .then(function() {
                  return a.load("easypiechart");
                })
                .then(function() {
                  $timeout(function() {
                    $rootScope.$broadcast("c3.resize");
                  }, 100);
                })

          }]
        }
      });


      /// Google Map
      $routeProvider.when("/maps/google-map", {
        templateUrl: "views/maps/google-map.html",
        resolve: {
          deps: ["$ocLazyLoad", function(a) {
            return a.load("ngMap");

          }]
        }
      });

    }])
.controller('maleBody', function($scope) {
      $scope.fileCount=0;
      $scope.$on('$destroy', function() {
        window.onbeforeunload = undefined;
      });
      $scope.$on('$locationChangeStart', function(event, next, current) {
        console.log($('body').find('div.dg.ac'));
        $('body').find('div.dg.ac').remove();
        console.log($('body').find('div.dg.ac'));
       });
    });





