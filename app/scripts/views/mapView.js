'use strict';

var MapView = Backbone.View.extend({
  id: 'map-container',

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

  render: function() {
    $('#map-container').replaceWith(this.el);
    return this;
  },

  addLatLng: function(event, poly, map) {
    var path = this.poly.getPath();

    path.push(event.latLng);

    var marker = new google.maps.Marker({
      position: event.latLng,
      title: '#' + path.getLength(),
      map: this.map
    });
  }
});
