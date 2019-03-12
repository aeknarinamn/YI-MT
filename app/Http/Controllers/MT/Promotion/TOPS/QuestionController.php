<?php

namespace YellowProject\Http\Controllers\MT\Promotion\TOPS;

use YellowProject\Field;
use Illuminate\Http\Request;
use YellowProject\SubscriberItem;
use YellowProject\SubscriberLine;
use YellowProject\MT\Center\Center;
use YellowProject\MT\Customer\Customer;
use YellowProject\Subscriber\SubscriberItemData;
use YellowProject\Http\Controllers\MainController;

class QuestionController extends MainController
{
    public function __construct()
    {
        $this->fieldPage1 = Field::where('name','regular_purchase')->first();
        $this->fieldPage2 = Field::where('name','pruchase_per_time')->first();
        $this->viewPage1 = 'mt.promotions.TOPS.question.page-1';
        $this->viewPage2 = 'mt.promotions.TOPS.question.page-2';
        $this->viewAddCoupon = 'mt.promotions.TOPS.question.add-coupon';
        $this->viewAddBarcode = 'mt.promotions.TOPS.question.barcode-coupon';
        $this->ControllerAddCoupon = 'MT\Promotion\TOPS\QuestionController@addcoupon';
        $this->ControllerAddBarcode = 'MT\Promotion\TOPS\QuestionController@addbarcode';
        $this->publicPath = '/mt/promotions/TOPS/';
    }

    public function questionPage1()
    {
        // $lineUserProfile = \Session::get('line-login', "");
        $lineUserProfile = 6;
        // $UserProfile = Customer::where('line_user_id',$request->line_user_id)
        $UserProfile = Customer::where('line_user_id',$lineUserProfile)
            ->where('is_use_coupon','1')
            ->first();
        if ($UserProfile) {
            return redirect()->action($this->ControllerAddBarcode); 
        }

        $field = $this->fieldPage1;
    	$fieldItems = $field->fieldItems->chunk(2);

    	return view($this->viewPage1)
    		->with('fieldItems',$fieldItems);
    }

    public function questionPage1Store(Request $request)
    {
    	$field = $this->fieldPage1;
    	$subscriberId = $field->subscriber_id;
    	$lineUserId = $request->line_user_id;
    	$subscriberLine = SubscriberLine::where('subscriber_id',$subscriberId)->where('line_user_id',$lineUserId)->first();
    	if(!$subscriberLine){
    		$subscriberLine = SubscriberLine::create([
    			'subscriber_id' => $subscriberId,
    			'line_user_id' => $lineUserId
    		]);
    	}else{
    		$subscriberLine->update([
    			'updated_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
    		]);
    	}
        $line_user_id = $subscriberLine->line_user_id;
    	$subscriberItem = SubscriberItem::where('subscriber_line_id',$line_user_id)->where('field_id',$field->id)->first();
    	if($subscriberItem){
            return $this->errorMessage('พบว่ามีการบันทึกข้อมูลแล้ว');
    		$subscriberItemDatas = $subscriberItem->subscriberItemDatas;
    		foreach ($subscriberItemDatas as $key => $subscriberItemData) {
    			$subscriberItemData->delete();
    		}
    	}else{
    		$subscriberItem = SubscriberItem::create([
	    		'subscriber_line_id' => $subscriberLine->id,
	    		'field_id' => $field->id
	    	]);
    	}
    	
    	foreach ($request->values as $key => $value) {
    		SubscriberItemData::create([
    			'subscriber_id' => $subscriberItem->id,
    			'value' => $value
    		]);
    		
    	}
    }

    public function questionPage2()
    {
        $fields = $this->fieldPage2;
        $fieldItems = $fields->fieldItems;
        return view($this->viewPage2)
            ->with('fieldItems',$fieldItems);
    }

    public function questionPage2Store(Request $request)
    {
        $field = $this->fieldPage2;
        $subscriberId = $field->subscriber_id; // = 1 => QUESTIONARE
        $lineUserId = $request->line_user_id;  // test = 1
        $subscriberLine = SubscriberLine::where('subscriber_id',$subscriberId)->where('line_user_id',$lineUserId)->first();
        if(!$subscriberLine){
            $subscriberLine = SubscriberLine::create([
                'subscriber_id' => $subscriberId,
                'line_user_id' => $lineUserId
            ]);
        }else{
            $subscriberLine->update([
                'updated_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }

        $subscriberItem = SubscriberItem::where('subscriber_line_id',$subscriberId)->where('field_id',$field->id)->first();
        if($subscriberItem){
            // return $this->errorMessage('พบว่ามีการบันทึกข้อมูลแล้ว');
            $subscriberItemDatas = $subscriberItem->subscriberItemDatas;
            foreach ($subscriberItemDatas as $subscriberItemData) {
                $subscriberItemData->delete();
            }
        }else{
            $subscriberItem = SubscriberItem::create([
                'subscriber_line_id' => $subscriberLine->id,
                'field_id' => $field->id
            ]);
        }
        
            SubscriberItemData::create([
                'subscriber_id' => $subscriberItem->id,
                'value' => $request->value
            ]);
            
        return redirect()->action($this->ControllerAddCoupon)->with('lineUserId',$lineUserId);
    }

    public function addcoupon()
    {
        $line_user_id = session()->get( 'lineUserId' );
        $UserProfile = Customer::where('line_user_id',$line_user_id)
            ->where('is_use_coupon','0')
            ->first();
            if (!$UserProfile) {
                return $this->errorMessage('กรุณากลับไปหน้า login');
            }else{
                $UserProfile->is_use_coupon = '1';
                $UserProfile->save();
            }
        return view($this->viewAddCoupon)
            ->with('publicPath',$this->publicPath);
    }

    public function addbarcode()
    {
        return view($this->viewAddBarcode)
            ->with('publicPath',$this->publicPath);
    }

    public function checkSubscriber(Request $request)
    {   
        $UserProfile = Customer::where('line_user_id',$request->line_user_id)
            ->where('is_use_coupon','0')
            ->first();
            if (!$UserProfile) {
                return $this->errorMessage('กรุณากลับไปหน้า login');
            }else{
                $UserProfile->is_use_coupon = '1';
                $UserProfile->save();
            }

       return redirect()->action($this->ControllerAddBarcode);   
    } // ------  / checkSubscriber 

}
