<?php

namespace YellowProject\Http\Controllers\MT\Customer;

use YellowProject\MT\Customer\Customer;
use Illuminate\Http\Request;
use YellowProject\Http\Controllers\MainController;

class CustomerController extends MainController
{

    public function __construct()
    {
        // $this->points = 110;
        $this->points_rule = 6;
    }

    public function index()
    {
        $customers = Customer::all();

        // return $customers;
        return $this->showAll($customers);
    }

    public function show(Customer $customer)
    {
        return $this->showOne($customer);
    }

    public function update (Request $request, Customer $customer)
    {

        $this->checkLineUser($customer, $request->line_user_id); 

        // $countItem = $customer->customerestamps->count();
        if ($customer->total_stamp < $this->points_rule) {
            return $this->errorLineLogin();
        }

        if ($customer->is_redeem != 1) {
            $customer->is_redeem = 1;
            $customer->save();
        }else{
            return $this->errorResponse('User นี้ได้ทำงานแลกของรางวัลไปแล้ว', 422);
        }
        

        return $this->showOne($customer);
    } // ------  / update 


    // protected function checkLineUser(Customer $customer, $lineuser)
    // {
    //     if($customer->line_user_id != $lineuser){
    //         return $this->errorLineLogin();
    //     }
    // }

}
