<?php

namespace YellowProject\Http\Controllers\MT\Estamp;

use YellowProject\MT\Customer\Customer;
use YellowProject\MT\Customer\CustomerEstamp;
use Illuminate\Http\Request;
use YellowProject\Http\Controllers\MainController;

class EstampController extends MainController
{

    public function index(Customer $customer)
    {
        $estam = CustomerEstamp::all();
        return $this->showAll($estam);
    }

}