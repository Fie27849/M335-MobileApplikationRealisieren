var lat;
var lon;
var geoID

 function CurrentPosition(){

	 geoID = navigator.geolocation.getCurrentPosition(

	 function onSuccess(position) {

		lat = position.coords.latitude;
		lon = position.coords.longitude;

    },
 
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    });
 
   savePosition(lat, lon);
}

function GoogleMap(){

this.initialize = function(){
var map = showMap();
addMarkersToMap(map);
}

 var showMap = function(){
var mapOptions = {
zoom: 4,
center: new google.maps.LatLng(-33, 151),
mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

return map;
}
}


//add Marker
var addMarkersToMap = function(map){
var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');

var markerOne = new google.maps.Marker({
position: latitudeAndLongitudeOne,
map: map
});
}

