$(function () {
	// $("#entry_form").submit(function() {
		// var hiddenElements = $("div:hidden");
		// hiddenElements.remove();
		// $("#includeData").remove();
	// });
	var checkType = $('#fieldType').val();
	if(checkType == 'enum'){
		$('#addHiddenData').hide();
	}else if(checkType == 'hidden'){
		$('#addEnumData').hide();
	}


	$('#fieldType').change(function() {
		console.log($(this).val());
		if($(this).val() == 'enum'){
			$('#enumDatas').show();
			$('#addEnumData').show();
			$('#hiddenDatas').hide();
			$('#addHiddenData').hide();
		}else if($(this).val() == 'hidden'){
			$('#hiddenDatas').show();
			$('#addHiddenData').show();
			$('#enumDatas').hide();
			$('#addEnumData').hide();
		}else{
			$('#enumDatas').hide();
			$('#addEnumData').hide();
			$('#hiddenDatas').hide();
			$('#addHiddenData').hide();
		}
	});

	$('#myonoffswitch').change(function() {
		if($(this).is(":checked")) {
			$('#panelPersonalizeDefalut').show();
		} else {
			$('#panelPersonalizeDefalut').hide();
		}
		// console.log($(this).is(":checked"));
	});

	$('#switchApi').change(function() {
		if($(this).is(":checked")) {
			$('#panelUrlApi').show();
		} else {
			$('#panelUrlApi').hide();
		}
	});

});

function addEnumData(){
	var includeDiv = $('#includeData').html();
	var maxIndex = 0;
	$('input[name^="enumDatas"]').each(function() {
		if($(this).attr("meta:index") > maxIndex){
			maxIndex = $(this).attr("meta:index");
		}
	});
	var index = parseInt(maxIndex)+1;
	$('#enumDatas').append(includeDiv);
	$("#enumDatas input[name='enumDatas["+0+"]']").attr("meta:index",""+index+"");
	$("#enumDatas input[name='enumDatas["+0+"]']").attr("name","enumDatas["+index+"]");
}

function addHiddenData(){
	var includeDiv = $('#includeDataHidden').html();
	var maxIndex = 0;
	$('input[name^="hiddenDatas"]').each(function() {
		if($(this).attr("meta:index") > maxIndex){
			maxIndex = $(this).attr("meta:index");
		}
	});
	var index = parseInt(maxIndex)+1;
	$('#hiddenDatas').append(includeDiv);
	$("#hiddenDatas input[name='hiddenDatas["+0+"]']").attr("meta:index",""+index+"");
	$("#hiddenDatas input[name='hiddenDatas["+0+"]']").attr("name","hiddenDatas["+index+"]");
}

function submitForm(){
		var RegexUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		var regex = new RegExp(RegexUrl);
		var str = $('#api_url').val();

		if($('#switchApi').is(":checked")){
			if (str.match(regex)) {
				//
			} else {
				$('#alert').append('<div class="alert alert-warning alert-dismissible fade in" role="alert">'+
								'<button type="button" class="close" data-dismiss="alert">'+
								'<span>&times;</span>'+
								'</button>'+
    							'<i class="fa fa-warning"></i>  Please check your entry and try again :'+
    							'<ul><li>Please enter new URL or URL is incorrect</li></ul>'+
								'</div>'
							);
				return false;
			}
		}

	var hiddenElements = $("div:hidden");
	hiddenElements.remove();
	document.getElementById('entry_form').submit();
}

function checkPrimaryKey(data){
	if($(data).is(":checked")){
		$('#modal-check').modal();
	}
}