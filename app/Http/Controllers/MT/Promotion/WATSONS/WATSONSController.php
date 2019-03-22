<?php

namespace YellowProject\Http\Controllers\MT\Promotion\WATSONS;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\MT\Customer\Customer;
use YellowProject\Field;
use YellowProject\Subscriber;
use YellowProject\SubscriberLine;
use YellowProject\SubscriberItem;
use YellowProject\Subscriber\SubscriberCategory;
use YellowProject\Subscriber\SubscriberItemData;

class WATSONSController extends Controller
{
    public function questionLotionPage()
    {
    	setcookie('remember-page', "/mt/watsons/question-lotion", time() + (86400 * 1), "/");
    	$lineUserProfile = \Session::get('line-login', "");
    	// $lineUserProfile = \YellowProject\LineUserProfile::first();
    	$subscriber = Subscriber::where('name','WATSONS-QUESTIONARE-1')->first();
    	$customer = Customer::where('line_user_id',$lineUserProfile->id)->where('is_active',1)->first();

    	if($customer){
    		if($customer->shop_id != 2){
    			return view('mt.promotions.WATSONS.change-shop-watsons')
                    ->with('lineUserId',$lineUserProfile->id);
    			// abort(404);
    		}
    	}else{
    		$customer = Customer::create([
    			'line_user_id' => $lineUserProfile->id,
    			'shop_id' => 2,
    			'is_active'
    		]);
    	}

    	$subscriberLine = SubscriberLine::where('subscriber_id',$subscriber->id)->where('line_user_id',$lineUserProfile->id)->first();
    	if($subscriberLine){
    		$skintype = Field::where('subscriber_id',$subscriber->id)->where('name','skin_type')->first();
    		$lotionProperty = Field::where('subscriber_id',$subscriber->id)->where('name','lotion_properties')->first();
    		$checkFieldSubscriberSkinType = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$skintype->id)->first();
    		$checkFieldSubscriberlotionProperty = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$lotionProperty->id)->first();
    		if($checkFieldSubscriberSkinType && $checkFieldSubscriberlotionProperty){
    			setcookie('line-user-id', $lineUserProfile->id, time() + (86400 * 1), "/mt/watsons/coupon-lotion");
    			return redirect('/mt/watsons/coupon-lotion');
    		}
    	}else{
    		$subscriberLine = SubscriberLine::create([
    			'subscriber_id' => $subscriber->id,
    			'line_user_id' => $lineUserProfile->id
    		]);
    	}

    	return view('mt.promotions.WATSONS.question-lotion')
    		->with('subscriber',$subscriber)
    		->with('lineUserId',$lineUserProfile->id);
    }

    public function questionLotionStore(Request $request)
    {
    	$subscriberId = $request->subscriber_id;
    	$subscriber = Subscriber::find($subscriberId);

    	$subscriberLine = SubscriberLine::where('subscriber_id',$subscriber->id)->where('line_user_id',$request->line_user_id)->first();

    	if(!$subscriberLine){
    		$subscriberLine = SubscriberLine::create([
    			'subscriber_id' => $subscriber->id,
    			'line_user_id' => $lineUserProfile->id
    		]);
    		
    	}

    	$skintype = Field::where('subscriber_id',$subscriber->id)->where('name','skin_type')->first();
		$lotionProperty = Field::where('subscriber_id',$subscriber->id)->where('name','lotion_properties')->first();

		$checkFieldSubscriberSkinType = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$skintype->id)->first();
		if(!$checkFieldSubscriberSkinType){
			SubscriberItem::create([
				'subscriber_line_id' => $subscriberLine->id,
				'field_id' => $skintype->id,
				'value' => $request->skin_type
			]);
		}
		$checkFieldSubscriberlotionProperty = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$lotionProperty->id)->first();
		if(!$checkFieldSubscriberlotionProperty){
			$subscriberItem = SubscriberItem::create([
				'subscriber_line_id' => $subscriberLine->id,
				'field_id' => $lotionProperty->id
			]);

			foreach ($request->lotion_properties as $key => $value) {
				SubscriberItemData::create([
					'subscriber_id' => $subscriberItem->id,
					'value' => $value
				]);
			}
		}

		setcookie('line-user-id', $request->line_user_id, time() + (86400 * 1), "/mt/watsons/coupon-lotion");

		return redirect('/mt/watsons/coupon-lotion');
    }

    public function questionShampooPage()
    {
    	setcookie('remember-page', "/mt/watsons/question-shampoo", time() + (86400 * 1), "/");
    	$lineUserProfile = \Session::get('line-login', "");
    	// $lineUserProfile = \YellowProject\LineUserProfile::first();
    	$subscriber = Subscriber::where('name','WATSONS-QUESTIONARE-2')->first();
    	$customer = Customer::where('line_user_id',$lineUserProfile->id)->where('is_active',1)->first();

    	if($customer){
    		if($customer->shop_id != 2){
    			return view('mt.promotions.WATSONS.change-shop-watsons')
                    ->with('lineUserId',$lineUserProfile->id);
    		}
    	}else{
    		$customer = Customer::create([
    			'line_user_id' => $lineUserProfile->id,
    			'shop_id' => 2,
    			'is_active'
    		]);
    	}

    	$subscriberLine = SubscriberLine::where('subscriber_id',$subscriber->id)->where('line_user_id',$lineUserProfile->id)->first();
    	if($subscriberLine){
    		$hairtype = Field::where('subscriber_id',$subscriber->id)->where('name','hair_type')->first();
    		$shampooProperty = Field::where('subscriber_id',$subscriber->id)->where('name','shampoo_properties')->first();
    		$checkFieldSubscriberHairtype = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$hairtype->id)->first();
    		$checkFieldSubscriberShampooProperty = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$shampooProperty->id)->first();
    		if($checkFieldSubscriberHairtype && $checkFieldSubscriberShampooProperty){
    			setcookie('line-user-id', $lineUserProfile->id, time() + (86400 * 1), "/mt/watsons/coupon-shampoo");
    			return redirect('/mt/watsons/coupon-shampoo');
    		}
    	}else{
    		$subscriberLine = SubscriberLine::create([
    			'subscriber_id' => $subscriber->id,
    			'line_user_id' => $lineUserProfile->id
    		]);
    	}

    	return view('mt.promotions.WATSONS.question-shampoo')
    		->with('subscriber',$subscriber)
    		->with('lineUserId',$lineUserProfile->id);
    }

    public function questionShampooStore(Request $request)
    {
    	$subscriberId = $request->subscriber_id;
    	$subscriber = Subscriber::find($subscriberId);

    	$subscriberLine = SubscriberLine::where('subscriber_id',$subscriber->id)->where('line_user_id',$request->line_user_id)->first();

    	if(!$subscriberLine){
    		$subscriberLine = SubscriberLine::create([
    			'subscriber_id' => $subscriber->id,
    			'line_user_id' => $lineUserProfile->id
    		]);
    		
    	}

    	$hairtype = Field::where('subscriber_id',$subscriber->id)->where('name','hair_type')->first();
    	$shampooProperty = Field::where('subscriber_id',$subscriber->id)->where('name','shampoo_properties')->first();

		$checkFieldSubscriberHairtype = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$hairtype->id)->first();
		if(!$checkFieldSubscriberHairtype){
			SubscriberItem::create([
				'subscriber_line_id' => $subscriberLine->id,
				'field_id' => $hairtype->id,
				'value' => $request->hair_type
			]);
		}
		$checkFieldSubscriberShampooProperty = SubscriberItem::where('subscriber_line_id',$subscriberLine->id)->where('field_id',$shampooProperty->id)->first();
		if(!$checkFieldSubscriberShampooProperty){
			$subscriberItem = SubscriberItem::create([
				'subscriber_line_id' => $subscriberLine->id,
				'field_id' => $shampooProperty->id
			]);

			foreach ($request->shampoo_properties as $key => $value) {
				SubscriberItemData::create([
					'subscriber_id' => $subscriberItem->id,
					'value' => $value
				]);
			}
		}

		setcookie('line-user-id', $request->line_user_id, time() + (86400 * 1), "/mt/watsons/coupon-shampoo");

		return redirect('/mt/watsons/coupon-shampoo');
    }

    public function lotionCouponPage()
    {
    	if(!array_key_exists('line-user-id', $_COOKIE)){
    		abort(404);
    	}
    	setcookie('line-user-id', "", time() + 0, "/mt/watsons/coupon-lotion");
    	return view('mt.promotions.WATSONS.coupon-lotion');
    }

    public function shampooCouponPage()
    {
    	if(!array_key_exists('line-user-id', $_COOKIE)){
    		abort(404);
    	}
    	setcookie('line-user-id', "", time() + 0, "/mt/watsons/coupon-shampoo");
    	return view('mt.promotions.WATSONS.coupon-shampoo');
    }

    public function searchPage()
    {
    	setcookie('remember-page', "/mt/watsons/search-question", time() + (86400 * 1), "/");
    	$lineUserProfile = \Session::get('line-login', "");
    	$UserProfile = Customer::where('line_user_id',$lineUserProfile->id)
            ->where('is_active','1')
            ->first();
        if ($UserProfile) {
            if($UserProfile->shop_id != 2){
                return view('mt.promotions.WATSONS.change-shop-watsons')
                    ->with('lineUserId',$lineUserProfile->id);
            }
        }

    	return view('mt.promotions.WATSONS.search');
    }
}
