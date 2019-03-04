<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;

class EstampCustomerItem extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_estamp_customer_item';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'estamp_customer_id',
        'seq',
        'code',
        'type',
		'store_ref',
    ];
}
