var pos;
var titel;

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

  google.maps.event.addDomListener(window, 'load', initialize());

      this.pos = pos;
      this.titel = titel;


      function initialize(){

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: pos,
          zoom: 15
        });

        


          map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            google.maps.event.trigger(map, 'resize');


            window.setTimeout(function() {
              map.panTo(pos);
            }, 3000);
            });

            map.setCenter(this.pos);

          google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            setMarkers();
          });

          function setMarkers() {

          	var contentString = this.titel;

	        var infowindow = new google.maps.InfoWindow({
	          content: this.titel
	        });

	        var marker = new google.maps.Marker({
	          position: this.pos,
	          map: map
	        });

	        marker.addListener('click', function() {
	          infowindow.open(map, marker);      
        });

          }

      
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

google.maps.event.addDomListener(window, 'load');



function alleAnzeigen(){




}





