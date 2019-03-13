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
			<input type="hidden" name="line_user_id" value="6">
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
									<input onchange="check('c{{$key+1}}')" type="checkbox" name="value" id="c{{$key+1}}" value="{{$question2->value}}" >
									<label for="c1">{{$question2->value}}</label>
								</div>
							</div>
						</div>
					@endforeach
			</div>

			<button type="Submit">Submit</button>
		</form>
	</div>
</body>
</html>