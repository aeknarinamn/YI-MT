@extends('mt.promotions.master.layout')

@section('title', 'second')


@section('content')
	
<div class="point">
		<div class="reedeem">
		<div class="bg">
			<img src="mt/img/images/bg.png">
		</div>
		<div class="row-btn">
<!-- 			<button>
				<img src="images/btn-confirm.png">
			</button> -->
			
			{{-- <input type="checkbox" name="completed" onChange="this.form.submit()" {{ $task->completed ? 'checked' : '' }}>  --}} 
				<button type="submit" onclick="completed('confirm')">
					<img src="mt/img/images/btn-confirm-a.png">
				</button>	

				<button type="submit" onclick="completed('after')">
					<img src="mt/img/images/btn-get-later.png">
				</button>

			{{-- <form method="POST" action="/promotions_confirm?confirm=confirm">		
			</form>	 --}}
	
		{{-- 	<button>
				<img src="mt/img/images/btn-get-later-a.png">
			</button> --}}
		</div>


	</div>
	

	<form method="Post" id="submitform" action="promotions_confirm?confirm=confirm">
		<input type="hidden" name="confirm" value="confirm">
	</form>
@endsection






