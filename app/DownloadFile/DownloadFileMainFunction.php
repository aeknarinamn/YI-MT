<?php

namespace YellowProject\DownloadFile;

use Illuminate\Database\Eloquent\Model;
use YellowProject\Subscriber;
use YellowProject\SubscriberLine;
use YellowProject\DownloadFile\DownloadFile;
use YellowProject\DownloadFile\DownloadFileMain;
use YellowProject\SB\Coupon;
use YellowProject\SB\CouponStaticFixForm;
use YellowProject\SB\UserCheckCoupon;
use YellowProject\SB\CouponUser;
use YellowProject\SB\CouponReedeemCode;
use YellowProject\TrackingRecieveBc;
use YellowProject\LineUserProfile;
use YellowProject\RecieveMessage;
use Excel;
use URL;
use DB;

class DownloadFileMainFunction extends Model
{
    public static function downloadFileSubscriberSingle($id)
    {
    	$datas = [];
        $dataExports = [];
        $activitySubscriberIds = $id;
        $subscriberActivities = SubscriberLine::where('subscriber_id',$activitySubscriberIds)->get()->groupBy('line_user_id');
        $count = 1;
        $dateNow = \Carbon\Carbon::now()->format('dmY_His');
        $subscriber = Subscriber::find($id);
        $name = $subscriber->name.'_'.$dateNow;
        $path = 'download_files/subscriber/'.\Carbon\Carbon::now()->format('d-m-Y');
        DownloadFile::checkFolderSubscriber($path);
        $downloadFile = DownloadFile::create([
          'file_name' => $name,
          'file_link_path' => URL::to('/')."/".$path."/".$name.".xlsx",
          'file_type' => 'subscriber',
          'status' => 'Pending',
          'deleted_at' => \Carbon\Carbon::now()->addDays(5)->format('Y-m-d H:i:s'),
        ]);

        foreach ($subscriberActivities as $idKey => $subscribers) {
            $datas[$idKey]['No.'] = $count;
            $datas[$idKey]['userID'] = $idKey;
            foreach ($subscribers as $subscriber) {
                foreach ($subscriber->subscriberItems as $subscriberItem) {
                    // $datas[$idKey][$subscriberItem->field->name] = "'".$subscriberItem->value;
                    if($subscriberItem->value == ""){
                      $datas[$idKey][$subscriberItem->field->name] = 'N/A';
                    }else{
                      $datas[$idKey][$subscriberItem->field->name] = $subscriberItem->value;
                    }
                }
                $datas[$idKey]['created_at_'.$subscriber->subscriber->name] = $subscriber->created_at->format('Y-m-d H:i:s');
            }
            $count++;
        }

        if(count($datas) > 0){
            array_multisort(array_map('count', $datas), SORT_DESC, $datas);
            $allKeys = array_keys($datas[0]);

            foreach ($datas as $index => $data) {
                foreach ($allKeys as $key) {
                    if(!array_key_exists($key, $data)){
                        $dataExports[$index][$key] = "N/A";
                    }else{
                        $dataExports[$index][$key] = $data[$key];
                    }
                }
                $dataExports[$index]['No.'] = $index+1;
            }
        }

        Excel::create($name, function($excel) use ($dataExports) {
            $excel->sheet('sheet1', function($sheet) use ($dataExports)
            {
                $sheet->fromArray($dataExports);
            });
        })->store('xlsx',public_path().'/'.$path);

        $downloadFile->update([
          'status' => 'Success'
        ]);
    }

    public static function downloadFileCouponDetail($id,$requests)
    {
        $datas = [];
        $startDate = (array_key_exists('start_date',$requests))? $requests['start_date'] : "";
        $endDate = (array_key_exists('end_date', $requests))? $requests['end_date'] : "";
        $coupon = Coupon::find($id);
        $filter = (array_key_exists('filter', $requests))? $requests['filter'] : "";
        $dateNow = \Carbon\Carbon::now()->format('dmY_His');
        $name = $coupon->name.'_coupon_'.$dateNow;
        $path = 'download_files/coupon_detail/'.\Carbon\Carbon::now()->format('d-m-Y');
        DownloadFile::checkFolderSubscriber($path);
        $downloadFile = DownloadFile::create([
          'file_name' => $name,
          'file_link_path' => URL::to('/')."/".$path."/".$name.".xlsx",
          'file_type' => 'coupon',
          'status' => 'Pending',
          'deleted_at' => \Carbon\Carbon::now()->addDays(5)->format('Y-m-d H:i:s'),
        ]);
        if($startDate != "" && $endDate != ""){
            $trackingRecieveBcGroupByLineUserIds = TrackingRecieveBc::select('*', \DB::raw('count(*) as countClick'))
            ->where('tracking_bc_id',$coupon->tracking_bc_id)
            ->whereBetween('created_at', array($startDate, $endDate))
            ->groupBy('line_user_id')->orderByDesc('created_at')->get();
        }else{
            $trackingRecieveBcGroupByLineUserIds = TrackingRecieveBc::select('*', \DB::raw('count(*) as countClick'))
            ->where('tracking_bc_id',$coupon->tracking_bc_id)
            ->groupBy('line_user_id')->orderByDesc('created_at')->get();
        }
        $count = 1;

        foreach ($trackingRecieveBcGroupByLineUserIds as $key => $trackingRecieveBcGroupByLineUserId) {
            $lineUserProfile = LineUserProfile::find($trackingRecieveBcGroupByLineUserId->line_user_id);
            $lineUserData = CouponStaticFixForm::where('line_user_id',$lineUserProfile->id)->first();
            $trackingRecieveBcs = TrackingRecieveBc::orderByDesc('created_at')->where('tracking_bc_id',$coupon->tracking_bc_id)->where('line_user_id',$trackingRecieveBcGroupByLineUserId->line_user_id)->get();
            $couponUserRedeem = UserCheckCoupon::orderByDesc('created_at')->where('coupon_id',$coupon->id)->where('line_user_id',$lineUserProfile->id)->whereIn('flag_status',['success','fail'])->first();
            $couponUserUsed = CouponUser::where('coupon_id',$coupon->id)->where('line_user_id',$lineUserProfile->id)->whereNotNull('reedeem_date')->first();
            $couponReedeemCode = CouponReedeemCode::where('coupon_id',$coupon->id)->where('line_user_id',$lineUserProfile->id)->first();
            $datas[$count]['No.'] = $count;
            $datas[$count]['Coupon Title'] = $coupon->name;
            $datas[$count]['User ID'] = $lineUserProfile->id;
            $datas[$count]['Name'] = "";
            $datas[$count]['Tel'] = "";
            $datas[$count]['email'] = "";

            if($filter != "Coupon Redeemed" && $filter != "Coupon Used"){
                $datas[$count]['Click'] = $trackingRecieveBcs->count();
                $datas[$count]['Click Date'] = $trackingRecieveBcs->first()->created_at->format('d/m/Y H:i:s');
            }

            if($filter != "Coupon Click" && $filter != "Coupon Used"){
                $datas[$count]['Redeem'] = ($couponUserRedeem)? "Yes" : "No";
                $datas[$count]['Redeem Date'] = ($couponUserRedeem)? $couponUserRedeem->created_at->format('d/m/Y H:i:s') : "";
            }
            
            if($filter != "Coupon Click" && $filter != "Coupon Redeemed"){
                $datas[$count]['Used'] = ($couponUserUsed)? "Yes" : "No";
                $datas[$count]['Used Date'] = ($couponUserUsed)? $couponUserUsed->created_at->format('d/m/Y H:i:s') : "";
            }

            $datas[$count]['Winning Rate'] = ($couponUserRedeem)? $couponUserRedeem->user_get_coupon_percent : 0;
            $datas[$count]['Coupon Code'] = ($couponReedeemCode)? $couponReedeemCode->prefix_code.$couponReedeemCode->running_code : 0;

            if($lineUserData){
                $datas[$count]['Name'] = $lineUserData->name;
                $datas[$count]['Tel'] = $lineUserData->tel;
                $datas[$count]['email'] = $lineUserData->email;
            }
            
            $count++;
        }

        Excel::create($name, function($excel) use ($datas) {
            $excel->sheet('sheet1', function($sheet) use ($datas)
            {
                $sheet->fromArray($datas);
            });
        })->store('xlsx',public_path().'/'.$path);

        $downloadFile->update([
          'status' => 'Success'
        ]);
    }

    public static function downloadFileKeywordInquiry($requests)
    {
        $datas = [];
        $dateNow = \Carbon\Carbon::now()->format('dmY_His');
        $name = 'keyword_inquiry'.$requests['keyword_search']."_".$dateNow;
        $path = 'download_files/keyword_inquiry/'.\Carbon\Carbon::now()->format('d-m-Y');
        DownloadFile::checkFolderSubscriber($path);
        $downloadFile = DownloadFile::create([
          'file_name' => $name,
          'file_link_path' => URL::to('/')."/".$path."/".$name.".xlsx",
          'file_type' => 'keyword_inquiry',
          'status' => 'Pending',
          'deleted_at' => \Carbon\Carbon::now()->addDays(5)->format('Y-m-d H:i:s'),
        ]);

        $keywordSearch = $requests['keyword_search'];
        $isUnique = $requests['is_unique'];
        $recieveMessages = RecieveMessage::select('*', \DB::raw('count(*) as countKeyword'), \DB::raw('max(created_at) as created_at'));
        $recieveMessages = $recieveMessages->groupBy('keyword','mid')->orderByDesc('created_at');
        if($keywordSearch != -1){
            $recieveMessages->where('keyword',$keywordSearch);
        }
        
        $recieveMessages = $recieveMessages->get();
        if($isUnique){
            $totalSum = $recieveMessages->count();
        }else{
            $totalSum = $recieveMessages->sum('countKeyword');
        }

        foreach ($recieveMessages as $key => $recieveMessage) {
            $datas[$key]['UserId'] = $recieveMessage->lineUserProfile->mid;
            $datas[$key]['Display Name'] = $recieveMessage->lineUserProfile->name;
            $datas[$key]['Keyword'] = $recieveMessage->keyword;
            // $datas[$key]['Reply'] = "-";
            if($isUnique){
                $datas[$key]['Count'] = 1;
            }else{
                $datas[$key]['Count'] = $recieveMessage->countKeyword;
            }
            $datas[$key]['Date/Time'] = $recieveMessage->created_at->format('Y-m-d H:i:s');
        }

        Excel::create($name, function($excel) use ($datas) {
            $excel->sheet('sheet1', function($sheet) use ($datas)
            {
                $sheet->fromArray($datas);
            });
        })->store('xlsx',public_path().'/'.$path);

        $downloadFile->update([
          'status' => 'Success'
        ]);
    }

    public static function downloadFileReportMt1($requests)
    {
        $datas = [];
        $dateNow = \Carbon\Carbon::now()->format('dmY_His');
        $name = 'Data Field For RawDataReport 1'."_".$dateNow;
        $path = 'download_files/report_mt_1/'.\Carbon\Carbon::now()->format('d-m-Y');
        DownloadFile::checkFolderSubscriber($path);
        $downloadFile = DownloadFile::create([
          'file_name' => $name,
          'file_link_path' => URL::to('/')."/".$path."/".$name.".xlsx",
          'file_type' => 'report_mt_1',
          'status' => 'Pending',
          'deleted_at' => \Carbon\Carbon::now()->addDays(5)->format('Y-m-d H:i:s'),
        ]);

        $startDate = $requests['start_date'];
        $endDate = $requests['end_date'];
        $friendStatus = $requests['friend_status'];
        $locationOfPointGive = $requests['location_of_point_give'];
        $numberOfPointGiven = $requests['number_of_point_given'];
        $numberOfRedeem = $requests['number_of_redeem'];
        $pointType = $requests['point_type'];
        $redemptionType = $requests['redemption_type'];
        $userId = $requests['user_id'];
        $datas = \DB::table('fact_estamp_customer_item as eci')
            ->select(
                'lu.mid as "User Id"',
                DB::raw('(CASE WHEN lu.is_follow = 1 THEN "Active" ELSE "In-Active" END) as "Friend Status"'),
                DB::raw('(CASE WHEN lu.last_follow_date IS NOT NULL THEN DATE_FORMAT(lu.last_follow_date, "%d/%m/%Y %H:%i") ELSE DATE_FORMAT(rm.created_at, "%d/%m/%Y %H:%i") END) as "Date & Time stamp of friend add"'),
                DB::raw('DATE_FORMAT(lu.last_un_follow_date, "%d/%m/%Y %H:%i") as "Date & Time stamp of blocked"'),
                DB::raw('(CASE WHEN eci.id IS NOT NULL THEN 1 ELSE 0 END) as "Number of point given"'),
                'eci.type as "Point type (Welcome / Store visit)"',
                DB::raw('DATE_FORMAT(eci.created_at, "%d/%m/%Y %H:%i") as "Date & Time stamp of Point given"'),
                'eci.store_ref as Location of Point given',
                DB::raw('(CASE WHEN eci.id IS NOT NULL THEN NULL ELSE "" END) as "Date & Time stamp of Coupon Redemption"'),
                DB::raw('(CASE WHEN eci.id IS NOT NULL THEN NULL ELSE "" END) as "Redemtion type (6pnts / 10pnts)"'),
                DB::raw('(CASE WHEN eci.id IS NOT NULL THEN NULL ELSE "" END) as "Number of redeem"')
            )
            ->leftjoin('fact_estamp_customer as ec','eci.estamp_customer_id','=','ec.id')
            ->leftjoin('dim_line_user_table as lu','ec.line_user_id','=','lu.id')
            ->leftjoin('dim_mt_register_estamp as rm','lu.id','=','rm.line_user_id');
        if($startDate != "" && $endDate != ""){
            $datas = $datas->whereDate('eci.created_at','>=',$startDate)
            ->whereDate('eci.created_at','<=',$endDate);
        }
        if($friendStatus != "" && $friendStatus != "null"){
            if($friendStatus == 'Active'){
                $friendStatus = 1;
            }else{
                $friendStatus = 0;
            }
            $datas = $datas->where('lu.is_follow',$friendStatus);
        }
        if($locationOfPointGive != ""){
            $datas = $datas->where('eci.store_ref',$locationOfPointGive);
        }
        // if($numberOfPointGiven != ""){

        // }
        if($numberOfRedeem != ""){

        }
        if($pointType != "" && $pointType != "null"){
            $datas = $datas->where('eci.type',$pointType);
        }
        if($redemptionType != "" && $redemptionType != "null"){

        }
        if($userId != ""){
            $datas = $datas->where('lu.id',$userId);
        }

        $datas = $datas->orderBy('eci.created_at')->get();
        $datas = collect($datas)->map(function($x){ return (array) $x; })->toArray();

        Excel::create($name, function($excel) use ($datas) {
            $excel->sheet('sheet1', function($sheet) use ($datas)
            {
                $sheet->fromArray($datas);
            });
        })->store('xlsx',public_path().'/'.$path);

        $downloadFile->update([
          'status' => 'Success'
        ]);
    }

    public static function downloadFileReportMt2($requests)
    {
        $datas = [];
        $dateNow = \Carbon\Carbon::now()->format('dmY_His');
        $name = 'Data Field For RawDataReport 2'."_".$dateNow;
        $path = 'download_files/report_mt_2/'.\Carbon\Carbon::now()->format('d-m-Y');
        DownloadFile::checkFolderSubscriber($path);
        $downloadFile = DownloadFile::create([
          'file_name' => $name,
          'file_link_path' => URL::to('/')."/".$path."/".$name.".xlsx",
          'file_type' => 'report_mt_2',
          'status' => 'Pending',
          'deleted_at' => \Carbon\Carbon::now()->addDays(5)->format('Y-m-d H:i:s'),
        ]);

        $startDate = $requests['start_date'];
        $endDate = $requests['end_date'];
        $currentActivePoint = $requests['current_active_point'];
        $total6Pnt = $requests['total_6_pnt'];
        $total10Pnt = $requests['total_10_pnt'];
        $totalPointGive = $requests['total_point_give'];
        $userId = $requests['user_id'];

        $datas = \DB::table('dim_mt_register_estamp as re')
            ->select(
                'lu.mid as User ID',
                're.total_stamp_collect as "Total point given (From the start)"',
                \DB::Raw('count(rer6.id) as "Total 6pnt redemption (From the start)"'),
                \DB::Raw('count(rer10.id) as "Total 10pnt redemption (From the start)"'),
                're.total_stamp_active as Current Active point'
            )
            ->leftjoin('dim_line_user_table as lu','re.line_user_id','=','lu.id')
            ->leftJoin('fact_estamp_customer_recieve_reward AS rer6', function($join){
                $join->on('re.line_user_id', '=', 'rer6.line_user_id')
                     ->where('rer6.stamp_amount', '=', 6);
            })
            ->leftJoin('fact_estamp_customer_recieve_reward AS rer10', function($join){
                $join->on('re.line_user_id', '=', 'rer10.line_user_id')
                     ->where('rer10.stamp_amount', '=', 10);
            });
            if($startDate != "" && $endDate != ""){
                $datas = $datas->whereDate('re.created_at','>=',$startDate)
                ->whereDate('re.created_at','<=',$endDate);
            }
            if($currentActivePoint != ""){
                $datas = $datas->where('re.total_stamp_active',$currentActivePoint);
            }
            if($totalPointGive != ""){
                $datas = $datas->where('re.total_stamp_collect',$totalPointGive);
            }
            if($userId != ""){
                $datas = $datas->where('re.line_user_id',$userId);
            }
        $datas = $datas->groupBy('re.line_user_id');

        $datas = $datas->orderBy('re.created_at')->get();   
        if($total6Pnt != ""){
            $datas = $datas->filter(function ($value, $key) use($total6Pnt) {
                return $value->total_6_pnt == $total6Pnt;
            });
        }
        if($total10Pnt != ""){
            $datas = $datas->filter(function ($value, $key) use($total10Pnt) {
                return $value->total_10_pnt == $total10Pnt;
            });
        }
        $datas = $datas->values();
        $datas = $datas->all();
        $datas = collect($datas)->map(function($x){ return (array) $x; })->toArray();

        Excel::create($name, function($excel) use ($datas) {
            $excel->sheet('sheet1', function($sheet) use ($datas)
            {
                $sheet->fromArray($datas);
            });
        })->store('xlsx',public_path().'/'.$path);

        $downloadFile->update([
          'status' => 'Success'
        ]);
    }

    public static function downloadFileReportMt3($requests)
    {
        $datas = [];
        $dateNow = \Carbon\Carbon::now()->format('dmY_His');
        $name = 'Data Field For RawDataReport 3'."_".$dateNow;
        $path = 'download_files/report_mt_3/'.\Carbon\Carbon::now()->format('d-m-Y');
        DownloadFile::checkFolderSubscriber($path);
        $downloadFile = DownloadFile::create([
          'file_name' => $name,
          'file_link_path' => URL::to('/')."/".$path."/".$name.".xlsx",
          'file_type' => 'report_mt_3',
          'status' => 'Pending',
          'deleted_at' => \Carbon\Carbon::now()->addDays(5)->format('Y-m-d H:i:s'),
        ]);

        $startDate = $requests['start_date'];
        $endDate = $requests['end_date'];
        $location = $requests['location'];
        $totalPointGive = $requests['total_point_give'];
        $total6Pnt = $requests['total_6_pnt'];
        $total10Pnt = $requests['total_10_pnt'];
        $datas = \DB::table('fact_estamp_customer_item as eci')
            ->select(
                DB::raw('(CASE WHEN eci.store_ref = "" THEN "Welcome" ELSE eci.store_ref END) AS Location'),
                DB::raw('count(eci.store_ref) as "Total point given"'),
                DB::raw('(select count(*) from fact_estamp_customer_recieve_reward as crr where crr.store_ref = eci.store_ref and stamp_amount = 6) AS "Total 6pnt Redemption"'),
                DB::raw('(select count(*) from fact_estamp_customer_recieve_reward as crr where crr.store_ref = eci.store_ref and stamp_amount = 10) AS "Total 10pnt Redemption (can be by mth)"')
            );
            if($startDate != "" && $endDate != ""){
                $datas = $datas->whereDate('eci.created_at','>=',$startDate)
                ->whereDate('eci.created_at','<=',$endDate);
            }
            if($location != ""){
                $datas = $datas->where('eci.store_ref',$location);
            }
        $datas = $datas->groupBy('eci.store_ref');
        $datas = $datas->get();
        if($totalPointGive != ""){
            $datas = $datas->filter(function ($value, $key) use($totalPointGive) {
                return $value->total_point_give == $totalPointGive;
            });
        }
        $datas = $datas->values();
        $datas = $datas->all();
        $datas = collect($datas)->map(function($x){ return (array) $x; })->toArray();

        Excel::create($name, function($excel) use ($datas) {
            $excel->sheet('sheet1', function($sheet) use ($datas)
            {
                $sheet->fromArray($datas);
            });
        })->store('xlsx',public_path().'/'.$path);

        $downloadFile->update([
          'status' => 'Success'
        ]);
    }
}
