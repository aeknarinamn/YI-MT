<?php

namespace YellowProject\Http\Controllers\MT\Promotion\TOPS;

use YellowProject\Field;
use Illuminate\Http\Request;
use YellowProject\SubscriberItem;
use YellowProject\SubscriberLine;
use YellowProject\MT\Center\Center;
use YellowProject\Http\Controllers\Controller;
use YellowProject\Subscriber\SubscriberItemData;

class QuestionController extends Controller
{
    public function questionPage1()
    {
    	$field = Field::where('name','regular_purchase')->first();
    	$fieldItems = $field->fieldItems->chunk(2);
    	
        // Center::PAGE_TOPS_QUESTION = 'mt.promotions.TOPS.question.'
        // เป็นการกำหนดเส้นทางของ folder mt.promotions.TOPS.question
    	return view(Center::PAGE_TOPS_QUESTION.'page-1')
    		->with('fieldItems',$fieldItems);
    }

    public function questionPage1Store(Request $request)
    {
    	$field = Field::where('name','regular_purchase')->first();
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
    	$subscriberItem = SubscriberItem::where('subscriber_line_id',$subscriberId)->where('field_id',$field->id)->first();
    	if($subscriberItem){
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
    	return view(Center::PAGE_TOPS_QUESTION.'page-2');
    }
}
