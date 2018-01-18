var pos;
var titel;
var dummypos = {lat: 51.508742, lng: -0.120850};


  //Aktuelle Geodaten auslesen und speichern
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
          console.log('error');
    }
  }

  //Map für Detail Seite initialisieren und Marker setzen
  function initMap(pos, titel) {

    //Erst wenn Dom geladen ist mit der Initialisierung beginnen
  	google.maps.event.addDomListener(window, 'load', initialize(pos));

    this.pos = pos;
    this.titel = titel;

    //Initialisierung laden
    function initialize(pos){

      //Map erstellen und in Detailseite platzieren
      var map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: dummypos,
          zoom: 15
      });

      //Bei resize Karte über Position einmalig zentrieren
      google.maps.event.addListenerOnce(map, 'resize', function(){
          window.setTimeout(function() {
            map.panTo(pos);
          }, 3000);
      });

      //Damit Karte sauber dargestellt wird mit trigger anstossen
      map.addListener('center_changed', function() {

          google.maps.event.trigger(map, 'resize');
            
      });

      //set center, damit addListener center_changed aktiv wird
      map.setCenter(this.dummypos);

      //Sobald Karte geladen wurde, Marker setzen 
      google.maps.event.addListenerOnce(map, 'tilesloaded', function(){

          setMarkers();

          google.maps.event.trigger(map, 'resize');
          window.setTimeout(function() {
          map.panTo(pos);
          }, 3000);
      });

      //Funktion für das setzen der Marker, Info Fenster mit Titel erstellen
      function setMarkers() {

          var contentString = this.titel;

	        var infowindow = new google.maps.InfoWindow({
	          content: this.titel
	        });

	        var marker = new google.maps.Marker({
	          position: this.pos,
	          map: map
	        });

          //Listener, sobald Marker geklickt wird, wird Info Fenster gezeigt
	        marker.addListener('click', function() {
	          infowindow.open(map, marker);      
          });
        }
      }
    }


  //Funktion für die Routen Planung
	function routemap(titel){

    //Bewegungsart auslesen und in Variable speichern
    var selectedMode = document.getElementById('mode').value;

    //Erst wenn Dom geladen ist mit der Initialisierung beginnen
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

	            google.maps.event.trigger(map, 'resize');

	         });

	        
	        cupo(map, selectedMode, directionsService, directionsDisplay);

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
        } 
        else {
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

            google.maps.event.trigger(map, 'resize');

        });

        map.setCenter(dummypos);

        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            setMarkers(map, arrloc, arrpos);
            window.setTimeout(function() {
              map.panTo(arrpos[0]);
            }, 3000);
        });
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

    }

	}

google.maps.event.addDomListener(window, 'load');




