<?php

namespace YellowProject\Http\Controllers\MT\Promotion\TOPS;

use Illuminate\Http\Request;
use YellowProject\MT\Shop\Shop;
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
       return view('mt.promotions.TOPS.index');
    }

    public function first()
    {   
        $lineUserProfile = \Session::get('line-login', "");
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

            return view('mt.promotions.TOPS.first')
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
                return view('mt.promotions.TOPS.second')
                    ->with('UserProfile',$UserProfile);
            } else {
                return redirect()->action('MT\Promotion\PromotionController@index');
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
        
        if ($this->getSession()['isthank'] == true) {
            $this->delSession();
            return view('mt.promotions.TOPS.thankpage');
        }else {
            return $this->errorMessage('คุณไม่สามารถเข้ารับของรางวัลได้ เนื่องจากไม่พบเงื่อนไข');
        }
        
    } //end func thank

}
