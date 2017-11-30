(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKeyWeather = "2650af993b73cf06cfbf8dc7067c3fc9"

},{}],2:[function(require,module,exports){
'use strict';

var apiKeyWeather = require('./../.env').apiKeyWeather;

var lat;
var long;

$(document).ready(function () {
  $('#locateUser').click(locateUser);

  $('#weatherLocation').click(function () {
    var city = $('#location').val();
    $('#location').val("");

    var promise = new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function (response) {
      var body = JSON.parse(response);

      console.log(body.coord.lat);
      console.log(body.coord.lon);
      var searchedPosition = { coords: { latitude: body.coord.lat, longitude: body.coord.lon } };

      geolocationSuccess(searchedPosition);
      $('.showHumidity').text('The humidity in ' + city + ' is ' + body.main.humidity + '%');
      $('.showTemp').text('The temperature in Kelvins is ' + body.main.temp + ' degrees.');
    }, function (error) {
      $('.showErrors').text('There was an error processing your request: ' + error.message);
    });
  });
});

//google maps functions
function locateUser() {
  // If the browser supports the Geolocation API
  if (navigator.geolocation) {
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000 // 10 seconds
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
  } else {
    alert("Your browser doesn't support the Geolocation API");
  }
}

// this is the success callback from telling the navigator (your browser) to get the current user's position
// we do this on line 13 above. We pass in a function to call on success, a function to call on error, and some options to tell the geolocation api how we want it to run.
// on successfully locating the user, geolocationSuccess() gets called automatically, and it is passed the user's position as an argument.
// on error, geolocationError is called.

function geolocationSuccess(position) {

  // here we take the `position` object returned by the geolocation api
  // and turn it into google maps LatLng object by calling the google.maps.LatLng constructor function
  // it 2 arguments: one for latitude, one for longitude.
  // You could refactor this section to pass google maps your own coordinates rather than using geolocation for the user's current location.
  // But you must use coordinates to use this method.
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom: 16,
    center: userLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // Draw the map - you have to use 'getElementById' here.
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  // Place the marker
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}

function geolocationError(positionError) {
  alert(positionError);
}

},{"./../.env":1}]},{},[2]);
