<?php

namespace YellowProject\Http\Controllers\MT\Customer;

use Illuminate\Http\Request;
use YellowProject\MT\Customer\Customer;
use YellowProject\MT\Customer\CustomerEstamp;
use YellowProject\Http\Controllers\MainController;

class CustomerEstampController extends MainController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Customer $customer)
    {
        return $this->showAll($customer->customerestamps);
    }

    public function store (Request $request, Customer $customer)
    {
        if ($customer->line_user_id != $request->line_user_id) {
            return $this->errorLineLogin();
        } 

        $countItem = $customer->customerestamps->count();

        if ($countItem >= Customer::RULE_REDEEM) {
            return $this->errorResponse('ไม่สามารถเพิ่มจำนวนแสตม์ได้อีกเนื่องจากมีเกินจำนวน',422);
        }
        
        
        $data = $this->validate(request(), [
            'line_user_id' => 'required|integer',
        ]);
        // $data = [];
        $data['line_user_id'] = $request->line_user_id;
        $data['mt_customer_id'] = $customer->id;
        $data['seq'] = $countItem+1;

        $Customer_Estamp = CustomerEstamp::create($data);

        return $this->showOne($Customer_Estamp);
    } // ------  / store 

}
