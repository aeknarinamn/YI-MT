<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="/mt/promotions/WATSONS/css/style.css">
</head>
<body>
	<div class="content cbg-2">
		<div class="header">
			<img src="/mt/promotions/WATSONS/images/image-header-2.png"  class="bg">
		</div>
		<div class="question" >
			<form action="{{ action('MT\Promotion\WATSONS\WATSONSController@questionShampooStore') }}" method="POST" id="action-form">
				{!! csrf_field() !!}
				<input type="hidden" name="subscriber_id" value="{{ $subscriber->id }}">
				<input type="hidden" name="line_user_id" value="{{ $lineUserId }}">
				<div class="question1">
					<table>
						<tr>
							<td colspan="2">
								<div class="box-img-3 height-auto">
									<img src="/mt/promotions/WATSONS/images/text-3.png" class="w-100">
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input type="radio" name="hair_type" value="ผมตรง" checked="">
								  <div class="box-img" id="s-choice1-1">
								  </div>
								</label>
							</td>
							<td>
								<label>
								  <input type="radio" name="hair_type" value="ผมดัด" >
								  <div class="box-img" id="s-choice1-2">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<label>
								  <input type="radio" name="hair_type" value="ผมบาง" >
								  <div class="box-img-3" id="s-choice1-3">
								  </div>
								</label>
							</td>
						</tr>
					</table>
				</div>

				<div class="question2">
					<table>
						<tr>
							<td colspan="2">
								<div class="box-img-3 height-auto">
									<img  src="/mt/promotions/WATSONS/images/text-4.png" class="w-100">
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="shampoo-checkbox" type="checkbox" name="shampoo_properties[]" value="ผมสวย เรียบลื่น เงางาม"  checked="">
								  <div class="box-img-4" id="s-choice2-1">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="shampoo-checkbox" type="checkbox" name="shampoo_properties[]" value="ช่วยแก้ผมเสีย และ ขาดร่วง" >
								  <div class="box-img-4" id="s-choice2-2">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="shampoo-checkbox" type="checkbox" name="shampoo_properties[]" value="ผมหนานุ่ม มีน้ำหนัก" >
								  <div class="box-img-4" id="s-choice2-3">
								  </div>
								</label>
							</td>
						</tr>
					</table>
				</div>

				<button type="button" class="btn-next" onclick="submitData()">
					<!-- <img src="images/btn-next.png"> -->
					<img src="/mt/promotions/WATSONS/images/btn-next-p.png">
				</button>
			</form>
		</div>
	</div>

	<div class="modal" id="myModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-body">
	      	    <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
		          <img src="/mt/promotions/WATSONS/images/btn-close-2.png" class="">
		        </button>
	        	<img src="/mt/promotions/WATSONS/images/popup3.png" class="modal-image">
	      </div>
	    </div>
	  </div>
	</div>

	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script type="text/javascript">
		var limit = 2;
		$('input.shampoo-checkbox').on('change', function(evt) {

		   if($('.shampoo-checkbox:checkbox:checked').length > limit) {
		       this.checked = false;
		   }
		});
		function submitData()
		{
			var isSubmit = 1;

			if($('.shampoo-checkbox:checkbox:checked').length == 0) {
		       isSubmit = 0;
		   	}

			if(isSubmit){
				$('#action-form').submit();
			}else{
				$('#myModal').modal('show');
			}
		}
	</script>
</body>
</html>


