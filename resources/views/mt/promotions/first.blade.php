@extends('mt.promotions.master.layout')

@section('title')


@section('content')
	
<div class="point">
		<div class="header">
			<img src="mt/img/images/header.png">
		</div>
		<div class="u-point">
			<div class="c-row">
				<div class="item 1">
					@if ($point < 1)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 2">
					@if ($point < 2)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 3">
					@if ($point < 3)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 4">
					@if ($point < 4)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 5">
					@if ($point < 5)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 6">
					@if ($point < 6)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				{{-- <div class="item 7">
					@if ($point < 7)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div> --}}
			</div>
		</div>
		<div class="row-btn">
			@if ($point < $points_rule)
				<button disabled="">
					<img src="mt/img/images/btn-confirm.png">
				</button>
			@else
				<form action="{{ action('MT\Promotion\PromotionController@second') }}" method="POST">
					{!! csrf_field() !!}
					<input type="hidden" name="line_user_id" value="{{ $lineUserProfile->id }}">
					<button type="submit">
						<img src="mt/img/images/btn.png">
					</button>
				</form>
			@endif
			
		</div>
		<div class="row-content">
			<div class="text-title">Prize</div>
			<div class="product">
				<div class="product-images">
					<img src="mt/img/images/product.png">
				</div>
				<div class="product-detail">
					<h1>สินค้าล่าแต้ม</h1>
					<hr>
					<p>รับสติกเกอร์ไปเลย 1 ดวง!!	เมื่อซื้อสินค้าที่ร่วมรายการ คลิกดูรายละเอียดเพิ่มเติม</p>
				</div>
			</div>
			<div class="product">
				<div class="product-images">
					<img src="mt/img/images/product.png">
				</div>
				<div class="product-detail">
					<h1>สินค้าล่าแต้ม</h1>
					<hr>
					<p>รับสติกเกอร์ไปเลย 1 ดวง!!	เมื่อซื้อสินค้าที่ร่วมรายการ คลิกดูรายละเอียดเพิ่มเติม</p>
				</div>
			</div>
			<div class="condition">
				<h3>กติกาสะสม</h3>
				<p>- พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ</p>
				<p>- พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ</p>
				<p>- พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ</p>
				<p>- พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ</p>
				<p>- พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ</p>
				<p>- พิเศษรับเลย U reward 1 ดวง เมื่อซื้อ</p>
			</div>
		</div>

	</div>
	

	
@endsection






