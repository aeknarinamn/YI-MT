	var x = document.getElementById("map");
	function getLocation() {
		// alert("ok");
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}
	function showPosition(position) {
		$("#latitude").val(position.coords.latitude)
		$("#longitude").val(position.coords.longitude)
	}
