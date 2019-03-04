function checkFormatCode(codeId,code)
{
	var check = parseInt(code);
	var errorEmb = '<div id="alert-emb-'+codeId+'" class="false text-alert"></div>';
	var successEmb = '<div id="alert-emb-'+codeId+'" class="true"></div>';
	$('#alert-emb-'+codeId).remove();
	if(isNaN(code)){
		$('#form-'+codeId).append(errorEmb);
		// isCheck = 0;
	}else{
		if(code == ""){
			$('#alert-emb-'+codeId).remove();
		}else{
			if(code.length == 10){
				$('#form-'+codeId).append(successEmb);
				// isCheck = 1;
			}else{
				$('#form-'+codeId).append(errorEmb);
				// isCheck = 0;
			}
		}
	}
	checkCodeSubmit();
}

function checkCodeSubmit()
{
	var errorPoint = $(".text-alert").length;
	if(errorPoint == 0){
		$('#submit').removeAttr("disabled");
	}else{
		$('#submit').attr("disabled",true);
	}
}

function clearInput(codeId)
{
	$('#itemCode-'+codeId).val('');
	$('#code-'+codeId).empty();
	$('#itemCode-'+codeId).focus();
}
