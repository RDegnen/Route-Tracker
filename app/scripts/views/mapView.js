'use strict';

var MapView = Backbone.View.extend({
  id: 'map-container',

  initialize: function() {
    this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));
    this.render();
  },

  render: function() {
    $('#map-container').replaceWith(this.el);
    return this;
  }
});
