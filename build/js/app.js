(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "ba624e73dcf88821f38288c2db5d2789c275645870fad5fd0fc5ac1de8587c6e"

},{}],2:[function(require,module,exports){
'use strict';

var apiKey = require('./../.env').apiKey;

$(document).ready(function () {
  $('#searchBike').click(function () {
    var searchBike = $('#searchBar').val();
    $('#searchBar').val("");
    var searchId = $('#serialNumber').val();
    $('#serialNumber').val("");
    var searchModel = $('#manufacturer').val();
    $('#manufacturer').val("");
    var searchColor = $('#color').val();
    $('#color').val("");

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
