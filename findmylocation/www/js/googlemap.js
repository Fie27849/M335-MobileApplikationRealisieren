var pos;
var titel;
var dummypos = {lat: 51.508742, lng: -0.120850};

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

  	google.maps.event.addDomListener(window, 'load', initialize(pos));

      this.pos = pos;
      this.titel = titel;


      function initialize(pos){

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: dummypos,
          zoom: 15
        });


          google.maps.event.addListenerOnce(map, 'resize', function(){
            window.setTimeout(function() {
              map.panTo(pos);
            }, 3000);
          });


          map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            google.maps.event.trigger(map, 'resize');


            
            });

            map.setCenter(this.dummypos);

          google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            setMarkers();
            google.maps.event.trigger(map, 'resize');
            window.setTimeout(function() {
              map.panTo(pos);
            }, 3000);
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



	function routemap(titel){

		var selectedMode = document.getElementById('mode').value;
		google.maps.event.addDomListener(window, 'load', initialize());

		function initialize(){

		var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
	  var map = new google.maps.Map(document.getElementById('map_canvas2'), {
	          center: pos,
	          zoom: 15
	        });
	  directionsDisplay.setMap(map);

	  		map.addListener('center_changed', function() {
	            // 3 seconds after the center of the map has changed, pan back to the
	            // marker.
	            google.maps.event.trigger(map, 'resize');

	            });

	        
	        cupo(map, selectedMode, directionsService, directionsDisplay);

	        // Try HTML5 geolocation.
	}

	  
	  
	}

		function cupo(map, selectedMode, directionsService, directionsDisplay){       
		    if (navigator.geolocation) {
		          navigator.geolocation.getCurrentPosition(function(position) {
		          console.log('test');
		          var currentpos = {
		              lat: position.coords.latitude,
		              lng: position.coords.longitude
		          };
		          createRoute(currentpos, map, selectedMode, directionsService, directionsDisplay);
		     	  });
		     }
		     else {
		          // Browser doesn't support Geolocation
		         console.log('error');
		     }
		}

		function createRoute(currentpos, map, selectedMode, directionsService, directionsDisplay){
	       directionsService.route({ 
	       origin: currentpos,
	       destination: new google.maps.LatLng(pos),
	       travelMode: google.maps.TravelMode[selectedMode]
	      },

	    function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
	    });
	  }


	  function allMarkers(arrloc,arrpos) {


  	google.maps.event.addDomListener(window, 'load', initialize(arrloc,arrpos));


      function initialize(){

        var map = new google.maps.Map(document.getElementById('map_canvas3'), {
          center: arrpos[0],	
          zoom: 10
        });


          google.maps.event.addListenerOnce(map, 'resize', function(){
            window.setTimeout(function() {
              map.panTo(arrpos[0]);
            }, 3000);
          });


          map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            google.maps.event.trigger(map, 'resize');

            window.setTimeout(function() {
              map.panTo(arrpos[0]);
            }, 3000);

            });

            map.setCenter(arrpos[0]);

          google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            setMarkers(map, arrloc, arrpos);
            window.setTimeout(function() {
              map.panTo(arrpos[0]);
            }, 3000);
          });

			//map.fitBounds(latlngbounds);

          }
    }


     function setMarkers(map, arrloc, arrpos) {

          	var latlngbounds = new google.maps.LatLngBounds();

          	var i;

          	for (i = 0; i < arrloc.length; i++) { 

    			var content = arrloc[i];

		        var marker = new google.maps.Marker({
		          position: arrpos[i],
		          map: map
		        });
				map.setCenter(marker.getPosition())

				var infowindow = new google.maps.InfoWindow({
	          content: content
	        });

		        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
			        return function() {
			           infowindow.open(map,marker);
			        };
			    })(marker,content,infowindow)); 

	        	//latlngbounds.extend(new google.maps.LatLng(arrpos[i]));
}

			}

google.maps.event.addDomListener(window, 'load');




