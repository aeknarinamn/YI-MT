<?php

namespace YellowProject\MT\Customer;

use YellowProject\MT\Shop\Shop;
use Illuminate\Database\Eloquent\Model;
use YellowProject\MT\Customer\CustomerEstamp;

class Customer extends Model
{
    public $timestamps = true;


    protected $table = 'fact_mt_customer';

    protected $fillable = [
    	'line_user_id',
    	'shop_id',
    	'total_stamp',
    	'is_active',
    	'is_redeem',
    ];

    const RULE_REDEEM = 6;

    public function customerestamps()
    {
        return $this->hasMany(CustomerEstamp::class,'mt_customer_id');
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class,'shop_id');
    }
    
}
