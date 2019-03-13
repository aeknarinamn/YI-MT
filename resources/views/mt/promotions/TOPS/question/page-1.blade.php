<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="/mt/promotions/TOPS/font/font.css">
	<link rel="stylesheet" type="text/css" href="/mt/promotions/TOPS/css/style.css">
</head>
<body>
	<div class="point question1">
		<div class="header">
			<img src="/mt/promotions/TOPS/images/header_q.png">
		</div>
		<div class="u-point">
			<div class="c-row">
				<p class="text-white text-title-q">1. ประเภทของผลิตภัณฑ์ที่คุณซื้อเป็นประจำที่เทสโก้ โลตัส คือผลิตภัณฑ์ประเภทใดบ้าง (เลือกได้มากกว่า 1 ข้อ)</p>
			</div>
		</div>

		<form id="action-form" action="{{ action('MT\Promotion\TOPS\QuestionController@questionPage1Store') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" name="line_user_id" value="{{$lineUserProfile}}">
			<div class="question">
				<?php $count = 0; ?>
				@foreach($fieldItems as $fieldItemDatas)
						<div class="q-row">
							<?php $countKey = 0; ?>
							@foreach($fieldItemDatas as $key => $fieldItem)
									<div class="col-{{$countKey+1}}">
										<div class="image">
											<img src="{{$fieldItem->img_url}}" class="w-100">
										</div>
										<div class="check">
											<input type="checkbox" name="values[]" value="{{$fieldItem->value}}" id="c{{$count}}">
											<label for="c{{$count}}">{{$fieldItem->value}}</label>
										</div>
									</div>

								<?php $countKey++; ?>
								<?php $count++; ?>
							@endforeach
						</div>
				@endforeach
			</div>

		<div class="u-point">
			<div class="c-row">
				<p class="text-white text-title-q">2.ปกติคุณช้อปที่ท็อปส์ประมาณครั้งละเท่าไหร่</p>
			</div>
		</div>

			<div class="question">
					@foreach ($question2Items as $key => $question2)
						<div class="q-row mb-0">
							<div class="col-1 bg-none">
								<div class="check">
									<input 
										onchange="check('cc{{$key+1}}')" 
										type="checkbox" name="value" 
										id="cc{{$key+1}}" 
										value="{{$question2->value}}"
										class="ques2" 
									>
									<label for="cc{{$key+1}}">{{$question2->value}}</label>
								</div>
							</div>
						</div>
					@endforeach
			</div>
			
			<button 
				class="btn-coupon" 
				type="button" 
				style="width: 220px; margin-top: 200px;  
				position: absolute; bottom: 30px; 
				left: 50%; transform: translate(-50%, -50%);
				"
				onclick="validate()" 
				id="btnsub"

			>
				<img src="/mt/promotions/TOPS/images/confirmQuestion.png">
			</button>


		</form>
	</div>


	<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script type='text/javascript'>
		function validate() {

	            var checkQ1 = $('input[name="values[]"]:checked').length > 0;
	            var checkQ2 = $('input[name="value"]:checked').length > 0;
	            if(!checkQ1) {
	            	alert('กรุณาตอบคำถามข้อที่ 1 ด้วย คะ');
	            }

	            if(!checkQ2) {
	            	alert('กรุณาตอบคำถามข้อที่ 2 ด้วย คะ');
	            }

	            if(checkQ1 && checkQ2){
	            	$('#action-form').submit();
	            }

	    }
		function check($id) {
			document.getElementById("cc1").checked = false;
			document.getElementById("cc2").checked = false;
			document.getElementById("cc3").checked = false;
			document.getElementById("cc4").checked = false;
			document.getElementById("cc5").checked = false;
			document.getElementById($id).checked = true;
		}

		
			
	</script>
</body>
</html>