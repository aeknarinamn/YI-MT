$(function () {
    $("#messageFolderID").change(function () {
        $("input[name=messageFolderID]").val($(this).val());
        $("#filterForm").submit();
    });

    $("#searchDate").change(function () {
        //alert($("input[name=searchDate]").val$(this).val());
        //alert($(this).val());
       
        // $("input[name=searchDate]").val($(this).val());
        // $("#filterForm").submit();
    });

    $('[data-daterangepicker]').daterangepicker({
        //"autoApply": true,
        //"timePicker" : true,
        //"timePicker24Hour" : true,
        singleDatePicker: true,
        autoUpdateInput: false,
        //showDropdowns: true,
        opens: 'center',
        //drops: 'up',
        locale: {
            //format:'DD/MM/YYYY HH:mm',
            format:'DD/MM/YYYY',
            cancelLabel: 'Clear'
        },
    });
	$('[data-daterangepicker]').on('apply.daterangepicker', function(ev, picker) {
	   	$(this).val(picker.startDate.format('DD/MM/YYYY'));
        //alert($(this).val());
	    $("input[name=searchDate]").val($(this).val());
	    $("#filterForm").submit();
       
       

	});
	$('[data-daterangepicker]').on('cancel.daterangepicker', function(ev, picker) {
	      $(this).val('');
	});
   
});

