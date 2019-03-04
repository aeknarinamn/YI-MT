<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>ยูนิลีเวอร์โปรคุ้ม</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="/mt-rev2/css/style.css">
	</head>
	<body>
		<div class="card1" id="container">
			<div class="header">
				<img src="/mt-rev2/img/header.png">
			</div>
			<div class="header">
				<img src="/mt-rev2/img/banner-time.png">
			</div>
			<div class="content" id="body">
				<div class="row">
					<div class="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
						<!-- <div class="text2 text">คุณเหลือเวลาในการสะสมอีก 
							<div class="days">
								<span class="boxdays">1</span>
								<span class="boxdays">3</span>
							</div> วัน
						</div> -->
						<div class="stamp">
							@foreach($stamps as $stampRows)
								<ul class="stamp-l1">
	                                @foreach($stampRows as $stampColumn)
	                                	@if($stampColumn['customer_stamp_active'] == 1)
	                                		<li class="first-item have-stamp"> <img src="/mt-rev2/img/unupoint.png"> </li>
	                                	@else
	                                		<li class="nohave-stamp"><img src="/mt-rev2/img/unupoint.png"></li>
	                                	@endif
	                                @endforeach
                            	</ul>
	                        @endforeach
						</div>
						<div>
							@if($customerStampCount < 10)
								<a href="#" class="stampbutton" onclick="openCamera(); return false;"> <img src="/mt-rev2/img/backbutton.png"> </a>
							@else
								<a href="#" class="stampbutton"> <img src="/mt-rev2/img/stampbutton.png"> </a>
							@endif
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="footer" id="footer">
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
						@if($customerStampCount < 6)
							<a href="#" class="backbutton"> <img src="/mt-rev2/img/rewardbutton.png"> </a>
						@else
							<a href="#" class="backbutton" onclick="chooseRewardSubmit(); return false;"> <img src="/mt-rev2/img/rewardbutton_y.png"> </a>
						@endif
					</div>
				</div>
			</div>
		</div>
		<input type="hidden" name="stamp_count" id="stamp_count" value="{{$customerStampCount}}">

		<div class="modal fade" id="modal-collect-2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="vertical-alignment-helper">
				<div class="modal-dialog vertical-align-center" role="document">
				    <div class="modal-content ">
				      <div class="modal-body modal-confirm">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				         	<i class="fa fa-times" aria-hidden="true"></i>
				        </button>
				        <img src="/mt-rev2/img/popup-collect-2.png" class="popup-collect-img">
				      </div>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modal-collect-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="vertical-alignment-helper">
				<div class="modal-dialog vertical-align-center" role="document">
				    <div class="modal-content ">
				      <div class="modal-body modal-confirm">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				         	<i class="fa fa-times" aria-hidden="true"></i>
				        </button>
				        <img src="/mt-rev2/img/popup-collect-1.png" class="popup-collect-img">
				      </div>
				    </div>
				</div>
			</div>
		</div>

		<form id="form-choose-reward" action="{{ action('MT\EstampController@chooseRewardPage') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
		</form>

		<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>
		<script type='text/javascript'>
			function chooseRewardSubmit()
			{
				$('#form-choose-reward').submit();
			}
	        function openCamera() {
	            window.location = "line://nv/addFriends";
	        }
	        $(document).ready(function () {
	        	var countStamp = $('#stamp_count').val();
	        	if(countStamp >= 6 && countStamp < 10){
	        		$('#modal-collect-2').modal('show');
	        	}else if(countStamp >= 10){
	        		$('#modal-collect-1').modal('show');
	        	}
	        });
	    </script>


	</body>
</html>