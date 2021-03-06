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
use YellowProject\MT\Shop\Shop;
use YellowProject\Richmenu\Richmenu;
use YellowProject\Richmenu\CoreFunction;

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
        $this->ControllerPage1 = 'MT\Promotion\TOPS\QuestionController@questionPage1';
        $this->ControllerPage2 = 'MT\Promotion\TOPS\QuestionController@questionPage2';
        $this->publicPath = '/mt/promotions/TOPS/';
        $this->testLineUse = 6;
    }

    public function questionPage1()
    {
        $lineUserProfile = \Session::get('line-login', "");

        $UserProfileCheck = Customer::where('line_user_id',$lineUserProfile->id)
            ->where('is_active','1')
            ->first();
        if ($UserProfileCheck) {
            if($UserProfileCheck->shop_id != 1){
                setcookie('remember-page', "/mt-question-1", time() + (86400 * 1), "/");
                return view('mt.promotions.TOPS.change-shop-tops')
                    ->with('lineUserId',$lineUserProfile->id);
            }
        }

        $UserProfile = Customer::where('line_user_id',$lineUserProfile->id)
            ->where('is_use_coupon','1')
            ->first();
        if ($UserProfile) {
            return redirect()->action($this->ControllerAddBarcode); 
        }



        $field = $this->fieldPage1;
    	$fieldItems = $field->fieldItems->chunk(2);

        $question2 = $this->fieldPage2;
        $question2Items = $question2->fieldItems;


        $subLine = SubscriberLine::where('subscriber_id',$field->subscriber_id)
            ->where('line_user_id',$lineUserProfile->id)
            ->first();
        if($subLine) {
            $factSub = SubscriberItem::where('subscriber_line_id',$subLine->id)->first();
        }
        

        if (isset($factSub)) {
            $SubscriberItemData = SubscriberItemData::where('subscriber_id',$factSub->id)->first();
        }else {
            $SubscriberItemData = 0;
        }

        if ($SubscriberItemData) {
            return redirect()->action($this->ControllerAddCoupon)->with('line_user_id',$lineUserProfile->id);
        }

        $shop = Shop::find(1);
        $richmenu = Richmenu::find($shop->richmenu_id);
        CoreFunction::linkRichmenu($richmenu,$lineUserProfile->mid);
        
    	return view($this->viewPage1)
            ->with('fieldItems',$fieldItems)
            ->with('question2Items',$question2Items)
    		->with('lineUserProfile',$lineUserProfile->id);
    }

    public function questionPage1Store(Request $request)
    {
        // dd( $request->line_user_id);
        $UserProfile = Customer::where('line_user_id',$request->line_user_id)
            ->where('is_use_coupon','0')
            ->first();
        if (!$UserProfile) {
            return $this->errorMessage("กรุณากลับไปหน้า Login"); 
        }

    	$field = $this->fieldPage1;
        $field2 = $this->fieldPage2;
    	$subscriberId = $field->subscriber_id;
    	$line_user_id = $request->line_user_id;

        $UserLine = Customer::where('line_user_id',$line_user_id)
            ->where('is_use_coupon','1')
            ->first();
        if ($UserLine) {
            return $this->errorMessage('ท่านได้ทำการ is_use_coupon แล้ว'); 
        }

    	$subscriberLine = SubscriberLine::where('subscriber_id',$subscriberId)
            ->where('line_user_id',$line_user_id)
            ->first();
    	if(!$subscriberLine){
    		$subscriberLine = SubscriberLine::create([
    			'subscriber_id' => $subscriberId,
    			'line_user_id' => $line_user_id
    		]);
    	}else{
    		$subscriberLine->update([
    			'updated_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
    		]);
    	}

    	$subscriberItem = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)
            ->where('field_id',$field->id)
            ->first();
    	if($subscriberItem){
            return $this->errorMessage('พบว่ามีการบันทึกข้อมูลแล้ว');

    	}else{
    		$subscriberItem = SubscriberItem::create([
	    		'subscriber_line_id' => $subscriberLine->id,
	    		'field_id' => $field->id
	    	]);
    	}

        $this->validate(request(), [
            'value' => 'required',
            'values' => 'required',
        ]);
    	
    	foreach ($request->values as $key => $value) {
    		SubscriberItemData::create([
    			'subscriber_id' => $subscriberItem->id,
    			'value' => $value
    		]);
    		
    	}

        $subscriberItem2 = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)
            ->where('field_id',$field2->id)
            ->first();
        if(!$subscriberItem2){
            $subscriberItem2 = SubscriberItem::create([
                'subscriber_line_id' => $subscriberLine->id,
                'field_id' => $field2->id
            ]);
        }
        
        SubscriberItemData::create([
            'subscriber_id' => $subscriberItem2->id,
            'value' => $request->value
        ]);

            return redirect()->action($this->ControllerAddCoupon)->with('line_user_id',$line_user_id);
        
    }



    public function addcoupon()
    {
        $line_user_id = session()->get( 'line_user_id' );
        if (!$line_user_id) {
            return redirect()->action($this->ControllerPage1); 
        }
        $UserProfile = Customer::where('line_user_id',$line_user_id)
            ->where('is_use_coupon','0')
            ->first();
            if (!$UserProfile) {
                return redirect()->action($this->ControllerPage1); 
            }
        return view($this->viewAddCoupon)
            ->with('publicPath',$this->publicPath)
            ->with('line_user_id',$line_user_id);
    }

    public function addbarcode()
    {
        return view($this->viewAddBarcode)
            ->with('publicPath',$this->publicPath);
    }

    public function checkSubscriber(Request $request)
    {  
        // dd($request->all()); 
        $UserProfile = Customer::where('line_user_id',$request->line_user_id)
            ->where('is_use_coupon','0')
            ->first();
            if (!$UserProfile) {
                return redirect()->action($this->ControllerPage1); 
                // return $this->errorMessage('กรุณากลับไปหน้า login');
            }else{
                $UserProfile->is_use_coupon = '1';
                $UserProfile->save();
            }

       return redirect()->action($this->ControllerAddBarcode);   
    } // ------  / checkSubscriber 

}


            // $subscriberItemDatas = $subscriberItem->subscriberItemDatas;
            // foreach ($subscriberItemDatas as $key => $subscriberItemData) {
            //  $subscriberItemData->delete();
            // }