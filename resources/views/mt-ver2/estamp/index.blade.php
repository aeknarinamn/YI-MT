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
		<link rel="stylesheet" type="text/css" href="/rtd/qrcode-reader/css/qr_box.css">
	</head>
	<body>
		<div class="stamp">
			<div class="header">
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-12 np">
						<img src="/mt/img/banner1.png">
					</div>

					<div class="col-md-6 col-md-offset-3 col-sm-12 np" style="margin-top: 5px">
						<img src="/mt/img/banner1.png">
					</div>
				</div>
			</div>
			<div class="content">
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
						{{--<div class="text2 text">คุณเหลือเวลาในการสะสมอีก 
							<div class="days">
								@foreach($splitLengths as $splitLength)
									<span class="boxdays">{{ $splitLength }}</span>
		                        @endforeach
							</div> วัน
						</div>--}}
						<div class="stamp">
							<ul class="stamp-l1">
								@foreach($stamps as $stampRows)
	                                @foreach($stampRows as $stampColumn)
	                                	@if($stampColumn['customer_stamp_active'] == 1)
	                                		<li class="first-item have-stamp"> <img src="/mt/img/upoint.png"> </li>
	                                	@else
	                                		<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
	                                	@endif
	                                @endforeach
		                        @endforeach
								<!-- <li class="first-item have-stamp"> <img src="/mt/img/upoint.png"> </li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li>
								<li class="nohave-stamp"><img src="/mt/img/unupoint.png"></li> -->
							</ul>
						</div>
						@if($customerStampCount < 10)
							<div>
								<input id="open-camera" type=file accept="image/*" onchange="openQRCamera(this);" tabindex=-1 style="display:none">
								<a href="#" onclick="openCamera(); return false;" class="stampbutton"> <img src="/mt/img/stampbutton.png"> </a>
							</div>
						@endif
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="footer">
				<div class="row">
					@if($customerStampCount < 6)
						<div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
							<a href="#" onclick="chooseRewardSubmit(); return false;" class="backbutton @if($customerStampCount < 6) btn-is-disabled @endif"> <img src="/mt/img/rewardbutton-dis.png"></a>
						</div>
					@else
						<div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
							<a href="#" onclick="chooseRewardSubmit(); return false;" class="backbutton"> <img src="/mt/img/rewardbutton.png"></a>
						</div>
					@endif
					<!-- <div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
						<a href="#" onclick="chooseRewardSubmit(); return false;" class="backbutton"> <img src="/mt/img/rewardbutton.png"></a>
					</div> -->
				</div>
			</div>
		</div>

		<form id="form-choose-reward" action="{{ action('MT\EstampController@chooseRewardPage') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
		</form>

		<script type="text/javascript" src="/mt/js/jquery-3.2.1.min.js"></script>
		<script src="/mt/js/jquery-ui.js"></script>
		<script type="text/javascript" src="/mt/js/bootstrap.min.js" ></script>
		<script type='text/javascript' src="/rtd/qrcode-reader/js/qr_packed.js"></script>
		<script type='text/javascript'>
			function chooseRewardSubmit()
			{
				$('#form-choose-reward').submit();
			}
	        function openCamera() {
	            // $('#open-camera').trigger( "click" );
	            window.location = "line://nv/addFriends";
	        }
	        function openQRCamera(node) {
	            var reader = new FileReader();
	            reader.onload = function() {
	                node.value = "";
	                qrcode.callback = function(res) {
	                    if(res instanceof Error) {
	                        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
	                    } else {
	                        node.parentNode.previousElementSibling.value = res;
	                        window.location.href = node.parentNode.previousElementSibling.value;
	                    }
	                };
	              qrcode.decode(reader.result);
	            };
	            reader.readAsDataURL(node.files[0]);
	        }
	        function recieveReward()
	        {
	            $('#recieve-reward-form').submit();
	        }
	        $(document).ready(function () {});
	    </script>


	</body>
</html>