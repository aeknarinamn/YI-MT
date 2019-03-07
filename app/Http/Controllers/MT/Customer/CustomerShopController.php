<?php

namespace YellowProject\Http\Controllers\MT\Customer;

use YellowProject\MT\Customer\Customer;
use Illuminate\Http\Request;
use YellowProject\Http\Controllers\MainController;

class CustomerShopController extends MainController
{

    public function index(Customer $customer)
    {
        $shop = $customer->shop;
        return $this->showOne($shop);
    }


}
