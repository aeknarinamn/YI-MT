$(function() {

	$(document).on('show.bs.modal', '.modal', function () {
	  	//console.log($(this).attr('subscriberGroupId'));

	  	var modelId = $(this).attr('id');

	  	$( "input[type='checkbox']" ).prop( "checked", function( i, val ) {
	  		if(val == true) {
	  			return !val;
	  		}
		});

	  	$( "#form_download-" + $(this).attr('subscriberGroupId') ).submit(function(event) {
	  		//event.preventDefault();
	  		$( "#"+ modelId ).modal('hide');
    
        });
        
	});
	//console.log(subscriberGroups);
	// $('#form_download-{{$subscriberGroup->id}}').submit(function() {
	// 	$('#myModal').modal('toggle');
	// 	$('#myPleaseWait').modal('show');
	// 	// $('#progressPopup').show();
	//     return true;
	// });

	// $('#exampleInputFile').change(function(){

	// 		// console.log($(this)[0].files[0]);
	// 		// var data = $('#exampleInputFile')[0].files[0];
	// 		// console.log(data);
	// 		// var name = $('#upload').show();
	// 		var file = $(this).prop('files')[0];
	// 		// console.log(file);
	// 		// alert(file);
	//         var form = new FormData();
	//         form.append('MyFile', file);
	// 		$.ajax({
	//             type: "get",
	//             url : "/API/v1/upload-subscriber/",
	//     		contentType: false,
	//             processData: false,
	//             data: {
	//                 form : form,
	//                 '_token' : $(this).attr('data-csrf')
	//             },
	//             success: function(response){
	//             }
	//         });
	// 		// console.log(str);
	// 	});
});

$('#exampleInputFile').change(function() {
	$( "#form_upload" ).submit();
});


$('#form_upload').submit(function() {
	$('#myModal').modal('toggle');
	$('#myPleaseWait').modal('show');
	// $('#progressPopup').show();
    return true;
});

function setSubscriberGroupName(subscriberGroupId,subscriberGroupName)
{
	$('#subscriber_group_id').val(subscriberGroupId);
	$('#subscriber_group_name_show').val(subscriberGroupName);
}





