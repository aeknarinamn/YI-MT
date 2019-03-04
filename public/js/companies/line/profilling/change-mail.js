$(document).ready(function() {
 	disable_btn_next();

     $('.form_x').keyup(function() {
 		if(check_blank_param()){
 			enable_btn_next();
 		}else{
 			disable_btn_next();
 		}
     });
 });

function enable_btn_next(){
	$('#brnSubmitx').removeClass('disablex');
	$('#brnSubmitx').addClass('activex');
}

function disable_btn_next(){
	$('#brnSubmitx').removeClass('activex');
	$('#brnSubmitx').addClass('disablex');	
}

function get_param(){
	return {
		email : $("#email").val() 
	};
}

function check_blank_param(){
	var param = get_param();

	var check_blank_param = [
		param.email .length>0 ? true : false
	];

	var return_values = true;

	for(var i = 0 ; i < check_blank_param.length ; i++){
		if(check_blank_param[i]==false){
			return_values = false;
			break;
		}
	}
	
	return return_values;
}

function changemail_submit(){
	var param = get_param();

	if(check_blank_param()){
		var valid_param = {
			email : validateEmail(param.email)
		}


		if(valid_param.email){
			document.getElementById('changeEmailForm').submit();
		}else{
			var err_msg = "";
			
			if(!valid_param.email){
				err_msg += "กรุณาใส่ข้อมูล อีเมล ให้ถูกต้อง";
			}

			swal({
			  title: "พบข้อผิดพลาด",
			  text: err_msg,
			  type: "warning",
			  showCancelButton: false,
			  confirmButtonColor: "#00616A",
			  confirmButtonText: "ตกลง",
			  closeOnConfirm: false
			});
		}
	}else{
		return false;
	}

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}