'use strict';

var MapView = Backbone.View.extend({
  el: '#view-container',
  events: {
    'click #btn-clear-map': function() {
      this.removeMarkers();
      this.removeLine();
    },
    'click #btn-clear-point': 'removeLastLeg'
  },

  initialize: function() {
    this.render();
    this.renderPolyline();
    this.markers = [];

    var pos = this.model.get('currentLatLng');
    var infoWindow = new google.maps.InfoWindow({map: this.map});
    infoWindow.setPosition(pos);
    infoWindow.setContent('You');

    var boundAddLatLng = _.bind(this.addLatLng, this);
    this.map.addListener('click', boundAddLatLng);
  },

  // Render the google map in the map key of the model
  renderMap: function() {
    this.model.set('map', new google.maps.Map(document.getElementById('map-container'), this.model.get('mapOptions')));
  },

  render: function() {
    this.renderMap();
    return this;
  },

  // Create the line between points on the map
  renderPolyline: function() {
    this.map = this.model.get('map');

    this.poly = new google.maps.Polyline({
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    this.poly.setMap(this.map);
  },

  // Removes polyline and re-renders it
  removeLine: function() {
    this.poly.setMap();
    this.renderPolyline();
    $('.distance-span').empty();
  },

  removeMarkers: function() {
    for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
    this.markers = [];
  },

  // Remove the last marker and line created and re-calculates
  // the distance
  removeLastLeg: function() {
    this.markers[this.markers.length - 1].setMap(null);
    this.markers.pop();

    var path = this.poly.getPath();
    path.pop();
    this.calcDistance(path);
  },

  // Adds a marker on click and connects multiple markers
  addLatLng: function(event) {
    var path = this.poly.getPath();

    path.push(event.latLng);
    this.calcDistance(path);

    var marker = new google.maps.Marker({
      position: event.latLng,
      title: '#' + path.getLength(),
      map: this.map
    });
    this.markers.push(marker);
  },

  // Calculate the distance of the polyline
  calcDistance: function(array) {
    // Distance is in meters
    var distance = google.maps.geometry.spherical.computeLength(array);

    var miles = distance * 0.00062137;
    var kilometers = distance * 0.001;

    var fixedMiles = miles.toFixed(2);
    var fixedKilos = kilometers.toFixed(2);

    var $btnM = $('#btn-miles');
    var $btnK = $('#btn-kilos');
    var $disSpan = $('.distance-span');

    if ($btnM.hasClass('btn-active')) {
      $disSpan.text(fixedMiles + ' Miles');
    } else if ($btnK.hasClass('btn-active')) {
      $disSpan.text(fixedKilos + ' Km');
    }

    // Called when mileKiloSwap is run to change from
    // miles to kilos and vice versa
    function swapDistance() {
      $disSpan.empty();

      if ($btnM.hasClass('btn-active')) {
        $disSpan.text(fixedMiles + ' Miles');
      } else if ($btnK.hasClass('btn-active')) {
        $disSpan.text(fixedKilos + ' Km');
      }
    }
    // Call mileKiloSwap with swapDistance() as param
    this.mileKiloSwap(swapDistance);
  },

  // Swaps from miles to kilos and vice versa on click
  // of either button
  mileKiloSwap: function(fn) {
    $('#btn-kilos').on('click', function() {
      fn();
    });
    $('#btn-miles').on('click', function() {
      fn();
    });
  }
});
