<?php

namespace YellowProject\Http\Controllers\MT\Customer;

use YellowProject\MT\Customer\Customer;
use Illuminate\Http\Request;
use YellowProject\Http\Controllers\MainController;

class CustomerController extends MainController
{

    public function __construct(Customer $customer)
    {
        $this->points = $customer->total_stamp;
        $this->point_rule = 6;
    }

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
        if($customer->line_user_id != $request->line_user_id){
            return $this->errorLineLogin();
        }

        if ($customer->total_stamp < Customer::RULE_REDEEM) {
            return $this->errorResponse('ไม่สามารถใช้แสตม์ได้ เนื่องจากมีไม่ครบตามที่กำหนด', 422);
            // return $this->errorLineLogin();
        }

        if ($customer->is_redeem != 1) {
            $countStamp = $customer->total_stamp;
            $customer->total_stamp = $countStamp - $this->points_rule;
            $customer->is_redeem = 1;
            $customer->save();
        }else{
            return $this->errorResponse('User นี้ได้ทำงานแลกของรางวัลไปแล้ว', 422);
        }
        

        return $this->showOne($customer);
    } // ------  / update 




    protected function checkLineUser(Customer $customer, $lineuser)
    {
        if($customer->line_user_id != $lineuser){
            return $this->errorLineLogin();
        }
    }

}
