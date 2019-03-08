<?php

namespace YellowProject\MT\Redeem;

use Illuminate\Database\Eloquent\Model;

class Redeem extends Model
{
    public $timestamps = true;


    protected $table = 'fact_mt_redeem';

    protected $fillable = [
    	'mt_customer_id',
    	'description',
    	'is_active',
    ];
}
