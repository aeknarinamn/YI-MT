<?php

namespace YellowProject\LineFunction;

use Illuminate\Database\Eloquent\Model;
use Log;
use YellowProject\LineWebHooks;
use YellowProject\GreetingMessage;
use YellowProject\LineUserProfile;
use YellowProject\ChatMain;
use YellowProject\GeneralFunction\CoreFunction;
use YellowProject\MT\Customer\Customer;
use Carbon\Carbon;

class LineCoreFunction extends Model
{
    public static function lineWebhookCoreFunction($header,$body,$dateNow = null)
    {
    	$now = Carbon::now();
        $dateNowStart = ($dateNow != null)? $dateNow : null;

        try  {
	    	$mid = $body['events'][0]['source']['userId'];
	    	$type = $body['events'][0]['type'];
	        $lineUserProfile = LineWebHooks::storeLineUserProfile($mid);
	        // $userProfile = GreetingMessage::getUserProfile($mid);
	        $lineUserProfile = LineUserProfile::where('mid',$mid)->first();

	        if($type == 'unfollow'){
	            Log::debug('unfollow');
	            if($lineUserProfile->first_un_follow_date == ''){
	            	$lineUserProfile->update([ 
	            		'first_un_follow_date' => Carbon::now()->format('Y-m-d H:i:s'),
	            		'last_un_follow_date' => Carbon::now()->format('Y-m-d H:i:s'),
	            		'is_follow' => 0 ,
	            	]);
	            }else{
	            	$lineUserProfile->update([ 
	            		'last_un_follow_date' => Carbon::now()->format('Y-m-d H:i:s'),
	            		'is_follow' => 0 ,
	            	]);
	            }
	        }
	        
	        if($type == 'follow'){
	            Log::debug('follow');
	            $replyToken = $body['events'][0]['replyToken'];
	            if($lineUserProfile->first_un_follow_date == ''){
	            	$lineUserProfile->update([ 
	            		'first_follow_date' => Carbon::now()->format('Y-m-d H:i:s'),
	            		'last_follow_date' => Carbon::now()->format('Y-m-d H:i:s'),
	            		'is_follow' => 1 ,
	            	]);
	            }else{
	            	$lineUserProfile->update([ 
	            		'last_follow_date' => Carbon::now()->format('Y-m-d H:i:s'),
	            		'is_follow' => 1 ,
	            	]);
	            }
	            // $lineUserProfile->update([ 'is_follow' => 1 ]);
	            GreetingMessage::sendMessageGreeting($mid,$lineUserProfile,$replyToken);
	        }

	        // // if($body['events'][0]['type'] == 'beacon'){
	        //     // Log::debug('beacon');
	        //     // $replyToken = $body['events'][0]['replyToken'];
	        //     // GreetingMessage::sendMessageGreeting($mid,$userProfile['displayName'],$replyToken);
	        // // }

	        $checkStatusLiveChat = 0;
	        $checkApproval = 0;
	        // \Log::debug('ksjfkdsf');
		    // \Log::debug($type);

	        if ( isset($header['x-line-signature']) ) {
	        	$xsignature = $header['x-line-signature'][0];
	        	if($type != 'follow' && $type != 'unfollow' && $type != 'beacon'){
	        		if($type != 'postback'){
		        		$messageTypeText = $body['events'][0]['message']['type'];
		        		if($messageTypeText == 'text'){

		                }else if($messageTypeText == 'image'){
		                	$event = "image";
		                }
	        		}
	        	}

	            if($type == 'beacon'){
	                $event = "beacon";
	            }else if($type == 'postback'){
	              	$event = "postback";
	            }else if($type == 'message'){
	            	$messageTypeText = $body['events'][0]['message']['type'];
	            	if($messageTypeText == 'image'){
	              		$event = "image";
	            	}else{
                        $event = LineWebHooks::getMessageEvent($body);
                    }
	            }else{
	              	$event = LineWebHooks::getMessageEvent($body);
	            }
	            //problem with  Thai lang
	            $pass = LineWebHooks::checkSignature($xsignature, $body);

	            if($event == 'location'){
	                Log::debug('in case location');
	                LineWebHooks::shareLocation($body, $dateNowStart);
	                // Log::debug($body);
	            }else{
	                if($event != "livechat" && $type == 'message'){
	                	$messageTypeText = $body['events'][0]['message']['type'];
	                    if($messageTypeText == 'text'){
	                    	$shop = "";
	                        $text = $body['events'][0]['message']['text'];
	                        $checkURL = CoreFunction::checkURL($text);
	                        if($checkURL){
	                            $event = 'url';
	                            LineWebHooks::sentMessageDefaultURL($body, $dateNowStart);
	                        }else{
	                        	if($text == 'เปลี่ยนร้านเป็น TOPS'){
	                        		$shop = "TOPS";
	                        		$event = "change shop";
	                        	}else if($text == 'เปลี่ยนร้านเป็น WATSONS'){
	                        		$shop = "WATSONS";
	                        		$event = "change shop";
	                        	}
	                        }
	                    }
	                }
	            }
	            Log::debug('type => '.$event);

	            //Log::debug(' status =>'. $pass);
	            //if ($pass || $event=='location') {
	            if ($pass) {
	                Log::debug('event => '. $event);
	                switch (trim($event)) {
	                    case 'message':
	                        Log::debug('in case message');
	                        //LineWebHooks::developing($body);
	                        LineWebHooks::autoReplyMessage($body, $dateNowStart);
	                        break;
	                    case 'image':
	                        // LineWebHooks::developing($body);
	                        
	                        break;
	                    case 'video':
	                       LineWebHooks::developing($body);
	                        
	                        break;
	                    case 'audio':
	                        LineWebHooks::developing($body);
	                    
	                        break;
	                    case 'location':
	                        // Log::debug('in case location ');
	                        // Log::debug($body);
	                        // LineWebHooks::developing($body);
	                        
	                        break;
	                    case 'sticker':
	                        Log::debug('in case Sticker');
	                        //LineWebHooks::developing($body);
	                        if($checkStatusLiveChat == 0 && $checkApproval == 0){
	                            LineWebHooks::defalutSticker($body);
	                        }
	                        break;
	                     case 'follow':
	                        // $mid = $body['events'][0]['source']['userId'];
	                        // $lineUserProfile = LineUserProfile::where('mid',$mid)->first();
	                        // // GreetingMessage::sendGreeting($mid);
	                        // $userProfile = GreetingMessage::getUserProfile($mid);
	                        // if($lineUserProfile == ''){
	                        //     LineUserProfile::create([
	                        //         'mid' => $mid,
	                        //         'name' => $userProfile['displayName'],
	                        //         'avatar' => $userProfile['pictureUrl']
	                        //     ]);
	                        // }
	                       //Log::debug('in case follow ');
	                            // LineWebHooks::eventFollow($body);
	                        break;
	                     case 'join':
	                            LineWebHooks::eventJoin($body);
	                        break;
	                     case 'unfollow':
	                            LineWebHooks::eventLeave($body);
	                        break;
	                     case 'beacon':
	                            
	                        break;
	                    case 'postback':
	                    		
	                        break;
	                    case 'change shop':
	                    		Customer::changeShop($lineUserProfile,$shop);
	                        break;
	                    default:
	                        Log::debug('default Message Event Not Match');
	                }
	            }
	        }

	        Log::debug('End Post Receive');
	        $now = Carbon::now();
	        $dateNow2 = $now;
	        Log::debug('---------');
	    }
	    catch(Exception $e) {
            Log::debug('Error '.$e);
        }

        return response()->json(['status' => 'ok'], 200);
    }
}
