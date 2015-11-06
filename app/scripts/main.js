'use strict';

// // On success load the map with the users current location as the coordinates
// function success(position) {
//   var lat = position.coords.latitude;
//   var lng = position.coords.longitude;

//   var map = new Map({
//     zoom: 16
//   });
//   map.initMap({
//     coords: {
//       latitude: lat,
//       longitude: lng
//     }
//   });

//   var mapView = new MapView({
//     model: map
//   });
//   mapView.initialize();
// }

// function renderDefaultMap() {
//   var map = new Map({
//     zoom: 3
//   });
//   map.initMap({
//     coords: {
//       latitude: 42.3601,
//       longitude: -71.0589
//     }
//   });

//   var mapView = new MapView({
//     model: map
//   });
//   mapView.initialize();
// }

// function init() {
//   // Get the user's current location and return success callback
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success);
//   } else {
//     // If geolocation is not supported by browser than render map without it
//     renderDefaultMap();
//   }
// }

// $(document).ready(function() {
//   init();
// });

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'initRouteTracker',
    'routeTracker': 'initRouteTracker',
    'directions': 'initDirections'
  },

  initRouteTracker: function() {
    // Get the user's current location and return success callback
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.routeTrackerSuccess);
    } else {
      // If geolocation is not supported by browser than render map without it
      this.renderDefaultMapTracker();
    }
  },

  // On success load the map with the users current location as the coordinates
  routeTrackerSuccess: function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var map = new Map({
      zoom: 16
    });
    map.initMap({
      coords: {
        latitude: lat,
        longitude: lng
      }
    });

    var routeTrackerView = new RouteTrackerView({
      model: map
    });
    routeTrackerView.initialize();
  },

  renderDefaultMapTracker: function() {
    var map = new Map({
    zoom: 3
    });
    map.initMap({
      coords: {
        latitude: 42.3601,
        longitude: -71.0589
      }
    });

    var routeTrackerView = new RouteTrackerView({
      model: map
    });
    routeTrackerView.initialize();
  }
});

$(document).ready(function() {
  var router = new AppRouter();
  Backbone.history.start();
});
