$(function () {


    $('#txt_daterange').daterangepicker({
        //singleDatePicker: true,
        //autoUpdateInput: false,
        opens: 'center',
        locale: {
            format:'DD/MM/YYYY',
            cancelLabel: 'Clear'
        }
    });
    
    $('#txt_daterange').on('apply.daterangepicker', function(ev, picker) {
        //$(this).val(picker.startDate.format('DD/MM/YYYY'));
    });
    $('#txt_daterange').on('cancel.daterangepicker', function(ev, picker) {
          //$(this).val('');
    });
   
});

