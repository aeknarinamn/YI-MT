<?php

namespace YellowProject\Http\Controllers\MT\Promotion;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;

class PromotionController extends Controller
{
    protected $points;

    public function __construct()
    {
        $this->points = 51;
        $this->points_rule = 6;
    }

    public function index()
    {
       return view('mt.promotions.index');
    }

    public function first ()
    {   
        return view('mt.promotions.first',['point' => $this->points, 'points_rule' => $this->points_rule]);
    }

    public function second ()
    {
        if ($this->points >= $this->points_rule) {
            return view('mt.promotions.second',[
                'url_confirm' => 'promotions_confirm',
                'user_token' => 'confirm',
            ]);
        } else {
            return redirect()->action('MT\Promotion\PromotionController@index');
        }
        
        
    }

    public function confirm(Request $request)
    {
        if ($this->points >= $this->points_rule) {
            if ($request->has('confirm')) {
                if ($request->confirm == 'confirm') {
                    $respo = $this->points-$this->points_rule;
                    return 'บริษัทจัดทำการส่งสินค้าแล้วค่ะ คะแนนคุณเหลือ '.$respo.' คะแนน';
                } 
            }
        } else {
            return redirect()->action('MT\Promotion\PromotionController@index');
        }
        
    }

}
