<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
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

				<button class="btn-next">
					<!-- <img src="images/btn-next.png"> -->
					<img src="/mt/promotions/WATSONS/images/btn-next-p.png">
				</button>
			</form>
		</div>
	</div>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript">
		var limit = 2;
		$('input.shampoo-checkbox').on('change', function(evt) {

		   if($('.shampoo-checkbox:checkbox:checked').length > limit) {
		       this.checked = false;
		   }
		});
		function submitData()
		{
			$('#action-form').submit();
		}
	</script>
</body>
</html>


