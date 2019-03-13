<?php

namespace YellowProject\Http\Controllers\MT\Promotion;

use Illuminate\Http\Request;
use YellowProject\MT\Shop\Shop;
use YellowProject\MT\Center\Center;
use YellowProject\MT\Customer\Customer;
use YellowProject\Http\Controllers\MainController;

class PromotionController extends MainController
{
    protected $points;

    public function __construct()
    {
        $this->points = 110;
        $this->ControllerIndex = 'MT\Promotion\PromotionController@index';
        $this->viewThankpage = 'mt.promotions.thankpage';
    }

    public function index()
    {
       return view('mt.promotions.index');
    }

    public function first()
    {   
        $lineUserProfile = \Session::get('line-login', "");

        $UserProfile = Customer::where('line_user_id',$this->testLineUse)
            ->where('is_reddem','1')
            ->first();
        if ($UserProfile) {
            return $this->errorMessage('คุณได้ทำการ IsRedeem แล้ว ทดลอง');
        }

        $shop = Shop::where('is_active',1)->first();
        if ($lineUserProfile) {
            $user = Customer::where('line_user_id',$lineUserProfile->id)->first();
            if(!$user) {
                Customer::create([
                    'line_user_id' => $lineUserProfile->id,
                    'shop_id' => $shop->id,
                ]);
            }
        } else {
            return $this->errorLineLogin();
        }
        
            $UserProfile = Customer::where('line_user_id',$lineUserProfile->id)->first();
            if (!$UserProfile->activeShop()) {
                return $this->errorLineLogin();
            }

            return view('mt.promotions.first')
            ->with('UserProfile',$UserProfile)
            ->with('points_rule',Customer::RULE_REDEEM);
    }

    public function second(Request $request)
    {
        
        $UserProfile = Customer::where('id',$request->id)
            ->where('line_user_id',$request->line_user_id)
            ->first();

        if (!$UserProfile->activeShop()) {
            return $this->errorLineLogin();
        }
                
        if ($UserProfile) {
            if ($UserProfile->total_stamp >= Customer::RULE_REDEEM) {
                return view('mt.promotions.second')
                    ->with('UserProfile',$UserProfile);
            } else {
                return redirect()->action($this->ControllerIndex);
            }
        } else {
                return $this->errorLineLogin();
        }
                
    }


    public function thank(Request $request)
    {
        if (session()->get($this->nameSession())) {
            $getSession = $this->getSession();
        }else {
            return $this->errorMessage('คุณไม่สามารถเข้ารับของรางวัลได้ เนื่องจากไม่พบเงื่อนไข');
        }
        
        if ($getSession['isthank'] == true) {
            $this->setSession('isthank','false']);
            return view($this->viewThankpage);
        }else {
            return $this->errorMessage('คุณไม่สามารถเข้ารับของรางวัลได้ เนื่องจากไม่พบเงื่อนไข');
        }
        
    } //end func thank

}
