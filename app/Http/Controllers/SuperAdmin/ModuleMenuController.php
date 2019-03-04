<?php

namespace YellowProject\Http\Controllers\SuperAdmin;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;

class ModuleMenuController extends Controller
{
    public function getPageModuleMenu()
    {
    	return view('super-admin.module-menu.index');
    }
}
