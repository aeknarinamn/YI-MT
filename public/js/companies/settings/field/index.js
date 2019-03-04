$(function () 
{
	// $('#dataTableId').DataTable({
	//     "ordering": false,
	//     "searching": false,
	//     "info": false,
	//     "lengthChange": false,
	//     "paging": true,
	//     // "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
	// });

	var personalizeStatus = 0;
	$('input[name="onoffswitch"]').on('change', function () {
		var fieldId = $(this).attr('fieldId');
		if($(this).is(':checked')) {
			// console.log("check");
			personalizeStatus = 1;
        }
        else
        {
        	personalizeStatus = 0;
        }

        $.ajax({
            type: "PUT",
            url : "/api/v1/field/"+fieldId,
            data: {
                is_personalize : personalizeStatus,
                '_token' : $(this).attr('data-csrf')
            },
            success: function(response){
                         
            }
        });
	    // console.log(personalizeStatus);
	});
});
