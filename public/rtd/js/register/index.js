// function checkRegister(obj) {
// 	var val = $(obj).val();
// 	$(obj).removeClass('fix-error');
// 	$(obj).removeClass('fix-success');
// 		// document.getElementById("submit").disabled = false;

// 	if(val.length > 0 && !$.isNumeric(val)) {
// 		$(obj).addClass('fix-error');
// 		document.getElementById("submit").disabled = true;
// 	}
// 	alert(val.length);
// 	if (val.length == 10 && $.isNumeric(val)) {
// 		$.ajax({
// 		    type: "GET",
// 		    url: '/api/v1/phone',
// 		    data: {
// 		        'phone_number' : val,
// 		    },
// 		    success: function(response) {
// 		    	if(response == 1) {
// 		    		$(obj).addClass('fix-error');
// 					document.getElementById("submit").disabled = true;
// 		    	} else {
// 					document.getElementById("submit").disabled = false;

// 		    		$(obj).addClass('fix-success');
// 		    	}
// 		    },
// 		});
// 	}
// 	if (val.length != 10 ) {
// 		document.getElementById("submit").disabled = true;
// 	}
// }

$(function () {
	getLocation();


});




