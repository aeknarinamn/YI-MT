@extends('mt.promotions.master.layout')

@section('title')


@section('content')
	
<div class="point">
		<div class="reedeem">
		<div class="bg">
			<img src="mt/img/images/bg.png">
		</div>
		<div class="row-btn">
{{-- 			<button>
				<img src="images/btn-confirm.png">
			</button> --}}

				<button type="submit" onclick="completed('confirm')">
					<img src="mt/img/images/btn-confirm-a.png">
				</button>	

				<button type="submit" onclick="completed('later')">
					<img src="mt/img/images/btn-get-later.png">
				</button>

		</div>


	</div>
	
	<form action="{{ action('MT\Promotion\PromotionController@confirm') }}" method="POST" id="submitForm">
		{!! csrf_field() !!}
		@isset ($user_token)
		   <input type="hidden" name="confirm" value="{{$user_token}}"> 
		@endisset
	</form>

	<form action="{{ action('MT\Promotion\PromotionController@confirm') }}" method="POST" id="laterForm">
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






