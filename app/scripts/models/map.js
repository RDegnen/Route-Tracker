'use strict';

var Map = Backbone.Model.extend({
  defaults: {
    id: '', currentLatLng: {}, mapOptions: {}, map: {},
    position: {}, zoom: 8
  },

  initMap: function(position) {
    this.set('position', position);
    var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.set('currentLatLng', currentLatLng);
    var mapOptions = {
      zoom: this.get('zoom'),
      center: currentLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };
    this.set('mapOptions', mapOptions);
  }
});
