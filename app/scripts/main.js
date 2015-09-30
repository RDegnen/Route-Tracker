'use strict';
function success(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  var map = new Map({
    zoom: 8
  });
  map.initMap({
    coords: {
      latitude: lat,
      longitude: lng
    }
  });

  var mapView = new MapView({
    model: map
  });
  mapView.initialize();
};

function init() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }
}

$(document).ready(function() {
  init();
})
