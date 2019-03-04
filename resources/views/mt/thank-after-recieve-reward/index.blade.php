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
				<div class="exit_content">
					<img src="/mt-rev2/img/exit_content.png" >
				</div>

				<!-- <button class="exit-btn"  >
				    <img src="img/btn-start.png">
				</button> -->
				@if($estamp->is_auto_renew == 1)
					<button type="button" class="exit-btn" onclick="renewSubmit(); return false;">
					   <img src="/mt-rev2/img/btn-per.png">
					</button>
				@endif
			</div>

			<form id="form-renew" action="{{ action('MT\EstampController@renewEstamp') }}" method="post">
				{!! csrf_field() !!}
				<input type="hidden" name="estamp_id" value="{{ $estamp->id }}">
				<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
			</form>

		</div>

		<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>
		<script type="text/javascript">
			function renewSubmit()
			{
				$('#form-renew').submit();
			}
		</script>
	</body>
</html>