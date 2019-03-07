<?php

namespace YellowProject\Http\Controllers\MT\Shop;

use YellowProject\MT\Shop\Shop;
use Illuminate\Http\Request;
use YellowProject\Http\Controllers\MainController;

class ShopCustomerController extends MainController
{


    public function index(Shop $shop)
    {
        $customers = $shop->customers;
        return $this->showAll($customers);
    }



}
