<?php

namespace YellowProject\Http\Controllers\MT\Promotion;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;

class PromotionController extends Controller
{
    protected $points;

    public function __construct()
    {
        $this->points = 6;
        $this->points_rule = 6;
    }

    public function index()
    {
       return view('mt.promotions.index');
    }

    public function first ()
    {   
        // $point = 5;
        return view('mt.promotions.first',['point' => $this->points, 'points_rule' => $this->points_rule]);
    }

    public function second ()
    {
        // $point = 5;
        if ($this->points >= $this->points_rule) {
            return view('mt.promotions.second');
            # code...
        } else {
            return redirect('promotions');
        }
        
        
    }

    public function confirm(Request $request)
    {
        if ($this->points >= $this->points_rule) {
            if ($request->has('confirm')) {
                if ($request->confirm == 'confirm') {
                    $respo = $this->points-$this->points_rule;
                    return 'บริษัทจัดทำการส่งสินค้าแล้วค่ะ คะแนนคุณเหลือ '.$respo.' คะแนน';
                } else {
                return 'ยืนยันภายหลัง';
                }
            }
        } else {
            return redirect('promotions');
        }
        
    }

}
