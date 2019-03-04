<?php

namespace YellowProject\Richmenu;

use Illuminate\Database\Eloquent\Model;
use YellowProject\Richmenu\Richmenu;
use YellowProject\LineSettingBusiness;
use YellowProject\LineWebHooks;
use YellowProject\Segment\Segment;
use YellowProject\Segment\QuickSegment;
use YellowProject\Richmenu\RichmenuMappingLinkData;
use Log;

class CoreFunction extends Model
{
    public static function mappingAutoRichmenu($susbcriberLine)
    {
        $lineUserProfile = $susbcriberLine->lineUserProfile;
        $richmenus = Richmenu::where('selected',1)->get();
        foreach ($richmenus as $key => $richmenu) {
            $mid = $lineUserProfile->mid;
            $mids = self::getUserSegment($richmenu);
            if(in_array($mid, $mids)){
                RichmenuMappingLinkData::create([
                    'rich_menu_id' => $richmenu->id,
                    'mid' => $mid
                ]);
                self::linkRichmenu($richmenu,$mid);
                break;
            }
        }
    }

	public static function richMessageCreate($richmenu)
	{
		$datas = collect();
		$messages = self::setRichmenu($richmenu->id);
		// dd($messages);
		
        $message = collect($messages);
        $lineSettingBusiness = LineSettingBusiness::where('active', 1)->first();
        $datas->put('sentUrl', 'https://api.line.me/v2/bot/richmenu');
        $datas->put('token', 'Bearer '.$lineSettingBusiness->channel_access_token);
        $datas->put('method', 'post');
        
        $datas->put('data', $message->toJson());
        // dd($datas);
        $sent = self::sent($datas);
        $response = json_decode($sent['datas'],true);
        $richmenu->update([
        	'line_richmenu_id' => $response['richMenuId'],
        ]);
        self::uploadImageRichmenu($richmenu);
        // self::getUserSegment($richmenu);
        // dd($response);
        // \Log::debug($sent);
	}

	public static function setLinkRichmenu($richmenu)
	{
		$mids = self::getUserSegment($richmenu);
		foreach ($mids as $key => $mid) {
            RichmenuMappingLinkData::create([
                'rich_menu_id' => $richmenu->id,
                'mid' => $mid
            ]);
			self::linkRichmenu($richmenu,$mid);
		}
	}

	public static function setUnLinkRichmenu($richmenu)
	{
        RichmenuMappingLinkData::where('rich_menu_id',$richmenu->id)->delete();
		$mids = self::getUserSegment($richmenu);
		foreach ($mids as $key => $mid) {
			self::UnlinkRichmenu($richmenu,$mid);
		}
	}

	public static function deleteRichmenu($richmenu)
	{
		$datas = collect();
    	$lineSettingBusiness = LineSettingBusiness::where('active', 1)->first();
        $datas->put('sentUrl', 'https://api.line.me/v2/bot/richmenu/'.$richmenu->line_richmenu_id);
        $datas->put('token', 'Bearer '.$lineSettingBusiness->channel_access_token);
        $datas->put('method', 'delete');
        $datas->put('data', "");
        $sent = self::sent($datas);
	}

	public static function getUserSegment($richmenu)
	{
		if($richmenu->segment_type == 'normal'){
            $segment = $richmenu->segment;
            $datas = Segment::getSegmentData($segment->id);
        }else{
            $segment = $richmenu->quickSegment;
            $datas = QuickSegment::getDatas($segment->id);
        }

        $mids = Segment::segmentCampaign($datas);

        return $mids;
	}

	public static function setRichmenu($richMenuID)
	{
		$richmenu = Richmenu::find($richMenuID);
          
        $messages = collect([
        	"size" => [
                "width" => "2500",
                "height" => "1686",
            ],
            "selected" => true,
            "name" => $richmenu->name,
            "chatBarText" => $richmenu->chatBarText,
        ]);
        foreach ($richmenu->areas as $area) {
        	$action = $area->action;
        	$bound = $area->bound;
            if($action->type == 'url_and_other_action'){
              	$dataItems[] = [
                	"action"  => [
                  		"type"  => "uri",
                		"uri"  => $action->data,
                	],
                	"bounds"  => [
                  		"x" => $bound->x*4,
                  		"y" => $bound->y*4,
                  		"width" => $bound->width*4,
                  		"height" => $bound->height*4,
                	],
              	];
            }
            if($action->type == 'keyword'){
            	$dataItems[] = [
                	"action"  => [
                  		"type"  => "message",
                		"text"  => $action->data,
                	],
                	"bounds"  => [
                  		"x" => $bound->x*4,
                  		"y" => $bound->y*4,
                  		"width" => $bound->width*4,
                  		"height" => $bound->height*4,
                	],
              	];
            }
            if($action->type == 'share_location'){
            	$dataItems[] = [
                	"action"  => [
                  		"type"  => "uri",
                		"uri"  => "line://nv/location",
                	],
                	"bounds"  => [
                  		"x" => $bound->x*4,
                  		"y" => $bound->y*4,
                  		"width" => $bound->width*4,
                  		"height" => $bound->height*4,
                	],
              	];
            }
            if($action->type == -1){
            	$dataItems[] = [
                	"action"  => [
                  		"type"  => "uri",
                		"uri"  => "http://#",
                	],
                	"bounds"  => [
                  		"x" => 0,
                  		"y" => 0,
                  		"width" => 1,
                  		"height" => 1,
                	],
              	];
            }
        }
        $messages->put('areas',$dataItems);

        return $messages;
	}

    public static function uploadImageRichmenu($richmenu)
    {
    	\Log::debug("Upload Image Richmessage");
    	$explode = explode('/', $richmenu->img_url);
    	$lineSettingBusiness = LineSettingBusiness::where('active', 1)->first();
    	$file = fopen(public_path().'/'.'file_uploads/richmenu/'.$explode[5], 'r');
  		$size = filesize(public_path().'/'.'file_uploads/richmenu/'.$explode[5]);
		$fildata = fread($file,$size);
		$curl = curl_init();

		curl_setopt_array($curl, array(
		    CURLOPT_URL => "https://api.line.me/v2/bot/richmenu/".$richmenu->line_richmenu_id."/content",
		    CURLOPT_RETURNTRANSFER => true,
		    CURLOPT_BINARYTRANSFER => true,
		    CURLOPT_ENCODING => "",
		    CURLOPT_MAXREDIRS => 10,
		    CURLOPT_TIMEOUT => 30,
		    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		    CURLOPT_CUSTOMREQUEST => "POST",
		    CURLOPT_POSTFIELDS => $fildata,
		    CURLOPT_INFILE => $file,
		    CURLOPT_HTTPHEADER => array(
		      "Authorization: Bearer ".$lineSettingBusiness->channel_access_token,
		      "Cache-Control: no-cache",
		      "Content-Type: image/png",
		    ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			\Log::debug("cURL Error #:" . $err);
		} else {
			\Log::debug($response);
		}
    }

    public static function linkRichmenu($richmenu,$mid)
    {
    	$datas = collect();
    	$lineSettingBusiness = LineSettingBusiness::where('active', 1)->first();
        $datas->put('sentUrl', 'https://api.line.me/v2/bot/user/'.$mid.'/richmenu/'.$richmenu->line_richmenu_id.'');
        $datas->put('token', 'Bearer '.$lineSettingBusiness->channel_access_token);
        $datas->put('method', 'post');
        $datas->put('data', "");
        $sent = self::sent($datas);
    }

    public static function UnlinkRichmenu($richmenu,$mid)
    {
    	$datas = collect();
    	$lineSettingBusiness = LineSettingBusiness::where('active', 1)->first();
        $datas->put('sentUrl', 'https://api.line.me/v2/bot/user/'.$mid.'/richmenu');
        $datas->put('token', 'Bearer '.$lineSettingBusiness->channel_access_token);
        $datas->put('method', 'delete');
        $datas->put('data', "");
        $sent = self::sent($datas);
    }

    public static function sent($arrDatas)
    {
       // dd($arrDatas['data']);
        $datasReturn = [];
		$curl = curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL => $arrDatas['sentUrl'],
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => $arrDatas['method'],
		  CURLOPT_POSTFIELDS => $arrDatas['data'],
		  CURLOPT_HTTPHEADER => array(
		    "authorization: ".$arrDatas['token'],
		    "cache-control: no-cache",
		    "content-type: application/json; charset=UTF-8",
		  ),
		));

		$response = curl_exec($curl);
        // dd($response);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
            $datasReturn['result'] = 'E';
            $datasReturn['message'] = $err;
            Log::debug('cURL Error #: =>'. $err);                          
		} else {
            $datasReturn['result'] = 'S';
            $datasReturn['message'] = 'Success';
            $datasReturn['datas'] = $response;
            
            Log::debug('Reply After eventFollow =>'. $response);
			Log::debug('return');     
		}

        return $datasReturn;
    }
}
