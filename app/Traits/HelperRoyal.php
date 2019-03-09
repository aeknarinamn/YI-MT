<?php

namespace YellowProject\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use YellowProject\MT\Customer\Customer;
use Illuminate\Database\Eloquent\Collection;

trait HelperRoyal
{
	protected function NameKey()
	{
		return 'NameKey';
	}

	private function successResponse($data, $code)
	{
		return response()->json([$data, $code]);
	}

	protected function errorResponse($message, $code)
	{
		return response()->json(['error' => $message, 'code' => $code], $code);
	}

	protected function showMessage($message, $code = 200)
	{
		return $this->successResponse(['data' => $message], $code);
	}

	protected function showAll(Collection $collection, $code = 200)
	{
		return $this->successResponse(['data' => $collection], $code);
	}

	protected function showOne(Model $model, $code = 200)
	{
		return $this->successResponse(['data' => $model], $code);
	}



	protected function lineUserProfile()
	{
		return \Session::get('line-login', '');
	}

	protected function checkSession($payload)
	{
		return \Session::get($payload, '');
	}

	protected function errorLineLogin()
	{
        return view('mt.custom-error.index')
            	->with('error','ไม่พบข้อมูล LineUser ของท่าน');
	}

	protected function errorMessage($message,$title = 'พบข้อผิดพลาดบางประการ')
	{
        return view('mt.promotions.TOPS.page-message')
        		->with('title', $title)
            	->with('message',$message);
	}

	protected function errorLineStampRegister($payload)
	{
		return view('mt.register-u-fan-club.index')
                ->with('code','Register')
                ->with('lineUserProfile',$payload);
	}

	protected  function generateCode ($count)
    {
        return str_random($count);    
    } // ------  / generateCode 




}