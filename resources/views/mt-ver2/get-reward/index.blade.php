<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>ยูนิลีเวอร์โปรคุ้ม</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="/mt/css/style.css">
		<style type="text/css">
			.img-thumbnail {
			    width: 100%;
			}

			.item{
				border: 1px solid #ddd;
				margin: 0 auto;
				float: left
			}

			.item-s1{
				width: 600px;
				height: 600px;
			}
			.item-s2{
				width: 300px;
				height: 300px;
			}
			.item-s3{
				width: 200px;
				height: 200px;
			}
			.box-item{
				width: 600px;
				margin: 0 auto;
				background-color: #fff;
			}
			.mt-20{
				margin-top: 20px;
			}
			.grayscale {
			    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
			    filter: grayscale(100%);
			}

			@media(max-width:600px){
				.box-item{
					width: 510px;
					margin: 0 auto
				}
				.item-s1{
					width: 510px;
					height: 510px;
				}
				.item-s2{
					width: 255px;
					height: 255px;
				}
				.item-s3{
					width: 170px;
					height: 170px;
				}
			}

			@media(max-width:510px){
				.box-item{
					width: 360px;
					margin: 0 auto
				}
				.item-s1{
					width: 360px;
					height: 360px;
				}
				.item-s2{
					width: 180px;
					height: 180px;
				}
				.item-s3{
					width: 120px;
					height: 120px;
				}
			}


			@media(max-width:360px){
				.box-item{
					width: 330px;
					margin: 0 auto
				}
				.item-s1{
					width: 330px;
					height: 330px;
				}
				.item-s2{
					width: 165px;
					height: 165px;
				}
				.item-s3{
					width: 110px;
					height: 110px;
				}
			}

			@media(max-width:320px){
				.box-item{
					width: 300px;
					margin: 0 auto
				}
				.item-s1{
					width: 300px;
					height: 300px;
				}
				.item-s2{
					width: 150px;
					height: 150px;
				}
				.item-s3{
					width: 100px;
					height: 100px;
				}
			}
		</style>
	</head>
	<body>
		<div class="reward">
			<div class="header">
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-12 np">
						<img src="/mt/img/banner1.png">
					</div>
				</div>
			</div>
			<div class="content">

			@if($countEstampReward == 1)
				<div class="row">
					<div class="box-item">
						@foreach($estampRewards as $key => $estampReward)
							<div class="item item-s1 mt-20 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
								<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
							</div>
						@endforeach
					</div>
				</div>
			@endif
			@if($countEstampReward == 2)
				<div class="row">
				 	<div class="box-item">
				 		@foreach($estampRewards as $key => $estampReward)
							<div class="item item-s2 mt-20 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
								<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
							</div>
						@endforeach
					</div>
				</div>
			@endif
			@if($countEstampReward == 3)
				<div class="row">
				 	<div  class="box-item ">
				 		@foreach($estampRewards as $key => $estampReward)
				 			@if($key == 0)
				 				<div class="item item-s1 mt-20 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
							@else
								<div class="item item-s2 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
				 			@endif
						@endforeach
					</div>
				</div>
			@endif
			@if($countEstampReward == 4)
				<div class="row">
				 	<div class="box-item">
				 		@foreach($estampRewards as $key => $estampReward)
				 			@if($key == 0 || $key == 1)
				 				<div class="item item-s2 mt-20 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
				 			@else
				 				<div class="item item-s2 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
				 			@endif
						@endforeach
					</div>
				</div>
			@endif
			@if($countEstampReward == 5)
				<div class="row">
				 	<div class="box-item">
				 		@foreach($estampRewards as $key => $estampReward)
				 			@if($key == 0 || $key == 1)
				 				<div class="item item-s2 mt-20 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
				 			@else
				 				<div class="item item-s3 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
				 			@endif
						@endforeach
					</div>
				</div>
			@endif
			@if($countEstampReward == 6)
				<div class="row">
				 	<div class="box-item">
				 		@foreach($estampRewards as $key => $estampReward)
					 		@if($key == 0 || $key == 1 || $key == 2)
				 				<div class="item item-s3 mt-20 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
				 			@else
				 				<div class="item item-s3 @if($customerStampCount < $estampReward->total_use_stamp) grayscale @endif">
									<a href="#" onclick="reward{{$key}}(); return false;" class="@if($customerStampCount < $estampReward->total_use_stamp) btn-is-disabled @endif"><img src="{{ $estampReward->img_url }}"  class="img-thumbnail img-fluid"></a>
								</div>
				 			@endif
						@endforeach
					</div>
				</div>
			@endif

			<!--  1 item    -->

<!-- 				<div class="row">
					<div class="box-item">
						<div class="item item-s1 mt-20">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
					</div>
				</div>
 -->

			<!--  2 item    -->

<!-- 				<div class="row">
				 	<div class="box-item">
						<div class="item item-s2 mt-20">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>

						<div class="item item-s2 mt-20">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
					</div>
				</div> -->


			<!--  3 item    -->

<!-- 				<div class="row">
				 	<div  class="box-item ">
						<div class="item item-s1 mt-20 grayscale">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s2 grayscale ">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>

						<div class="item item-s2">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
					</div>
				</div> -->



			<!--   4 item   -->

				<!-- <div class="row">
				 	<div class="box-item">
						<div class="item item-s2 mt-20 grayscale">
							<img src="/mt/img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>

						<div class="item item-s2 mt-20">
							<img src="/mt/img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s2 ">
							<img src="/mt/img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s2 grayscale">
							<img src="/mt/img/coupon.png "  class="img-thumbnail img-fluid"  >
						</div>
					</div>
				</div> -->

			<!--   5 item   -->
<!-- 				<div class="row">
				 	<div class="box-item">

						<div class="item item-s2 mt-20">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s2 mt-20">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>

						<div class="item item-s3">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>

						<div class="item item-s3">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s3">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
					</div>
				</div> -->


			<!--  6   -->
<!-- 				<div class="row">
				 	<div class="box-item">
						<div class="item item-s3 mt-20 grayscale">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>

						<div class="item item-s3 mt-20">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s3 mt-20 grayscale">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s3 ">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>

						<div class="item item-s3 grayscale">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
						<div class="item item-s3 ">
							<img src="img/coupon.png"  class="img-thumbnail img-fluid"  >
						</div>
					</div>
				</div>
 -->


				<div class="clear"></div>
			</div>
		</div>

		@foreach($estampRewards as $key => $estampReward)
			<div class="modal bs-modal-sm  fade alert-6point" id="alert-reward{{$key}}" tabindex="-1" role="dialog"  aria-hidden="true">
			    <div class="vertical-alignment-helper">
			        <div class="modal-dialog vertical-align-center modal-dialog-point">
			            <div class="modal-content" >
							<div class="modal-body m-point">
								<p class="t1">ยินดีด้วย</p>
								<div class="item item-s3">
									<img src="{{ $estampReward->img_url }}"  class="img-thumbnail">
								</div>
								<!-- <p class="t2">คุณสะสมพ้อยท์ครบ {{$estampReward->total_use_stamp}} ดวงแล้ว</p> -->
								<p class="t3">กรุณาโชว์ข้อความนี้ที่จุดแลกของแถมที่เทสโก้โลตัส และให้พนักงานยืนยันเพื่อรับของ</p>
								<a href="#" onclick="reward{{$key}}Submit(); return false;" class="clickbutton"> <img src="mt/img/acceptbutton.png"> </a>
								<a href="#" class="clickbutton" class="m-point-close"> <img src="mt/img/rejectbutton.png" class="reject"> </a>
						    </div>
			            </div>
			        </div>
			    </div>
			</div>
		@endforeach

		@foreach($estampRewards as $key => $estampReward)
			<form id="form-{{$key}}-stamp" action="{{ action('MT\EstampController@getReward') }}" method="post">
				{!! csrf_field() !!}
				<input type="hidden" name="estamp_id" value="{{ $estamp->id }}">
				<input type="hidden" name="number_stamp" value="{{$estampReward->total_use_stamp}}">
				<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
			</form>
		@endforeach


		<!-- <div class="modal bs-modal-sm  fade alert-10point" id="alert-10point" tabindex="-1" role="dialog"  aria-hidden="true">
		    <div class="vertical-alignment-helper">
		        <div class="modal-dialog vertical-align-center modal-dialog-point">
		           <div class="modal-content" >
						<div class="modal-body m-point">
							<p class="t1">ยินดีด้วย</p>
							<p class="t2">คุณสะสมพ้อยท์ครบ 10 ดวงแล้ว</p>
							<p class="t3">กรุณาโชว์ข้อความนี้ที่จุดแลกของแถมที่เทสโก้โลตัส และให้พนักงานยืนยันเพื่อรับของ</p>
							<a href="#" class="clickbutton"> <img src="img/acceptbutton.png"> </a>
							<a href="#" class="clickbutton" class="m-point-close"> <img src="img/rejectbutton.png" class="reject"> </a>
					    </div>
		            </div>
		        </div>
		    </div>
		</div> -->



		<script type="text/javascript" src="/mt/js/jquery-3.2.1.min.js"></script>
		<script src="/mt/js/jquery-ui.js"></script>
		<script type="text/javascript" src="/mt/js/bootstrap.min.js" ></script>
		<script type="text/javascript">
			function reward0Submit()
			{
				$('#form-0-stamp').submit();
			}
			function reward1Submit()
			{
				$('#form-1-stamp').submit();
			}
			function reward2Submit()
			{
				$('#form-2-stamp').submit();
			}
			function reward3Submit()
			{
				$('#form-3-stamp').submit();
			}
			function reward4Submit()
			{
				$('#form-4-stamp').submit();
			}
			function reward5Submit()
			{
				$('#form-5-stamp').submit();
			}

			function reward0() {
				$('#alert-reward0').modal('show');
			}
			function reward1() {
				$('#alert-reward1').modal('show');
			}
			function reward2() {
				$('#alert-reward2').modal('show');
			}
			function reward3() {
				$('#alert-reward3').modal('show');
			}
			function reward4() {
				$('#alert-reward4').modal('show');
			}
			function reward5() {
				$('#alert-reward5').modal('show');
			}
			// $( "#6point" ).click(function() {
			//   	$('#alert-6point').modal('show');
			// });
			// $( "#10point" ).click(function() {
			//   	$('#alert-10point').modal('show');
			// });
			$( ".reject" ).click(function() {
			  	$('.alert-6point').modal('hide');
				$('.alert-10point').modal('hide');
			});
		</script>

	</body>
</html>