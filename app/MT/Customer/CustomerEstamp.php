<?php

namespace YellowProject\MT\Customer;

use Illuminate\Database\Eloquent\Model;

class CustomerEstamp extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_mt_customer_estamp';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'line_user_id',
    	'mt_customer_id',
    	'seq',
    ];
}
