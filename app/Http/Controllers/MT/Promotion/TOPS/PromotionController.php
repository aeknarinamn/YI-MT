<?php

namespace YellowProject\Http\Controllers\MT\Promotion\TOPS;

use Illuminate\Http\Request;
use YellowProject\MT\Shop\Shop;
use YellowProject\MT\Customer\Customer;
use YellowProject\Http\Controllers\MainController;
use YellowProject\Richmenu\Richmenu;
use YellowProject\Richmenu\CoreFunction;

class PromotionController extends MainController
{
    protected $points;

    public function __construct()
    {
        $this->points = 110;
        $this->ControllerIndex = 'MT\Promotion\TOPS\PromotionController@index';
        $this->ViewThankpage = 'mt.promotions.TOPS.thankpage';
    }

    public function index()
    {
       return view('mt.promotions.TOPS.index');
    }

    public function first()
    {
        setcookie('remember-page', "/promotions_first", time() + (86400 * 1), "/");
        $lineUserProfile = \Session::get('line-login', "");
        $shop = Shop::find(1);
        // dd($lineUserProfile);
        $UserProfile = Customer::where('line_user_id',$lineUserProfile->id)
            ->where('is_active','1')
            ->first();
        if ($UserProfile) {
            if($UserProfile->shop_id != 1){
                return view('mt.promotions.TOPS.change-shop-tops')
                    ->with('lineUserId',$lineUserProfile->id);
            }
            // return $this->royalMessage('User นี้ได้ทำการแลกของรางวัลแล้ว','ยูนิลีเวอร์โปรคุ้ม'); 
        }

        if ($lineUserProfile) {
            $user = Customer::where('line_user_id',$lineUserProfile->id)->where('is_active','1')->where('shop_id',1)->first();
            if(!$user) {
               $UserProfile = Customer::create([
                    'line_user_id' => $lineUserProfile->id,
                    'shop_id' => $shop->id,
                    'is_active' => '1',
                ]);
            }
        } else {
            return $this->errorLineLogin();
        }

            // $UserProfile = Customer::where('line_user_id',$lineUserProfile->id)->first();
            if (!$UserProfile->activeShop()) {
                return $this->errorLineLogin();
            }

            $richmenu = Richmenu::find($shop->richmenu_id);
            CoreFunction::linkRichmenu($richmenu,$lineUserProfile->mid);

            return view('mt.promotions.TOPS.first')
            ->with('UserProfile',$UserProfile)
            ->with('points_rule',Customer::RULE_REDEEM);
    }

    public function second(Request $request)
    {
        
        $UserProfile = Customer::where('id',$request->id)
            ->where('shop_id',1)
            ->where('is_active',1)
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
                return redirect()->action($this->ControllerIndex);
            }
        } else {
                return $this->errorLineLogin();
        }
                
    }

    // public function confirm(Request $request)
    // {
    //     if ($this->points >= Customer::RULE_REDEEM) {
    //         if ($request->has('confirm')) {
    //             if ($request->confirm == 'confirm') {
    //                 $total_point = $this->points-Customer::RULE_REDEEM;
    //                 return redirect()->action('MT\Promotion\TOPS\PromotionController@thank')
    //                     ->with('point',$total_point);
    //             } else{
    //                 return redirect()->action('MT\Promotion\TOPS\PromotionController@index');$lineUserProfile = \Session::get('line-login', "");
    //     $shop = Shop::where('is_active',1)->first();
    //     if ($lineUserProfile) {
    //         $user = Customer::where('line_user_id',$lineUserProfile->id)->first();
    //         if(!$user) {
    //             Customer::create([
    //                 'line_user_id' => $lineUserProfile->id,
    //                 'shop_id' => $shop->id,
    //             ]);
    //         }
    //     } else {
    //         return $this->errorLineLogin();
    //     }
    //             }
    //         }
    //     } else {
    //         return redirect()->action('MT\Promotion\TOPS\PromotionController@index');
    //     }
        
    // } //end func confirm

    public function thank(Request $request)
    {
        if (session()->get($this->nameSession())) {
            $getSession = $this->getSession();
        }else {
            return $this->royalMessage('คุณไม่สามารถเข้ารับของรางวัลได้ เนื่องจากไม่พบเงื่อนไข');
        }
        
        if ($this->getSession()['isthank'] == true) {
            $this->delSession();
            return view($this->ViewThankpage);
        }else {
            return $this->royalMessage('คุณไม่สามารถเข้ารับของรางวัลได้ เนื่องจากไม่พบเงื่อนไข');
        }
        
    } //end func thank

}
