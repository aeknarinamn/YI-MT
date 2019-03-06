<?php

namespace YellowProject\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use YellowProject\MT\Customer\Customer;
use Illuminate\Database\Eloquent\Collection;

trait HelperRoyal
{
	private function successResponse($data, $code)
	{
		return response()->json([$data, $code]);
	}

	protected function errorResponse($message, $code)
	{
		return response()->json(['error' => $message, 'code' => $code], $code);
	}

	protected function showAll(Collection $collection, $code = 200)
	{
		return $this->successResponse(['data' => $collection], $code);
	}

	protected function showOne(Model $model, $code = 200)
	{
		return $this->successResponse(['data' => $model], $code);
	}

	protected function showEstamp()
	{
		// session()->put('teams', 'developers');
		 // session()->put('name', 'wisanu');
		 // session()->put('test', 'tester');
		 // // session()->put('line-login', 'line-login');
		 // session()->put('line', 'Facebook');
		 // // return \Session::get('line-login', '');
		 // return \Session::all();
		return \Session::all();
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

	protected function errorLineStampRegister($payload)
	{
		return view('mt.register-u-fan-club.index')
                ->with('code','Register')
                ->with('lineUserProfile',$payload);
	}

	// protected function errorEstampCustomer()
	// {
	// 	return view('mt.thank-after-recieve-reward.index')
 //                ->with('estamp',$estamp)
 //                ->with('lineUserProfile',$payload);
	// }

	protected function checkLineUser(Customer $customer, $lineuser)
    {
        if($customer->line_user_id != $lineuser){
            return $this->errorLineLogin();
        }
    }

}