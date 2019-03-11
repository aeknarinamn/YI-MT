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
			<input type="hidden" name="line_user_id" value="1">
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
								<!-- <div class="col-2">
									<div class="image">
										<img src="/mt/promotions/TOPS/images/product-b.png" class="w-100">
									</div>
									<div class="check">
										<input type="checkbox" name="" id="c2">
										<label for="c2">ผลิตภัณฑ์ล้างจาน</label>
									</div>
								</div> -->
								<?php $countKey++; ?>
								<?php $count++; ?>
							@endforeach
						</div>
				@endforeach
				<!-- <div class="q-row">
					<div class="col-1">
						<div class="image">
							<img src="/mt/promotions/TOPS/images/product-c.png" class="w-100">
						</div>
						<div class="check">
							<input type="checkbox" name="" id="c3">
							<label for="c3">ผลิตภัณฑ์ดูแลเส้นผม</label>
						</div>
					</div>
					<div class="col-2">
						<div class="image">
							<img src="/mt/promotions/TOPS/images/product-d.png" class="w-100">
						</div>
						<div class="check">
							<input type="checkbox" name="" id="c4">
							<label for="c4">ผลิตภัณฑ์ดูแลผิวกาย</label>
						</div>
					</div>
				</div>
				<div class="q-row mb-0">
					<div class="col-1">
						<div class="image">
							<img src="/mt/promotions/TOPS/images/product-e.png" class="w-100">
						</div>
						<div class="check">
							<input type="checkbox" name="" id="c5">
							<label for="c5">ผลิตภัณฑ์อาบน้ำ</label>
						</div>
					</div>
					<div class="col-2">
						<div class="image">
							<img src="/mt/promotions/TOPS/images/product-f.png" class="w-100">
						</div>
						<div class="check">
							<input type="checkbox" name="" id="c6"> 
							<label for="c6">ผลิตภัณฑ์ปรุงอาหาร</label>
						</div>
					</div>
				</div> -->
				<button type="Submit">Submit</button>
			</div>
		</form>
	</div>
</body>
</html>