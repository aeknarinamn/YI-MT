<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>@yield('title', 'Master')</title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="mt/js/bootstrap-4.3.1.js">
	<link rel="stylesheet" type="text/css" href="mt/css/promotions/style.css">

	<style>
		.is-text-complete {
			text-decoration: line-through;
		}
	</style>

</head>
	<body>
		<div class="container">
			@yield('content')

		</div>



	<script src="mt/js/jquery-3.2.1.min.js"></script>
	<script src="mt/js/popper.min.js"></script>
	<script src="mt/js/bootstrap-4.3.1.min.js"></script>

	<script type="text/javascript">
		$('#myModal').modal('show')

		function completed($payload){
			if($payload == 'confirm'){
				document.getElementById("submitform").submit();
			}
			if ($payload == 'after'){
				url= '/promotions';
    			window.location = url; 
			}
		}
			
	</script>


</body>
</html>