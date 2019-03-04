function initialize() {
    var map;
    var myLatLng = {lat: parseFloat(markers[0][1]), lng: parseFloat(markers[0][2])};
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        zoom:18,
        // center: myLatLng,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        // fullscreenControl:true,
        // scaleControl: true
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setZoom(1);
    var image = {
        url: urlEndPointIcon,
        // url: 'http://yellowproject.adiwit.in.th/img/google/destination/Map-icon-endpoint.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(34, 60),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(30, 60)
    };

    var userimage = {
        // url: 'http://yellowproject.adiwit.in.th/img/google/start/Map-icon-user.png',
        url: urlUserIcon,
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(34, 60),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(30, 60)
    };

    var useImage = '';
    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        if(i == 0 ){
            useImage= userimage;
        } else {
            useImage= image;
        }
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            url: markers[i][3],
            icon: useImage,
        });

        if(i != 0 ){
            // Allow each marker to have an info window
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
            		window.location.href = this.url;
                }
            })(marker, i));
        }
        // Automatically center the map fitting all markers on the screen
       map.fitBounds(bounds);
    }

    //Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(15);
        this.setCenter(myLatLng);
        google.maps.event.removeListener(boundsListener);
    });
    // // center map
    // center_map( map );

}
 /*
*  center_map
*  This function will center the map, showing all markers attached to this map
*/
 function center_map( map ) {
    // vars
    var bounds = new google.maps.LatLngBounds();
    // loop through all markers and create bounds
    $.each( map.markers, function( i, marker ){
        var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
        bounds.extend( latlng );
    });
    // only 1 marker?
    if( map.markers.length == 1 ) {
        // set center of map
        map.setCenter( bounds.getCenter() );
        map.setZoom( 18 );
    } else {
        // fit to bounds
        map.fitBounds( bounds );
    }
 }