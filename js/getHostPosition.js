// Fonction capturant les valeurs du GPS
function showGPS(position){
	lat=((Math.round(position.coords.latitude*1000000))/1000000);
	lng=((Math.round(position.coords.longitude*1000000))/1000000);

	
	document.getElementById("lat").value = lat;
	document.getElementById("lng").value = lng;
	
	
}

// Fonction qui gère les erreurs de GPS
function gpsError(error) {}

// Ligne appelle la localisation
navigator.geolocation.watchPosition(showGPS, gpsError, {enableHighAccuracy:true});