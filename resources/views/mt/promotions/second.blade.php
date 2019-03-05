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
	

	<form method="Post" id="submitform" action="{{$url_confirm}}">
		{!! csrf_field() !!}
		<input type="hidden" name="confirm" value="{{$user_token}}">
	</form>
@endsection






