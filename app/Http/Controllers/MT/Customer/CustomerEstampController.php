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
        // $data = request()->validate([
        //     'line_user_id' => 'required|integer',
        // ],[
        //     'line_user_id.required' => 'กรุณาใสข้อมูล',
        //     'line_user_id.integer' => 'กรุณาใสข้อมูลที่เป็นตัวเลข',
        // ]); 
        $data = [];
        $data['line_user_id'] = $request->line_user_id;
        $data['mt_customer_id'] = $customer->id;
        $data['seq'] = $countItem+1;

        $Customer_Estamp = CustomerEstamp::create($data);

        return $this->showOne($Customer_Estamp);
    } // ------  / store 

    public function show(CustomerEstamp $customerEstamp)
    {
        //
    }


    public function update(Request $request, CustomerEstamp $customerEstamp)
    {
        //
    }

    public function destroy(CustomerEstamp $customerEstamp)
    {
        //
    }
}