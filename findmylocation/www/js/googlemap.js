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

      //Initialisierung laden
		  function initialize(){

          //Service für Routenplanaung einbinden
      		var directionsDisplay = new google.maps.DirectionsRenderer;
          var directionsService = new google.maps.DirectionsService;
          //Map erstellen und in Detailseite platzieren
      	  var map = new google.maps.Map(document.getElementById('map_canvas2'), {
  	          center: pos,
  	          zoom: 15
      	   });

          //set center, damit addListener center_changed aktiv wird
          map.setCenter(this.dummypos);

      	  directionsDisplay.setMap(map);

          //Damit Karte sauber dargestellt wird mit trigger anstossen
	  		  map.addListener('center_changed', function() {

	            google.maps.event.trigger(map, 'resize');

	         });

	        //Funktion aufrufen, für die Bestimmung des aktuellen Standortes
	        cupo(map, selectedMode, directionsService, directionsDisplay);
	    }
	}

  //Funktion für die bestimmung des aktuellen Standortes
	function cupo(map, selectedMode, directionsService, directionsDisplay){       
		  if (navigator.geolocation) {
		      navigator.geolocation.getCurrentPosition(function(position) {
		        console.log('test');
		          var currentpos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
		          };
            //Funktionsaufruf für das Erstellen der Route
		        createRoute(currentpos, map, selectedMode, directionsService, directionsDisplay);
	        });
		  }
		  else {
		      console.log('error');
		  }
	}

  //Funktion für das Erstellen der Route
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

  //Funktion für das Darstellen alles Marker
	function allMarkers(arrloc,arrpos) {

      //Erst wenn Dom geladen ist mit der Initialisierung beginnen
  	  google.maps.event.addDomListener(window, 'load', initialize(arrloc,arrpos));

      //Initialisierung laden
      function initialize(){

        //Map erstellen und platzieren
        var map = new google.maps.Map(document.getElementById('map_canvas3'), {
            center: arrpos[0],	
            zoom: 10
        });

        //Bei resize Karte über Position einmalig zentrieren
        google.maps.event.addListenerOnce(map, 'resize', function(){
            window.setTimeout(function() {
              map.panTo(arrpos[0]);
            }, 3000);
        });

        //Damit Karte sauber dargestellt wird mit trigger anstossen
        map.addListener('center_changed', function() {

            google.maps.event.trigger(map, 'resize');

        });

        //set center, damit addListener center_changed aktiv wird
        map.setCenter(dummypos);

        //Sobald Karte geladen wurde, Marker setzen 
        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            //Funktionsaufruf damit alle Marker gesetzt werden
            setMarkers(map, arrloc, arrpos);
            window.setTimeout(function() {
              map.panTo(arrpos[0]);
            }, 3000);
        });
      }
  }

  //Funktion für das setzen aller Marker auf einer Karte, die Arrays mit den locations und den Geodaten und die map wird übergeben
  function setMarkers(map, arrloc, arrpos) {

      var latlngbounds = new google.maps.LatLngBounds();

      var i;

    //Daten in Schleife aus Array lesen und alle Marker erstellen mit Infofenster mit Location Name
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

        //Click Funktion auf Marker um Location Name anzeigen zu können
  		  google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
  			    return function() {
  			       infowindow.open(map,marker);
  			     };
  			})(marker,content,infowindow)); 

    }

	}

google.maps.event.addDomListener(window, 'load');




