var lat;
var lng;
var myspeed;
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
            _("heading").value = -(heading - 180);

        }, false);
    }



    // Fonction capturant les valeurs du GPS
    function showGPS(position){
        lat=((Math.round(position.coords.latitude*1000000))/1000000);
        lng=((Math.round(position.coords.longitude*1000000))/1000000);
        //heading=Math.round(position.coords.heading);
        myspeed=Math.round(position.coords.speed*3.6);
        //_("heading").value = -(heading - 180);
        _("lat").value = lat;
        _("lng").value = lng;
        _("myspeed").value = myspeed;
        mySpeed.innerHTML=myspeed;
        myAcc.innerHTML=Math.round(position.coords.accuracy);
        myHeading.innerHTML="Cap " + heading;
        
    }

} else {

    function showGPS(position){
        lat=((Math.round(position.coords.latitude*1000000))/1000000);
        lng=((Math.round(position.coords.longitude*1000000))/1000000);
        heading=Math.round(position.coords.heading);
        myspeed=Math.round(position.coords.speed*3.6);
        _("heading").value = -(heading - 180);
        _("lat").value = lat;
        _("lng").value = lng;
        _("myspeed").value = myspeed;
        mySpeed.innerHTML=myspeed;
        myAcc.innerHTML=Math.round(position.coords.accuracy);
        myHeading.innerHTML="Cap " + heading;


    }
}





// Fonctions gérer écrivant dans l'affichage la distance entre chaque concurant
function traceGPS(){
    //var y=(48.836150-tracedLat);
    //var x=(2.303069-tracedLng);
    var y=(document.getElementById("lat").value-tracedLat);
    var x=(document.getElementById("lng").value-tracedLng);
    var H=(Math.sqrt((y*y)+(x*x)));
    var r=(Math.floor(H*100000));
    
    var angle = angleCalculator(x, y, H);

    // On fait tourner la fleche
    rotateArrow(angle);

    // On écris les resultat sur la page
    _("angleRelatif").value = angle;
    _("distance").innerHTML = r + " m";
    traceGPSTimeOut();
}

function angleCalculator(x, y, h){
    
    // On passe les radiant en degrés
    var angleCos = radToDeg(Math.acos(x/h));
    
    // Calcule de l'angle relatif
    var finalHeading = calculatefinalHeading();
    var angleRelatif = 0;
    
    if(x>0){
        if(y>0){ // Nord Est
            angleRelatif = 90 - angleCos + finalHeading;
        }else{ // Sud Est
            angleRelatif =  90 + angleCos + finalHeading;
        }
    }else{
        if(y>0){ // Nord Ouest
            angleRelatif = 270 + angleCos + finalHeading;
        }else{ // Sud Ouest
            angleRelatif = 270 - angleCos + finalHeading;
        }
    }
    myAcc.innerHTML = angleRelatif;
    return angleRelatif;
}

function calculatefinalHeading(){
    var currentHeading = parseInt(_("heading").value);
    return currentHeading;
}

// Fonction qui fait tourner la fleche
function rotateArrow(angleRelatif){

    $("#arrow").css({
            'transform': 'rotateX(60deg) rotate('+angleRelatif+'deg)',
            '-moz-transform': 'rotateX(60deg) rotate('+angleRelatif+'deg)',
            '-o-transform': 'rotateX(60deg) rotate('+angleRelatif+'deg)',
            '-webkit-transform': 'rotateX(60deg) rotate('+angleRelatif+'deg)'
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
    if(tracedLat != 0 && tracedLng != 0){
        _("arrow").style.visibility = "visible";
        traceGPS();
        console.log((now) - (updated_at));
        if(((now) - (updated_at)) < 15){
            _("statut").innerHTML = "<span style=\"color:green;font-size:50px;\">&#8226;</span>";
            _("traced_speed1").style.visibility = "visible";
            _("traced_speed2").style.visibility = "visible";
        }else{
            _("statut").innerHTML = "<span style=\"color:orange;font-size:50px;\">&#8226;</span>";
        }
    }else{
        _("distance").innerHTML = "- waiting for";
        _("arrow").style.visibility = "hidden";
        _("statut").innerHTML = "<span style=\"color:red;font-size:50px;\">&#8226;</span>";
        traceGPSTimeOut();
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
        _("hisSpeed").innerHTML = "Stopped";    
    }else{
        _("hisSpeed").innerHTML = positions.speed+" km/h";
            mySpeed.innerHTML = mySpeed;
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
    alert('Activation du GPS obligatoire'); 
    document.location.href="prefs:root=LOCATION_SERVICES";
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
