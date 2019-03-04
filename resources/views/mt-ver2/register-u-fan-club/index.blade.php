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
		<div class="register register_u_point">
			<div class="header_top">

				<ul >
					<li class="first-item have-stamp"> <img src="/mt/img/upoint.png"> </li>
				</ul>

				<div class="text_header">
					<div class="text1"> กรุณากรอกรายละเอียดด้านล่าง </div>
					<div class="text2"> เพื่อเข้าสู่การสะสมแสตมป์เพื่อแลกของรางวัล </div>
				</div>
				<!-- <img src="/mt/img/exit.png" class="exit"> -->
			</div>
			<div class="row">
				<div class="col-md-8 col-md-offset-2 col-sm-12 np">
					<p class="text_alert">*กรุณากรอกเป็นภาษาไทยทั้งหมด</p>
				</div>
			</div>
			<div class="content">
				<div class="row">
					<div class="col-md-8 col-md-offset-2 col-sm-12 np">
						<div class="formregister">
							<form id="action-form" action="{{ action('MT\EstampController@storeRegisterData') }}" method="post">
								{!! csrf_field() !!}
								<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
							  	<div class="form-group">
								    <label for="name">ชื่อ*</label>
								    <input type="text" class="form-control input_register" id="name" name="first_name" autocomplete="off">
							  	</div>
							  	<div class="form-group">
								    <label for="surname">นามสกุล*</label>
								    <input type="text" class="form-control input_register" id="surname" name="last_name" autocomplete="off">
							  	</div>
								<div class="form-group">
								    <label for="gender">เพศ*</label>
								    <select class=" form-control input_register" name="gender" id="gender">
										<option value="">-- กรุณาเลือก --</option>
										<option value="ชาย">ชาย</option>
										<option value="หญิง">หญิง</option>
										<option value="ไม่ระบุเพศ">ไม่ระบุเพศ</option>
									</select>
							  	</div>
							    <div class="form-group">
								    <label for="product">ประเภทสินค้าที่คุณซื้อบ่อยที่สุด ที่เทสโก้โลตัส
*</label>
								   	<select class=" form-control input_register" name="product" id="product">
										<option value="">-- กรุณาเลือก --</option>
										<option value="ผลิตภัณฑ์ซักผ้า">ผลิตภัณฑ์ซักผ้า</option>
										<option value="ผลิตภัณฑ์ล้างจาน">ผลิตภัณฑ์ล้างจาน</option>
										<option value="ผลิตภัณฑ์ดูแลเส้นผม">ผลิตภัณฑ์ดูแลเส้นผม</option>
										<option value="ผลิตภัณฑ์ดูแลผิวกาย">ผลิตภัณฑ์ดูแลผิวกาย</option>
										<option value="ผลิตภัณฑ์อาบน้ำ">ผลิตภัณฑ์อาบน้ำ</option>
										<option value="ผลิตภัณฑ์ปรุงอาหาร">ผลิตภัณฑ์ปรุงอาหาร</option>
										{{-- @for($i=80; $i >= 1; $i--)
											<option value="{{$i}}">{{$i}}</option>
										@endfor --}}
									</select>
							  	</div>


								<label class="accept">
								 <input type="checkbox" id="checkbox3">
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
	            var validName = $('#name').val();
	            var validSurname = $('#surname').val();
	            var validGender = $('#gender').val();
	            var validProduct = $('#product').val();
	            var characterReg = "^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";

	            var isSubmit = 1;
	            var msgError = ""; 
	            if(validName == ""){
	                isSubmit = 0;
	                msgError += "กรุณากรอก ชื่อ\n";
	            }else{
		        	if (!validName.match(characterReg)) {
		        		isSubmit = 0;
					    msgError += "กรุณากรอก ชื่อ โดยไม่ใส่อักชระพิเศษ\n";
					}
		        }

	            if(validSurname == ""){
	                isSubmit = 0;
	                msgError += "กรุณากรอก นามสกุล\n";
	            }else{
		        	if (!validSurname.match(characterReg)) {
		        		isSubmit = 0;
					    msgError += "กรุณากรอก นามสกุล โดยไม่ใส่อักชระพิเศษ\n";
					}
		        }

	            if(validGender == ""){
	                isSubmit = 0;
	                msgError += "กรุณาเลือก เพศ\n";
	            }
	            if(validProduct == ""){
	                isSubmit = 0;
	                msgError += "กรุณาเลือก ประเภทสินค้าที่คุณซื้อบ่อยที่สุด ที่เทสโก้โลตัส\n";
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