function changeFile(){
	// console.log('skdjf');
	$('#is_upload').val(1);
	$('#upload').show();
	$('#submit').hide();
	$('#showList').hide();
	$("#entry_form").submit();
}

$(document).on('change', ':file', function () {
   var input = $(this),
           numFiles = input.get(0).files ? input.get(0).files.length : 1,
           label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
   input.trigger('fileselect', [numFiles, label]);
});
$(document).ready(function () {
   $(':file').on('fileselect', function (event, numFiles, label) {
       console.log(numFiles);

       $("#lbl_file_name").html(label);
   });
});