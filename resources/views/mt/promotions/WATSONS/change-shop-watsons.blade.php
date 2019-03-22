<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="font/font.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="/mt/promotions/WATSONS/css/style.css">
</head>
<body class="transparent">
	<div class="content_a transparent">
		<img src="/mt/promotions/WATSONS/images/popup1.png" class="w-100">
	    <button type="button" class="btn-confirm" onclick="submitData()">
          <img src="/mt/promotions/WATSONS/images/btn-confirm-1A.png" class="">
        </button>
	</div>

<!-- 	<div class="modal" id="myModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-body">
	      	    <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
		          <img src="images/btn-close-2.png" class="">
		        </button>
	        	<img src="images/popup1.png" class="modal-image">

	      </div>
	    </div>
	  </div>
	</div> -->
	<form action="{{ action('MT\Customer\CustomerController@changeShopWatsons') }}" method="POST" id="action-form">
		{!! csrf_field() !!}
		<input type="hidden" name="line_user_id" value="{{$lineUserId}}">
		<input type="hidden" name="shop_change_id" value="2">
	</form>

	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

	<script type="text/javascript">
		function submitData()
		{
			$('#action-form').submit();
		}
		$('#myModal').modal('show')
	</script>
</body>
</html>