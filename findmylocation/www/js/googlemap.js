
var pos;

 function CurrentPosition(){

   if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos);
            addlist(pos);
         });
        }

            else {
          // Browser doesn't support Geolocation
          console.log('error');
        }
      }

function initMap(pos, titel) {

      this.pos = pos;

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        var infoWindow = new google.maps.InfoWindow({map: map});


        // Try HTML5 geolocation.
        if (pos) {

          map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            window.setTimeout(function() {
              map.panTo(pos);
            }, 3000);
          });
            infoWindow.setContent(titel);
            infoWindow.setPosition(pos);
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


var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

function routemap(titel){

  var map = new google.maps.Map(document.getElementById('map_canvas2'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 30
        });
        
        cupo();

        // Try HTML5 geolocation.
 function cupo(){       
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log('test');
            var currentpos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            createRoute(currentpos);
         });
        }
            else {
          // Browser doesn't support Geolocation
          console.log('error');
        }
        }

  function createRoute(currentpos){
       map.setCenter(currentpos);
       directionsService.route({ 
        origin: currentpos,
        destination: new google.maps.LatLng(pos),
        travelMode: google.maps.TravelMode.DRIVING
      },
    function(response, status)
    { if (status == google.maps.DirectionsStatus.OK)
      { directionsDisplay.setMap(map);
        directionsDisplay.setDirections(response);
        }
    });
  }
  
}






