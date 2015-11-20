"use strict";function success(a){var b=a.coords.latitude,c=a.coords.longitude,d=new Map({zoom:16});d.initMap({coords:{latitude:b,longitude:c}});var e=new AppView({model:d});e.initialize()}function renderDefaultMap(){var a=new Map({zoom:3});a.initMap({coords:{latitude:42.3601,longitude:-71.0589}});var b=new AppView({model:a});b.initialize()}function init(){navigator.geolocation?navigator.geolocation.getCurrentPosition(success):renderDefaultMap()}$(document).ready(function(){init()});var Map=Backbone.Model.extend({defaults:{id:"",currentLatLng:{},mapOptions:{},map:{},position:{},zoom:8},initMap:function(a){this.set("position",a);var b=new google.maps.LatLng(a.coords.latitude,a.coords.longitude);this.set("currentLatLng",b);var c={zoom:this.get("zoom"),center:b,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1};this.set("mapOptions",c)}}),AppView=Backbone.View.extend({el:$("#app-container"),template:_.template($("#routeTrackerTemplate").html()),events:{"click #btn-clear-map":function(){this.removeMarkers(),this.removeLine()},"click #btn-clear-point":"removeLastLeg"},initialize:function(){this.render(),this.renderPolyline(),this.markers=[];var a=this.model.get("currentLatLng"),b=new google.maps.InfoWindow({map:this.map});b.setPosition(a),b.setContent("You");var c=_.bind(this.addLatLng,this);this.map.addListener("click",c)},renderMap:function(){var a=this.$("#map-container");this.model.set("map",new google.maps.Map(a.get(0),this.model.get("mapOptions")))},render:function(){return this.$el.html(this.template(this)),this.renderMap(),this},renderPolyline:function(){this.map=this.model.get("map"),this.poly=new google.maps.Polyline({strokeColor:"#000000",strokeOpacity:1,strokeWeight:3}),this.poly.setMap(this.map)},removeLine:function(){this.poly.setMap(),this.renderPolyline(),$(".distance-span").empty();var a=[];this.calcDistance(a)},removeMarkers:function(){for(var a=0;a<this.markers.length;a++)this.markers[a].setMap(null);this.markers=[]},removeLastLeg:function(){this.markers[this.markers.length-1].setMap(null),this.markers.pop();var a=this.poly.getPath();a.pop(),this.calcDistance(a)},addLatLng:function(a){var b=this.poly.getPath();b.push(a.latLng),this.calcDistance(b);var c=new google.maps.Marker({position:a.latLng,title:"#"+b.getLength(),map:this.map});this.markers.push(c)},calcDistance:function(a){function b(){j.empty(),h.hasClass("btn-active")?j.text(f+" Miles"):i.hasClass("btn-active")&&j.text(g+" Km")}var c=google.maps.geometry.spherical.computeLength(a),d=62137e-8*c,e=.001*c,f=d.toFixed(2),g=e.toFixed(2),h=$("#btn-miles"),i=$("#btn-kilos"),j=$(".distance-span");h.hasClass("btn-active")?j.text(f+" Miles"):i.hasClass("btn-active")&&j.text(g+" Km"),this.mileKiloSwap(b)},mileKiloSwap:function(a){$("#btn-kilos").on("click",function(){$("#btn-kilos").addClass("btn-active"),$("#btn-miles").removeClass("btn-active"),a()}),$("#btn-miles").on("click",function(){$("#btn-miles").addClass("btn-active"),$("#btn-kilos").removeClass("btn-active"),a()})}});