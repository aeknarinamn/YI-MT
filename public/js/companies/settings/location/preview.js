$('#entry_form').submit(function() {
	$('#myModal').modal('toggle');
	$('#myPleaseWait').modal('show');
	// $('#progressPopup').show();
    return true;
});