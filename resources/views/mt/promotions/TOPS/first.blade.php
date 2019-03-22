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
				{{-- <button disabled="">
					<img src="mt/img/images/btn-no.png">
				</button> --}}
				<button type="button" onclick="openCamera()">
					<img src="mt/img/images/btn.png">
				</button>
			@else
				<form action="{{ action('MT\Promotion\TOPS\PromotionController@second') }}" method="POST">
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
			<div class="text-title-new"><img src="/mt/promotions/TOPS/images/prize.png"  class="w-100"></div>
			<div class="product_new" onclick="clickProduct()">
				<img src="/mt/promotions/TOPS/images/product-p1.png" class="w-100">
			</div>
			<div class="condition_new">
				<img src="/mt/promotions/TOPS/images/text.png" class="w-100">
			</div>
		</div>

	</div>

	<div class="modal" id="productModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-body">
	      	    <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
		          <img src="/mt/promotions/TOPS/images/btn-close.png" class="">
		        </button>
	        	<img src="/mt/promotions/TOPS/images/popup-2.png" class="modal-image">
	      </div>
	    </div>
	  </div>
	</div>
	
@endsection

<script type="text/javascript">
	function clickProduct(){
		$('#productModal').modal('show');
	}
	function openCamera() {
        window.location = "line://nv/addFriends";
    }
</script>






