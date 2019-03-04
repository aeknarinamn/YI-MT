<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link href="/css/app.css" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>
                <div class="nav navbar-nav navbar-right">
                    <form style="padding:7px 0" action="{{ action('API\v1\RichMessageController@store') }}" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}
                        <input type="file" name="original_photo_path">
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</body>
</html>