<?php

namespace YellowProject\Http\Controllers\API\v1\TESCOLOTUS\MT\Report;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\Estamp\EstampCustomerItem;
use YellowProject\DownloadFile\DownloadFile;
use YellowProject\DownloadFile\DownloadFileMain;
use DB;

class ReportController extends Controller
{
    public function report1(Request $request)
    {
    	$startDate = $request->start_date;
    	$endDate = $request->end_date;
    	$friendStatus = $request->friend_status;
    	$locationOfPointGive = $request->location_of_point_give;
    	$numberOfPointGiven = $request->number_of_point_given;
    	$numberOfRedeem = $request->number_of_redeem;
    	$pointType = $request->point_type;
    	$redemptionType = $request->redemption_type;
    	$userId = $request->user_id;
    	$datas = \DB::table('fact_estamp_customer_item as eci')
    		->select(
    			'eci.id as id',
    			'lu.mid as user_id',
    			DB::raw('(CASE WHEN lu.is_follow = 1 THEN "Active" ELSE "In-Active" END) AS friend_status'),
    			DB::raw('(CASE WHEN lu.last_follow_date IS NOT NULL THEN DATE_FORMAT(lu.last_follow_date, "%d/%m/%Y %H:%i") ELSE DATE_FORMAT(rm.created_at, "%d/%m/%Y %H:%i") END) as date_time_of_friend'),
    			DB::raw('DATE_FORMAT(lu.last_un_follow_date, "%d/%m/%Y %H:%i") as date_time_of_blocked'),
    			DB::raw('(CASE WHEN eci.id IS NOT NULL THEN 1 ELSE 0 END) AS number_of_point_given'),
    			'eci.type as point_type',
    			DB::raw('DATE_FORMAT(eci.created_at, "%d/%m/%Y %H:%i") as date_time_of_point_given'),
    			'eci.store_ref as location_of_point_give',
    			DB::raw('(CASE WHEN eci.id IS NOT NULL THEN NULL ELSE "" END) AS date_time_of_coupon_redemption'),
    			DB::raw('(CASE WHEN eci.id IS NOT NULL THEN NULL ELSE "" END) AS redemption_type'),
    			DB::raw('(CASE WHEN eci.id IS NOT NULL THEN NULL ELSE "" END) AS number_of_redeem')
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
    	// dd($datas->get());

  //   	$datas = [
		//     [
		//       "id"=> 1,
		//       "user_id"=> 1,
		//       "friend_status"=> "xxx",
		//       "date_time_of_friend"=> "DD/MM/YYYY HH=>MM",
		//       "date_time_of_blocked"=> "DD/MM/YYYY HH=>MM",
		//       "number_of_point_given"=> 1,
		//       "point_type"=> "Welcome",
		//       "date_time_of_point_given"=> "DD/MM/YYYY HH=>MM",
		//       "location_of_point_give"=> "Store A",
		//       "date_time_of_coupon_redemption"=> "DD/MM/YYYY HH=>MM",
		//       "redemption_type"=> 6,
		//       "number_of_redeem"=> 2
		//     ],
		//     [
		//       "id"=> 2,
		//       "user_id"=> 1,
		//       "friend_status"=> "xxx",
		//       "date_time_of_friend"=> "DD/MM/YYYY HH=>MM",
		//       "date_time_of_blocked"=> "DD/MM/YYYY HH=>MM",
		//       "number_of_point_given"=> 1,
		//       "point_type"=> "Welcome",
		//       "date_time_of_point_given"=> "DD/MM/YYYY HH=>MM",
		//       "location_of_point_give"=> "Store A",
		//       "date_time_of_coupon_redemption"=> "DD/MM/YYYY HH=>MM",
		//       "redemption_type"=> 6,
		//       "number_of_redeem"=> 2
		//     ]
		// ];

		return response()->json([
            'datas' => $datas,
        ]);
    }

    public function report2(Request $request)
    {
    	$startDate = $request->start_date;
    	$endDate = $request->end_date;
    	$currentActivePoint = $request->current_active_point;
    	$total6Pnt = $request->total_6_pnt;
    	$total10Pnt = $request->total_10_pnt;
    	$totalPointGive = $request->total_point_give;
    	$userId = $request->user_id;

    	$datas = \DB::table('dim_mt_register_estamp as re')
    		->select(
    			're.id',
    			'lu.mid as user_id',
    			're.total_stamp_collect as total_point_give',
    			\DB::Raw('count(rer6.id) as total_6_pnt'),
    			\DB::Raw('count(rer10.id) as total_10_pnt'),
    			're.total_stamp_active as current_active_point'
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
    		// ->leftjoin('fact_estamp_customer_recieve_reward as rer6','re.line_user_id','=','rer6.line_user_id')
    	// dd($datas->get());
  //   	$datas = [
  //   		[
		//       "id"=> 1,
		//       "user_id"=> 1,
		//       "total_point_give"=> 1,
		//       "total_6_pnt"=> 2,
		//       "total_10_pnt"=> 3,
		//       "current_active_point"=> 4
		//     ],
		//     [
		//       "id"=> 2,
		//       "user_id"=> 1,
		//       "total_point_give"=> 1,
		//       "total_6_pnt"=> 2,
		//       "total_10_pnt"=> 3,
		//       "current_active_point"=> 4
		//     ]
		// ];

		return response()->json([
            'datas' => $datas,
        ]);
    }

    public function report3(Request $request)
    {
    	$startDate = $request->start_date;
    	$endDate = $request->end_date;
    	$location = $request->location;
    	$totalPointGive = $request->total_point_give;
    	$total6Pnt = $request->total_6_pnt;
    	$total10Pnt = $request->total_10_pnt;
    	$datas = \DB::table('fact_estamp_customer_item as eci')
    		->select(
    			'eci.id',
    			DB::raw('(CASE WHEN eci.store_ref = "" THEN "Welcome" ELSE eci.store_ref END) AS location'),
    			DB::raw('count(eci.store_ref) as total_point_give'),
                DB::raw('(select count(*) from fact_estamp_customer_recieve_reward as crr where crr.store_ref = eci.store_ref and stamp_amount = 6) AS total_6_pnt'),
    			DB::raw('(select count(*) from fact_estamp_customer_recieve_reward as crr where crr.store_ref = eci.store_ref and stamp_amount = 10) AS total_10_pnt')
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

  //   	$datas = [
		//     [
		//       "id"=> 1,
		//       "location"=> "Store A",
		//       "total_point_give"=> 1,
		//       "total_6_pnt"=> 2,
		//       "total_10_pnt"=> 3
		//     ],
		//     [
		//       "id"=> 2,
		//       "location"=> "Store B",
		//       "total_point_give"=> 1,
		//       "total_6_pnt"=> 2,
		//       "total_10_pnt"=> 3
		//     ]
		// ];
    	
    	return response()->json([
            'datas' => $datas,
        ]);
    }

    public function report1Export(Request $request)
    {
    	$serialized = serialize($request->all());

    	DownloadFileMain::create([
          'main_id' => 0,
          'type' => 'report_mt_1',
          'is_active' => 1,
          'requests' => $serialized
        ]);
        
        return response()->json([
          'return_code' => 1,
          'msg' => 'ดาวน์โหลดข้อมูลสำเร็จ"',
        ]);
    }

    public function report2Export(Request $request)
    {
    	$serialized = serialize($request->all());

    	DownloadFileMain::create([
          'main_id' => 0,
          'type' => 'report_mt_2',
          'is_active' => 1,
          'requests' => $serialized
        ]);
        
        return response()->json([
          'return_code' => 1,
          'msg' => 'ดาวน์โหลดข้อมูลสำเร็จ"',
        ]);
    }

    public function report3Export(Request $request)
    {
    	$serialized = serialize($request->all());

    	DownloadFileMain::create([
          'main_id' => 0,
          'type' => 'report_mt_3',
          'is_active' => 1,
          'requests' => $serialized
        ]);
        
        return response()->json([
          'return_code' => 1,
          'msg' => 'ดาวน์โหลดข้อมูลสำเร็จ"',
        ]);
    }
}
