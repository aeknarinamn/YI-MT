<?php

namespace YellowProject;

use Illuminate\Database\Eloquent\Model;
use YellowProject\EcomProduct;
use YellowProject\Coupon;
use YellowProject\LineWebHooks;
use YellowProject\LineSettingBusiness;
use YellowProject\Ecommerce\ProductRecommend\ProductRecommend;
use YellowProject\DownloadFile\DownloadFile;
use YellowProject\DownloadFile\DownloadFileMain;
use YellowProject\DownloadFile\DownloadFileMainFunction;
use Carbon\Carbon;

class JobScheduleFunction extends Model
{
    public static function checkStatusEcomProduct()
    {
    	// \Log::debug('schedule check ecom product');
    	$ecomProducts = EcomProduct::all();
    	foreach ($ecomProducts as $key => $ecomProduct) {
    		$dateNow = Carbon::now()->format('Y-m-d H:i:s');
    		if($ecomProduct->start_time_product < $dateNow && $ecomProduct->end_time_product > $dateNow){
    			if($ecomProduct->is_active != 1){
    				$ecomProduct->update([
	    				'is_active' => 1,
	    			]);
    			}
    		}else{
    			if($ecomProduct->is_active != 0){
	    			$ecomProduct->update([
	    				'is_active' => 0,
	    			]);
	    		}
    		}
    	}
    }

    public static function checkStatusCoupon()
    {
    	// \Log::debug('schedule check coupon');
    	$coupons = Coupon::all();
    	foreach ($coupons as $key => $coupon) {
    		$dateNow = Carbon::now()->format('Y-m-d H:i:s');
    		if($coupon->start_date < $dateNow && $coupon->end_date > $dateNow){
    			if($coupon->is_active != 1){
    				$coupon->update([
	    				'is_active' => 1,
	    			]);
    			}
    		}else{
    			if($coupon->is_active != 0){
	    			$coupon->update([
	    				'is_active' => 0,
	    			]);
	    		}
    		}
    	}
    }

    public static function refreshToken()
    {
        $refreshToken = LineWebHooks::refreshToken();
        $lineSettingBusiness = LineSettingBusiness::where('active',1)->first();
        $lineSettingBusiness->update([
            'channel_access_token' => $refreshToken->access_token,
        ]);
    }

    public static function checkFunctionDownload()
    {
        $downloadFileMains = DownloadFileMain::where('is_active',1)->get();
        foreach ($downloadFileMains as $key => $downloadFileMain) {
            if($downloadFileMain->type == 'subscriber_single'){
                $downloadFileMain->update([
                    'is_active' => 0
                ]);
                DownloadFileMainFunction::downloadFileSubscriberSingle($downloadFileMain->main_id);
            }else if($downloadFileMain->type == 'coupon_detail'){
                $downloadFileMain->update([
                    'is_active' => 0
                ]);
                DownloadFileMainFunction::downloadFileCouponDetail($downloadFileMain->main_id,unserialize($downloadFileMain->requests));
            }else if($downloadFileMain->type == 'keyword_inquiry'){
                $downloadFileMain->update([
                    'is_active' => 0
                ]);
                DownloadFileMainFunction::downloadFileKeywordInquiry(unserialize($downloadFileMain->requests));
            }else if($downloadFileMain->type == 'report_mt_1'){
                $downloadFileMain->update([
                    'is_active' => 0
                ]);
                DownloadFileMainFunction::downloadFileReportMt1(unserialize($downloadFileMain->requests));
            }else if($downloadFileMain->type == 'report_mt_2'){
                $downloadFileMain->update([
                    'is_active' => 0
                ]);
                DownloadFileMainFunction::downloadFileReportMt2(unserialize($downloadFileMain->requests));
            }else if($downloadFileMain->type == 'report_mt_3'){
                $downloadFileMain->update([
                    'is_active' => 0
                ]);
                DownloadFileMainFunction::downloadFileReportMt3(unserialize($downloadFileMain->requests));
            }
        }
        self::checkFileDelete();
    }

    public static function checkFileDelete()
    {
        $dateNow = Carbon::now()->format('Y-m-d H:i:s');
        DownloadFileMain::where('is_active',0)->delete();
        $downloadFiles = DownloadFile::where('deleted_at','<=',$dateNow)->get();
        foreach ($downloadFiles as $key => $downloadFile) {
            \Storage::delete($downloadFile->file_link_path);
            $downloadFile->delete();
            // dd($downloadFile);
        }
        // dd($downloadFiles);
    }

    public static function checkProductRecommend()
    {
        $dateNow = Carbon::now()->format('Y-m-d H:i');
        $productRecommends = ProductRecommend::all();
        foreach ($productRecommends as $key => $productRecommend) {
            $date1 = $productRecommend->start_date;
            $date2 = $productRecommend->end_date;
            if($date1 <= $dateNow && $dateNow <= $date2){
                $productRecommend->update([
                    'is_active' => 1,
                ]);
            }else{
                $productRecommend->update([
                    'is_active' => 0,
                ]);
            }
        }
    }
}
