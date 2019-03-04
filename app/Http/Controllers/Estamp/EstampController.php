<?php

namespace YellowProject\Http\Controllers\Estamp;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\Estamp\Estamp;
use YellowProject\RTD\ShopperRegisterData;
use YellowProject\RTD\RTDRegisterData;
use YellowProject\Estamp\CoreFunction;
use YellowProject\Estamp\EstampCustomer;
use YellowProject\Estamp\EstampCustomerRecieveReward;
use YellowProject\LineUserProfile;
use Carbon\Carbon;

class EstampController extends Controller
{
	public function estampPage()
	{
		$datas = [];
		$estamp = Estamp::where('is_active',1)->first();
		$dateNow = Carbon::now();
		$endDate = Carbon::parse($estamp->end_date);
		$length = $endDate->diffInDays($dateNow);
		$splitLengths = str_split($length);

		$lineUserProfile = \Session::get('lineUserProfile', '');
		\Session::put('lineUserProfile', '');
		if(!$lineUserProfile){
            return view('estamp.custom-error')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
        $RTDRegisterData = RTDRegisterData::where('line_user_id',$lineUserProfile->id)->first();
        if($RTDRegisterData){
        	return view('estamp.custom-error')
                ->with('error','เจ้าของร้านค้าติดดาวไม่สามารถร่วมสนุกได้');
        }
        $shopperRegisterData = ShopperRegisterData::where('line_user_id',$lineUserProfile->id)->first();
        if(!$shopperRegisterData){
        	return view('estamp.custom-error')
                ->with('error','กรุณาลงทะเบียนกับร้านค้าติดดาวใกล้เคียงของท่าน');
        }
        $estampCustomerActive = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
        if(!$estampCustomerActive){
        	return view('estamp.finish-recieve-reward')
	    		->with('estamp',$estamp)
	    		->with('lineUserProfile',$lineUserProfile);
        }
		$estampCustomer = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
		$estampCustomerItems = collect();
		if($estampCustomer){
			$estampCustomerItems = $estampCustomer->estampCustomerItems;
		}
		$estampImages = $estamp->estampImages->toArray();
		$row = 0;
		$column = 0;
		$stamp = 0;
		$customerStampCount = $estampCustomerItems->count();
		for ($i=0; $i < $estamp->total_stamp; $i++) {
			if(count($estampImages) == $stamp){
				$stamp = 0;
			}
			if($column == $estamp->total_column){
				$column = 0;
				$row++;
			}
			if($customerStampCount > 0){
				$estampImages[$stamp]['customer_stamp_active'] = 1;
			}else{
				$estampImages[$stamp]['customer_stamp_active'] = 0;
			}
			$datas[$row][$column] = $estampImages[$stamp];

			
			$stamp++;
			$column++;
			if($customerStampCount > 0){
				$customerStampCount--;
			}
		}

    	return view('estamp.estamp')
    		->with('splitLengths',$splitLengths)
    		->with('stamps',$datas)
    		->with('estamp',$estamp)
    		->with('customerStampCount',$estampCustomerItems->count())
    		->with('lineUserProfile',$lineUserProfile);
	}

	public function getStamp(Request $request,$code)
	{
		$lineUserProfile = \Session::get('lineUserProfile', '');
		\Session::put('lineUserProfile', '');
		if(!$lineUserProfile){
            return view('estamp.custom-error')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
		$shopperRegisterData = ShopperRegisterData::where('line_user_id',$lineUserProfile->id)->first();
		if(!$shopperRegisterData){
        	return view('estamp.custom-error')
                ->with('error','กรุณาลงทะเบียนกับร้านค้าติดดาวใกล้เคียงของท่าน');
        }
        $RTDRegisterData = $shopperRegisterData->RTD;
        if($RTDRegisterData->code != $code){
        	return view('estamp.custom-error')
                ->with('error','ท่านไม่ได้ลงทะเบียนกับร้านค้าติดดาวนี้');
        }
        CoreFunction::addStamp($lineUserProfile);
        \Session::put('lineUserProfile', $lineUserProfile);

        return redirect()->action('Estamp\EstampController@estampPage');
	}

	public function recieveReward(Request $request)
	{
		// EstampCustomerRecieveReward::
		$lineUserProfile = LineUserProfile::find($request->line_user_id);
		if(!$lineUserProfile){
            return view('estamp.custom-error')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
		$estamp = Estamp::find($request->estamp_id);
		CoreFunction::recieveReward($lineUserProfile,$estamp);

		\Session::put('lineUserProfile', $lineUserProfile);
		return redirect()->action('Estamp\EstampController@estampPage');
	}

	public function renewEstamp(Request $request)
	{
		$lineUserProfile = LineUserProfile::find($request->line_user_id);
		if(!$lineUserProfile){
            return view('estamp.custom-error')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
		$estamp = Estamp::find($request->estamp_id);
		CoreFunction::renewEstamp($lineUserProfile,$estamp);

		\Session::put('lineUserProfile', $lineUserProfile);
		return redirect()->action('Estamp\EstampController@estampPage');
	}
}
