function setting_height(){
    if($(window).height()<=558){
    	//$("#box").css('height','478px');
    }else{
    	//$("#box").css('height','calc(100vh - 67px)');
    }	
}

function setting_height_new(){
	var all_height = 0;
	all_height += $("#box").height();
	all_height += $("#box1").height();
	all_height += $("#brnSubmitx").height();
	var height_result = $(window).height()-all_height;
	var diff_x = 0;
	if(height_result>=20){
		diff_x = 20;
	}else{
		diff_x = -4;
	}
	if(height_result>0){
		$("#box").css('height',$("#box").height()+(height_result-diff_x));
		$("#box").css('margin-bottom',"0px");
	}else{
		$("#box").css('height',"auto");
		$("#box").css('margin-bottom',"-1px");
	}
}

function setting_give_pass(){
	$("#btn_give_new_pass").prop("href","javascript:void()");
	$("#btn_give_new_pass").css("color","#ececec");

	setTimeout(function(){
		$("#btn_give_new_pass").prop("href",$("#btn_give_new_pass").data("href"));
		$("#btn_give_new_pass").css("color","#FED147");
	},15000);
}

$(document).ready(function() {
	$("html::before, body::before").css("background","#00616A");
	$("html, body").css("background","#00616A");
	//var wd = $(window).width();
	//var hd = $(window).height();
	//alert("ความกว้าง : "+wd+"px ความยาว : "+hd+"px");

	//SETTING RESPONSIVE//
	$(window).resize(function(){
		setting_height_new();
	});
	setting_height_new();
	setting_give_pass();
	//////////////////////

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
		otp : $('#otp').val()
	};
}

function check_blank_param(){
	var param = get_param();

	var check_blank_param = [
		param.otp.length>0 ? true : false 
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

function otp_submit(){
	var param = get_param();

	if(check_blank_param()){
		var valid_param = {
			otp : param.otp.length==6 ? true : false , 
			otp_number_only : validateNumberOnly(param.otp) , 
			otp_crosscheck : param.otp == $("#hid_otp").val() ? true : false
		}


		if(valid_param.otp && valid_param.otp_number_only && valid_param.otp_crosscheck){
			document.getElementById('otpForm').submit();
		}else{
			var err_msg = "";
			if(!valid_param.otp){
				err_msg += "กรุณาใส่ข้อมูล OTP ให้ครบ 6 หลัก";
			}
			if(!valid_param.otp_number_only){
				if(err_msg!=""){
					err_msg += "\n";
				}
				err_msg += "กรุณาใส่ข้อมูลเฉพาะตัวเลขเท่านั้น";
			}
			if(!valid_param.otp_crosscheck){
				if(err_msg!=""){
					err_msg += "\n";
				}
				err_msg += "Policy ไม่ถูกต้อง";
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

function validateNumberOnly(val) {
    var re = /^-?\d*\.?\d*$/;
    return re.test(val);
}
