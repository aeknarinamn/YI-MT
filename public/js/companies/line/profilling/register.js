function setting_height(){

    if($(window).height()<=(518+100)){
    	$("#box").css('height','580px');
    }else{
    	$("#box").css('height','calc(100vh - 75px)');
    }	
}

$(document).ready(function() {
	//SETTING RESPONSIVE//
	$(window).resize(function(){
		setting_height();
	});
	setting_height();
	//////////////////////

 	disable_btn_next();

	$('#chkagree').click(function() {
		if ($(this).is(':checked') && check_blank_param()) {
			enable_btn_next();
		}else{
			disable_btn_next();
		}
	});

     $('.form_x').keyup(function() {
 		if($("#chkagree").is(':checked') && check_blank_param()){
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
		id_card : $('#id_card').val() ,
		date_of_birth : $("#date_of_birth").val(),
		email : $("#email").val() 
	};
}

function check_blank_param(){
	var param = get_param();

	var check_blank_param = [
		param.id_card.length>0 ? true : false ,
		param.date_of_birth.length>0 ? true : false ,
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

function register_submit(){
	var param = get_param();

	if($("#chkagree").is(':checked') && check_blank_param()){
		var valid_param = {
			id_card : param.id_card.length==13 ? true : false ,
			date_of_birth : param.date_of_birth.length==8 ? true : false ,
			email : validateEmail(param.email)
		}


		if(valid_param.id_card && valid_param.date_of_birth && valid_param.email){
			document.getElementById('registerForm').submit();
		}else{
			var err_msg = "";
			if(!valid_param.id_card){
				err_msg += "กรุณาใส่ข้อมูล หมายเลขบัตรประชาชน ให้ครบ 13 หลัก";
			}
			if(!valid_param.date_of_birth){
				if(err_msg!=""){
					err_msg += "\n";
				}
				err_msg += "กรุณาใส่ข้อมูล วัน | เดือน | ปี เกิด ให้ครบ 8 หลัก";
			}
			if(!valid_param.email){
				if(err_msg!=""){
					err_msg += "\n";
				}
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