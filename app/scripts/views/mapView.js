'use strict';

var MapView = Backbone.View.extend({
  id: 'map-container',

  // Initialize the google map in the map key of the Map model
  initialize: function() {
    this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));
    this.render();
    this.map = this.model.get('map');

    this.poly = new google.maps.Polyline({
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    this.poly.setMap(this.map);

    var boundAddLatLng = _.bind(this.addLatLng, this);
    this.map.addListener('click', boundAddLatLng);

  },

  // Render the map in the map-container div
  render: function() {
    $('#map-container').replaceWith(this.el);
    return this;
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
        $disSpan.text(fixedMiles);
      } else if ($btnK.hasClass('btn-active')) {
        $disSpan.text(fixedKilos);
      }

    function swapDistance() {
      $disSpan.empty();

      if ($btnM.hasClass('btn-active')) {
        $disSpan.text(fixedMiles);
      } else if ($btnK.hasClass('btn-active')) {
        $disSpan.text(fixedKilos);
      }
    }

    this.mileKiloSwap(swapDistance);
  },

  mileKiloSwap: function(fn) {

    $('#btn-kilos').on('click', function() {
      fn();
    });

    $('#btn-miles').on('click', function() {
      fn();
    });
  }
});
