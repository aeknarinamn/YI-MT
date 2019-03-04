function setting_height(){

    if($(window).height()<=(518+100)){
    	$("#box").css('height','580px');
    }else{
    	$("#box").css('height','calc(100vh - 75px)');
    }	
}

function setting_height_new(){
	var all_height = 0;
	var boxheight = 478;
	/*
	all_height += $("#box").height();
	//all_height += $("#box1").height();
	all_height += $("#brnSubmitx").height();
	var height_result = ($(window).height()-boxheight)-all_height;
	var diff_x = 0;
	if(height_result>=20){
		diff_x = 20;
	}else{
		diff_x = -4;
	}
	
	if(height_result>0){
		//$("#box").height(478+(height_result-diff_x));
		
		$("#box").height(boxheight+(($(window).height()-boxheight)-50));
		$("#box").css('margin-bottom',"0px");
	}else{
		$("#box").height(boxheight);
		$("#box").css('margin-bottom',"-1px");
	}*/
	$("#box").removeAttr("style");
	var real_box = $("#box").height()+10;
	var real_height = (real_box)+70;
	//alert("window : "+ $(window).height() + " real_height : "+real_height);

	if(real_height>$(window).height()){
		//$("#box").height(real_box);
	}else{
		$("#box").height(real_box+($(window).height()-real_height));
	}


	//412 660
	//$("#box").height(boxheight+(($(window).height()-boxheight)-50-20));
}

$(document).ready(function() {
	
	//SETTING RESPONSIVE//
	$(window).resize(function(){
		setting_height_new();
		//setting_height_new();
	});
	setting_height_new();
	//setting_height_new();
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