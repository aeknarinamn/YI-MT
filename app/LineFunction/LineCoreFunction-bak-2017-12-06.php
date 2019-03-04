<?php

namespace YellowProject\LineFunction;

use Illuminate\Database\Eloquent\Model;
use Log;
use YellowProject\LineWebHooks;
use YellowProject\GreetingMessage;
use YellowProject\AutoReplyDefault;
use YellowProject\LineUserProfile;
use YellowProject\ForwardDataRecieve;
use YellowProject\HistoryAddBlock;
use YellowProject\ChatMain;
use YellowProject\GeneralFunction\CoreFunction;
use YellowProject\SCG\Approval\ApprovalFunction;
use YellowProject\FWD\Convolab\ApiConnection;
use Carbon\Carbon;

class LineCoreFunction extends Model
{
    public static function lineWebhookCoreFunction($header,$body,$dateNow = null)
    {
    	$mid = $body['events'][0]['source']['userId'];
        LineWebHooks::storeLineUserProfile($mid);
        $userProfile = GreetingMessage::getUserProfile($mid);
        $lineUserProfile = LineUserProfile::where('mid',$mid)->first();

        if($body['events'][0]['type'] == 'unfollow'){
            Log::debug('unfollow');
            HistoryAddBlock::create([
                'line_user_id' => $lineUserProfile->id,
                'action' => 'unfollow'
            ]);
            $lineUserProfile->update([ 'is_follow' => 0 ]);
        }
        
        if($body['events'][0]['type'] == 'follow'){
            Log::debug('follow');
            HistoryAddBlock::create([
                'line_user_id' => $lineUserProfile->id,
                'action' => 'follow'
            ]);
            $replyToken = $body['events'][0]['replyToken'];
            $lineUserProfile->update([ 'is_follow' => 1 ]);
            GreetingMessage::sendMessageGreeting($mid,$lineUserProfile,$replyToken);
        }//else{
        //     Log::debug('Unfollow');
        // }
        // LineWebHooks::eventJoinFix($body);

        // if($body['events'][0]['type'] == 'beacon'){
            // Log::debug('beacon');
            // $replyToken = $body['events'][0]['replyToken'];
            // GreetingMessage::sendMessageGreeting($mid,$userProfile['displayName'],$replyToken);
        // }

        $checkStatusLiveChat = 0;
        $checkApproval = 0;

        if ( isset($header['x-line-signature']) ) {
            $eventType = $body['events'][0]['type'];
            $xsignature = $header['x-line-signature'][0];
            // ForwardDataRecieve::forewardData($body,$xsignature);
            if($body['events'][0]['type'] != 'follow' && $body['events'][0]['type'] != 'unfollow' && $body['events'][0]['type'] != 'beacon' && $body['events'][0]['type'] != 'postback'){
                if($body['events'][0]['message']['type'] == 'text'){
                    $checkApproval = ApprovalFunction::coreApproval($body);
                }
                if(!$checkApproval){
                    $checkStatusLiveChat = LineWebHooks::checkLiveChat($body);
                }
            }
            // $checkStatusLiveChat = 1;
            if($checkApproval == 1){
                $event = "approval";
            }else if($checkStatusLiveChat == 1){
                $mid = $body['events'][0]['source']['userId'];
                LineWebHooks::storeLineUserProfile($mid);
                $checkBotChat = ChatMain::checkBot($lineUserProfile->id,$body);
                if($checkBotChat){
                    ApiConnection::forwardDataConverlab($body);
                }
                $event = "livechat";
            }else{
                if($body['events'][0]['type'] == 'beacon'){
                  $event = "beacon";
                }else if($body['events'][0]['type'] == 'postback'){
                  $event = "postback";
                }else{
                  $event = LineWebHooks::getMessageEvent($body);
                }
            }
            //problem with  Thai lang
            $pass = LineWebHooks::checkSignature($xsignature, $body);

            if($event == 'location'){
                Log::debug('in case location');
                LineWebHooks::shareLocation($body, $dateNowStart);
                // Log::debug($body);
            }else{
                if($event != "livechat" && $eventType == 'message'){
                    if($body['events'][0]['message']['type'] == 'text'){
                        $text = $body['events'][0]['message']['text'];
                        $checkURL = CoreFunction::checkURL($text);
                        if($checkURL){
                            $event = 'url';
                            LineWebHooks::sentMessageDefaultURL($body, $dateNowStart);
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
                        LineWebHooks::developing($body);
                        
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
                     case 'livechat':
                            Log::debug('in case LiveChat');
                            LineWebHooks::liveChat($body);
                        break;
                     case 'beacon':
                            Log::debug('beacon');
                            $replyToken = $body['events'][0]['replyToken'];
                            $beaconId = $body['events'][0]['beacon']['hwid'];
                            $userId = $body['events'][0]['source']['userId'];
                            Log::debug('beacon id => '.$beaconId);
                            LineWebHooks::autoReplyBeacon($userId,$replyToken,$beaconId);
                            LineWebHooks::checkInBeacon($beaconId,$userId);
                        break;
                    case 'postback':
                            LineWebHooks::postBackData($body, $dateNowStart);
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
        //Log::debug('Second = > '.$dateNow2.'  =>  diff => '.$dateNowStart->diffInSeconds($dateNow2));

        // return http_response_code(200);
        // return Response::json([
        //         'success' => true
        // ], 200);
    }
}
