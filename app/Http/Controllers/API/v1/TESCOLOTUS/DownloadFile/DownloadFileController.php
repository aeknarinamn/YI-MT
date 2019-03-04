<?php

namespace YellowProject\Http\Controllers\API\v1\TESCOLOTUS\DownloadFile;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\DownloadFile\DownloadFile;

class DownloadFileController extends Controller
{
    public function getFileSubscriber()
    {
    	$downloadFileSusbcribers = DownloadFile::orderByDesc('created_at')->get();

    	return response()->json([
            'datas' => $downloadFileSusbcribers,
        ]);
    }
}
