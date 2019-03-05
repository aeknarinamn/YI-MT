<?php

namespace YellowProject\MT\Customer;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_mt_customer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'line_user_id',
    	'shop_id',
    	'total_stamp',
    	'is_active',
    	'is_redeem',
    ];
}
