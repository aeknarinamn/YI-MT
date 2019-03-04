<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet">
		<link rel="stylesheet" href="/mt/css/font-awesome.min.css">
		<link rel="stylesheet" href="/mt/css/bootstrap.min.css">
		<link rel="stylesheet" href="/mt/css/style.css">
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
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-12 ">
<!-- 						<button> <img src="img/6point.png"> </button>

						<button> <img src="img/10point.png"> </button> -->

						<INPUT type="image" src="/mt/img/6point.png" value="" class="btnpoint" id="6point">
						<INPUT type="image" src="/mt/img/10point.png" value="" class="btnpoint" id="10point" @if($customerStampCount < 10) disabled="" @endif>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>

		<div class="modal bs-modal-sm  fade alert-6point" id="alert-6point" tabindex="-1" role="dialog"  aria-hidden="true">
		    <div class="vertical-alignment-helper">
		        <div class="modal-dialog vertical-align-center modal-dialog-point">
		            <div class="modal-content" >
						<div class="modal-body m-point">
							<p class="t1">ยินดีด้วย</p>
							<p class="t2">คุณสะสมพ้อยท์ครบ 6 ดวงแล้ว</p>
							<p class="t3">กรุณาโชว์ข้อความนี้ที่จุดแลกของแถมที่เทสโก้โลตัส และให้พนักงานยืนยันเพื่อรับของ</p>
							<a href="#" onclick="sixsubmit(); return false;" class="clickbutton"> <img src="/mt/img/acceptbutton.png"> </a>
							<a href="#" class="clickbutton" class="m-point-close"> <img src="/mt/img/rejectbutton.png" class="reject"> </a>
					    </div>
		            </div>
		        </div>
		    </div>
		</div>

		<div class="modal bs-modal-sm  fade alert-10point" id="alert-10point" tabindex="-1" role="dialog"  aria-hidden="true">
		    <div class="vertical-alignment-helper">
		        <div class="modal-dialog vertical-align-center modal-dialog-point">
		           <div class="modal-content" >
						<div class="modal-body m-point">
							<p class="t1">ยินดีด้วย</p>
							<p class="t2">คุณสะสมพ้อยท์ครบ 10 ดวงแล้ว</p>
							<p class="t3">กรุณาโชว์ข้อความนี้ที่จุดแลกของแถมที่เทสโก้โลตัส และให้พนักงานยืนยันเพื่อรับของ</p>
							<a href="#" onclick="tensubmit(); return false;" class="clickbutton"> <img src="/mt/img/acceptbutton.png"> </a>
							<a href="#" class="clickbutton" class="m-point-close"> <img src="/mt/img/rejectbutton.png" class="reject"> </a>
					    </div>
		            </div>
		        </div>
		    </div>
		</div>

		<form id="form-6-stamp" action="{{ action('MT\EstampController@getReward') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" name="estamp_id" value="{{ $estamp->id }}">
			<input type="hidden" name="number_stamp" value="6">
			<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
		</form>
		<form id="form-10-stamp" action="{{ action('MT\EstampController@getReward') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" name="estamp_id" value="{{ $estamp->id }}">
			<input type="hidden" name="number_stamp" value="10">
			<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
		</form>

		<script type="text/javascript" src="/mt/js/jquery-3.2.1.min.js"></script>
		<script src="/mt/js/jquery-ui.js"></script>
		<script type="text/javascript" src="/mt/js/bootstrap.min.js" ></script>
		<script type="text/javascript">
			function sixsubmit()
			{
				$('#form-6-stamp').submit();
			}
			function tensubmit()
			{
				$('#form-10-stamp').submit();
			}

			$( "#6point" ).click(function() {
			  	$('#alert-6point').modal('show');
			});
			$( "#10point" ).click(function() {
			  	$('#alert-10point').modal('show');
			});
			$( ".reject" ).click(function() {
			  	$('.alert-6point').modal('hide');
				$('.alert-10point').modal('hide');
			});
		</script>

	</body>
</html>