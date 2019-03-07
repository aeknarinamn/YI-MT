<?php

namespace YellowProject\Http\Controllers\MT\Shop;

use YellowProject\MT\Shop\Shop;
use Illuminate\Http\Request;
use YellowProject\Http\Controllers\MainController;

class ShopController extends MainController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shops = Shop::all();
        return $this->showAll($shops);
    }

}
