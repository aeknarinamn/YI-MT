<?php

namespace YellowProject\Http\Controllers\MT;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\Estamp\Estamp;
use YellowProject\Estamp\CoreFunction;
use YellowProject\Estamp\EstampCustomer;
use YellowProject\Estamp\EstampCustomerRecieveReward;
use YellowProject\Estamp\EstampReward;
use YellowProject\MT\RegisterEstampData;
use YellowProject\LineUserProfile;
use Carbon\Carbon;

class EstampController extends Controller
{
    public function estampPage()
    {
		$lineUserProfile = \Session::get('line-login', '');
		\Session::put('line-login', '');
		if(!$lineUserProfile){
            return view('mt.custom-error.index')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }

		$registerEstampData = RegisterEstampData::where('line_user_id',$lineUserProfile->id)->first();
		if(!$registerEstampData){
			return view('mt.register-u-fan-club.index')
				->with('code','Register')
				->with('lineUserProfile',$lineUserProfile);
		}

		$datas = [];
		$estamp = Estamp::where('is_active',1)->first();
		$dateNow = Carbon::now();
		$endDate = Carbon::parse($estamp->end_date);
		$length = $endDate->diffInDays($dateNow);
		$splitLengths = str_split($length);
        
        $estampCustomerActive = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
        if(!$estampCustomerActive){
        	return view('mt.thank-after-recieve-reward.index')
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

    	return view('mt.estamp.index')
    		->with('splitLengths',$splitLengths)
    		->with('stamps',$datas)
    		->with('estamp',$estamp)
    		->with('customerStampCount',$estampCustomerItems->count())
    		->with('lineUserProfile',$lineUserProfile);
    }

    public function storeRegisterData(Request $request)
    {
    	$lineUserProfile = LineUserProfile::find($request->line_user_id);
    	$code = $request->code;
    	if(!$lineUserProfile){
            return view('mt.custom-error.index')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
    	\Session::put('line-login', $lineUserProfile);
    	RegisterEstampData::create($request->all());
    	CoreFunction::addStamp($lineUserProfile,"","Welcome");
    	return view('mt.thank-after-register-estamp.index')
    		->with('lineUserProfile',$lineUserProfile);
    	// return redirect()->action('MT\EstampController@estampPage');
    }

    public function getStamp($code)
    {
    	$lineUserProfile = \Session::get('line-login', '');
		\Session::put('line-login', '');
		if(!$lineUserProfile){
            return view('mt.custom-error.index')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
        $registerEstampData = RegisterEstampData::where('line_user_id',$lineUserProfile->id)->first();
		if(!$registerEstampData){
			return view('mt.register-u-fan-club.index')
				->with('code',$code)
				->with('lineUserProfile',$lineUserProfile);
		}

		CoreFunction::addStamp($lineUserProfile,$code,"Store Visit");
		\Session::put('line-login', $lineUserProfile);
    	
    	return redirect()->action('MT\EstampController@estampPage');
    }

    public function chooseRewardPage(Request $request)
    {
    	$lineUserProfile = LineUserProfile::find($request->line_user_id);
    	if(!$lineUserProfile){
            return view('mt.custom-error.index')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
		$estamp = Estamp::where('is_active',1)->first();
		$estampCustomerActive = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
        if(!$estampCustomerActive){
        	\Session::put('lineUserProfile', $lineUserProfile);
			return redirect()->action('MT\EstampController@thankPage');
        }
		$estampCustomer = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
		$estampCustomerItems = collect();
		if($estampCustomer){
			$estampCustomerItems = $estampCustomer->estampCustomerItems;
		}
		if($estampCustomerItems->count() < 6){

		}
		$estampRewards = EstampReward::where('estamp_id',$estamp->id)->get();
		$countEstampReward = $estampRewards->count();

		return view('mt.get-reward.index')
			->with('estamp',$estamp)
			->with('customerStampCount',$estampCustomerItems->count())
			->with('lineUserProfile',$lineUserProfile)
			->with('estampRewards',$estampRewards)
			->with('countEstampReward',$countEstampReward);
    }

    public function getReward(Request $request)
    {
    	$numberStamp = $request->number_stamp;
    	$lineUserProfile = LineUserProfile::find($request->line_user_id);
    	if(!$lineUserProfile){
            return view('mt.custom-error.index')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
		$estamp = Estamp::find($request->estamp_id);
		$estampCustomerActive = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
        if(!$estampCustomerActive){
        	\Session::put('lineUserProfile', $lineUserProfile);
			return redirect()->action('MT\EstampController@thankPage');
        }
		CoreFunction::recieveReward($lineUserProfile,$estamp,$numberStamp);
		$registerEstampData = RegisterEstampData::where('line_user_id',$lineUserProfile->id)->first();
		if($registerEstampData){
			$customerStampCount = $request->customer_count_stamp;
			$collectStamp = $customerStampCount - $numberStamp;
			$registerEstampData->update([
				'stamp_collect' => $collectStamp
			]);
		}

		\Session::put('lineUserProfile', $lineUserProfile);
		return redirect()->action('MT\EstampController@thankPage');
    }

    public function thankPage()
    {
    	$lineUserProfile = \Session::get('lineUserProfile', '');
		\Session::put('line-login', '');
		if(!$lineUserProfile){
            return view('mt.custom-error.index')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
		$estamp = Estamp::where('is_active',1)->first();

		return view('mt.thank-after-recieve-reward.index')
    		->with('estamp',$estamp)
    		->with('lineUserProfile',$lineUserProfile);
    }

    public function renewEstamp(Request $request)
	{
		$type = "CARRY";
		$lineUserProfile = LineUserProfile::find($request->line_user_id);
		if(!$lineUserProfile){
            return view('mt.custom-error.index')
                ->with('error','ไม่พบข้อมูล LineUser ของท่าน');
        }
		$estamp = Estamp::find($request->estamp_id);
		CoreFunction::renewEstamp($lineUserProfile,$estamp);
		$registerEstampData = RegisterEstampData::where('line_user_id',$lineUserProfile->id)->first();
		if($registerEstampData){
			$code = "SYSTEM";
			$collectStamp = $registerEstampData->stamp_collect;
			if($collectStamp != '' && $collectStamp > 0){
				for ($i=0; $i < $collectStamp; $i++) { 
					CoreFunction::addStamp($lineUserProfile,$code,$type);
				}
			}
			$registerEstampData->update([
				'stamp_collect' => 0
			]);
		}

		\Session::put('line-login', $lineUserProfile);
		return redirect()->action('MT\EstampController@estampPage');
	}
}
