@extends('mt.promotions.master.layout')

@section('title')


@section('content')
	
<div class="point">
		<div class="reedeem">
		<div class="bg">
			<img src="mt/img/images/bg.png">
		</div>
		<div class="row-btn">
				@if ($UserProfile->is_redeem == 0)
					<button type="submit" onclick="completed('confirm')">
						<img src="mt/img/images/btn-confirm-a.png">
					</button>
				@else
					<button disabled="">
						<img src="mt/img/images/btn-confirm.png">
					</button>
				@endif
					

				<button type="submit" onclick="completed('later')">
					<img src="mt/img/images/btn-get-later.png">
				</button>

		</div>


	</div>
	
	<form action="mt/customers/{{ $UserProfile->id}}" method="POST" id="submitForm">
		{!! csrf_field() !!} {{ method_field('PATCH') }}
		@isset ($UserProfile)
		   <input type="hidden" name="line_user_id" value="{{ $UserProfile->line_user_id }}">
		@endisset
	</form>

	<form action="{{ action('MT\Promotion\PromotionController@index') }}" method="GET" id="laterForm">
		{!! csrf_field() !!}
		<input type="hidden" name="confirm" value="later">
	</form>


	<script type="text/javascript">
		function completed($payload){
			if($payload == 'confirm'){
				document.getElementById("submitForm").submit();
			}
			if ($payload == 'later'){
				document.getElementById("laterForm").submit();
			}
		}
			
	</script>
@endsection






