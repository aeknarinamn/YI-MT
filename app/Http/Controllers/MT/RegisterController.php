<?php

namespace YellowProject\Http\Controllers\MT;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\MT\RegisterData;
use YellowProject\LineUserProfile;
use YellowProject\Estamp\CoreFunction as EstampCoreFunction;

class RegisterController extends Controller
{
    public function registerPage()
    {
    	$authUser = \Session::get('line-login', '');
    	\Session::put('line-login', '');
        if(!$authUser){
            return view('mt.custom-error-2.index')
                ->with('error','*พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    	$registerData = RegisterData::where('line_user_id',$authUser->id)->first();
    	if($registerData){
    		\Session::put('line-login', $authUser);
    		return redirect()->action('MT\RegisterController@thankPage');
    	}

    	return view('mt.register.index')
    		->with('lineUserProfile',$authUser);
    }

    public function registerStampPage()
    {
    	$authUser = \Session::get('line-login', '');
    	\Session::put('line-login', '');
        if(!$authUser){
            return view('mt.custom-error-2.index')
                ->with('error','*พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    	$registerData = RegisterData::where('line_user_id',$authUser->id)->first();
    	if($registerData){
    		\Session::put('line-login', $authUser);
    		return redirect()->action('MT\RegisterController@thankPage');
    	}

    	return view('mt.register-stamp.index')
    		->with('lineUserProfile',$authUser);
    }

    public function storeDataRegister(Request $request)
    {
    	$lineUserProfile = LineUserProfile::find($request->line_user_id);
        if(!$lineUserProfile){
            return view('mt.custom-error-2.index')
                ->with('error','*พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    	RegisterData::create($request->all());

    	return view('mt.get-coupon.index')
    		->with('lineUserProfile',$lineUserProfile);
    }

    public function storeDataRegisterStamp(Request $request)
    {
    	$lineUserProfile = LineUserProfile::find($request->line_user_id);
        if(!$lineUserProfile){
            return view('mt.custom-error-2.index')
                ->with('error','*พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    	RegisterData::create($request->all());
    	EstampCoreFunction::addStamp($lineUserProfile);

        \Session::put('line-login', $lineUserProfile);
        return redirect()->action('MT\RegisterController@getStampPage');

    	// return view('mt.get-stamp.index')
    	// 	->with('lineUserProfile',$lineUserProfile);
    }

    public function getStampPage()
    {
        $authUser = \Session::get('line-login', '');
        \Session::put('line-login', '');
        if(!$authUser){
            return view('mt.custom-error-2.index')
                ->with('error','*พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }

        return view('mt.get-stamp.index')
            ->with('lineUserProfile',$authUser);
    }

    public function thankPage()
    {
    	$authUser = \Session::get('line-login', '');
    	\Session::put('line-login', '');
        if(!$authUser){
            return view('mt.custom-error-2.index')
                ->with('error','*พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }

    	return view('mt.thank-after-register.index')
    		->with('lineUserProfile',$authUser);
    }
}
