'use strict';

// On success load the map with the users current location as the coordinates
function success(position) {
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

  var appView = new AppView({
    model: map
  });
  appView.initialize();
}

function renderDefaultMap() {
  var map = new Map({
    zoom: 3
  });
  map.initMap({
    coords: {
      latitude: 42.3601,
      longitude: -71.0589
    }
  });

  var appView = new AppView({
    model: map
  });
  appView.initialize();
}

function init() {
  // Get the user's current location and return success callback
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    // If geolocation is not supported by browser than render map without it
    renderDefaultMap();
  }
}

$(document).ready(function() {
  init();
});
