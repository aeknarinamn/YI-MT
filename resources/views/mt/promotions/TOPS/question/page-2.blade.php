<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="/mt/promotions/TOPS/font/font.css">
	<link rel="stylesheet" type="text/css" href="/mt/promotions/TOPS/css/style.css">
</head>
<body>
	<div class="point question2">
		<div class="header">
			<img src="/mt/promotions/TOPS/images/header_q2.png">
		</div>
		<div class="u-point">
			<div class="c-row">
				<p class="text-white text-title-q">2.ปกติคุณช้อปที่ท็อปส์ประมาณครั้งละเท่าไหร่</p>
			</div>
		</div>


		<form id="action-form" action="{{ action('MT\Promotion\TOPS\QuestionController@questionPage2Store') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" name="line_user_id" value="6">
			<div class="question">
				@foreach ($fieldItems as $key => $fieldItem)
					<div class="q-row mb-0">
						<div class="col-1 bg-none">
							<div class="check">
								<input onchange="check('c{{$key+1}}')" type="checkbox" name="value" id="c{{$key+1}}" value="{{$fieldItem->value}}" >
								<label for="c1">{{$fieldItem->value}}</label>
							</div>
						</div>
					</div>
				@endforeach
				<button type="submit">Submit</button>
				
			</div>

		</form>	

		
	</div>

	<script>

		function check($id) {
			document.getElementById("c1").checked = false;
			document.getElementById("c2").checked = false;
			document.getElementById("c3").checked = false;
			document.getElementById("c4").checked = false;
			document.getElementById($id).checked = true;
		}

		
			
	</script>
</body>
</html>