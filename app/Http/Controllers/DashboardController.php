<?php

namespace YellowProject\Http\Controllers;

use Illuminate\Http\Request;
use YellowProject\LineUserProfile;

class DashboardController extends Controller
{
 
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }
 
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $type = $request->type;
        
        $lineUser = \Session::get('line-login', '');
        if($lineUser == ""){
            return view('errors.404');
        }
        $lineUserProfile = LineUserProfile::where('mid',$lineUser->mid)->first();

        if($type == 'leadform'){
            return redirect()->action('ProfillingController@show',['route' => 'preference']);
        }
        
        if($type == 'bc_tracking'){
           $code = \Session::get('tracking_bc_code', '');
           \Session::put('tracking_bc_code', '');
           return redirect()->action('RecieveTrackingBCController@recieveCode',['code' => $code]);
           // dd($code);
        }

        //////////////////////////////////RTD/////////////////////////////////////
        if($type == 'rtd_dt'){
           $code = \Session::get('rtd_dt_code', '');
           \Session::put('rtd_dt_code', '');
           return redirect()->action('RTD\RecieveDTController@recieveCode',['code' => $code]);
        }
        if($type == 'rtd_register'){
           $code = \Session::get('rtd_register_code', '');
           \Session::put('rtd_register_code', '');
           return redirect()->action('RTD\RecieveRTDController@recieveCode',['code' => $code]);
        }
        if($type == 'rtd_master'){
           $code = \Session::get('rtd_master_code', '');
           \Session::put('rtd_master_code', '');
           return redirect()->action('RTD\RecieveRTDController@recieveMasterCode');
        }
        if($type == 'shopper_register'){
           $code = \Session::get('shopper_register_code', '');
           \Session::put('shopper_register_code', '');
           return redirect()->action('RTD\RecieveShopperController@recieveCode',['code' => $code]);
        }
        /////////////////////////////////////////////////////////////////////////

        //////////////////////////////////Estamp/////////////////////////////////////
        if($type == 'get_estamp'){
           \Session::put('lineUserProfile', $lineUserProfile);
           $code = \Session::get('rtd_code', '');
           \Session::put('rtd_code', '');
           return redirect()->action('Estamp\EstampController@getStamp',['code' => $code]);
        }
        if($type == 'estamp'){
           \Session::put('lineUserProfile', $lineUserProfile);
           return redirect()->action('Estamp\EstampController@estampPage');
        }
        /////////////////////////////////////////////////////////////////////////////

        //////////////////////////////////MT Register/////////////////////////////////////
        
        /////////////////////////////////////////////////////////////////////////////
    }
}
