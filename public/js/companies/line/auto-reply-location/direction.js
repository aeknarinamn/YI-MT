var mylatitude = parseFloat(userlatitude);
var mylongitude = parseFloat(userlongitude);

function GoogleMap_selected() {

    var lattitude_value = parseFloat(destinationLatitude);
    var longitude_value = parseFloat(destinationLongitude);

    var from = new google.maps.LatLng(mylatitude, mylongitude);
    var to = new google.maps.LatLng(lattitude_value, longitude_value);
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    this.initialize = function () {
        var map = showMap_selected();
        var bounds = new google.maps.LatLngBounds();
        directionsService.route(
        directionsRequest,

        function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response,
                    center: new google.maps.LatLng(mylatitude, mylongitude),
                    suppressMarkers: true
                });
                var leg = response.routes[0].legs[0];
                makeMarker(leg.start_location, icons.start, "title", map);
                makeMarker(leg.end_location, icons.end, 'title', map);
                var position = new google.maps.LatLng(parseFloat(leg.start_location), parseFloat(leg.end_location));
                bounds.extend(position);
                map.setCenter( bounds.getCenter() );
                map.setZoom( 18 );

            } else {
                alert("Unable to retrive route");
            }

        });
        console.log(map);
    }

    function makeMarker(position, icon, title, map) {
        new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    }

    // function center_map( map ) {
    //     // vars
    //     var bounds = new google.maps.LatLngBounds();
    //     // loop through all markers and create bounds
    //     for (var i in map.markers) {
    //         var latlng = new google.maps.LatLng( map.markers[i].position.lat(), map.markers[i].lng() );
    //         bounds.extend( latlng );
    //     }
    //     // map.markers.forEach(function( i, marker ){
    //     //     var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
    //     //     bounds.extend( latlng );
    //     // });
    //     // only 1 marker?
    //     if( map.markers.length == 1 ) {
    //         // set center of map
    //         map.setCenter( bounds.getCenter() );
    //         map.setZoom( 18 );
    //     } else {
    //         // fit to bounds
    //         map.fitBounds( bounds );
    //     }
    // }

    var icons = {
        start: new google.maps.MarkerImage(
            // URL
            urlUserIcon,
           // 'http://yellowproject.adiwit.in.th/img/google/start/20x32.png',
            // (width,height)
            // new google.maps.Size(44, 32),
            new google.maps.Size(34, 60),
            // The origin point (x,y)
            new google.maps.Point(0, 0),
            // The anchor point (x,y)
            // new google.maps.Point(22, 32)),
            new google.maps.Point(30, 60)
        ),
        end: new google.maps.MarkerImage(
            // URL
            urlEndPointIcon,
            // (width,height)
            // new google.maps.Size(44, 32),
            new google.maps.Size(34, 60),
            // The origin point (x,y)
            new google.maps.Point(0, 0),
            // The anchor point (x,y)
            // new google.maps.Point(22, 32))
            new google.maps.Point(30, 60)
        )
    };

    var showMap_selected = function () {
        var mapOptions = {
            zoom: 18,
            center: new google.maps.LatLng(mylatitude, mylongitude),
            // mapTypeId: google.maps.MapTypeId.ROADMAP
            mapTypeId: 'roadmap',
            disableDefaultUI: true,
            fullscreenControl:true
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        return map;
    };
}

function initialize() {
    var instance = new GoogleMap_selected();
    instance.initialize();
}