$(function () {
	// $('#dataTableId').DataTable({
	//     "ordering": false,
	//     "searching": false,
	//     "info": false,
	//     "lengthChange": false,
	//     "paging": true,
	//     // "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
	// });

	// var autoReplyKeywordStatus = 0;
	// $('input[name="status"]').on('change', function () {
	// 	var autoReplyKeyword = $(this).attr('autoReplyKeyword');
	// 	var companyId = $("#companyId").val();

	// 	if($(this).is(':checked')) 
 //        {
	// 		autoReplyKeywordStatus = "on";
 //        }
 //        else
 //        {
 //        	autoReplyKeywordStatus = "off";
 //        }

 //        $.ajax({
 //            type: "PUT",
 //            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
 //            url : "/api/v1/autoReplyKeyword/"+autoReplyKeyword,
 //            data: {
 //                //'companyId': 1,
 //                'status' : autoReplyKeywordStatus,
 //            },
 //            success: function(response){
 //                 console.log(response);
 //            }
 //        });
	//     // console.log(personalizeStatus);
	// });
     $("#cancle").on('click', function () {
        // document.getElementById("setSelect").selected = "true";
        $("#setSelect").prop('selected',true);
     });

});
