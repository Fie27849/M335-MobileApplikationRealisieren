
 function CurrentPosition(){

   if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            addlist(pos);
         });
        }

            else {
          // Browser doesn't support Geolocation
          console.log('error');
        }
      }

function initMap(pos, titel) {

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (pos) {

            infoWindow.setPosition(pos);
            infoWindow.setContent(titel);
            map.setCenter(pos);
            //handleLocationError(true, infoWindow, map.getCenter());
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
    }


/*

//add Marker
var addMarkersToMap = function(map){
var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');

var markerOne = new google.maps.Marker({
position: latitudeAndLongitudeOne,
map: map
});
}

*/