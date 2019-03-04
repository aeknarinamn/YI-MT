<?php

namespace YellowProject\MT;

use Illuminate\Database\Eloquent\Model;
use YellowProject\TrackingBc;
use Excel;
use Carbon\Carbon;

class GenerateData extends Model
{
    public static function generateData()
    {
    	$datas = [];
    	$mainText = "STORE";
    	$baseUrl = \URL::to('/');
    	for ($i=1; $i <= 500; $i++) {
    		$dataStore = [];
    		$storeCode = $mainText.str_pad($i, 5, '0', STR_PAD_LEFT);
    		$dataStore['code'] = $storeCode;
    		$dataStore['original_url'] = $baseUrl.'/'.'mt-get-estamp/'.$storeCode;
    		$dataStore['tracking_source'] = "QRCODE";
    		$dataStore['tracking_campaign'] = "eStamp";
    		$dataStore['tracking_ref'] = $storeCode;
    		$dataStore['is_route_name'] = 1;
    		$dataStore['generated_short_url'] = $baseUrl."/bc/".$dataStore['code'];
        	$dataStore['generated_full_url'] = $baseUrl."/bc/".$dataStore['code']."?"."yl_source=".$dataStore['tracking_source']."&yl_campaign=".$dataStore['tracking_campaign']."&yl_ref=".$dataStore['tracking_ref'];
    		$datas[$i]['No.'] = $i;
    		$datas[$i]['ref'] = $dataStore['tracking_ref'];
    		$datas[$i]['source'] = $dataStore['tracking_source'];
    		$datas[$i]['campaign'] = $dataStore['tracking_campaign'];
    		$datas[$i]['Link'] = $dataStore['generated_short_url'];
    		TrackingBc::create($dataStore);
    		self::genQRCode($dataStore['tracking_ref'],$dataStore['generated_short_url']);
    	}

    	Excel::create('mt-qr-code', function($excel) use ($datas) {
            $excel->sheet('sheet1', function($sheet) use ($datas)
            {
                $sheet->fromArray($datas);
            });
        })->download('xlsx');
    }

    public static function genQRCode($code,$url)
    {
    	$dateNow = Carbon::now()->format('dmY_Hi');
	    $qrCode = \DNS2D::getBarcodePNG($url, "QRCODE", 66, 66);

	    $directory3 = 'file_uploads/mt_qr';
	    if (!\File::isDirectory($directory3)){
	        $result = \File::makeDirectory($directory3, 0775, true);
	    }

	    $img = \Image::make($qrCode);
	    $fileName = strtolower($code).'.png';
	    $img->save(public_path($directory3.'/'.$fileName));
	    $qrCode = \Image::make(\URL::to('/').'/'.$directory3.'/'.$fileName);
	    $image = \Image::make(\URL::to('/').'/'.'standard_img/bg_qr.png');
	    $image->insert($qrCode, null, 180, 180);
	    $image->save(public_path($directory3.'/'.$fileName));
    }
}
