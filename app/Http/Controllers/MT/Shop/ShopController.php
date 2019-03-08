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
        $this->startSession();
        
        $this->addSession(['name' => 'Wisanu']);
        $data = $this->getSession();
        $data['name'] = '$this->getSession()';

        return $data;
    }

}
