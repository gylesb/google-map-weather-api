var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#searchBike').click(function() {
    var searchBike = $('#searchBar').val();
    $('#searchBar').val("");
    var searchId = $('#serialNumber').val();
    $('#serialNumber').val("");
    var searchModel = $('#manufacturer').val();
    $('#manufacturer').val("");
    var searchColor = $('#color').val();
    $('#color').val("");

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
