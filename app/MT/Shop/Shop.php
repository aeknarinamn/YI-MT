<?php

namespace YellowProject\MT\Shop;

use Illuminate\Database\Eloquent\Model;
use YellowProject\MT\Customer\Customer;

class Shop extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_mt_shop';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'name',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class,'shop_id');
    }
}
