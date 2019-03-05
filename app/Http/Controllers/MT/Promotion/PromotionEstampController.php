<?php

namespace YellowProject\Http\Controllers\MT\Promotion;

use Carbon\Carbon;
use Illuminate\Http\Request;
use YellowProject\Estamp\Estamp;
use YellowProject\Estamp\EstampCustomer;
use YellowProject\Http\Controllers\MainController;
class PromotionEstampController extends MainController
{

    public function index()
    {

         $this->showEstamp();

    }

    public function estampPage()
    {
        // \Session::put('facebook', 'facebook');
        $lineUserProfile = $this->checkSession('line-login');
        \Session::put('line-login', '');
        if(!$lineUserProfile){
            return $this->errorLineLogin();
        }


        $registerEstampData = RegisterEstampData::where('line_user_id',$lineUserProfile->id)->first();
        if(!$registerEstampData){
            return $this->errorLineStampRegister($lineUserProfile);
        }

        $datas = [];
        $estamp = Estamp::where('is_active',1)->first();
        $dateNow = Carbon::now();
        $endDate = Carbon::parse($estamp->end_date);
        $dateBetween = $endDate->diffInDays($dateNow);
        $splitLengths = str_split($dateBetween);
        

        //EstampCustomer = table -> fact_estamp_customer
        $estampCustomer = EstampCustomer::where('estamp_id',$estamp->id)
            ->where('line_user_id',$lineUserProfile->id)
            ->where('status','active')
            ->first();
        if(!$estampCustomer){
            return $this->errorEstampCustomer($lineUserProfile);
        }

        $estampCustomerItems = collect();
        if($estampCustomer){
            $estampCustomerItems = $estampCustomer->estampCustomerItems;
        }
        $estampImages = $estamp->estampImages->toArray();
        $row = 0;
        $column = 0;
        $stamp = 0;
        $customerStampCount = $estampCustomerItems->count();
        for ($i=0; $i < $estamp->total_stamp; $i++) {
            if(count($estampImages) == $stamp){
                $stamp = 0;
            }
            if($column == $estamp->total_column){
                $column = 0;
                $row++;
            }
            if($customerStampCount > 0){
                $estampImages[$stamp]['customer_stamp_active'] = 1;
            }else{
                $estampImages[$stamp]['customer_stamp_active'] = 0;
            }
            $datas[$row][$column] = $estampImages[$stamp];

            
            $stamp++;
            $column++;
            if($customerStampCount > 0){
                $customerStampCount--;
            }
        }

        return view('mt.estamp.index')
            ->with('splitLengths',$splitLengths)
            ->with('stamps',$datas)
            ->with('estamp',$estamp)
            ->with('customerStampCount',$estampCustomerItems->count())
            ->with('lineUserProfile',$lineUserProfile);

            
    } // end func estampPage

}