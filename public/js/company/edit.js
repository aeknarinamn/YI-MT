function subDistrictOnChange() {
    var subDistrict = $('#sub_district').typeahead('getActive');


    if ($('#sub_district').val() == subDistrict.name) {
        var url = $('#sub_district').data('api-url') + '/' + subDistrict.id;

        $.getJSON(url, function(data) {
            $('#sub_district_id').val(data.id);
            $('#district').html(data.district.name);
            $('#province').html(data.district.province.name);
            // $('#post_code').html(data.id.toString().substring(0, 5));
            $('#post_code').val(data.post_code);
            $('input[name="latitude"]').val(data.latitude);
            $('input[name="longitude"]').val(data.longitude);
            $('#address-detail').removeClass('hidden');
        });
    } 
}

$("#sub_district").change(function() {
    if($(this).val() == "")
    {
        $('#address-detail').addClass('hidden');
        $('#sub_district_id').val('');
        $('#district').html('');
        $('#province').html('');
        $('#post_code').val('');
    }
});