<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>ยูนิลีเวอร์โปรคุ้ม</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet">
		<link rel="stylesheet" href="/mt/css/font-awesome.min.css">
		<link rel="stylesheet" href="/mt/css/bootstrap.min.css">
		<link rel="stylesheet" href="/mt/css/style.css">
	</head>
	<body>
		<div class="register">
			<div class="header_top">
				<div class="backbtn">
					<img src="/mt/img/back.png">
				</div>
				<div class="text_header">
					ยูนิลีเวอร์โปรคุ้ม
				</div>
				<div class="logo">
					<a href="#"> <img src="/mt/img/logo.png" > </a>
				</div>
			</div>
			<div class="header">
				<div id="grad"></div>
				<div class="profile">
					<div class="imageprofile">
						<img src="{{ $lineUserProfile->avatar }}">
					</div>
					<div class="linecenter"></div>
				</div>
			</div>
			<div class="content">
				<div class="row">
					<div class="col-md-8 col-md-offset-2 col-sm-12 np">
						<div class="formregister">
							<form id="action-form" action="{{ action('MT\RegisterController@storeDataRegisterStamp') }}" method="post">
								{!! csrf_field() !!}
								<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
								<div class="title">ยินดีต้อนรับ</div>
								<div class="name">
									<span>คุณ {{ $lineUserProfile->name }}</span>
								</div>
								<div class="alert_register">กรุณากรอกข้อมูลให้ครบถ้วนเพื่อลงทะเบียน</div>
								<div class="product_text">กลุ่มสินค้าที่คุณซื้อประจำ</div>
								<select id="shop_product_group" name="shop_product_group" class="product">
									<option value="">-- กรุณาเลือก --</option>
									<option value="Tesco Lotus">Tesco Lotus</option>
									<option value="Tesco Lotus Express">Tesco Lotus Express</option>
									<option value="Big C">Big C</option>
									<option value="Tops">Tops</option>
									<option value="Others">Others</option>
								</select>
								<label class="accept">
								 <input id="checkbox3" type="checkbox">
	 							 <span class="checkmark" ></span>
								ยอมรับเงื่อนไขและข้อตกลงการใช้บริการ</label>
								<div class="condition">กดดูเงื่อนไข <span> <a href="http://www.unileverprivacypolicy.com/thai/policy.aspx
">ที่นี่</a> </span></div>
							</form>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="footer">
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
						<a href="#" onclick="validate(); return false;" class="backbutton"> <img src="/mt/img/registerbutton.png"> </a>
					</div>
				</div>
			</div>
		</div>

		<script type="text/javascript" src="/mt/js/jquery-3.2.1.min.js"></script>
		<script src="/mt/js/jquery-ui.js"></script>
		<script type="text/javascript" src="/mt/js/bootstrap.min.js" ></script>
		<script type='text/javascript'>
	        function validate() {
	            var validShopProductGroup = $('#shop_product_group').val();

	            var isSubmit = 1;
	            var msgError = ""; 
	            if(validShopProductGroup == ""){
	                isSubmit = 0;
	                msgError += "กรุณากรอก เลือกกลุ่มสินค้าที่คุณซื้อประจำ\n";
	            }
	            
	            if(document.getElementById("checkbox3").checked == false){
	                isSubmit = 0;
	                msgError += "กรุณายืนยันการสมัครและรับรองเงื่อนไข \n";
	            }

	            if(isSubmit){
	                $('#action-form').submit();
	            }else{
	                alert(msgError);
	            }
	        }
	    </script>


	</body>
</html>