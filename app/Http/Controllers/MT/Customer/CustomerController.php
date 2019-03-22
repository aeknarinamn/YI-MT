<?php

namespace YellowProject\Http\Controllers\MT\Customer;

use Carbon\Carbon;
use Illuminate\Http\Request;
use YellowProject\MT\Redeem\Redeem;
use YellowProject\MT\Customer\Customer;
use YellowProject\Http\Controllers\MainController;

class CustomerController extends MainController
{

    public function index()
    {
        $customers = Customer::all();

        // return $customers;
        return $this->showAll($customers);
    }

    public function redeem()
    {
        $customers = Customer::where('is_redeem','1')->get();

        // // return $customers;
        return $this->showAll($customers);
    }

    public function show(Customer $customer)
    {
        return $this->showOne($customer);
    }

    public function update (Request $request, Customer $customer)
    {
        // dd($request->all());
        if($customer->line_user_id != $request->line_user_id){
            return $this->errorLineLogin();
        }

        if ($customer->total_stamp < Customer::RULE_REDEEM) {
            return $this->errorResponse('ไม่สามารถใช้แสตม์ได้ เนื่องจากมีไม่ครบตามที่กำหนด', 422);
            // return $this->errorLineLogin();
        }

        if ($customer->is_redeem != '1') {
            $countStamp = $customer->total_stamp;
            $customer->is_redeem = '1';
            $customer->is_active = '0';
            $customer->save();

            Redeem::create([
                'mt_customer_id' => $customer->id,
                'description' => Carbon::now(),
            ]);
        }else{
            return $this->errorResponse('User นี้ได้ทำงานแลกของรางวัลไปแล้ว', 422);
        }
        // return $this->showOne($customer);

        if ($customer->total_stamp >= Customer::RULE_REDEEM) {
            $this->startSession();
            $this->addSession('isthank','true');
            return redirect()->action('MT\Promotion\TOPS\PromotionController@thank');
        } else {
            return redirect()->action('MT\Promotion\TOPS\PromotionController@index');
        }
    } // ------  / update 




    protected function checkLineUser(Customer $customer, $lineuser)
    {
        if($customer->line_user_id != $lineuser){
            return $this->errorLineLogin();
        }
    }

    public function changeShopTops(Request $request)
    {
        $lineUserId = $request->line_user_id;
        $shopChangeId = $request->shop_change_id;
        $page = $_COOKIE['remember-page'];

        $UserProfile = Customer::where('line_user_id',$lineUserId)
            ->where('is_active','1')
            ->first();
        if($UserProfile){
            $UserProfile->update([
                'is_active' => '0'
            ]);
        }

        $searchShopChange = Customer::where('line_user_id',$lineUserId)
            ->where('shop_id',$shopChangeId)
            ->where('is_redeem','0')
            ->first();
        if($searchShopChange){
            $searchShopChange->update([
                'is_active' => '1'
            ]);
        }

        return redirect($page);
    }

    public function changeShopWatsons(Request $request)
    {
        $lineUserId = $request->line_user_id;
        $shopChangeId = $request->shop_change_id;
        $page = $_COOKIE['remember-page'];

        $UserProfile = Customer::where('line_user_id',$lineUserId)
            ->where('is_active','1')
            ->first();
        if($UserProfile){
            $UserProfile->update([
                'is_active' => '0'
            ]);
        }

        $searchShopChange = Customer::where('line_user_id',$lineUserId)
            ->where('shop_id',$shopChangeId)
            ->first();
        if($searchShopChange){
            $searchShopChange->update([
                'is_active' => '1'
            ]);
        }

        return redirect($page);
    }

}
