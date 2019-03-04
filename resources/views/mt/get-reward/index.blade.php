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
			<div class="content" id="body">
				@foreach($estampRewards as $key => $estampReward)
					<button class="btn-reward @if($customerStampCount < $estampReward->total_use_stamp) black @endif"  id="point6" @if($customerStampCount >= $estampReward->total_use_stamp) onclick="reward({{$estampReward->total_use_stamp}}); return false;" @endif>
					    <img src="{{$estampReward->img_url}}">
					</button>
				@endforeach
				<!-- <button class="btn-reward black">
				   <img src="/mt-rev2/img/10point_color.png">
				</button> -->
			</div>

		</div>

		<div class="modal fade" id="modal-reward-6point" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="vertical-alignment-helper">
				<div class="modal-dialog vertical-align-center" role="document">
				    <div class="modal-content ">
				      <div class="modal-body modal-confirm">
				        <img src="/mt-rev2/img/popup-reward-6point.png" class="popup-collect-img">
							<div class="btn-reward-group">
								<div class="btn-center">
						        	<button class="popup-btn-reward" onclick="reward3Submit(); return false;">
									    <img src="/mt-rev2/img/btn-reward-confirm.png">
									</button>
									<button class="popup-btn-reward" class="close" data-dismiss="modal">
									   <img src="/mt-rev2/img/btn-reward-cancel.png">
									</button>
								</div>
							</div>
				      </div>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modal-reward-10point" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="vertical-alignment-helper">
				<div class="modal-dialog vertical-align-center" role="document">
				    <div class="modal-content ">
				      <div class="modal-body modal-confirm">
				        <img src="/mt-rev2/img/popup-reward-10point.png" class="popup-collect-img">
						
							<div class="btn-reward-group">
								<div class="btn-center">
						        	<button class="popup-btn-reward" onclick="reward4Submit(); return false;">
									    <img src="/mt-rev2/img/btn-reward-confirm.png">
									</button>
									<button class="popup-btn-reward" class="close" data-dismiss="modal">
									   <img src="/mt-rev2/img/btn-reward-cancel.png">
									</button>
								</div>
							</div>
				      </div>
				    </div>
				</div>
			</div>
		</div>

		@foreach($estampRewards as $key => $estampReward)
			<form id="form-{{$estampReward->id}}-stamp" action="{{ action('MT\EstampController@getReward') }}" method="post">
				{!! csrf_field() !!}
				<input type="hidden" name="estamp_id" value="{{ $estamp->id }}">
				<input type="hidden" name="number_stamp" value="{{$estampReward->total_use_stamp}}">
				<input type="hidden" name="customer_count_stamp" value="{{$customerStampCount}}">
				<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
			</form>
		@endforeach

		<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>
		<script type="text/javascript">
			function reward3Submit()
			{
				$('#form-3-stamp').submit();
			}
			function reward4Submit()
			{
				$('#form-4-stamp').submit();
			}

			function reward(totalUsrStamp) {
				if(totalUsrStamp == 6){
					$('#modal-reward-6point').modal('show');
				}
				if(totalUsrStamp == 10){
					$('#modal-reward-10point').modal('show');
				}
			}
		</script>

	</body>
</html>