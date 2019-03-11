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
        $customers = Customer::where('is_redeem',1)->get();

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

        if ($customer->is_redeem != 1) {
            $countStamp = $customer->total_stamp;
            $customer->is_redeem = 1;
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

}
