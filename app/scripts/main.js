'use strict';

function init() {
  var map = new Map({
    zoom: 8
  });
  map.initMap({
    coords: {
      latitude: 42.3601,
      longitude: -71.0589
    }
  });

  var mapView = new MapView({
    model: map
  });
  mapView.initialize();
}

$(document).ready(function() {
  init();
})
