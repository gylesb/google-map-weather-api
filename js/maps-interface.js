var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#searchBike').click(function() {
    var searchMaps = $('#searchBar').val();
    $('#searchBar').val("");

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.866, lng: 151.196},
        zoom: 15
      });

      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);

      service.getDetails({
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(map, this);
          });
        }
      });
    }

    $.ajax({
      url: `https://bikeindex.org/api/v3/search?q=${searchBike}&appid=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function success(response) {
        console.log(response);
        response.bikes.forEach(function(bike) {
          let name = bike.title;
          let photo = bike.thumb;
          let serial = bike.serial;
          console.log(name);
          $('.displayBikes').append("<div class='card'><h5 class='bikeTitle'>"+name+"</h5><img class='bikeImage' src='"+photo+"'></div>");

        });
      }
      // error: function() {
      //   $('#errors').text("There was an error processing your request. Please try again.")
      // }
    });
  });
});
