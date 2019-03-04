$(function () {
	var name = $("input[type='text']").val();
	var description = $("#description").val();
		// alert(name+'-'+description);
			$('#cancel').click(function() {
				var nameChenge = $("input[type='text']").val();
				var descriptionChenge = $("#description").val();
				if(name !== nameChenge || description !== descriptionChenge) {
					console.log(1);
					$('#modal-cancel').modal();
				}else{
					console.log(0);

					var href = $('#ok').attr('href');
     				window.location.href = href;
					// $('#ok').click();
				}
			});

});

