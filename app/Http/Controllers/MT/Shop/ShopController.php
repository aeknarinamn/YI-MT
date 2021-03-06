<?php

namespace YellowProject\Http\Controllers\MT\Shop;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use YellowProject\MT\Shop\Shop;
use YellowProject\Http\Controllers\MainController;

class ShopController extends MainController
{

    public function index()
    {

        $shops = Shop::all();
        return $this->showAll($shops);
    }

    public function show()
    {
        // $this->delSession()
        $this->startSession();
        
        $this->addSession('testToken', 'ทดลอง add session');


        if (session()->has($this->nameSession())) {
            // return $data;
            return session()->get($this->nameSession());
        }
    }

}
