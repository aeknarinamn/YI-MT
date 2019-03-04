<?php

namespace YellowProject\Http\Controllers\SuperAdmin;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;

class LandingPageController extends Controller
{
    public function getLandingPage()
    {
    	return view('super-admin.landing-page');
    }
}
