<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Yellowidea Super Admin</title>
  <!-- Bootstrap core CSS-->
  <link href="/super-admin/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom fonts for this template-->
  <link href="/super-admin/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Page level plugin CSS-->
  <link href="/super-admin/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
  <!-- Custom styles for this template-->
  <link href="/super-admin/css/sb-admin.css" rel="stylesheet">

  @yield('head')
</head>
<body class="fixed-nav sticky-footer bg-dark" id="page-top">
  @include('super-admin.layouts.nav')
  @yield('body')
  @include('super-admin.layouts.footer')

  <!-- Bootstrap core JavaScript-->
  <script src="/super-admin/vendor/jquery/jquery.min.js"></script>
  <script src="/super-admin/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Core plugin JavaScript-->
  <script src="/super-admin/vendor/jquery-easing/jquery.easing.min.js"></script>
  <!-- Page level plugin JavaScript-->
  <script src="/super-admin/vendor/chart.js/Chart.min.js"></script>
  <script src="/super-admin/vendor/datatables/jquery.dataTables.js"></script>
  <script src="/super-admin/vendor/datatables/dataTables.bootstrap4.js"></script>
  <!-- Custom scripts for all pages-->
  <script src="/super-admin/js/sb-admin.min.js"></script>
  <!-- Custom scripts for this page-->
  <script src="/super-admin/js/sb-admin-datatables.min.js"></script>
  <script src="/super-admin/js/sb-admin-charts.min.js"></script>
</body>
</html>