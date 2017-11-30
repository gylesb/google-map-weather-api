(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyCwSdWR15ZNoTDzZqWSMgYLBtPdwLMBgVQ"

},{}],2:[function(require,module,exports){
'use strict';

var apiKey = require('./../.env').apiKey;

$(document).ready(function () {
  $('#searchBike').click(function () {
    var searchMaps = $('#searchBar').val();
    $('#searchBar').val("");

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -47.6062, lng: -122.3321 },
        zoom: 15
      });

      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);

      service.getDetails({
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
      }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id + '<br>' + place.formatted_address + '</div>');
            infowindow.open(map, this);
          });
        }
      });
    }

    $.ajax({
      url: 'https://bikeindex.org/api/v3/search?q=' + searchBike + '&appid=' + apiKey,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function success(response) {
        console.log(response);
        response.bikes.forEach(function (bike) {
          var name = bike.title;
          var photo = bike.thumb;
          var serial = bike.serial;
          console.log(name);
          $('.displayBikes').append("<div class='card'><h5 class='bikeTitle'>" + name + "</h5><img class='bikeImage' src='" + photo + "'></div>");
        });
      }
      // error: function() {
      //   $('#errors').text("There was an error processing your request. Please try again.")
      // }
    });
  });
});

},{"./../.env":1}]},{},[2]);
