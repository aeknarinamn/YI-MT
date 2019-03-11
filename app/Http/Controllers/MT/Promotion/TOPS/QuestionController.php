<?php

namespace YellowProject\Http\Controllers\MT\Promotion\TOPS;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;

class QuestionController extends Controller
{
    public function questionPage1()
    {
    	return view('mt.promotions.TOPS.question.page-1');
    }

    public function questionPage2()
    {
    	return view('mt.promotions.TOPS.question.page-2');
    }
}
