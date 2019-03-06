<?php

namespace YellowProject\Http\Controllers\MT\Promotion;

use Illuminate\Http\Request;
use YellowProject\MT\Customer\Customer;
use YellowProject\Http\Controllers\MainController;

class PromotionController extends MainController
{
    protected $points;

    public function __construct()
    {
        $this->points = 110;
    }

    public function index()
    {
       return view('mt.promotions.index');
    }

    public function first()
    {   
        
        $lineUserProfile = \Session::get('line-login', "");

        return view('mt.promotions.first')
            ->with('lineUserProfile',$lineUserProfile? $lineUserProfile : null)
            ->with('point',$this->points)
            ->with('points_rule',Customer::RULE_REDEEM);
    }

    public function second()
    {
        if ($this->points >= Customer::RULE_REDEEM) {
            return view('mt.promotions.second')
                ->with('user_token','confirm');

            // return view('mt.promotions.second',[
            //     'url_confirm' => 'promotions_confirm',
            //     'user_token' => 'confirm',
            // ]);
        } else {
            return redirect()->action('MT\Promotion\PromotionController@index');
        }
        
        
    }

    public function confirm(Request $request)
    {
        if ($this->points >= Customer::RULE_REDEEM) {
            if ($request->has('confirm')) {
                if ($request->confirm == 'confirm') {
                    $total_point = $this->points-Customer::RULE_REDEEM;
                    return redirect()->action('MT\Promotion\PromotionController@thank')
                        ->with('point',$total_point);
                } else{
                    return redirect()->action('MT\Promotion\PromotionController@index');
                }
            }
        } else {
            return redirect()->action('MT\Promotion\PromotionController@index');
        }
        
    } //end func confirm

    public function thank(Request $request)
    {
        return view('mt.promotions.thankpage');
        
    } //end func thank

}
