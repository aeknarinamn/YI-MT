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
		<div class="stamp">
			<div class="header">
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-12 np">
						<img src="/mt/img/banner1.png">
					</div>
				</div>
			</div>
			<div class="content">
				<div class="row">
					<div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
						<div class="finish">
							<div class="text">คุณได้แลกของรางวัลไปแล้วค่ะ</div>
						</div>
						<div>
							<!-- <a href="#" onclick="renewSubmit(); return false;" class="clickbutton @if($estamp->is_auto_renew != 1) btn-is-disabled @endif"> <img src="/mt/img/clickbutton.png"> </a> -->
							@if($estamp->is_auto_renew == 1)
								<a href="#" onclick="renewSubmit(); return false;" class="clickbutton"> <img src="/mt/img/clickbutton.png"> </a>
							@endif
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>

		<form id="form-renew" action="{{ action('MT\EstampController@renewEstamp') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" name="estamp_id" value="{{ $estamp->id }}">
			<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
		</form>

		<script type="text/javascript" src="/mt/js/jquery-3.2.1.min.js"></script>
		<script src="/mt/js/jquery-ui.js"></script>
		<script type="text/javascript" src="/mt/js/bootstrap.min.js" ></script>
		<script type="text/javascript">
			function renewSubmit()
			{
				$('#form-renew').submit();
			}
		</script>


	</body>
</html>