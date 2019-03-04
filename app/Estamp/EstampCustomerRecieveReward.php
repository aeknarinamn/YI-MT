<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;

class EstampCustomerRecieveReward extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_estamp_customer_recieve_reward';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'line_user_id',
		'estamp_id',
		'stamp_amount',
		'reward',
        'store_ref',
    ];
}
