var lat;
var lng;
//var myspeed;
var heading;
var timeout = 2000;
var decalage = -1000;
var distance_reload = 500; // temp entre chaque changement de la distance entre les joueurs
var ajax_url = "/refresh.php"; // Url du call ajax
var tracedLat = _("tracedLat").value;
var tracedLng = _("tracedLng").value;
var oldAngle = 0;
var oldHeading = 0;
var finalHeading = 0;
var i = 0;

function _(id){
	return document.getElementById(id);
}

if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
	
	if (window.DeviceOrientationEvent) {
	    window.addEventListener("deviceorientation", function (e) {
	    	alpha = e.webkitCompassHeading;
	    	heading=alpha;
			_("heading").value = heading;

	    }, false);
	}

	function showGPS(position){
		lat=((Math.round(position.coords.latitude*1000000))/1000000);
		lng=((Math.round(position.coords.longitude*1000000))/1000000);
		//myspeed=Math.round(position.coords.speed*3.6);
		_("lat").value = lat;
		_("lng").value = lng;
		//_("myspeed").value = myspeed;
		//mySpeed.innerHTML=myspeed;
		myHeading.innerHTML="Cap " + heading;
	}

} else {

	function showGPS(position){
		lat=((Math.round(position.coords.latitude*1000000))/1000000);
		lng=((Math.round(position.coords.longitude*1000000))/1000000);
		heading=Math.round(position.coords.heading);
		//myspeed=Math.round(position.coords.speed*3.6);
		_("heading").value = heading;
		_("lat").value = lat;
		_("lng").value = lng;
		_("myspeed").value = myspeed;
		//mySpeed.innerHTML=myspeed;
		myHeading.innerHTML="Cap " + heading;
	}
}

//if(lng == 0 && lat == 0){
//	_("info").innerHTML = "You are not visible, share your GPS !!";
//}else{
//	_("info").innerHTML = ""
//}


// Fonctions gérer écrivant dans l'affichage la distance entre chaque concurant
function traceGPS(){
	var x=(tracedLng-document.getElementById("lng").value);
	var y=(tracedLat-document.getElementById("lat").value);
	var H=(Math.sqrt((x*x)+(y*y)));
	var r=(Math.floor(H*100000));

	
	var angle = angleCalculator(x, y, H);

	// On fait tourner la fleche
	rotateArrow(angle);

	// On écris les resultat sur la page
	_("angleRelatif").value = angle;

	if (r<1000){_("distance").innerHTML = r + " m";}
	if (r>1000){_("distance").innerHTML = (Math.round(r/100)/10) + " km";}
	
	
	traceGPSTimeOut();
}

function angleCalculator(x, y, H){
	
	// On passe les radiant en degrés
	var angleCos = radToDeg(Math.acos(Math.abs(x)/H));
	// Calcule de l'angle relatif
	var finalHeading = calculatefinalHeading();
	var angleRelatif = 0;
	var angleTarget;

if(window.innerWidth > window.innerHeight){
    //alert("Please use Portrait!");
}

	if(x>0){
		if(y>0){ // Nord Est
			angleTarget = 90 - angleCos;
		}else{ // Sud Est
			angleTarget = 90 + angleCos;
		}
	}else{
		if(y>0){ // Nord Ouest
			angleTarget = 270 + angleCos;
		}else{ // Sud Ouest
			angleTarget = 270 - angleCos;
		}
	}
	//myAcc.innerHTML = "Angle Cosinus = " + angleCos + "°<br />Heading = " + finalHeading + "<br />Angle Target from nord = " + angleTarget;
	angleRelatif = (angleTarget - finalHeading);
	return angleRelatif;
}

function calculatefinalHeading(){
	var currentHeading = parseInt(_("heading").value);
	return currentHeading;
}

// Fonction qui fait tourner la fleche
function rotateArrow(angleRelatif){

	$("#arrow").css({
		    'transform': 'rotate('+angleRelatif+'deg)',
		    '-moz-transform': 'rotate('+angleRelatif+'deg)',
		    '-o-transform': 'rotate('+angleRelatif+'deg)',
		    '-webkit-transform': 'rotate('+angleRelatif+'deg)'
	})
}

// Fonction convertissant les randiants en degrés
function radToDeg(rad){
	return deg = Math.round(((rad * 180.0)/ Math.PI));
}

// Fonction vérifiant que le guest c'est connecté
function verification(){
	var date = new Date();
	var updated_at = _("updated_at").value;
	var now = (date.getTime());
	now = Math.round(now/1000);
	
	if(_("user").value == "host"){ var user = 'guest'}else{ var user = 'host'}

	
//	if(tracedLat == 0 && tracedLng == 0 && updated_at != 0){
//		_("wait").style.display = "block";
//		_("wait").innerHTML = "<center><p><em>Waiting for him<br />to allow GPS</em></p><img src=\"http://michael-berthouzoz.me/sites/all/themes/metroid/img/loading.gif\" style=\"margin-top:100px;\"></center>";
//	}

	if(updated_at < 1){
		_("wait").style.display = "block";
		_("arrow").style.display = "none";
		_("bg_arrow").style.display = "none";
		_("wait").innerHTML = "<center><p><em>Waiting for Human<br />to connect</em></p><img src=\"http://michael-berthouzoz.me/sites/all/themes/metroid/img/loading.gif\" style=\"margin-top:100px;\"><br /><span style=\"margin-top:100px;\">Try to <a href=\"#\" onclick=\"location.reload(true); return false;\">Refresh</a></span></center>";
		traceGPSTimeOut();
	}

	if(tracedLat !== 0 && tracedLng !== 0 && updated_at > 0){
		_("arrow").style.display = "block";
		_("bg_arrow").style.display = "block";
		_("distance").style.display = "block";
		_("wait").style.display = "none";
		traceGPS();
		//console.log(now);
		console.log(updated_at);
		if(((now) - (updated_at)) < 10){
			document.body.style.background = '#097d09';
			document.body.style.background = 'linear-gradient(to left, #097d09, #06bf06)'; // GREEN
			//_("traced_speed1").style.visibility = "visible";
			//_("traced_speed2").style.visibility = "visible";
		}else{
			document.body.style.background = '#ff8a00';
			document.body.style.background = 'linear-gradient(to left, #ff8a00, #ffd200)'; // ORANGE
		}
	}
}
var xhr
// Fonction qui réalise le call ajax pour mettre à jour la base de donnée
function uploadPage(){
	var i = 0;
	var position = $('#form').serializeArray();

	xhr = $.ajax({
		url: ajax_url,
		datatype: "json",
		type: "POST",
		data: position,
		success: function(data){
			positionsInitialisation(data);		
		},
		error: function(){
			i++;
			_("angleSin").value = i;
		}
	});

	timeOut(); 
	setTimeout('xhrAbort()', 900);
}	

function xhrAbort(){
	xhr.abort();
}

// Fonction qui parse le json et qui initialise et actualise toute les variables des joueurs
function positionsInitialisation(data){
	var positions = jQuery.parseJSON(data);

	tracedLat = positions.lat;
	tracedLng = positions.lng;
	if(positions.speed == 0){
		//_("hisSpeed").innerHTML = "Stopped";	
	}else{
		//_("hisSpeed").innerHTML = positions.speed+" km/h";
			//mySpeed.innerHTML = mySpeed;
			//myAcc.innerHTML = myAcc;
	}
	
	_("updated_at").value = positions.updated_at;
}

// Fonction créant la boucle Ajax
function timeOut(){
	setTimeout("uploadPage()", timeout);
}	

// Fonctions générés créant la boucle d'actualisation de l'affichage de la distance des concurents
function traceGPSTimeOut(){
	setTimeout("verification()", distance_reload);
}

// Fonction qui gère les erreurs de GPS
function gpsError(error){
	alert('GPS mandatory');
	return;
}
// Ligne appelle la localisation
navigator.geolocation.watchPosition(showGPS, gpsError, {enableHighAccuracy:true});

$(document).ready(function(){
	// Appelle de la fonction de bouclage ajax
	timeOut();

	// Appelle des fonctions de bouclage 
	setTimeout("traceGPS()", timeout+decalage);
	setTimeout(function() { window.scrollTo(0, 1) }, 2000);
});
