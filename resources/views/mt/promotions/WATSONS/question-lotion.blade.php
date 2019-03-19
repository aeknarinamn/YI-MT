<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="/mt/promotions/WATSONS/css/style.css">
</head>
<body>
	<div class="content">
		<div class="header">
			<img src="/mt/promotions/WATSONS/images/image-header.png"  class="bg">
		</div>
		<div class="question" >
			<form action="{{ action('MT\Promotion\WATSONS\WATSONSController@questionLotionStore') }}" method="POST" id="action-form">
				{!! csrf_field() !!}
				<input type="hidden" name="subscriber_id" value="{{ $subscriber->id }}">
				<input type="hidden" name="line_user_id" value="{{ $lineUserId }}">
				<div class="question1">
					<table>
						<tr>
							<td colspan="2">
								<div class="box-img-3 height-auto">
									<img src="/mt/promotions/WATSONS/images/text-1.png" class="w-100">
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input type="radio" name="skin_type" value="ผิวแห้ง" checked="">
								  <div class="box-img" id="choice1-1">
								  </div>
								</label>
							</td>
							<td>
								<label>
								  <input type="radio" name="skin_type" value="ผิวธรรมดา" >
								  <div class="box-img" id="choice1-2">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input type="radio" name="skin_type" value="ผิวหมองคล้ำไม่สม่ำเสมอ" >
								  <div class="box-img" id="choice1-3">
								  </div>
								</label>
							</td>
							<td>
								<label>
								  <input type="radio" name="skin_type" value="ผิวแพ้ง่าย" >
								  <div class="box-img" id="choice1-4">
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
									<img src="/mt/promotions/WATSONS/images/text-2.png" class="w-100">
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="lotion-checkbox" type="checkbox" name="lotion_properties[]" value="ผิวนุ่มชุ่มชื่น"  checked="">
								  <div class="box-img-2" id="choice2-1">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="lotion-checkbox" type="checkbox" name="lotion_properties[]" value="ผิวกระจ่างใส ปรับสีผิวสม่ำเสมอ" >
								  <div class="box-img-2" id="choice2-2">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="lotion-checkbox" type="checkbox" name="lotion_properties[]" value="กลิ่นหอม" >
								  <div class="box-img-2" id="choice2-3">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="lotion-checkbox" type="checkbox" name="lotion_properties[]" value="ส่วนผสมจากธรรมชาติ" >
								  <div class="box-img-2" id="choice2-4">
								  </div>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label>
								  <input class="lotion-checkbox" type="checkbox" name="lotion_properties[]" value="ป้องกันแสงแดด" >
								  <div class="box-img-2" id="choice2-5">
								  </div>
								</label>
							</td>
						</tr>
					</table>
				</div>

				<button type="button" class="btn-next" onclick="submitData()">
					<!-- <img src="images/btn-next.png"> -->
					<img src="/mt/promotions/WATSONS/images/btn-next-a.png">
				</button>
			</form>
		</div>
	</div>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript">
		var limit = 2;
		$('input.lotion-checkbox').on('change', function(evt) {

		   if($('.lotion-checkbox:checkbox:checked').length > limit) {
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


