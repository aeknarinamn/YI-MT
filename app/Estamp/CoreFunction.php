<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;
use YellowProject\Estamp\Estamp;
use YellowProject\Estamp\EstampCustomer;
use YellowProject\Estamp\EstampCustomerItem;
use YellowProject\Estamp\EstampCustomerRecieveReward;
use YellowProject\Estamp\EstampReward;
use YellowProject\MT\RegisterEstampData;

class CoreFunction extends Model
{
    public static function addStamp($lineUserProfile,$code,$type)
    {
    	$estamp = Estamp::where('is_active',1)->first();
    	self::deActiveEstamp($lineUserProfile,$estamp);
    	$estampCustomer = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
    	if(!$estampCustomer){
    		$estampCustomer = EstampCustomer::create([
    			'estamp_id' => $estamp->id,
    			'line_user_id' => $lineUserProfile->id,
    			'status' => 'active'
    		]);
    	}
    	$estampCustomerItems = $estampCustomer->estampCustomerItems;
    	$countSeq = $estampCustomerItems->count();
    	EstampCustomerItem::create([
    		'estamp_customer_id' => $estampCustomer->id,
    		'seq' => $countSeq++,
            'code' => $code,
            'type' => $type,
            'store_ref' => $code,
    	]);

        $registerEstampData = RegisterEstampData::where('line_user_id',$lineUserProfile->id)->first();
        if($registerEstampData){
            $oldTotalStamp = $registerEstampData->total_stamp_collect;
            $oldTotalActiveStamp = $registerEstampData->total_stamp_active;
            $newTotalStamp = 0;
            $newTotalActiveStamp = 0;
            if($oldTotalStamp != ''){
                $newTotalStamp = $oldTotalStamp+1;
            }else{
                $newTotalStamp = 1;
            }
            if($oldTotalActiveStamp != ''){
                $newTotalActiveStamp = $oldTotalActiveStamp+1;
            }else{
                $newTotalActiveStamp = 1;
            }
            $registerEstampData->update([
                'total_stamp_collect' => $newTotalStamp,
                'total_stamp_active' => $newTotalActiveStamp,
            ]);
        }
    }

    public static function deActiveEstamp($lineUserProfile,$estamp)
    {
    	$estampCustomer = EstampCustomer::where('estamp_id','<>',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active');
    	if($estampCustomer->count()){
    		$estampCustomer->update([
    			'status' => 'in-active'
    		]);
    	}
    }

    public static function recieveReward($lineUserProfile,$estamp,$numberStamp)
    {
        $estamp = Estamp::where('is_active',1)->first();
        $estampCustomer = EstampCustomer::where('estamp_id',$estamp->id)->where('line_user_id',$lineUserProfile->id)->where('status','active')->first();
        $estampCustomerItem = EstampCustomerItem::where('estamp_customer_id',$estampCustomer->id)->orderByDesc('created_at')->first();
        $estampReward = EstampReward::where('estamp_id',$estamp->id)->where('total_use_stamp',$numberStamp)->first();
        EstampCustomerRecieveReward::create([
            'line_user_id' => $lineUserProfile->id,
            'estamp_id' => $estamp->id,
            'stamp_amount' => $numberStamp,
            'reward' => $estampReward->reward_name,
            'store_ref' => $estampCustomerItem->store_ref
        ]);
        $estampCustomer->update([
            'status' => 'in-active'
        ]);
        $registerEstampData = RegisterEstampData::where('line_user_id',$lineUserProfile->id)->first();
        if($registerEstampData){
            $oldTotalActiveStamp = $registerEstampData->total_stamp_active;
            $newTotalActiveStamp = $oldTotalActiveStamp - $numberStamp;
            $registerEstampData->update([
                'total_stamp_active' => $newTotalActiveStamp,
            ]);
        }
    }

    public static function renewEstamp($lineUserProfile,$estamp)
    {
        $estamp = Estamp::where('is_active',1)->first();
        EstampCustomer::create([
            'estamp_id' => $estamp->id,
            'line_user_id' => $lineUserProfile->id,
            'status' => 'active'
        ]);
    }
}
