<?php

namespace YellowProject\MT\Customer;

use Illuminate\Database\Eloquent\Model;
use YellowProject\MT\Customer\Customer;

class CustomerEstamp extends Model
{
    public $timestamps = true;

    protected $table = 'fact_mt_customer_estamp';

    protected $fillable = [
    	'line_user_id',
    	'mt_customer_id',
    	'seq',
    ];

    public static function boot()
    {
        static::created(function ($userestamp) {
            $customer = Customer::where('id',$userestamp->mt_customer_id)
                ->where('is_redeem',0)
                ->first();

            if ($customer) {
                $countStamps =  $customer->total_stamp;   
                $customer->total_stamp = $countStamps+1;    
                $customer->save();
            }   
        });
        parent::boot();
    }



}