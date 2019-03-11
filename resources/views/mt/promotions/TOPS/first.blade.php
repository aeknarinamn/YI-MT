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
					@if ($UserProfile->total_stamp < 1)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 2">
					@if ($UserProfile->total_stamp < 2)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 3">
					@if ($UserProfile->total_stamp < 3)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 4">
					@if ($UserProfile->total_stamp < 4)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 5">
					@if ($UserProfile->total_stamp < 5)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>
				<div class="item 6">
					@if ($UserProfile->total_stamp < 6)
						<img src="mt/img/images/point-2.png">
					@else
						<img src="mt/img/images/point-1.png">
					@endif
				</div>

			</div>
		</div>
		<div class="row-btn">
			@if ($UserProfile->total_stamp < $points_rule || $UserProfile->is_redeem != 0)
				<button disabled="">
					<img src="mt/img/images/btn-no.png">
				</button>
			@else
				<form action="{{ action('MT\Promotion\PromotionController@second') }}" method="POST">
					{!! csrf_field() !!} {{ method_field('POST') }}
					@isset ($UserProfile)
					    <input type="hidden" name="id" value="{{ $UserProfile->id }}">
					    <input type="hidden" name="line_user_id" value="{{ $UserProfile->line_user_id }}">
					@endisset
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





