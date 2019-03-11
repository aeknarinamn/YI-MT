<?php

namespace YellowProject\Traits;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use YellowProject\MT\Customer\Customer;
use Illuminate\Database\Eloquent\Collection;

trait SessionFunc
{
	protected function nameSession()
	{
		return 'SessionBody';
	}


	protected function startSession()
	{	
		if (!session()->get($this->nameSession())) {
			session()->put($this->nameSession().'.'.'token', 'Hasd8dna8d45');
			session()->put($this->nameSession().'.'.'keys', 'thisisabook');
        	session()->put($this->nameSession().'.'.'isActive', false);
        	session()->put($this->nameSession().'.'.'verified', false);
        	session()->put($this->nameSession().'.'.'isthank', false);
			// session()->put($this->nameSession(), collect());
			// session()->push($this->nameSession(), [
			// 'keys' => $this->generateCode(40),
			// 'verified' => 'false',
			// 'isactive' => 'false',
			// 'isthank' => true,
		// ]);

		}
	}

	protected function getSession()
	{
		if (session()->get($this->nameSession())) {
			return session()->get($this->nameSession());
		}else {
			return 'ไม่พบ Function startSession ถูกทำลายแล้ว';
		}
		
	}

	protected function addSession($key,$value)
	{
		if (session()->get($this->nameSession())) {
			session()->put($this->nameSession().'.'.$key, $value);
		}else {
			return 'ไม่พบ Function startSession ถูกทำลายแล้ว';
		}
		
	}

	protected function setSession($key,$value)
	{
		if (session()->get($this->nameSession())) {
			session()->put($this->nameSession().'.'.$key, $value);
		}else {
			return 'ไม่พบ Function startSession ถูกทำลายแล้ว';
		}
		
	}

	protected function delSession()
	{
		return session()->forget($this->nameSession());
	}

	protected function allSession()
	{
		return session()->all();
	}


}


/*
		$this->startSession();
        $this->addSession(['To' => 'addSession']);
        $this->setSession(['To' => 'setSession']);
        $data = $this->getSession();
        {
		    "keys": "bOCUqqeoIFemTCIfF0XYZW8pIdu1mrZ5418pWTOa",
		    "verified": false,
		    "isActive": false,
		    "name": "$this->getSession()"
		}
        $this->getSession()['keys']; 
        $this->getSession()['name'];
*/