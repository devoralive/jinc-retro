var geoAp = {

    coords : {},

    me : {
        latitude : 0,
        longitude : 0,
        speed : 0,
        heading : 0,
        accuracy : 0,
        type: ""
    },

    target : {
        latitude : 0,
        longitude : 0,
        speed : 0,
        heading : 0,
        accuracy : 0
    },

    plan : {
        x : 0,
        y : 0,
        h : 0
    },

    timeout : 2000,
    reload_time : 1000,
    angle : 0,
    distance : 0,

    init : function (navigator, fnc_strat, fnc_error) {
        'use strict';
        navigator.geolocation.watchPosition(fnc_strat, fnc_error, {enableHighAccuracy: true});
        this.catchMePosition();
    },

    getAngle : function () {
        'use strict';
        return this.angle + " &deg;";
    },

    getDistance : function () {
        'use strict';
        return this.distance + " m";
    },

    convertCohords : function (lat_lng) {
        'use strict';
        return (Math.round(lat_lng * 1000000)) / 1000000;
    },

    convertSpeed : function (speed) {
        'use strict';
        return Math.round(speed * 3.6);
    },

    convertHeading : function (heading) {
        'use strict';
        return -(Math.round(heading) - 180);
    },

    // Fonction capturant les valeurs du GPS
    getGPS : function (position) {
        'use strict';
        this.coords = position.coords;
    },

    catchMePosition : function () {
        'use strict';
        this.me.latitude = this.convertCohords(this.coords.latitude);
        this.me.longitude = this.convertCohords(this.coords.longitude);
        this.me.heading = this.convertHeading(this.coords.heading);
        this.me.speed = this.convertSpeed(this.coords.speed);
        this.me.accuracy = Math.round(this.coords.accuracy);

        return this.me;
    },

    // Fonctions gérer écrivant dans l'affichage la distance entre chaque concurant
    traceGPS : function () {
        'use strict';
        this.plan.y = (this.me.latitude - this.target.latitude);
        this.plan.x = (this.me.longitude - this.target.longitude);
        this.plan.h = (Math.sqrt((this.y * this.y) + (this.x * this.x)));
        this.distance = (Math.floor(this.plan.h * 100000));

        this.angle = this.angleCalculator(this.plan.x, this.plan.y, this.plan.h);

        return this.angle;
    },

    angleCalculator : function (x, y, h) {
        'use strict';
        // on réalise le arcSinus
        var angle = this.radToDeg(Math.acos(x / h)),
            heading = this.calculateHeading();

        if (x > 0) {
            if (y > 0) {
                this.angle = heading + angle;
            } else {
                this.angle = heading + angle - 270;
            }
        } else {
            if (y > 0) {
                this.angle = heading - angle + 90;
            } else {
                this.angle = heading + angle - 270;
            }
        }
        return this.angle;
    },

    calculateHeading : function () {
        'use strict';
        var currentHeading = this.convertHeading(this.coords.heading);
        // currentHeading = this.calculateMoyHeading(currentHeading);
        return currentHeading;
    },

    calculateMoyHeading : function (current_heading) {
        'use strict';
        var heading = ((this.heading + current_heading) / 2);
        if (current_heading !== 0 && this.heading !== (current_heading / 2)) {
            this.heading = heading;
        } else {
            this.heading = current_heading;
        }

        return this.heading;
    },

    // Fonction convertissant les randiants en degrés
    radToDeg : function (rad) {
        'use strict';
        var deg = ((rad * 180.0) / Math.PI);
        deg = Math.round(deg);
        return deg;
    }
};